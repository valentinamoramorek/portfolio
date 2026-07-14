import csvRaw from '../assets/content/content.csv?raw';

export interface ContentStat {
	value: string;
	label: string;
}

export interface ContentItem {
	client: string;
	contentType: string;
	type: string;
	image: string;
	linkLabel: string;
	url: string;
	platform: string;
	stats: ContentStat[];
	// Lower shows first; blank/non-numeric means "no opinion" and falls after
	// every prioritized row, in original CSV order. See ContentGrid's ordering.
	priority: number | null;
	// TRUE for posts originally written in another language and machine-translated.
	translated: boolean;
}

export interface ContentLoadResult {
	items: ContentItem[];
	warnings: string[];
}

const IMAGE_BASE_PATH = '/src/assets/content/';

const imageFiles = import.meta.glob('/src/assets/content/*.{png,jpg,jpeg,webp,gif}', { eager: true });
const availableImageFilenames = new Set(Object.keys(imageFiles).map((path) => path.split('/').pop()));

// Order here drives the order stats are pushed onto each item.
const STAT_COLUMNS = [
	'Impressions',
	'Click-Through Rate',
	'Engagement Rate',
	'Total Engagement',
	'Open Rate',
	'Audience',
	'Total Views',
];

// Handwritten instead of a dependency: needs to survive quoted fields with
// embedded commas (e.g. "1,520") and the CRLF line endings this sheet was
// exported with.
//
// Delimiter is auto-detected from the header line: some spreadsheet locales
// (e.g. Excel/Sheets set to a comma-decimal region) export CSV with `;` as
// the field separator instead of `,`.
function detectDelimiter(text: string): ',' | ';' {
	const firstLine = text.split(/\r\n|\r|\n/, 1)[0] ?? '';
	const semicolons = (firstLine.match(/;/g) ?? []).length;
	const commas = (firstLine.match(/,/g) ?? []).length;
	return semicolons > commas ? ';' : ',';
}

function parseCsv(text: string): string[][] {
	const rows: string[][] = [];
	let row: string[] = [];
	let field = '';
	let inQuotes = false;
	const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
	const delimiter = detectDelimiter(normalized);

	for (let i = 0; i < normalized.length; i++) {
		const char = normalized[i];

		if (inQuotes) {
			if (char === '"') {
				if (normalized[i + 1] === '"') {
					field += '"';
					i++;
				} else {
					inQuotes = false;
				}
			} else {
				field += char;
			}
			continue;
		}

		if (char === '"') {
			inQuotes = true;
		} else if (char === delimiter) {
			row.push(field);
			field = '';
		} else if (char === '\n') {
			row.push(field);
			rows.push(row);
			row = [];
			field = '';
		} else {
			field += char;
		}
	}

	if (field.length > 0 || row.length > 0) {
		row.push(field);
		rows.push(row);
	}

	return rows;
}

function findColumn(header: string[], name: string): number {
	const exact = header.indexOf(name);
	if (exact !== -1) return exact;
	const lowerName = name.toLowerCase();
	return header.findIndex((h) => h.trim().toLowerCase().startsWith(lowerName));
}

export function loadContentItems(): ContentLoadResult {
	const rows = parseCsv(csvRaw);
	const warnings: string[] = [];

	if (rows.length === 0) {
		return { items: [], warnings: ['content.csv is empty'] };
	}

	const [header, ...dataRows] = rows;

	const columnIndex = {
		client: findColumn(header, 'Client'),
		contentType: findColumn(header, 'Content Type'),
		type: findColumn(header, 'Type'),
		image: findColumn(header, 'Image filename'),
		linkLabel: findColumn(header, 'Link label'),
		url: findColumn(header, 'URL'),
		platform: findColumn(header, 'Platform'),
	};
	// Optional: older exports and sheets that haven't added this column yet
	// are still valid, so it's not part of the required columnIndex/warnings.
	const priorityColumnIndex = findColumn(header, 'Priority');
	const translatedColumnIndex = findColumn(header, 'Translated');

	const missingColumns = Object.entries(columnIndex)
		.filter(([, index]) => index === -1)
		.map(([key]) => key);
	if (missingColumns.length > 0) {
		warnings.push(`CSV header is missing expected column(s): ${missingColumns.join(', ')}`);
	}

	const statColumns = STAT_COLUMNS.map((name) => ({ name, index: findColumn(header, name) }));
	const missingStatColumns = statColumns.filter((c) => c.index === -1).map((c) => c.name);
	if (missingStatColumns.length > 0) {
		warnings.push(`CSV header is missing expected stat column(s): ${missingStatColumns.join(', ')}`);
	}

	const items: ContentItem[] = [];

	dataRows.forEach((row, i) => {
		const rowNumber = i + 2; // account for header row + 1-based line numbers
		const isEmpty = row.every((cell) => cell.trim() === '');
		if (isEmpty) return;

		if (row.length !== header.length) {
			warnings.push(
				`Row ${rowNumber}: expected ${header.length} columns, found ${row.length} (possible malformed CSV row)`,
			);
		}

		const get = (index: number) => (index >= 0 ? (row[index] ?? '').trim() : '');

		const client = get(columnIndex.client);
		const contentType = get(columnIndex.contentType);
		// Normalized to lowercase: hand-maintained sheets mix "Image"/"Video"
		// casing, but downstream code (e.g. ContentCard's isVideo check)
		// compares against the lowercase literal.
		const type = get(columnIndex.type).toLowerCase();
		const imageFilename = get(columnIndex.image);
		const linkLabel = get(columnIndex.linkLabel);
		const url = get(columnIndex.url);
		const platform = get(columnIndex.platform);

		const rowLabel = `Row ${rowNumber} (${client || 'unknown client'})`;

		if (!client) warnings.push(`${rowLabel}: missing Client`);
		if (!imageFilename) warnings.push(`${rowLabel}: missing image filename`);
		if (imageFilename && !availableImageFilenames.has(imageFilename)) {
			warnings.push(`${rowLabel}: image file "${imageFilename}" not found in src/assets/content/`);
		}
		if (!url) warnings.push(`${rowLabel}: missing URL`);
		if (type && type !== 'image' && type !== 'video') {
			warnings.push(`${rowLabel}: unexpected Type value "${type}" (expected "image" or "video")`);
		}

		const stats: ContentStat[] = [];
		for (const { name, index } of statColumns) {
			const value = get(index);
			if (value) stats.push({ value, label: name });
		}

		const priorityRaw = get(priorityColumnIndex);
		const priorityParsed = priorityRaw ? Number(priorityRaw) : NaN;
		if (priorityRaw && Number.isNaN(priorityParsed)) {
			warnings.push(`${rowLabel}: Priority value "${priorityRaw}" is not a number, ignoring it`);
		}
		const priority = Number.isNaN(priorityParsed) ? null : priorityParsed;

		// Defaults to FALSE for anything blank, missing, or not recognized as true.
		const translatedRaw = get(translatedColumnIndex).toLowerCase();
		const translated = translatedRaw === 'true';

		items.push({
			client,
			contentType,
			type,
			image: imageFilename ? `${IMAGE_BASE_PATH}${imageFilename}` : '',
			linkLabel,
			url,
			platform,
			stats,
			priority,
			translated,
		});
	});

	return { items, warnings };
}

export interface ContentFilter {
	client?: string | string[];
	contentType?: string;
}

export function filterItems(items: ContentItem[], filter?: ContentFilter): ContentItem[] {
	if (!filter || (!filter.client && !filter.contentType)) return items;
	const clients = filter.client ? (Array.isArray(filter.client) ? filter.client : [filter.client]) : null;
	return items.filter(
		(item) =>
			(!clients || clients.includes(item.client)) &&
			(!filter.contentType || item.contentType === filter.contentType),
	);
}

// Moves rows with a Priority value to the front, lowest number first. Rows
// without one keep their original CSV order and are appended after all
// prioritized rows. This is the only thing that controls which posts lead
// the grid — row order in the sheet otherwise doesn't matter.
export function sortByPriority(items: ContentItem[]): ContentItem[] {
	const prioritized = items.filter((item) => item.priority !== null);
	const rest = items.filter((item) => item.priority === null);
	prioritized.sort((a, b) => (a.priority as number) - (b.priority as number));
	return [...prioritized, ...rest];
}

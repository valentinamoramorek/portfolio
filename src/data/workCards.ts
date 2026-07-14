export interface StatValue {
	prefix?: string;
	value: number;
	decimals?: number;
	decimalSeparator?: string;
	grouped?: boolean;
	suffix?: string;
}

export interface StaticStat {
	text: string;
}

export function formatStat(stat: StatValue, current: number = stat.value): string {
	const decimals = stat.decimals ?? 0;
	let numStr = current.toFixed(decimals);

	if (stat.grouped) {
		const [intPart, decPart] = numStr.split('.');
		numStr = Number(intPart).toLocaleString('en-US') + (decPart ? `.${decPart}` : '');
	}

	if (stat.decimalSeparator && stat.decimalSeparator !== '.') {
		numStr = numStr.replace('.', stat.decimalSeparator);
	}

	return `${stat.prefix ?? ''}${numStr}${stat.suffix ?? ''}`;
}

export interface WorkCard {
	image: string;
	alt: string;
	label: string;
	sublabel: string;
	href: string;
	floatingLeft: { stat: StatValue; caption: string };
	floatingRight: { stat: StatValue; caption: string };
	panel: [StatValue, StaticStat, StatValue];
	side: 'left' | 'right';
}

export const workCards: WorkCard[] = [
	{
		image: '/work/remotivate-linkedin-page-preview.png',
		alt: 'Remotivate LinkedIn page preview',
		label: 'Remotivate',
		sublabel: 'Remote Hiring',
		href: '/work/remotivate',
		floatingLeft: {
			stat: { value: 2308081, grouped: true },
			caption: 'Impressions',
		},
		floatingRight: {
			stat: { value: 12.7, decimals: 1, decimalSeparator: ',', suffix: '%' },
			caption: 'Engagement Rate',
		},
		panel: [
			{ prefix: '+', value: 421, suffix: 'K followers' },
			{ text: 'B2B & B2C audience' },
			{ prefix: '+', value: 50.6, decimals: 1, suffix: '% page growth' },
		],
		side: 'left',
	},
	{
		image: '/work/anna-shcherbyna-linkedin-profile-preview.png',
		alt: 'Anna Shcherbyna LinkedIn profile preview',
		label: 'Anna Shcherbyna',
		sublabel: 'Founder',
		href: '/work/anna-shcherbyna',
		floatingLeft: {
			stat: { value: 584088, grouped: true },
			caption: 'Impressions',
		},
		floatingRight: {
			stat: { value: 320737, grouped: true },
			caption: 'Members Reached',
		},
		panel: [
			{ prefix: '+', value: 11, suffix: 'K followers' },
			{ text: 'B2B audience' },
			{ prefix: '+', value: 53.4, decimals: 1, suffix: '% page growth' },
		],
		side: 'right',
	},
	{
		image: '/work/girl-in-corporation-linkedin-page-preview.png',
		alt: 'Girl In Corporation LinkedIn page preview',
		label: 'Girl In Corporation',
		sublabel: 'Career Coaching',
		href: '/work/girl-in-corporation',
		floatingLeft: {
			stat: { value: 30875, grouped: true },
			caption: 'Impressions',
		},
		floatingRight: {
			stat: { value: 12.7, decimals: 1, decimalSeparator: ',', suffix: '%' },
			caption: 'Engagement Rate',
		},
		panel: [
			{ prefix: '+', value: 4, suffix: 'K followers' },
			{ text: 'B2C & B2B audience' },
			{ prefix: '+', value: 321.98, decimals: 2, suffix: '% page growth' },
		],
		side: 'left',
	},
	{
		image: '/work/daniela-campos-instagram-profile-preview.png',
		alt: 'Daniela Campos Instagram profile preview',
		label: 'Daniela Campos',
		sublabel: 'Amazon Executive',
		href: '/work/daniela-campos',
		floatingLeft: {
			stat: { value: 656652, grouped: true },
			caption: 'IG Reach',
		},
		floatingRight: {
			stat: { value: 904111, grouped: true },
			caption: 'LI Impressions',
		},
		panel: [
			{ prefix: '+', value: 32.6, decimals: 1, suffix: 'K audience' },
			{ text: 'B2C audience' },
			{ prefix: '+', value: 17, suffix: '% page growth' },
		],
		side: 'right',
	},
];

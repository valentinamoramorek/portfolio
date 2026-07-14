export interface TextSegment {
	text: string;
	bold: boolean;
}

// Splits on **bold** markers so case study copy can carry light emphasis
// without pulling in a markdown parser.
export function parseBoldSegments(text: string): TextSegment[] {
	return text
		.split(/\*\*(.+?)\*\*/g)
		.map((part, index) => ({ text: part, bold: index % 2 === 1 }))
		.filter((segment) => segment.text.length > 0);
}

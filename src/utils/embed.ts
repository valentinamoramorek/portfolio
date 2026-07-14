export function getVideoEmbedUrl(url: string, platform: string): string | null {
	if (!url || !platform) return null;

	let parsed: URL;
	try {
		parsed = new URL(url);
	} catch {
		return null;
	}

	const normalizedPlatform = platform.trim().toLowerCase();

	if (normalizedPlatform === 'instagram') {
		const path = parsed.pathname.endsWith('/') ? parsed.pathname : `${parsed.pathname}/`;
		return `https://www.instagram.com${path}embed`;
	}

	if (normalizedPlatform === 'tiktok') {
		const match = parsed.pathname.match(/\/video\/(\d+)/);
		if (match) return `https://www.tiktok.com/embed/v2/${match[1]}`;
	}

	return null;
}

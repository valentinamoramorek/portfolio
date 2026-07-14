export interface CaseStudySection {
	// Paragraphs may contain **bold** segments for emphasis.
	paragraphs: string[];
	// Path into src/assets/case-studies/, resolved via import.meta.glob at render time.
	image: string;
	imageLabel: string;
}

export interface CaseStudyChannel {
	// Matches the icon file src/icons/{platform}_logo.svg.
	platform: string;
	name: string;
	companyPage: boolean;
	personalBrand: boolean;
}

export interface CaseStudyResult {
	value: string;
	label: string;
}

export interface CaseStudy {
	slug: string;
	client: string;
	title: string;
	intro: string;
	role: string;
	timeline: string;
	techStack: string[];
	challenge: CaseStudySection | null;
	strategy: CaseStudySection | null;
	channels: CaseStudyChannel[] | null;
	results: CaseStudyResult[] | null;
	// Clients whose content grid pieces show in Featured Content. Defaults to [client] when omitted.
	featuredClients?: string[];
	// Thumbnail shown in the "Next case study" band, from public/work/.
	nextImage: string;
}

export const caseStudies: CaseStudy[] = [
	{
		slug: 'remotivate',
		client: 'Remotivate',
		title: "Building Remotivate's content from scratch",
		intro:
			'Remotivate is a remote hiring platform serving two audiences simultaneously, hiring managers, and job seekers. My job: turn a large but inactive audience into an engaged, hybrid community.',
		role: 'Content Marketing Manager',
		timeline: '2024 – 2026',
		techStack: [
			'Canva',
			'CapCut',
			'MailerLite',
			'Figma',
			'Make',
			'Instantly',
			'Apollo.io',
			'Claude',
			'GA4 (Google Analytics 4)',
			'WordPress',
		],
		challenge: {
			paragraphs: [
				'Remotivate had real strengths: 200K LinkedIn followers and a service clients loved.',
				"**And also important challenges:** Little to no engagement, a large B2C following, but no dedicated B2B channel for founders and hiring managers, and a branding that didn't represent the company.",
			],
			image: '/src/assets/case-studies/remotivate-before.png',
			imageLabel: 'Before',
		},
		strategy: {
			paragraphs: [
				"To make Remotivate a trusted name in remote hiring, I designed a dual-channel strategy: the founder's brand as the B2B engine, and a hybrid (B2C and B2B) company page that made both audiences feel seen and sparked real conversation.",
			],
			image: '/src/assets/case-studies/remotivate-after.png',
			imageLabel: 'After',
		},
		channels: [
			{ platform: 'linkedin', name: 'LinkedIn', companyPage: true, personalBrand: true },
			{ platform: 'instagram', name: 'Instagram', companyPage: true, personalBrand: true },
			{ platform: 'tiktok', name: 'TikTok', companyPage: true, personalBrand: true },
			{ platform: 'youtube', name: 'Youtube', companyPage: true, personalBrand: false },
			{ platform: 'mailerlite', name: 'Newsletter', companyPage: true, personalBrand: false },
		],
		results: [
			{ value: '2.4M+', label: 'Organic Impressions' },
			{ value: '50.6%', label: 'Follower Growth' },
			{ value: '12.7%', label: 'Avg. Engagement Rate' },
		],
		featuredClients: ['Remotivate', 'Anna Shcherbyna'],
		nextImage: '/work/remotivate-linkedin-page-preview.png',
	},
	{
		slug: 'anna-shcherbyna',
		client: 'Anna Shcherbyna',
		title: "Building Anna's content from scratch",
		intro:
			"Anna is Remotivate's founder, a remote hiring platform. Starting from an inactive LinkedIn account, my goal was to rebuild her presence and turn it into a consistent B2B channel for their ICP (hiring decision-makers).",
		role: 'Content Marketing Manager',
		timeline: '2024 – 2026',
		techStack: [
			'Canva',
			'CapCut',
			'MailerLite',
			'Figma',
			'Make',
			'Instantly',
			'Apollo.io',
			'Claude',
			'GA4 (Google Analytics 4)',
			'WordPress',
		],
		challenge: {
			paragraphs: [
				"Anna's account had a great potential, but it wasn't being used at all, and connecting with founders was hard. Getting busy hiring managers to stop, pay attention, and actually care about hiring took a couple of iterations.",
			],
			image: '/src/assets/case-studies/anna-before.png',
			imageLabel: 'Before',
		},
		strategy: {
			paragraphs: [
				'I made Anna the face of our B2B channels, using her close client relationships to connect with potential clients. Then I built Deep Avatar Research, along with data analysis to learn exactly what founders related to, and create more of it :).',
			],
			image: '/src/assets/case-studies/anna-after.png',
			imageLabel: 'After',
		},
		channels: [
			{ platform: 'linkedin', name: 'LinkedIn', companyPage: true, personalBrand: true },
			{ platform: 'instagram', name: 'Instagram', companyPage: true, personalBrand: true },
			{ platform: 'tiktok', name: 'TikTok', companyPage: true, personalBrand: true },
			{ platform: 'youtube', name: 'Youtube', companyPage: true, personalBrand: false },
			{ platform: 'mailerlite', name: 'Newsletter', companyPage: true, personalBrand: false },
		],
		results: [
			{ value: '565k+', label: 'Organic Impressions' },
			{ value: '320k', label: 'Members Reached' },
			{ value: '53.4%', label: 'Follower Growth' },
		],
		nextImage: '/work/anna-shcherbyna-linkedin-profile-preview.png',
	},
	{
		slug: 'girl-in-corporation',
		client: 'Girl in Corporation',
		title: "Scaling Girl In Corporation's page while keeping a ~10% ER",
		intro:
			'Girl In Corporation is a career-development brand founded by Daniela Campos, an Amazon executive and ex-Meta, helping people across Latin America land better jobs and grow their careers.',
		role: 'Business Specialist',
		timeline: '2022 – 2024',
		techStack: ['Canva', 'CapCut', 'MailChimp', 'Kajabi', 'Adobe Suite', 'WordPress', 'Zapier'],
		challenge: {
			paragraphs: [
				"Girlin's Instagram account already had something special: strong engagement. The challenge was protecting that even in quieter weeks, growing on Instagram (a notoriously tough platform) and finding fresh, genuinely useful career topics day after day.",
			],
			image: '/src/assets/case-studies/girl-in-corporation-before.png',
			imageLabel: '',
		},
		strategy: {
			paragraphs: [
				"The account already ran on a simple rhythm: one topic a week, brought to life in Instagram Stories. I leaned into what worked to amplify that rhythm and carry each week's theme across the LinkedIn company page, Daniela's personal brand, and the newsletter, for higher reach.",
			],
			image: '/src/assets/case-studies/girl-in-corporation-after.png',
			imageLabel: '',
		},
		channels: [
			{ platform: 'linkedin', name: 'LinkedIn', companyPage: true, personalBrand: true },
			{ platform: 'instagram', name: 'Instagram', companyPage: true, personalBrand: false },
			{ platform: 'facebook', name: 'Facebook', companyPage: true, personalBrand: false },
			{ platform: 'mailchimp', name: 'Newsletter', companyPage: true, personalBrand: false },
		],
		results: [
			{ value: '91k+', label: 'LI Organic Impressions' },
			{ value: '~10%', label: 'IG Engagement Rate' },
			{ value: '321%', label: 'LI Follower Growth' },
			{ value: '~8,9k', label: 'IG Reach Per Post' },
			{ value: '39%', label: 'IG Follower Growth' },
		],
		featuredClients: ['Girl in Corporation', 'Daniela Campos'],
		nextImage: '/work/girl-in-corporation-linkedin-page-preview.png',
	},
	{
		slug: 'daniela-campos',
		client: 'Daniela Campos',
		title: 'Positioning Daniela Campos as an expert in her field',
		intro:
			"Daniela is an Amazon executive, Ex-Meta and Girl In Corporation's founder, a career coaching agency. My job: leverage her LinkedIn to position her as the expert her peers and audience already sensed she was.",
		role: 'Business Specialist',
		timeline: '2022 – 2024',
		techStack: ['Canva', 'CapCut', 'MailChimp', 'Kajabi', 'Adobe Suite', 'WordPress'],
		challenge: {
			paragraphs: [
				'Finding the sweet spot was hard: position Daniela as a true expert, stay credible with senior peers, and still leave room to grow… All without oversimplifying for one crowd or overcomplicating for the other.',
				'BUT most of our resources went to Instagram (main channel), so LinkedIn and the newsletter had to be handled lean and strategically.',
			],
			image: '/src/assets/case-studies/daniela-campos-before.png',
			imageLabel: '',
		},
		strategy: {
			paragraphs: [
				"I hit that sweet spot by turning each week's theme insights into thought leadership that worked on two levels at once (clear enough for newcomers, sharp enough for peers), plus platform-native content spanning her coaching and corporate life.",
			],
			image: '/src/assets/case-studies/daniela-campos-after.png',
			imageLabel: '',
		},
		channels: [
			{ platform: 'linkedin', name: 'LinkedIn', companyPage: true, personalBrand: true },
			{ platform: 'instagram', name: 'Instagram', companyPage: true, personalBrand: false },
			{ platform: 'facebook', name: 'Facebook', companyPage: true, personalBrand: false },
			{ platform: 'mailchimp', name: 'Newsletter', companyPage: true, personalBrand: false },
		],
		results: [
			{ value: '904k+', label: 'Organic Impressions' },
			{ value: '12.7k', label: 'Total Followers' },
			{ value: '17%', label: 'Follower Growth' },
		],
		nextImage: '/work/daniela-campos-instagram-profile-preview.png',
	},
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
	return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export function getNextCaseStudy(slug: string): CaseStudy {
	const index = caseStudies.findIndex((caseStudy) => caseStudy.slug === slug);
	return caseStudies[(index + 1) % caseStudies.length];
}

import { Search } from "lucide-react";
import SearchResultsClient from "./SearchResultsClient";
import SearchBar from "./SearchBar";
import { getTranslations } from "next-intl/server";

async function SearchContent({ query }) {
	const t = await getTranslations("search");

	// Fetch data using direct DB functions
	const { getEvents } = await import("@/lib/data/events");
	const { getGallery } = await import("@/lib/data/gallery");
	const { getNotices } = await import("@/lib/data/notices");
	const { getMembers } = await import("@/lib/data/members");
	const { getBlogs } = await import("@/lib/data/blogs");
	const [eventsArray, galleryArray, noticesArray, membersArray, blogsArray] = await Promise.all([getEvents(), getGallery(), getNotices(), getMembers(), getBlogs()]);
	const lowerQuery = query.toLowerCase().trim();

	const filteredEvents = eventsArray.filter((event) => {
		const titleMatch = event.eventname?.toLowerCase().trim().includes(lowerQuery);
		const descMatch = event.eventdescription?.toLowerCase().trim().includes(lowerQuery);
		const locMatch = event.eventvenue?.toLowerCase().trim().includes(lowerQuery);
		return titleMatch || descMatch || locMatch;
	});

	const filteredGallery = galleryArray.filter((item) => {
		const titleMatch = item.title?.toLowerCase().trim().includes(lowerQuery);
		const descMatch = item.description?.toLowerCase().trim().includes(lowerQuery);
		const catMatch = item.category?.toLowerCase().trim().includes(lowerQuery);
		return titleMatch || descMatch || catMatch;
	});

	const filteredNotices = noticesArray.filter((notice) => {
		const titleMatch = notice.noticetitle?.toLowerCase().trim().includes(lowerQuery);
		const contentMatch = notice.notice?.toLowerCase().trim().includes(lowerQuery);
		return titleMatch || contentMatch;
	});
	const filteredMembers = membersArray.filter((member) => {
		const nameMatch = member.fullName?.toLowerCase().trim().includes(lowerQuery);
		const cityMatch = member.city?.toLowerCase().trim().includes(lowerQuery);
		const professionMatch = member.profession?.toLowerCase().trim().includes(lowerQuery);
		return nameMatch || cityMatch || professionMatch;
	});
	const filteredBlogs = blogsArray.filter((blog) => {
		const titleMatch = blog.blogTitle?.toLowerCase().trim().includes(lowerQuery);
		const contentMatch = blog.blogDesc?.toLowerCase().trim().includes(lowerQuery);
		const authorMatch = blog.blogAuthor?.toLowerCase().trim().includes(lowerQuery);
		return titleMatch || contentMatch || authorMatch;
	});

	const staticPages = [
		{ title: "About Us", href: "/about-us", keywords: ["about", "school", "history", "mission", "vision", "values"] },
		{ title: "Our Team", href: "/team", keywords: ["team", "staff", "member"] },
		{ title: "Contact Us", href: "/contact", keywords: ["contact", "reach", "email", "phone", "address", "location"] },
		{ title: "Gallery", href: "/gallery", keywords: ["gallery", "photos", "images", "pictures"] },
	];

	const matchedPages = staticPages.filter((page) => {
		const titleMatch = page.title.toLowerCase().includes(lowerQuery);
		const keywordMatch = page.keywords.some((keyword) => lowerQuery.includes(keyword) || keyword.includes(lowerQuery));
		return titleMatch || keywordMatch;
	});

	const allResults = [
		...filteredEvents.map((item) => ({
			type: "Event",
			_id: item._id,
			title: item.eventname,
			description: item.eventdescription,
			image: item.eventposterUrl,
			url: `/en/notices/${item._id}`,
			date: item.eventdate,
			meta: item.eventvenue,
		})),
		...filteredGallery.map((item) => ({
			type: "Gallery",
			_id: item._id,
			title: item.title,
			description: item.description,
			image: item.imageUrl || item.media,
			url: `/en/gallery`,
			date: item.date,
			meta: item.category,
		})),
		...filteredNotices.map((item) => ({
			type: "Notice",
			_id: item._id,
			title: item.noticetitle,
			description: item.notice,
			image: item.noticeimage,
			url: `/en/notices/${item._id}`,
			date: item.noticedate,
			meta: item.classGroup,
		})),
		...filteredMembers.map((item) => ({
			type: "Member",
			_id: item._id,
			title: item.fullName,
			description: item.profession || item.membershipType,
			image: item.profilePhoto,
			url: `/en/membership/${item._id}`,
			date: item.createdAt,
			meta: `${item.city}, ${item.province || ""}`.trim(),
		})),
		...filteredBlogs.map((item) => ({
			type: "Blog",
			_id: item._id,
			title: item.blogTitle,
			description: item.blogDesc,
			image: item.blogMainPicture,
			url: `/en/blogs/${item._id}`,
			date: item.blogDate,
			meta: item.blogAuthor,
		})),
		...matchedPages.map((item) => ({
			type: "Page",
			_id: item.href,
			title: item.title,
			description: "Static page",
			image: null,
			url: item.href,
			date: null,
			meta: null,
		})),
	];
	const totalResults = allResults.length;

	return (
		<div className="mx-6 md:mx-12 pt-12 max-w-6xl">
			<div className="mx-auto">
				{/* Search Bar - Always visible */}
				<SearchBar initialQuery={query} />
			</div>
			{/* Search Header */}
			{totalResults !== 0 && (
				<div className="mb-8">
					<h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t("resultsTitle")}</h1>
					<p className="text-gray-600 text-lg">{t("resultsFound", { count: totalResults, query })}</p>
				</div>
			)}

			{totalResults === 0 ? (
				<div className="text-center py-20">
					<Search className="mx-auto h-16 w-16 text-gray-400 mb-4" />
					<h2 className="text-2xl font-semibold text-gray-700 mb-2">{t("noResults")}</h2>
					<p className="text-gray-600">{t("tryDifferentKeywords")}</p>
				</div>
			) : (
				<SearchResultsClient results={allResults} query={query} />
			)}
		</div>
	);
}

export default async function SearchPage({ searchParams }) {
	const params = typeof searchParams.then === "function" ? await searchParams : searchParams;
	const query = params.q || "";
	if (!query) {
		return (
			<div className="min-h-screen bg-gray-50 py-12">
				<div className="container mx-auto px-4">
					<div className="text-center">No search query provided.</div>
				</div>
			</div>
		);
	}
	return <>{await SearchContent({ query })}</>;
}

// GalleryWrapper is a client component that dynamically loads GalleryClient
// This avoids the ssr: false error in server components
// File: GalleryWrapper.jsx
// ---
// "use client";
// import dynamic from "next/dynamic";
// const GalleryClient = dynamic(() => import("./GalleryClient"), { ssr: false });
// export default function GalleryWrapper({ images }) {
//   return <GalleryClient images={images} />;
// }

export default async function Gallery() {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
	const res = await fetch(`${baseUrl}/api/gallery`, { cache: "no-store" });
	const data = await res.json();
	const gallery = data.gallery || [];
	const images = gallery.flatMap((item) => (item.media || []).map((src) => ({ src, alt: item.alt || "Gallery image" })));

	// Import GalleryWrapper as a client component
	const GalleryWrapper = (await import("./GalleryWrapper")).default;
	return (
		<section className="container mx-auto px-4 py-8 md:py-12">
			<h2 className="text-3xl text-center font-bold mb-6">
				Photo <span className="mx-auto text-brand">Gallery</span>
			</h2>
			<div className="w-24 h-1 mx-auto bg-brand mb-6 md:mb-12 rounded-full"></div>
			<GalleryWrapper images={images} />
		</section>
	);
}

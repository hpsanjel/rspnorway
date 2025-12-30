"use client";
import React, { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Zoom } from "yet-another-react-lightbox/plugins";
import Image from "next/image";

// Fetch gallery data from API
const fetchGallery = async () => {
	const res = await fetch("/api/gallery");
	const data = await res.json();
	return data.gallery || [];
};

// Helper: Generate a unique, irregular grid pattern
const irregularGrid = [
	"row-span-2 col-span-2", // big
	"row-span-1 col-span-1", // small
	"row-span-2 col-span-1", // tall
	"row-span-1 col-span-2", // wide
	"row-span-1 col-span-1", // small
	"row-span-2 col-span-1", // tall
	"row-span-1 col-span-2", // wide
	"row-span-1 col-span-1", // small
];

export default function Gallery() {
	const [images, setImages] = useState([]);
	const [open, setOpen] = useState(false);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		fetchGallery().then((gallery) => {
			// Flatten all media arrays into a single array of {src, alt}
			const allImages = gallery.flatMap((item) => (item.media || []).map((src) => ({ src, alt: item.alt || "Gallery image" })));
			setImages(allImages);
		});
	}, []);

	return (
		// <div className="w-full bg-gradient-to-br from-slate-100 to-slate-300 p-2 sm:p-8">
		<section className="container mx-auto px-4 py-12 md:py-16 mb-8">
			<h2 className="text-3xl text-center font-bold mb-6">
				Photo <span className="mx-auto text-[#0094da]">Gallery</span>
			</h2>
			<div className="w-24 h-1 mx-auto bg-[#0094da] mb-6 md:mb-12 rounded-full"></div>
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 auto-rows-[120px] sm:auto-rows-[180px]" style={{ gridAutoFlow: "dense" }}>
				{images.map((img, i) => (
					<div
						key={i}
						className={`relative overflow-hidden rounded-lg shadow-lg cursor-pointer group transition-all duration-300 hover:scale-105 ${irregularGrid[i % irregularGrid.length]}`}
						onClick={() => {
							setIndex(i);
							setOpen(true);
						}}
					>
						<Image src={img.src} alt={img.alt} className="w-full h-full object-cover object-center group-hover:brightness-75 transition-all duration-300" loading="lazy" />
						<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
							<span className="text-white text-lg font-semibold">Zoom</span>
						</div>
					</div>
				))}
			</div>
			<Lightbox
				open={open}
				close={() => setOpen(false)}
				slides={images}
				index={index}
				plugins={[Zoom]}
				animation={{ fade: 300 }}
				render={{
					buttonPrev: undefined,
					buttonNext: undefined,
				}}
			/>
		</section>
	);
}

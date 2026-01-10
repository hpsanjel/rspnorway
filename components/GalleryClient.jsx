"use client";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Zoom } from "yet-another-react-lightbox/plugins";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function GalleryClient({ images }) {
	const [open, setOpen] = useState(false);
	const [index, setIndex] = useState(0);
	const t = useTranslations("gallery");

	return (
		<>
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
				{images.map((img, i) => (
					<div
						key={i}
						className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group transition-all duration-300 hover:scale-105 aspect-[4/3]"
						onClick={() => {
							setIndex(i);
							setOpen(true);
						}}
					>
						<Image src={img.src} alt={img.alt} width={200} height={200} className="w-full h-full object-cover object-center group-hover:brightness-75 transition-all duration-300" loading="lazy" />
						<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
							<span className="text-white text-lg font-semibold">{t("zoom_in")}</span>
						</div>
					</div>
				))}
			</div>
			<Lightbox open={open} close={() => setOpen(false)} slides={images} index={index} plugins={[Zoom]} animation={{ fade: 300 }} />
		</>
	);
}

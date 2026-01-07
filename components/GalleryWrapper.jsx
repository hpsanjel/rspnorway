"use client";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const GalleryClient = dynamic(() => import("./GalleryClient"), { ssr: false });

export default function GalleryWrapper({ images }) {
	const t = useTranslations("gallery");
	return (
		<div>
			<h2 className="text-3xl text-center font-bold mb-6">
				{t("title").split(" ")[0]} <span className="mx-auto text-brand">{t("title").split(" ")[1]}</span>
			</h2>
			<div className="w-24 h-1 mx-auto bg-brand mb-6 md:mb-12 rounded-full"></div>
			<GalleryClient images={images} />;
		</div>
	);
}

"use client";
import { MapPin, Mail, Phone, Facebook, Instagram } from "lucide-react";
import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Footer() {
	const { data: settings } = useFetchData("/api/settings", "settings");
	const t = useTranslations("footer");
	return (
		<footer className="bg-gradient-to-t to-blue-50 from-transparent text-black py-4">
			{/* Main Footer Content */}
			<div className="container mx-auto p-6">
				{/* Four Column Layout */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-6">
					{/* About Column */}
					<div className="space-y-4">
						<h3 className="text-xl font-semibold relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-brand">{t("about_us")}</h3>
						<p className="leading-relaxed">{t("about_description")}</p>
					</div>
					{/* Logo and Tagline */}
					<div className="flex flex-col w-full justify-center">
						<div className="flex flex-col w-full justify-center items-start md:items-center">
							<Image src={settings?.[0]?.companyLogo || "/rsp-norway-logo.png"} alt={t("logo_alt")} width={100} height={100} className="rounded-lg shadow-xl w-24 object-cover mb-4" />
							<h2 className="text-2xl font-bold text-center">{t("logo_head")}</h2>
							<p className="text-center max-w-md">{t("tagline")}</p>
							{/* <h2 className="text-2xl font-bold text-center">{settings?.[0]?.name}</h2> */}
						</div>
					</div>

					{/* Contact Column */}
					<div className="space-y-8">
						<h3 className="text-xl font-semibold relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-brand">{t("contact_details")}</h3>
						<div className="space-y-3">
							<div className="flex items-start space-x-3 group">
								<MapPin className="h-5 w-5 text-brand mt-1 flex-shrink-0 group-hover:text-black" />
								<p className=" hover:text-brand transition-colors">{t("address")}</p>
								{/* <p className=" hover:text-brand transition-colors">{settings?.[0]?.address}</p> */}
							</div>

							<div className="flex items-center space-x-3 group">
								<Mail className="h-5 w-5 text-brand flex-shrink-0 group-hover:text-black" />
								<a href={`mailto:${settings?.[0]?.email}`} className=" hover:text-brand transition-colors">
									{settings?.[0]?.email}
								</a>
							</div>

							<div className="flex items-center space-x-3 group">
								<Phone className="h-5 w-5 text-brand flex-shrink-0 group-hover:text-black" />
								<a href="#" className=" hover:text-brand transition-colors">
									{t("phone")}
								</a>
								{/* <a href={`tel:${settings?.[0]?.phone}`} className=" hover:text-brand transition-colors">
									{settings?.[0]?.phone}
								</a> */}
							</div>
							<div className="flex items-center space-x-3 group">
								<Facebook className="h-5 w-5 text-brand flex-shrink-0 group-hover:text-black" />
								<a href={settings?.[0]?.facebook} target="_blank" rel="noopener noreferrer" className=" hover:text-brand transition-colors underline" aria-label="Facebook">
									{t("facebook")}
								</a>
							</div>
							<div className="flex items-center space-x-3 group">
								<Instagram className="h-5 w-5 text-brand flex-shrink-0 group-hover:text-black" />
								<a href={settings?.[0]?.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-brand group-hover:text-brand transition-colors underline" aria-label="Instagram">
									{t("instagram")}
								</a>
							</div>
						</div>
					</div>
				</div>

				{/* Links Row */}
				<nav className=" flex flex-col md:flex-row md:justify-between border-t border-gray-200 pt-1">
					<ul className="flex space-x-4 justify-between mb-4 md:mb-0">
						<li className="text-gray-500 hover:text-black transition-colors text-sm">
							<Link href="/terms-and-conditions">{t("terms")}</Link>
						</li>
						<li className="text-gray-500 hover:text-black transition-colors text-sm">
							<Link href="/privacy-policy">{t("privacy")}</Link>
						</li>
					</ul>
					<div className=" text-gray-500 text-sm">{t("copyright", { year: new Date().getFullYear() })}</div>
					<div className="text-gray-500 text-sm">
						<span>{t("developed_by")}</span>
						<a href="https://harisanjel.com.np" target="_blank" rel="noopener noreferrer" className="font-semibold ml-1">
							{t("developer")}
						</a>
					</div>
				</nav>
			</div>
		</footer>
	);
}

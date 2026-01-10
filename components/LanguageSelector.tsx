import React, { useEffect, useRef, useState } from "react";
import Flag from "@/components/ui/Flag";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

const LANGUAGES: { code: string; flag: "np" | "no" | "gb"; label: string }[] = [
	{ code: "ne", flag: "np", label: "नेपाली" },
	{ code: "no", flag: "no", label: "Norsk" },
	{ code: "en", flag: "gb", label: "English" },
];

const LanguageSelector = () => {
	const langRef = useRef<HTMLDivElement>(null);
	const [showLangDropdown, setShowLangDropdown] = useState(false);
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		const close = (e: MouseEvent) => {
			if (!langRef.current?.contains(e.target as Node)) {
				setShowLangDropdown(false);
			}
		};
		document.addEventListener("mousedown", close);
		return () => document.removeEventListener("mousedown", close);
	}, []);

	const handleLocaleChange = (code: string) => {
		if (code === locale) return;
		localStorage.setItem("locale", code);
		setShowLangDropdown(false);
		router.replace(pathname, { locale: code });
	};

	return (
		<div ref={langRef} className="relative">
			<button
				onClick={() => setShowLangDropdown((v) => !v)}
				aria-label="Select language"
				aria-expanded={showLangDropdown}
				className={`
                  flex items-center gap-2 rounded-lg border px-3 py-1.5 
                  font-medium text-sm transition-all duration-200
                  hover:scale-105 active:scale-95
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2
                  bg-white}
                `}
			>
				<Flag country={LANGUAGES.find((l) => l.code === locale)?.flag as "no" | "np" | "gb"} size={20} />
				<ChevronDown size={14} className={`transition-transform duration-300 ${showLangDropdown ? "rotate-180" : ""}`} />
			</button>
			<AnimatePresence>
				{showLangDropdown && (
					<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="absolute right-0 mt-2 w-36 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] ring-1 ring-black/5 overflow-hidden z-[9999]">
						{LANGUAGES.map((l, idx) => (
							<button
								key={l.code}
								onClick={() => handleLocaleChange(l.code)}
								className={`
                          flex w-full items-center gap-3 px-4 py-3 
                          hover:bg-brand/5 transition-all duration-200
                          font-medium text-sm text-neutral-700 hover:text-brand
                          ${idx !== 0 ? "border-t border-neutral-100" : ""}
                          ${l.code === locale ? "bg-brand/5 text-brand" : ""}
                        `}
							>
								<Flag country={l.flag} size={20} />
								{l.label}
							</button>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default LanguageSelector;

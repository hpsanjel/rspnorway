import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

export default function SearchModal({ closeModal, placeholder }) {
	const [searchQuery, setSearchQuery] = useState("");
	const searchInputRef = useRef(null);
	const router = useRouter();

	useEffect(() => {
		if (searchInputRef.current) {
			searchInputRef.current.focus();
		}
	}, []);

	const handleSearch = (e) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			closeModal();
			router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
		}
	};

	return (
		<div className="w-full flex items-center justify-center bg-white border-b border-blue-300 shadow transition-all duration-300 px-4 py-4 md:py-6 z-40">
			<form onSubmit={handleSearch} className="flex items-center w-full max-w-2xl gap-2 md:gap-4">
				<input type="text" ref={searchInputRef} className="flex-1 border border-blue-200 rounded-md px-4 py-2 md:py-3 text-lg md:text-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50" placeholder={placeholder} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} required />
				<button type="submit" className="bg-brand rounded-md p-2 md:p-3 flex items-center justify-center hover:bg-blue-700 transition-colors">
					<Search className="text-white w-6 h-6 md:w-8 md:h-8" />
				</button>
				<button type="button" onClick={closeModal} className="ml-2 text-gray-400 hover:text-blue-700 transition-colors">
					<X className="w-6 h-6 md:w-8 md:h-8" />
				</button>
			</form>
		</div>
	);
}

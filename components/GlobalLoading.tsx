"use client";

export default function GlobalLoading() {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
			<div className="relative">
				{/* Outer Circle - Clockwise */}
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="w-24 h-24 rounded-full border-2 border-transparent border-r-brand animate-spin-slow"></div>
				</div>

				{/* Inner Circle - Counter-clockwise */}
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="w-20 h-20 rounded-full border-2 border-transparent border-b-brand animate-spin-reverse"></div>
				</div>

				{/* Logo Container */}
				<div className="relative w-32 h-32 flex items-center justify-center">
					<div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
						<img src="/ghanti.png" alt="Logo" width={48} height={48} className="object-contain" />
					</div>
				</div>
			</div>

			{/* Optional Loading Text */}
			<div className="absolute bottom-1/3 text-center">
				<p className="text-gray-600 font-medium animate-pulse">Loading...</p>
			</div>
		</div>
	);
}

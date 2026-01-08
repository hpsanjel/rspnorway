import Gallery from "@/components/Gallery";
import GlobalLoading from "@/components/GlobalLoading";
import React, { Suspense } from "react";

const page = () => {
	return (
		<div className="min-h-screen pt-24 md:pt-32">
			<Suspense fallback={<GlobalLoading />}>
				<Gallery />
			</Suspense>
		</div>
	);
};
export default page;

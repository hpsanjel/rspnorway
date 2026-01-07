"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import HomeVideo from "./HomeVideo";

export default function About() {
	return (
		<section id="about" className="md:my-20 flex items-center justify-center">
			{/* Content container */}
			<div className="container mx-auto flex flex-col md:flex-row relative z-10">
				<motion.div className="mx-auto bg-blue-50 overflow-hidden" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
					{/* Content with padding */}
					<div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center py-6 md:py-0">
						<div className="px-6 py-4 md:px-12">
							<h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 ">
								Welcome to
								<span className="text-brand mt-1"> RSP Norway</span>
							</h2>

							<div className="space-y-4 text-gray-700">
								<p className="text-lg">राज्यका कुनै पनि तहका निर्वाचनमा पार्टीका तर्फबाट उम्मेदवारी टिकट पार्टीका साधारण सदस्यहरुको मतदानबाट विजयी हुनेलाई मात्र दिइने छ । यस्ता मतदानमा विदेशमा रहेका नेपालीहरुले पनि मतदान गरी उम्मेदवार छान्न पाउने छन् । पार्टीका तर्फबाट हुने प्रधानमन्त्री, मुख्यमन्त्री पनि पार्टीकै साधारण सदस्यको मतबाट छानिने छ । यस्तै समानुपातिक निर्वाचन प्रणालीमा पनि साधारण सदस्यको मतदानबाट नामावली र क्रम संख्या तयार पारिनेछ । तर, कुनै पनि बहानामा कसैलाई ‘टीका’ लगाएर उम्मेदवारको टिकट भने दिइने छैन ।</p>
							</div>

							<div className="my-4">
								<Link href="message-from-rsp">
									<Button className="bg-brand text-white px-6 py-3 rounded transition-colors duration-300 inline-flex items-center group">
										Read More
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
										</svg>
									</Button>
								</Link>
							</div>
						</div>
						<div className="px-6 md:px-0 w-auto md:h-auto">
							<HomeVideo />
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}

import Hero from "@/components/Hero";
import About from "@/components/About";
import Circulars from "@/components/Circulars";
import Gallery from "@/components/Gallery";
// import Post from "@/components/Post";

export default function LandingPage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
			<main>
				<Hero />
				{/* <Post /> */}
				<About />
				<Circulars />
				<Gallery />
			</main>
		</div>
	);
}

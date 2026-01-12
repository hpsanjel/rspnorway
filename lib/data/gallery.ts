import connectDB from "@/lib/mongodb";
import Gallery from "@/models/Setting.Model";

export async function getGallery() {
	await connectDB();
	return Gallery.find().lean();
}

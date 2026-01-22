import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import connectDB from "@/lib/mongodb";
import Membership from "@/models/Membership.Model";
import { uploadToCloudinary, deleteFromCloudinary } from "@/utils/saveFileToCloudinaryUtils";

export async function POST(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		if (!session || !session.user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		await connectDB();

		const formData = await req.formData();
		const file = formData.get("photo") as File;

		if (!file) {
			return NextResponse.json({ error: "No file provided" }, { status: 400 });
		}

		console.log("File received:", { name: file.name, size: file.size, type: file.type });

		// Validate file type
		if (!file.type.startsWith("image/")) {
			return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
		}

		// Validate file size (max 300KB)
		if (file.size > 300 * 1024) {
			return NextResponse.json({ error: "File size must be less than 300KB" }, { status: 400 });
		}

		console.log("Starting Cloudinary upload...");

		// Get existing membership to retrieve old photo URL
		const existingMembership = await Membership.findOne({ email: session.user.email });
		if (!existingMembership) {
			console.error("Membership not found for email:", session.user.email);
			return NextResponse.json({ error: "Membership not found" }, { status: 404 });
		}

		const oldPhotoUrl = existingMembership.profilePhoto;

		// Upload new photo to Cloudinary
		const photoUrl = await uploadToCloudinary(file, "profile-photos");
		console.log("Cloudinary upload successful:", photoUrl);

		// Update membership's profile photo in database
		console.log("Updating membership for email:", session.user.email);
		const membership = await Membership.findOneAndUpdate({ email: session.user.email }, { profilePhoto: photoUrl }, { new: true });

		if (!membership) {
			console.error("Membership not found for email:", session.user.email);
			return NextResponse.json({ error: "Membership not found" }, { status: 404 });
		}

		// Delete old photo from Cloudinary if it exists
		if (oldPhotoUrl) {
			try {
				console.log("Deleting old photo from Cloudinary:", oldPhotoUrl);
				await deleteFromCloudinary(oldPhotoUrl, "image");
				console.log("Old photo deleted successfully");
			} catch (deleteError) {
				console.error("Error deleting old photo from Cloudinary:", deleteError);
				// Don't fail the request if deletion fails - the new photo is already uploaded
			}
		}

		console.log("Membership updated successfully");
		return NextResponse.json({
			success: true,
			profilePhoto: photoUrl,
		});
	} catch (error: unknown) {
		console.error("Error uploading profile photo:", error);
		return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to upload photo" }, { status: 500 });
	}
}

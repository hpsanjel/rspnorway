import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Membership from "@/models/Membership.Model";
import User from "@/models/User.Model";
import crypto from "crypto";
import { sendWelcomeEmail } from "@/lib/email";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
	const { id } = await context.params;

	await connectDB();

	const membership = await Membership.findById(id);

	if (!membership) {
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	}

	return NextResponse.json(membership);
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
	const { id } = await context.params;
	await connectDB();
	const data = await req.json();

	// Find the membership before update to check status change
	const existingMembership = await Membership.findById(id);
	if (!existingMembership) {
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	}

	const membership = await Membership.findByIdAndUpdate(id, data, { new: true });

	// If membership is being approved for the first time
	if (data.membershipStatus === "approved" && existingMembership.membershipStatus !== "approved") {
		try {
			// Check if user already exists
			const existingUser = await User.findOne({ email: membership.email });

			if (!existingUser) {
				// Generate setup token
				const setupToken = crypto.randomBytes(32).toString("hex");
				const setupTokenExpiry = Date.now() + 1000 * 60 * 60 * 24; // 24 hours

				// Create username from email
				const userName = membership.email.split("@")[0];

				// Create new user account
				await User.create({
					fullName: membership.fullName,
					email: membership.email,
					userName: userName,
					phone: membership.phone,
					role: "user",
					setupToken: setupToken,
					setupTokenExpiry: setupTokenExpiry,
				});

				// Send welcome email with password setup link
				await sendWelcomeEmail({
					name: membership.fullName,
					email: membership.email,
					setupToken: setupToken,
				});

				console.log("User created and welcome email sent for:", membership.email);
			} else {
				console.log("User already exists:", membership.email);
			}
		} catch (error: unknown) {
			console.error("Error creating user or sending email:", error);
			// Don't fail the membership approval if email fails
		}
	}

	return NextResponse.json(membership);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
	const { id } = await context.params;
	await connectDB();
	const membership = await Membership.findByIdAndDelete(id);
	if (!membership) return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json({ message: "Deleted successfully" });
}

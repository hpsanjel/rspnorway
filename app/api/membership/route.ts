import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Membership from "@/models/Membership.Model";

export async function GET() {
	await connectDB();
	const memberships = await Membership.find().sort({ createdAt: -1 });
	return NextResponse.json(memberships);
}

export async function POST(req: NextRequest) {
	await connectDB();
	const data = await req.json();
	const membership = await Membership.create(data);
	return NextResponse.json(membership, { status: 201 });
}

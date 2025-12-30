import mongoose from "mongoose";

const MembershipSchema = new mongoose.Schema({
	fullName: { type: String, required: true },
	email: { type: String, required: true },
	phone: { type: String, required: true },
	address: { type: String, required: true },
	city: { type: String, required: true },
	postalCode: { type: String, required: true },
	dateOfBirth: { type: String, required: true },
	gender: { type: String, required: true },
	nepaliOrigin: { type: String },
	profession: { type: String },
	membershipType: { type: String, enum: ["general", "active"], required: true },
	skills: { type: String },
	volunteerInterest: { type: [String], default: [] },
	agreeTerms: { type: Boolean, required: true },
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Membership || mongoose.model("Membership", MembershipSchema);

import mongoose from "mongoose";
const DownloadSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		date: {
			type: String,
			required: true,
		},
		fileUrl: {
			type: String,
			required: true,
		},
		imageUrl: {
			type: String,
			default: "",
		},
		category: {
			type: String,
			required: true,
			trim: true,
		},
		fileSize: {
			type: Number,
			validate: {
				validator: function (v) {
					// 2MB = 2 * 1024 * 1024 bytes
					return v <= 2 * 1024 * 1024;
				},
				message: "File size should not exceed 2MB",
			},
		},
		imageSize: {
			type: Number,
			validate: {
				validator: function (v) {
					// 1MB = 1 * 1024 * 1024 bytes
					return v === undefined || v <= 1 * 1024 * 1024;
				},
				message: "Image size should not exceed 1MB",
			},
		},
		downloadCount: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.models.Download || mongoose.model("Download", DownloadSchema);

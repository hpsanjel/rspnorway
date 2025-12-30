// Contact form email sender

type sendContactEmail = {
	name: string;
	email: string;
	message: string;
};
export async function sendContactEmail({ name, email, message }: sendContactEmail) {
	const mailOptions = {
		from: `"Contact Form" <${process.env.EMAIL_USER}>`,
		to: process.env.EMAIL_USER,
		subject: `New Contact Form Submission from ${name}`,
		text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
		html: `
			<h2>New Contact Form Submission</h2>
			<p><strong>Name:</strong> ${name}</p>
			<p><strong>Email:</strong> ${email}</p>
			<p><strong>Message:</strong></p>
			<div style="background:#f9f9f9;padding:16px;border-radius:8px;border:1px solid #eee;">${message.replace(/\n/g, "<br/>")}</div>
		`,
	};
	try {
		await transporter.sendMail(mailOptions);
		console.log("Contact form email sent");
	} catch (error) {
		console.error("Error sending contact form email:", error);
		throw new Error("Failed to send contact form email");
	}
}
import nodemailer from "nodemailer";

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_APP_PASS,
	},
});

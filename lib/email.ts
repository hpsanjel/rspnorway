import nodemailer from "nodemailer";

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_APP_PASS,
	},
});

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

// Welcome email with password setup link
type sendWelcomeEmail = {
	name: string;
	email: string;
	setupToken: string;
};
export async function sendWelcomeEmail({ name, email, setupToken }: sendWelcomeEmail) {
	const setupUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/en/set-password?token=${setupToken}`;

	const mailOptions = {
		from: `"RSP Norway" <${process.env.EMAIL_USER}>`,
		to: email,
		subject: "Welcome to RSP Norway - Set Your Password",
		text: `Hello ${name},\n\nWelcome to RSP Norway! Your membership has been approved.\n\nPlease set your password by clicking the link below:\n${setupUrl}\n\nThis link is valid for 24 hours.\n\nBest regards,\nRSP Norway Team`,
		html: `
			<!DOCTYPE html>
			<html>
			<head>
				<style>
					body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
					.container { max-width: 600px; margin: 0 auto; padding: 20px; }
					.header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
					.content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
					.button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
					.footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
				</style>
			</head>
			<body>
				<div class="container">
					<div class="header">
						<h1>Welcome to RSP Norway!</h1>
					</div>
					<div class="content">
						<p>Hello <strong>${name}</strong>,</p>
						<p>Congratulations! Your membership application has been approved. We're excited to have you as part of the RSP Norway community.</p>
						<p>To complete your account setup, please set your password by clicking the button below:</p>
						<center>
							<a href="${setupUrl}" class="button">Set Your Password</a>
						</center>
						<p>Or copy and paste this link in your browser:</p>
						<p style="background: white; padding: 10px; border-radius: 5px; word-break: break-all;">${setupUrl}</p>
						<p><strong>Note:</strong> This link is valid for 24 hours. If it expires, please contact our support team.</p>
						<p>Once you've set your password, you'll be able to:</p>
						<ul>
							<li>Access your member dashboard</li>
							<li>Update your profile information</li>
							<li>Participate in member-only events</li>
							<li>Stay connected with the community</li>
						</ul>
						<p>If you have any questions, feel free to reach out to us.</p>
						<p>Best regards,<br><strong>RSP Norway Team</strong></p>
					</div>
					<div class="footer">
						<p>This is an automated email. Please do not reply to this message.</p>
					</div>
				</div>
			</body>
			</html>
		`,
	};

	try {
		await transporter.sendMail(mailOptions);
		console.log("Welcome email sent to:", email);
	} catch (error) {
		console.error("Error sending welcome email:", error);
		throw new Error("Failed to send welcome email");
	}
}

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/models/User.Model";
import ConnectDB from "@/lib/mongodb";
import NextAuth from "next-auth";

/** @type {import('next-auth').AuthOptions} */
export const authOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			id: "credentials",
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				console.log("Authorize called with credentials:", credentials);

				await ConnectDB();

				try {
					const user = await User.findOne({ email: credentials.email });
					if (!user) {
						console.log("No user found with this email");
						throw new Error("No user found with this email");
					}
					// if (!user.isVerified) {
					// 	console.log("Verify first");
					// 	throw new Error("PLease verify your email first");
					// }

					// const isValid = credentials.password === user.password;
					const isValid = await bcrypt.compare(credentials.password, user.password);
					if (!isValid) {
						console.log("Invalid password");
						throw new Error("Invalid credentials");
					}

					return user;
				} catch (error) {
					throw new Error(error.message);
				}
			},
		}),
	],
	pages: {
		signIn: "/login",
		signOut: "/logout",
		error: "/error",
		verifyRequest: "/verify-request",
		newUser: null,
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token._id = user._id;
				token.isVerified = user.isVerified;
				token.isAcceptingMessages = user.isAcceptingMessages;
				token.username = user.username;
				token.fullName = user.fullName;
				token.role = user.role;
				token.phone = user.phone;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user = {
					_id: token._id,
					email: token.email,
					isVerified: token.isVerified,
					isAcceptingMessages: token.isAcceptingMessages,
					username: token.username,
					fullName: token.fullName,
					role: token.role,
					phone: token.phone,
				};
			}

			return session;
		},
		async redirect({ url, baseUrl }) {
			// Allows relative callback URLs
			if (url.startsWith("/")) return `${baseUrl}${url}`;
			// Allows callback URLs on the same origin
			else if (new URL(url).origin === baseUrl) return url;
			return baseUrl;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
};

export const { GET, POST } = NextAuth(authOptions);

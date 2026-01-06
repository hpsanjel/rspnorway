import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import ClientLayout from "./ClientLayout";
import { LoadingProvider } from "@/context/LoadingContext";
import { NextIntlClientProvider } from "next-intl";
import LoadingWrapperClient from "./LoadingWrapper.client";
import Header from "@/components/Header";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ClientLayout>
					<NextIntlClientProvider>
						<LoadingProvider>
							<Header />
							<LoadingWrapperClient>{children}</LoadingWrapperClient>
							<Footer />
						</LoadingProvider>
					</NextIntlClientProvider>
				</ClientLayout>
			</body>
		</html>
	);
}

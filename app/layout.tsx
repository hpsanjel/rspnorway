"use client";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import { useState } from "react";
import Header from "@/components/Header";
import ClientLayout from "./ClientLayout";
import { LoadingProvider } from "@/context/LoadingContext";
import GlobalLoading from "@/components/GlobalLoading";
import { useLoading } from "@/context/LoadingContext";

function LoadingWrapper({ children }: { children: React.ReactNode }) {
	const { isLoading } = useLoading();

	return (
		<>
			{isLoading && <GlobalLoading />}
			{children}
		</>
	);
}

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const toggleMenu = () => setIsMenuOpen((open) => !open);
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ClientLayout>
					<Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
					<LoadingProvider>
						<LoadingWrapper>{children}</LoadingWrapper>
						<Footer />
					</LoadingProvider>
				</ClientLayout>
			</body>
		</html>
	);
}

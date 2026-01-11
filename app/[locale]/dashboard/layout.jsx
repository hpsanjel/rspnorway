"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { menuItems } from "@/components/DashboardMenuItems.js";
import { useSession } from "next-auth/react";
import { ActiveMenuProvider, useActiveMenu } from "@/context/ActiveMenuContext";

function DashboardLayoutContent({ children }) {
	const { activeMenu } = useActiveMenu();
	const router = useRouter();
	const [profileOpen, setProfileOpen] = useState(false);
	const { data: session, status } = useSession();

	// Protect dashboard: redirect if not authenticated
	if (status === "loading") {
		return (
			<div className="flex flex-col space-y-6 items-center justify-center min-h-screen w-full">
				<div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-brand"></div>
				<div>Loading...</div>
			</div>
		);
	}
	if (!session) {
		router.replace("/en/login");
		return null;
	}

	return (
		<div
			className="flex flex-col pl-4 md:flex-row overflow-hidden"
			onClick={(e) => {
				if (profileOpen && !(e.target.closest && e.target.closest("#admin-profile-menu"))) {
					setProfileOpen(false);
				}
			}}
		>
			{/* Sidebar */}
			<div className="hidden my-12 md:flex w-48 h-auto bg-brand/20 flex-col shadow-lg">
				<nav className="overflow-y-hidden no-scrollbar">
					{menuItems.map((item) => {
						const Icon = item.icon;
						const isActive = activeMenu === item.id;
						return (
							<Link
								key={item.id}
								href={item.href}
								className={`w-full flex items-center px-4 py-4 text-sm transition-colors duration-200
									${isActive ? "bg-brand text-white font-semibold shadow border-l-2 border-black" : "text-black hover:text-brand hover:bg-gray-100"}
								`}
								style={isActive ? { boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.10)" } : {}}
							>
								<Icon className="w-5 h-5 mr-3 flex-shrink-0" />
								{item.label}
							</Link>
						);
					})}
				</nav>
			</div>

			{/* Content Area */}
			<main className="flex-1 mt-8 overflow-x-auto overflow-y-auto p-6 no-scrollbar">{children}</main>
			<Toaster />
		</div>
	);
}

export default function DashboardLayout({ children }) {
	return (
		<ActiveMenuProvider>
			<DashboardLayoutContent>{children}</DashboardLayoutContent>
		</ActiveMenuProvider>
	);
}

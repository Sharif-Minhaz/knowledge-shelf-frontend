import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { currentUser } from "@/lib/actions/auth.actions";

export const metadata: Metadata = {
	title: "Knowledge Shelf",
	description: "A books selling platform",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const userInfo = await currentUser();
	return (
		<main>
			<Navbar userInfo={userInfo} />
			<div className="mt-[64px]">{children}</div>
			<Footer />
		</main>
	);
}

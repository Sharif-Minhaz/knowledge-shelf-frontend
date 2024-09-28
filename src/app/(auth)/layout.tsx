import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
	title: "Knowledge Shelf | Auth",
	description: "A books selling platform",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <main>{children}</main>;
}

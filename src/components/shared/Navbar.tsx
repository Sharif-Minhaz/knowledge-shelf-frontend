"use client";

import Link from "next/link";
import { Home, Book } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import ProfileButton from "./ProfileButton";
import { TUser } from "../../../types";
import { JwtPayload } from "jwt-decode";

export default function Navbar({ userInfo }: { userInfo: TUser | JwtPayload | null | undefined }) {
	return (
		<header className="border-b bg-slate-50 fixed top-0 w-full shadow-sm z-50">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<div className="flex items-center space-x-4">
					<Link href="/">
						<Avatar>
							<AvatarImage src="/images/brand.png" alt="Brand Logo" />
							<AvatarFallback>BL</AvatarFallback>
						</Avatar>
					</Link>
					<NavigationMenu className="!ml-6">
						<NavigationMenuList>
							<NavigationMenuItem>
								<Link href="/" className={navigationMenuTriggerStyle()}>
									<Home className="mr-2 h-4 w-4" />
									Home
								</Link>
							</NavigationMenuItem>
							<NavigationMenuItem className="!ml-3">
								<Link href="/books" className={navigationMenuTriggerStyle()}>
									<Book className="mr-2 h-4 w-4" />
									Books
								</Link>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
				{/* profile button */}
				{userInfo ? (
					<ProfileButton userInfo={userInfo} />
				) : (
					<div>
						<Link
							href="/login"
							className="font-semibold hover:text-blue-500 transition-colors"
						>
							Login
						</Link>
					</div>
				)}
			</div>
		</header>
	);
}

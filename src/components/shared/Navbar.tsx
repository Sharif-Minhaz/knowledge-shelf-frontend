"use client";

import Link from "next/link";
import { Home, Book, User, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
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
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="relative h-8 w-8 rounded-full">
							<Avatar>
								<AvatarImage
									src="https://randomuser.me/api/portraits/men/3.jpg"
									alt="Profile"
								/>
								<AvatarFallback>U</AvatarFallback>
							</Avatar>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56" align="end" forceMount>
						<DropdownMenuItem>
							<User className="mr-2 h-4 w-4" />
							<span>View Profile</span>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<LogOut className="mr-2 h-4 w-4" />
							<span>Log out</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}

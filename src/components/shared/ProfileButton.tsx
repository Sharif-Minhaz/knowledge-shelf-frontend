import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TUser } from "../../../types";
import { JwtPayload } from "jwt-decode";
import Link from "next/link";
import { logout } from "@/lib/actions/auth.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ProfileButton({
	userInfo,
}: {
	userInfo: TUser | JwtPayload | null | undefined;
}) {
	const router = useRouter();

	const handleLogout = async () => {
		const res = await logout();
		if (res?.success) {
			toast.success("Logout successful");
			router.replace("/");
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar>
						<AvatarImage
							src={
								(userInfo as TUser)?.avatar
									? (userInfo as TUser).avatar
									: "https://randomuser.me/api/portraits/men/3.jpg"
							}
							alt={(userInfo as TUser)?.fullName || "User Avatar"}
						/>
						<AvatarFallback>U</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<div className="px-3 pt-2 pb-1">{(userInfo as TUser)?.fullName}</div>
				<div className="px-3 pb-2">Role: {(userInfo as TUser)?.role}</div>
				<hr />
				<Link href="/profile" className="flex items-center w-full mt-2">
					<DropdownMenuItem className="w-full cursor-pointer">
						<User className="mr-2 h-4 w-4" />
						<span>View Profile</span>
					</DropdownMenuItem>
				</Link>
				<DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
					<LogOut className="mr-2 h-4 w-4" />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

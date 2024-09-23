import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="w-full h-[calc(100vh-80px)] flex justify-center items-center">
			<div className="w-full text-center flex flex-col gap-3 justify-center items-center">
				<h2 className="text-5xl font-semibold">Not Found</h2>
				<p className="text-[20px]">Could not find requested resource</p>
				<Link href="/">
					<Button>Return Home</Button>
				</Link>
			</div>
		</div>
	);
}

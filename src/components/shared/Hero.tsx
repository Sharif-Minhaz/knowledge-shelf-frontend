import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import hero from "@/images/hero.jpg";
import Link from "next/link";

export default function Hero() {
	return (
		<section className="overflow-hidden bg-gradient-to-b from-blue-50 to-white py-12 sm:py-16 lg:py-20">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
					<div className="space-y-8 max-w-xl">
						<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
							Discover Your Next{" "}
							<span className="text-blue-600">Literary Adventure</span>
						</h1>
						<p className="text-lg text-gray-600 sm:text-xl">
							Immerse yourself in our curated collection of bestsellers, hidden gems,
							and timeless classics. Your perfect read awaits.
						</p>
						<div className="flex flex-col sm:flex-row gap-4">
							<Link href="/books">
								<Button size="lg" className="w-full sm:w-auto">
									Explore Books
									<ChevronRight className="ml-2 h-4 w-4" />
								</Button>
							</Link>
							<Link href="/books">
								<Button size="lg" variant="outline" className="w-full sm:w-auto">
									View Categories
								</Button>
							</Link>
						</div>
					</div>
					<div className="relative lg:row-start-1 lg:col-start-2">
						<div className="aspect-w-4 aspect-h-5 rounded-2xl overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-all duration-300 relative z-10">
							<div>
								<Image src={hero} alt="Featured Books" className="object-cover" />
							</div>
						</div>
						<div className="absolute -bottom-8 -left-8 w-48 h-48 bg-blue-100 rounded-full z-0"></div>
						<div className="absolute -top-8 -right-8 w-32 h-32 bg-yellow-100 rounded-full z-0"></div>
					</div>
				</div>
			</div>
		</section>
	);
}

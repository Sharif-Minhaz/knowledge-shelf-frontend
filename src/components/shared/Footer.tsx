"use client";

import { Facebook, Instagram, Twitter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
	return (
		<footer className="bg-gray-900 text-gray-300">
			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					<div className="space-y-4">
						<h3 className="text-2xl font-bold text-white">KnowledgeShelf</h3>
						<p className="text-sm">
							Discover your next literary adventure with us. Quality books,
							competitive prices, and a passion for reading.
						</p>
						<div className="flex space-x-4">
							<a href="#" className="hover:text-white transition-colors">
								<Facebook size={20} />
								<span className="sr-only">Facebook</span>
							</a>
							<a href="#" className="hover:text-white transition-colors">
								<Instagram size={20} />
								<span className="sr-only">Instagram</span>
							</a>
							<a href="#" className="hover:text-white transition-colors">
								<Twitter size={20} />
								<span className="sr-only">Twitter</span>
							</a>
						</div>
					</div>
					<div>
						<h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
						<ul className="space-y-2">
							<li>
								<a href="#" className="hover:text-white transition-colors">
									Home
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-white transition-colors">
									Books
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-white transition-colors">
									Categories
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-white transition-colors">
									About Us
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-white transition-colors">
									Contact
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="text-lg font-semibold text-white mb-4">Customer Service</h4>
						<ul className="space-y-2">
							<li>
								<a href="#" className="hover:text-white transition-colors">
									FAQ
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-white transition-colors">
									Shipping & Returns
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-white transition-colors">
									Terms & Conditions
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-white transition-colors">
									Privacy Policy
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="text-lg font-semibold text-white mb-4">Newsletter</h4>
						<p className="text-sm mb-4">
							Stay updated with our latest releases and promotions.
						</p>
						<form onSubmit={(e) => e.preventDefault()} className="space-y-2">
							<Input
								type="email"
								placeholder="Enter your email"
								className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
							/>
							<Button
								type="submit"
								className="w-full bg-blue-600 hover:bg-blue-700 text-white"
							>
								Subscribe
							</Button>
						</form>
					</div>
				</div>
				<div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
					<p>&copy; {new Date().getFullYear()} KnowledgeShelf. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}

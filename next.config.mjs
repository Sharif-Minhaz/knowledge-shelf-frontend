/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "random.imagecdn.app",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "randomuser.me",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;

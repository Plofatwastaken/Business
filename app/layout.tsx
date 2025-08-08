import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "@/styles/globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800"],
	variable: "--font-montserrat",
})

export const metadata: Metadata = {
	title: "LUXURO - Premium Affiliate Marketplace",
	description: "Discover the best product deals in one place",
	designer: 'Oxy/Sethil'
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className={montserrat.variable}>
			<body className="font-montserrat bg-slate-950 text-white antialiased">
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	)
}

import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AiAssistant from "@/components/ai/AiAssistant";
import WebsiteRegisterTab from "@/components/layout/WebsiteRegisterTab";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Auto Garage Network | Garage Management Software & Websites",
  description: "Advanced website design, SEO, and Garage Management Software tailored exclusively for premium independent garages, MOT centres, and workshops in the UK.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />

        {children}

        <WebsiteRegisterTab />

        <AiAssistant />

        <Footer />
      </body>
    </html>
  );
}

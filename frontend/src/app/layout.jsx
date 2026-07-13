import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AiAssistant from "@/components/ai/AiAssistant";
import WebsiteRegisterTab from "@/components/layout/WebsiteRegisterTab";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <Navbar />

        {children}
        
        <WebsiteRegisterTab />
        
        <AiAssistant />
        
        <Footer />

      </body>
    </html>
  );
}
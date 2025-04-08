import Navbar from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-base-200 text-base-content min-h-screen flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

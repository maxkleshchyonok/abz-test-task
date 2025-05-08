import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "./components/header/Header";
import { ReactQueryProvider } from "./providers";

const nunito = Nunito({
  weight: ["400"],
  style: ["normal"],
  variable: "--font-nunito",
  display: "swap",
  subsets: ["latin"],
});

export const metadata = {
  title: "TestTask",
  description: "Test assignment for frontend developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} bg-[#F8F8F8] pb-20 antialiased`}>
        <ReactQueryProvider>
          <Header />
          <div>{children}</div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

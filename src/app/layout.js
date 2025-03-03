import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../../components/Footer";
import styles from "../../styles/Home.module.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Movie App",
  description: "cool awesome movie app",
};


export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={styles.container}
      >
        {children}
        <Footer />

        
      </body>
    </html>
  );
}

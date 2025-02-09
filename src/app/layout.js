import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../../components/Footer";
import styles from "../../styles/Home.module.css";
import axios from 'axios';


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


async function fetchData() {
  
 

  const options = {
    url: 'https://imdb236.p.rapidapi.com/imdb/top250-movies',
    method: "GET",
    headers: {
      'x-rapidapi-key': '0cea453a33msh4502e8811584130p136ef0jsnf29f9bfdebb6',
      'x-rapidapi-host': 'imdb236.p.rapidapi.com'
    }
  }

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }

}


export default async function RootLayout({ children }) {

  const data = await fetchData();
  console.log(data)

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

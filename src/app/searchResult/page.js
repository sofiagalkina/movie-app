import Footer from "../../../components/Footer";
import Image from "next/image";
// import styles from "../../../styles/Index.module.css"
import axios from "axios";
import { headers } from "next/headers";
import Button from "../../../components/Button"
import SearchBar from "../../../components/SearchBar";


export default function SearchResult () {


    return (
        <div className="text-white-500">
            <h1 className="text-white-500"> Result of the search:</h1>
        </div>
    )
}
"use client"; 
import React from "react";
import Image from "next/image";
import refreshIcon from "../images/refresh.png";
import { useRouter } from "next/navigation";
import { useAppStore} from "../store/store";
import axios from "axios";
// don't forget to import "useAppStore()" here 


const Button = ({text = "Get a movie", cn = ""}) => {
    
    const router = useRouter();
    const { items } = useAppStore();


    

    const getRandomMovie = () => {
       if(!items.length) return;

       const randomMovie = items[Math.floor(Math.random() * items.length)];
       const movieId = randomMovie.id;

       router.push(`/${movieId}`)

    }

    return(
        <div className={`update ${cn}`} onClick={getRandomMovie}>
            <Image className="icon" src={refreshIcon} alt="A Movie Button" width={14} height={14}></Image>
            <span>{text}</span>
        </div>
    )
}

export default Button;
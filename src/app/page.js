"use client";

import Image from "next/image";
import styles from "../../styles/Index.module.css"
import update from "../../images/refresh.png"
import Button from "../../components/Button";
import { useAppStore } from "../../store/store";
import { useEffect } from "react";

export default function Home() {

  const { items, setItems } = useAppStore();
  useEffect(() =>{
    console.log("Initial zustand state: ", items);
    setItems(["Movie1", "Movie2", "Movie3"]);
    console.log("Updates zustand state: ", useAppStore.getState().items);
  }, []);

  return (
   <div className={styles.wrap}>

      <div className={styles.image} /> 
      <h1 className={styles.title}>Welcome to Movie App</h1>
      <div className={styles.subtitle}>
          The best movie app in galaxy to help you find a movie for tonight 
      </div>

    

      <Button  cn={styles.update}  />

      

   </div>

  );
}

"use client";

import Image from "next/image";
import styles from "../../styles/Index.module.css"
import update from "../../images/refresh.png"
import Button from "../../components/Button";
import { useAppStore } from "../../store/store";
import { useEffect } from "react";

export default function Home() {

  return (
   <div className={styles.wrap}>

      <div className={styles.image} /> 
      <h1 className={styles.title}>Welcome to Movie App</h1>
      <div className={styles.subtitle}>
          The best movie app in galaxy to help you find a movie for tonight 
      </div>

      <Button  className={styles.update} />

   </div>

  );
}

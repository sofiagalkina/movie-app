import Image from "next/image";
import styles from "../../styles/Index.module.css"
import update from "../../images/refresh.png"
import Button from "../../components/Button";

export default function Home() {
  return (
   <div className={styles.wrap}>

      <div className={styles.image} /> 
      <h1 className={styles.title}>Welcome to Movie App</h1>
      <div className={styles.subtitle}>
          The best movie app in galaxy to help you find a movie for tonight 
      </div>

      <div className={styles.update}>
        <Image className="icon" src={update} alt="refresh button" width={14} height={14} />
        <span > Get a movie </span>
      </div>
      
      <Button cn={styles.update} />

      

   </div>

  );
}

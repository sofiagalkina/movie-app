import React from "react";
import style from "../styles/Home.module.css"

const Footer = ({className}) => {
    return (
        <footer className={style.footer}>
            <div className="text-white">
                <span> Created by </span>
                <a href="#" target="_blank"
                rel="noopener noreferrer"
                >
                    Sofia 
                </a>
            </div>
        </footer>
    )
}

export default Footer;
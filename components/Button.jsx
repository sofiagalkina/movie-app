import React from "react";
import Image from "next/image";
import refreshIcon from "../images/refresh.png";


const Button = ({text = "Get a movie", cn = ""}) => {
    return(
        <div className={`update ${cn}`}>
            <Image className="icon" src={refreshIcon} alt="A Movie Button" width={14} height={14}></Image>
            <span>{text}</span>
        </div>
    )
}

export default Button;
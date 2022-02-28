import React from "react";
import styles from "./Card.module.css";

const Card = ({ children, isProfile }) => {
  return (
    <div className={`${styles.card} ${isProfile && styles["card--profile"]}`}>
      {children}
    </div>
  );
};

export default Card;

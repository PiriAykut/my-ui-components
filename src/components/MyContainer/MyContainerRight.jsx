import React from "react";
import styles from "./MyContainer.module.css";

function MyContainerRight({ children }) {
    return (
        <div className={"MyContainerTagRight " + styles.rightBlock}>
            {children}
        </div>
    );
}
export default MyContainerRight;

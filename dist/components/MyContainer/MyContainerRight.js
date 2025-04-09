import React from "react";
import styles from "./MyContainer.module.css";
function MyContainerRight({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "MyContainerTagRight " + styles.rightBlock
  }, children);
}
export default MyContainerRight;
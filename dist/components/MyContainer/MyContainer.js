import React from "react";
import styles from "./MyContainer.module.css";
function MyContainer({
  children,
  title = "",
  description = null,
  icon = null,
  className = null,
  titleTextStyle = null,
  style = null,
  headerClassName = null,
  headerStyle = null,
  bodyClassName = null,
  bodyStyle = null,
  footerClassName = null,
  footerStyle = null
}) {
  const arrChild = React.Children.toArray(children);
  let childHeaderRight = null;
  let childBody = null;
  let childFooter = null;
  for (let i = 0; i < arrChild.length; i++) {
    const el = arrChild[i];
    if (el.type && el.type.toString().includes("MyContainerTagRight")) {
      childHeaderRight = el;
    } else if (el.type && el.type.toString().includes("MyContainerTagBody")) {
      childBody = el;
    } else if (el.type && el.type.toString().includes("MyContainerTagFooter")) {
      childFooter = el;
    } else if (childBody == null) {
      childBody = el;
    } else if (childBody != null && childFooter == null && i == arrChild.length - 1) {
      childFooter = el;
    }
  }
  return /*#__PURE__*/React.createElement("section", {
    className: `${styles.container} ${className || ""}`,
    style: style
  }, (title || childHeaderRight) && /*#__PURE__*/React.createElement("div", {
    className: `${styles.header} ${headerClassName || ""}`,
    style: headerStyle
  }, title && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", {
    className: styles.title,
    style: titleTextStyle
  }, title), description && /*#__PURE__*/React.createElement("span", {
    className: styles.description
  }, description)), childHeaderRight && childHeaderRight), /*#__PURE__*/React.createElement("div", {
    className: `${styles.body} ${bodyClassName || ""}`,
    style: title ? {
      paddingTop: "12px"
    } : null
  }, childBody), childFooter && /*#__PURE__*/React.createElement("div", {
    className: `${styles.footer} ${footerClassName || ""}`,
    style: title ? {
      paddingTop: "12px"
    } : null
  }, childFooter));
}
export default MyContainer;
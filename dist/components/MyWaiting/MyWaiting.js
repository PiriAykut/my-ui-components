import React from "react";
import { Oval } from "react-loader-spinner";
import './MyWaiting.css'; // Modal için CSS dosyası

export default function MyWaiting({
  show = false,
  message = null
}) {
  if (!show) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "my-waiting-backdrop"
  }, /*#__PURE__*/React.createElement("div", {
    className: "my-waiting-content"
  }, /*#__PURE__*/React.createElement(Oval, {
    visible: true,
    height: "60",
    width: "60",
    color: "#fff",
    secondaryColor: "#cdcdcd",
    ariaLabel: "oval-loading",
    strokeWidth: 5
  }), message && /*#__PURE__*/React.createElement("span", {
    className: "my-waiting-message"
  }, message)));
}
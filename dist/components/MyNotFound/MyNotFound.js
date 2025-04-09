import React from 'react';
import './MyNotFound.css'; // Modal için CSS dosyası

export default function MyNotFound({
  message = "Kayıt Mevcut Değil!",
  className = null,
  style = null,
  icon = null
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "my-nodata " + (className ? className : ''),
    style: style
  }, icon && /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, icon), /*#__PURE__*/React.createElement("span", {
    dangerouslySetInnerHTML: {
      __html: message
    }
  }));
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MyNotFound;
var _react = _interopRequireDefault(require("react"));
require("./MyNotFound.css");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Modal için CSS dosyası
function MyNotFound({
  message = "Kayıt Mevcut Değil!",
  className = null,
  style = null,
  icon = null
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "my-nodata " + (className ? className : ''),
    style: style,
    children: [icon && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "icon",
      children: icon
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      dangerouslySetInnerHTML: {
        __html: message
      }
    })]
  });
}
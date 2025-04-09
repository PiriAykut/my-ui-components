"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MyWaiting;
var _react = _interopRequireDefault(require("react"));
var _reactLoaderSpinner = require("react-loader-spinner");
require("./MyWaiting.css");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Modal için CSS dosyası
function MyWaiting({
  show = false,
  message = null
}) {
  if (!show) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "my-waiting-backdrop",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "my-waiting-content",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactLoaderSpinner.Oval, {
        visible: true,
        height: "60",
        width: "60",
        color: "#fff",
        secondaryColor: "#cdcdcd",
        ariaLabel: "oval-loading",
        strokeWidth: 5
      }), message && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "my-waiting-message",
        children: message
      })]
    })
  });
}
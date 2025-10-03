"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MyWaiting;
var _react = _interopRequireDefault(require("react"));
require("./MyWaiting.css");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Modal için CSS dosyası

// Opsiyonel bağımlılığı kontrol et
let Oval;
let hasLoaderSpinner = false;
try {
  const loaderSpinner = require("react-loader-spinner");
  Oval = loaderSpinner.Oval;
  hasLoaderSpinner = true;
} catch (error) {
  console.warn("MyWaiting: react-loader-spinner bağımlılığı bulunamadı. MyWaiting bileşenini kullanmak için 'react-loader-spinner' paketini yükleyin.");
}
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
      children: [hasLoaderSpinner ? /*#__PURE__*/(0, _jsxRuntime.jsx)(Oval, {
        visible: true,
        height: "60",
        width: "60",
        color: "#fff",
        secondaryColor: "#cdcdcd",
        ariaLabel: "oval-loading",
        strokeWidth: 5
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          width: "60px",
          height: "60px",
          border: "5px solid #cdcdcd",
          borderTop: "5px solid #fff",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }
      }), message && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "my-waiting-message",
        children: message
      })]
    })
  });
}
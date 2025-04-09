"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = MyNotFound;
var _react = _interopRequireDefault(require("react"));
require("./MyNotFound.css");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Modal için CSS dosyası
function MyNotFound(_ref) {
  var _ref$message = _ref.message,
    message = _ref$message === void 0 ? "Kayıt Mevcut Değil!" : _ref$message,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? null : _ref$className,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? null : _ref$style,
    _ref$icon = _ref.icon,
    icon = _ref$icon === void 0 ? null : _ref$icon;
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
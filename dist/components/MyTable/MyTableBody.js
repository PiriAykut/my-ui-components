"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function MyTableBody({
  children
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("tbody", {
    className: "MyTableTagBody",
    children: children
  });
}
var _default = exports.default = MyTableBody;
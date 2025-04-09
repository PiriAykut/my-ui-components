"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _MyContainerModule = _interopRequireDefault(require("./MyContainer.module.css"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function MyContainerRight({
  children
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "MyContainerTagRight " + _MyContainerModule.default.rightBlock,
    children: children
  });
}
var _default = exports.default = MyContainerRight;
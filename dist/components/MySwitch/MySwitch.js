"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
require("./MySwitch.css");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MySwitch = ({
  checked,
  onChange,
  color = "blue"
}) => {
  let colorClass = "bg-blue-500";
  let dotColorClass = "bg-white";
  switch (color) {
    case "blue":
      colorClass = "bg-blue-500";
      break;
    case "green":
      colorClass = "bg-green-500";
      break;
    case "red":
      colorClass = "bg-red-500";
      break;
    case "yellow":
      colorClass = "bg-yellow-500";
      break;
    case "purple":
      colorClass = "bg-purple-500";
      break;
    case "orange":
      colorClass = "bg-orange-500";
      break;
    case "pink":
      colorClass = "bg-pink-500";
      break;
    case "brown":
      colorClass = "bg-brown-500";
      break;
    case "indigo":
      colorClass = "bg-indigo-500";
      break;
    case "gray":
      colorClass = "bg-gray-500";
      break;
    default:
      colorClass = "bg-blue-500";
      break;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "relative",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "flex items-center",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        type: "checkbox",
        className: "sr-only",
        checked: checked,
        onChange: onChange
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: `w-10 h-4 rounded-full shadow-inner ${checked ? colorClass : "bg-gray-400"}`
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: `dot absolute w-6 h-6 rounded-full shadow -left-1 -top-1 transition transform ${checked ? "translate-x-6 " + dotColorClass : "translate-x-0 bg-white"}`
      })]
    })
  });
};
var _default = exports.default = MySwitch;
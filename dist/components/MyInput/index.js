"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var MyInput = function MyInput(_ref) {
  var type = _ref.type,
    value = _ref.value,
    onChange = _ref.onChange,
    placeholder = _ref.placeholder;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
    type: type,
    value: value,
    onChange: onChange,
    placeholder: placeholder
  });
};
var _default = exports["default"] = MyInput;
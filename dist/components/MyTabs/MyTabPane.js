"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function MyTabPane(_ref) {
  var children = _ref.children,
    _ref$label = _ref.label,
    label = _ref$label === void 0 ? null : _ref$label,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? null : _ref$title,
    _ref$description = _ref.description,
    description = _ref$description === void 0 ? null : _ref$description,
    _ref$badge = _ref.badge,
    badge = _ref$badge === void 0 ? null : _ref$badge,
    _ref$name = _ref.name,
    name = _ref$name === void 0 ? null : _ref$name,
    _ref$icon = _ref.icon,
    icon = _ref$icon === void 0 ? null : _ref$icon,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? null : _ref$className,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? null : _ref$style,
    _ref$tabClassName = _ref.tabClassName,
    tabClassName = _ref$tabClassName === void 0 ? null : _ref$tabClassName,
    _ref$tabStyle = _ref.tabStyle,
    tabStyle = _ref$tabStyle === void 0 ? null : _ref$tabStyle;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: children
  });
}
var _default = exports["default"] = MyTabPane;
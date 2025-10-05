"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _MyMenuModule = _interopRequireDefault(require("./MyMenu.module.css"));
var _pi = require("react-icons/pi");
var _go = require("react-icons/go");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function MenuItem({
  children = null,
  to = "",
  text = "",
  className = null,
  badge = null,
  icon = null,
  title = "",
  defaultOpen = false,
  defaultRoute = "",
  isShortMenu = false
}) {
  // let selected = window.location.pathname == to || (window.location.pathname == defaultRoute);

  const [open, setOpen] = (0, _react.useState)(defaultOpen);
  const [selected, setSelected] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    setSelected(children ? false : window.location.pathname == to || window.location.pathname == defaultRoute || window.location.pathname.includes(to));
  }, [window.location.pathname]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: children && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: _MyMenuModule.default.menuItemOwner,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: _MyMenuModule.default.menuItem + " " + (className != null ? className : "") + " " + (selected ? _MyMenuModule.default.selected : '') + " " + (open ? _MyMenuModule.default.menuItemOpen : '') + " " + (isShortMenu ? _MyMenuModule.default.menuItemShortMenu : ''),
        title: title == "" ? text : title,
        onClick: () => setOpen(!open),
        children: [icon && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: _MyMenuModule.default.menuItemIcon,
          children: icon
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
          className: _MyMenuModule.default.menuItemText + " " + (badge != null ? _MyMenuModule.default.menuItemTextBadge : ''),
          children: [text, badge != null && typeof badge !== 'object' ? /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: _MyMenuModule.default.menuItemBadge,
            children: badge.toString()
          }) : badge]
        }), open && /*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiCaretUp, {
          className: `font-bold text-2xl ${_MyMenuModule.default.menuItemIconSubMenu} ${open ? _MyMenuModule.default.menuItemIconSubMenuOpen : ''}`
        }) || /*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiCaretDown, {
          className: `font-bold text-2xl ${_MyMenuModule.default.menuItemIconSubMenu} ${open ? _MyMenuModule.default.menuItemIconSubMenuOpen : ''}`
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: _MyMenuModule.default.menuItemChildren + " " + (open ? _MyMenuModule.default.menuItemChildrenOpen : ''),
        children: children
      })]
    }) || /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouterDom.Link, {
      to: to,
      className: _MyMenuModule.default.menuItem + " " + (className != null ? className : "") + " " + (selected ? _MyMenuModule.default.selected : '') + " " + (isShortMenu ? _MyMenuModule.default.menuItemShortMenu : ''),
      title: title == "" ? text : title,
      children: [icon && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: _MyMenuModule.default.menuItemIcon,
        children: icon
      }) || /*#__PURE__*/(0, _jsxRuntime.jsx)(_go.GoDotFill, {}), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
        className: _MyMenuModule.default.menuItemText + " " + (badge != null ? _MyMenuModule.default.menuItemTextBadge : ''),
        children: [text, badge != null && typeof badge !== 'object' ? /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: _MyMenuModule.default.menuItemBadge,
          children: badge.toString()
        }) : badge]
      })]
    })
  });
}
var _default = exports.default = MenuItem;
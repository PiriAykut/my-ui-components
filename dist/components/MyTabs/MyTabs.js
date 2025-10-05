"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
require("./MyTabs.css");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function MyTabs({
  children,
  className = null,
  style = null,
  onChange = null,
  activePaneIndex = -1,
  activePaneName = null
}) {
  const [activei, setActivei] = (0, _react.useState)(activePaneIndex > -1 ? activePaneIndex : 0);
  const arrChild = _react.default.Children.toArray(children);
  (0, _react.useEffect)(() => {
    if (onChange) {
      onChange({
        index: activei,
        name: arrChild[activei].props.name,
        label: arrChild[activei].props.label && arrChild[activei].props.label || arrChild[activei].props.title
      });
    }
  }, [activei]);
  (0, _react.useEffect)(() => {
    if (activePaneName) {
      const index = arrChild.findIndex(item => item.props.name === activePaneName);
      if (index > -1) {
        setActivei(index);
      }
    }
  }, [activePaneName]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "my-TabsContainer " + (className ? className : ''),
    style: style,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
      className: "my-TabsTabList",
      children: arrChild.map((item, i) => {
        return /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
          className: (i == activei && 'active') + ' ' + (item.props.tabClassName ? item.props.tabClassName : ''),
          style: item.props.tabStyle,
          onClick: () => setActivei(i),
          title: item.props.title,
          children: [item.props.icon != undefined && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "icon",
            children: item.props.icon
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "flex flex-col gap-0 text-start",
            children: [item.props.label != undefined ? /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "title",
              children: item.props.label
            }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "title",
              children: item.props.title
            }), item.props.description != undefined && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "description",
              children: item.props.description
            })]
          }), item.props.badge != undefined && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "badge",
            children: item.props.badge
          })]
        }, i);
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "my-TabsTabBody",
      children: arrChild.map((item, i) => {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "my-TabsTabContainer " + (i == activei && 'active') + ' ' + (item.props.className ? item.props.className : ''),
          style: item.props.style,
          onClick: () => setActivei(i),
          children: item.props.children
        }, i);
      })
    })]
  });
}
var _default = exports.default = MyTabs;
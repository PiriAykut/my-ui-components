"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
require("./MyTabs.css");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
require("./MyTabs.css");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function MyTabs(_ref) {
  var children = _ref.children,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? null : _ref$className,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? null : _ref$style,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? null : _ref$onChange,
    _ref$activePaneIndex = _ref.activePaneIndex,
    activePaneIndex = _ref$activePaneIndex === void 0 ? -1 : _ref$activePaneIndex,
    _ref$activePaneName = _ref.activePaneName,
    activePaneName = _ref$activePaneName === void 0 ? null : _ref$activePaneName;
  var _useState = (0, _react.useState)(activePaneIndex > -1 ? activePaneIndex : 0),
    _useState2 = _slicedToArray(_useState, 2),
    activei = _useState2[0],
    setActivei = _useState2[1];
  var arrChild = _react["default"].Children.toArray(children);
  (0, _react.useEffect)(function () {
    if (onChange) {
      onChange({
        index: activei,
        name: arrChild[activei].props.name,
        label: arrChild[activei].props.label && arrChild[activei].props.label || arrChild[activei].props.title
      });
    }
  }, [activei]);
  (0, _react.useEffect)(function () {
    if (activePaneName) {
      var index = arrChild.findIndex(function (item) {
        return item.props.name === activePaneName;
      });
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
      children: arrChild.map(function (item, i) {
        return /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
          className: (i == activei && 'active') + ' ' + (item.props.tabClassName ? item.props.tabClassName : ''),
          style: item.props.tabStyle,
          onClick: function onClick() {
            return setActivei(i);
          },
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
      children: arrChild.map(function (item, i) {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "my-TabsTabContainer " + (i == activei && 'active') + ' ' + (item.props.className ? item.props.className : ''),
          style: item.props.style,
          onClick: function onClick() {
            return setActivei(i);
          },
          children: item.props.children
        }, i);
      })
    })]
  });
}
var _default = exports["default"] = MyTabs;
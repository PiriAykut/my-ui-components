"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _MyContainerModule = _interopRequireDefault(require("./MyContainer.module.css"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function MyContainer({
  children,
  title = "",
  description = null,
  icon = null,
  className = null,
  titleTextStyle = null,
  style = null,
  headerClassName = null,
  headerStyle = null,
  bodyClassName = null,
  bodyStyle = null,
  footerClassName = null,
  footerStyle = null
}) {
  const arrChild = _react.default.Children.toArray(children);
  let childHeaderRight = null;
  let childBody = null;
  let childFooter = null;
  for (let i = 0; i < arrChild.length; i++) {
    const el = arrChild[i];
    if (el.type && el.type.toString().includes("MyContainerTagRight")) {
      childHeaderRight = el;
    } else if (el.type && el.type.toString().includes("MyContainerTagBody")) {
      childBody = el;
    } else if (el.type && el.type.toString().includes("MyContainerTagFooter")) {
      childFooter = el;
    } else if (childBody == null) {
      childBody = el;
    } else if (childBody != null && childFooter == null && i == arrChild.length - 1) {
      childFooter = el;
    }
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
    className: `${_MyContainerModule.default.container} ${className || ""}`,
    style: style,
    children: [(title || childHeaderRight) && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: `${_MyContainerModule.default.header} ${headerClassName || ""}`,
      style: headerStyle,
      children: [title && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
          className: _MyContainerModule.default.title,
          style: titleTextStyle,
          children: title
        }), description && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: _MyContainerModule.default.description,
          children: description
        })]
      }), childHeaderRight && childHeaderRight]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: `${_MyContainerModule.default.body} ${bodyClassName || ""}`,
      style: title ? {
        paddingTop: "12px"
      } : null,
      children: childBody
    }), childFooter && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: `${_MyContainerModule.default.footer} ${footerClassName || ""}`,
      style: title ? {
        paddingTop: "12px"
      } : null,
      children: childFooter
    })]
  });
}
var _default = exports.default = MyContainer;
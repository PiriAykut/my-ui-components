"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _MyContainerModule = _interopRequireDefault(require("./MyContainer.module.css"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function MyContainer(_ref) {
  var children = _ref.children,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? "" : _ref$title,
    _ref$description = _ref.description,
    description = _ref$description === void 0 ? null : _ref$description,
    _ref$icon = _ref.icon,
    icon = _ref$icon === void 0 ? null : _ref$icon,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? null : _ref$className,
    _ref$titleTextStyle = _ref.titleTextStyle,
    titleTextStyle = _ref$titleTextStyle === void 0 ? null : _ref$titleTextStyle,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? null : _ref$style,
    _ref$headerClassName = _ref.headerClassName,
    headerClassName = _ref$headerClassName === void 0 ? null : _ref$headerClassName,
    _ref$headerStyle = _ref.headerStyle,
    headerStyle = _ref$headerStyle === void 0 ? null : _ref$headerStyle,
    _ref$bodyClassName = _ref.bodyClassName,
    bodyClassName = _ref$bodyClassName === void 0 ? null : _ref$bodyClassName,
    _ref$bodyStyle = _ref.bodyStyle,
    bodyStyle = _ref$bodyStyle === void 0 ? null : _ref$bodyStyle,
    _ref$footerClassName = _ref.footerClassName,
    footerClassName = _ref$footerClassName === void 0 ? null : _ref$footerClassName,
    _ref$footerStyle = _ref.footerStyle,
    footerStyle = _ref$footerStyle === void 0 ? null : _ref$footerStyle;
  var arrChild = _react["default"].Children.toArray(children);
  var childHeaderRight = null;
  var childBody = null;
  var childFooter = null;
  for (var i = 0; i < arrChild.length; i++) {
    var el = arrChild[i];
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
    className: "".concat(_MyContainerModule["default"].container, " ").concat(className || ""),
    style: style,
    children: [(title || childHeaderRight) && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "".concat(_MyContainerModule["default"].header, " ").concat(headerClassName || ""),
      style: headerStyle,
      children: [title && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
          className: _MyContainerModule["default"].title,
          style: titleTextStyle,
          children: title
        }), description && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: _MyContainerModule["default"].description,
          children: description
        })]
      }), childHeaderRight && childHeaderRight]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "".concat(_MyContainerModule["default"].body, " ").concat(bodyClassName || ""),
      style: title ? {
        paddingTop: "12px"
      } : null,
      children: childBody
    }), childFooter && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "".concat(_MyContainerModule["default"].footer, " ").concat(footerClassName || ""),
      style: title ? {
        paddingTop: "12px"
      } : null,
      children: childFooter
    })]
  });
}
var _default = exports["default"] = MyContainer;
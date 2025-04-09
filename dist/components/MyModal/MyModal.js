"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
require("./MyModal.css");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
// Modal için CSS dosyası
var MyModal = function MyModal(_ref) {
  var show = _ref.show,
    title = _ref.title,
    children = _ref.children,
    _ref$top = _ref.top,
    top = _ref$top === void 0 ? null : _ref$top,
    _ref$onClose = _ref.onClose,
    onClose = _ref$onClose === void 0 ? null : _ref$onClose,
    _ref$closeOnBackdropC = _ref.closeOnBackdropClick,
    closeOnBackdropClick = _ref$closeOnBackdropC === void 0 ? true : _ref$closeOnBackdropC,
    _ref$closeOnEsc = _ref.closeOnEsc,
    closeOnEsc = _ref$closeOnEsc === void 0 ? true : _ref$closeOnEsc,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? null : _ref$style;
  var arrChild = _react["default"].Children.toArray(children);
  var childBody = null;
  var childFooter = null;
  for (var i = 0; i < arrChild.length; i++) {
    var el = arrChild[i];
    if (el.type.toString().includes("MyModalTagFooter")) {
      childFooter = el;
    } else if (el.type.toString().includes("MyModalTagBody")) {
      childBody = el;
    } else if (childBody == null) {
      childBody = el;
    }
  }

  // ESC tuşu ile kapatma işlevi
  (0, _react.useEffect)(function () {
    if (!closeOnEsc) return;
    var handleEsc = function handleEsc(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return function () {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [closeOnEsc, onClose]);
  if (!show) {
    return null;
  }
  var handleBackdropClick = function handleBackdropClick(e) {
    if (closeOnBackdropClick && e.target.className.includes('modal-overlay')) {
      onClose();
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: 'modal-overlay ' + (top ? 'top' : ''),
    onClick: handleBackdropClick,
    style: {
      paddingTop: top
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "modal",
      onClick: function onClick(e) {
        return e.stopPropagation();
      },
      style: style,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "modal-header",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h4", {
          children: title
        }), onClose && /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          type: "button",
          className: "close-button",
          onClick: onClose,
          children: "\xD7"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "modal-content",
        children: childBody
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "modal-footer",
        children: childFooter
      })]
    })
  });
};
var _default = exports["default"] = MyModal;
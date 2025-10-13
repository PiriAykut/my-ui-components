"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
require("./MyModal.css");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// Modal için CSS dosyası
const MyModal = ({
  show,
  title,
  children,
  top = null,
  onClose = null,
  closeOnBackdropClick = true,
  closeOnEsc = true,
  style = null
}) => {
  const arrChild = _react.default.Children.toArray(children);
  let childBody = null;
  let childFooter = null;
  for (let i = 0; i < arrChild.length; i++) {
    const el = arrChild[i];
    if (el.type.toString().includes("MyModalTagFooter")) {
      childFooter = el;
    } else if (el.type.toString().includes("MyModalTagBody")) {
      childBody = el;
    } else if (childBody == null) {
      childBody = el;
    }
  }

  // ESC tuşu ile kapatma işlevi
  (0, _react.useEffect)(() => {
    if (!closeOnEsc) return;
    const handleEsc = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [closeOnEsc, onClose]);
  if (!show) {
    return null;
  }
  const handleBackdropClick = e => {
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
      onClick: e => e.stopPropagation(),
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
      }), childFooter && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "modal-footer",
        children: childFooter
      })]
    })
  });
};
var _default = exports.default = MyModal;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
require("./MyModal.css");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "modal-footer",
        children: childFooter
      })]
    })
  });
};
var _default = exports.default = MyModal;
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactZoomPanPinch = require("react-zoom-pan-pinch");
require("./MyZoomImage.css");
var _pi = require("react-icons/pi");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var Controls = function Controls(_ref) {
  var wrapperRef = _ref.wrapperRef,
    openArrow = _ref.openArrow;
  var _useControls = (0, _reactZoomPanPinch.useControls)(),
    zoomIn = _useControls.zoomIn,
    zoomOut = _useControls.zoomOut,
    resetTransform = _useControls.resetTransform,
    centerView = _useControls.centerView;
  var handlePan = function handlePan(x, y) {
    if (wrapperRef.current) {
      // debugger
      // Mevcut pozisyonu al
      var state = wrapperRef.current.instance.transformState;
      // Pozisyonu güncelle
      wrapperRef.current.instance.setTransformState(state.scale, state.positionX + x, state.positionY + y);
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "absolute flex flex-col gap-1 z-50 top-3 left-5",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "flex gap-1 mb-3",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        className: "bg-slate-400 hover:bg-slate-500 rounded-full p-2",
        onClick: function onClick() {
          return zoomIn();
        },
        title: "Zoom +",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiPlusBold, {
          className: "text-lg text-white"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        className: "bg-slate-400 hover:bg-slate-500 rounded-full p-2",
        onClick: function onClick() {
          return zoomOut();
        },
        title: "Zoom -",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiMinusBold, {
          className: "text-lg text-white"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        className: "bg-slate-400 hover:bg-slate-500 rounded-full p-2",
        onClick: function onClick() {
          return resetTransform();
        },
        title: "Zoom Cancel",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiX, {
          className: "text-lg text-white"
        })
      })]
    }), openArrow && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "flex flex-col items-center p-2",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        className: "bg-blue-400 hover:bg-blue-500 rounded-full p-2 mb-1",
        onClick: function onClick() {
          return handlePan(0, 30);
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiArrowUpBold, {
          className: "text-lg text-white"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "flex",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          className: "bg-blue-400 hover:bg-blue-500 rounded-full p-2",
          onClick: function onClick() {
            return handlePan(30, 0);
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiArrowLeftBold, {
            className: "text-lg text-white"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          className: "bg-blue-400 hover:bg-blue-500 rounded-full p-2 ml-1 mr-1",
          onClick: function onClick() {
            return centerView();
          },
          title: "Center",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiArrowsIn, {
            className: "text-lg text-white"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          className: "bg-blue-400 hover:bg-blue-500 rounded-full p-2",
          onClick: function onClick() {
            return handlePan(-30, 0);
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiArrowRightBold, {
            className: "text-lg text-white"
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        className: "bg-blue-400 hover:bg-blue-500 rounded-full p-2 mt-1",
        onClick: function onClick() {
          return handlePan(0, -30);
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiArrowDownBold, {
          className: "text-lg text-white"
        })
      })]
    })]
  });
};
var MyImageZoom = function MyImageZoom(_ref2) {
  var image = _ref2.image,
    _ref2$children = _ref2.children,
    children = _ref2$children === void 0 ? null : _ref2$children,
    _ref2$onZoomChange = _ref2.onZoomChange,
    onZoomChange = _ref2$onZoomChange === void 0 ? null : _ref2$onZoomChange;
  var wrapperRef = (0, _react.useRef)(null); // Ref oluştur
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    openArrow = _useState2[0],
    setOpenArrow = _useState2[1];
  var handlerTransform = function handlerTransform(e) {
    setOpenArrow(e.state.scale != 1);
    if (onZoomChange != null) {
      onZoomChange(e.state);
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "zoom-container flex justify-center items-center",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactZoomPanPinch.TransformWrapper, {
      ref: wrapperRef,
      className: "w-full flex items-center justify-center",
      onTransformed: handlerTransform,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Controls, {
        wrapperRef: wrapperRef,
        openArrow: openArrow
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactZoomPanPinch.TransformComponent, {
        className: "w-full flex items-center justify-center",
        children: children || /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
          src: image,
          alt: "Zoomable",
          className: "max-w-full object-cover rounded-md "
        })
      })]
    })
  });
};
var _default = exports["default"] = MyImageZoom;
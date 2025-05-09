"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactZoomPanPinch = require("react-zoom-pan-pinch");
require("./MyZoomImage.css");
var _pi = require("react-icons/pi");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Controls = ({
  wrapperRef,
  openArrow
}) => {
  const {
    zoomIn,
    zoomOut,
    resetTransform,
    centerView
  } = (0, _reactZoomPanPinch.useControls)();
  const handlePan = (x, y) => {
    if (wrapperRef.current) {
      // debugger
      // Mevcut pozisyonu al
      const state = wrapperRef.current.instance.transformState;
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
        onClick: () => zoomIn(),
        title: "Zoom +",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiPlusBold, {
          className: "text-lg text-white"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        className: "bg-slate-400 hover:bg-slate-500 rounded-full p-2",
        onClick: () => zoomOut(),
        title: "Zoom -",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiMinusBold, {
          className: "text-lg text-white"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        className: "bg-slate-400 hover:bg-slate-500 rounded-full p-2",
        onClick: () => resetTransform(),
        title: "Zoom Cancel",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiX, {
          className: "text-lg text-white"
        })
      })]
    }), openArrow && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "flex flex-col items-center p-2",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        className: "bg-blue-400 hover:bg-blue-500 rounded-full p-2 mb-1",
        onClick: () => handlePan(0, 30),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiArrowUpBold, {
          className: "text-lg text-white"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "flex",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          className: "bg-blue-400 hover:bg-blue-500 rounded-full p-2",
          onClick: () => handlePan(30, 0),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiArrowLeftBold, {
            className: "text-lg text-white"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          className: "bg-blue-400 hover:bg-blue-500 rounded-full p-2 ml-1 mr-1",
          onClick: () => centerView(),
          title: "Center",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiArrowsIn, {
            className: "text-lg text-white"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          className: "bg-blue-400 hover:bg-blue-500 rounded-full p-2",
          onClick: () => handlePan(-30, 0),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiArrowRightBold, {
            className: "text-lg text-white"
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        className: "bg-blue-400 hover:bg-blue-500 rounded-full p-2 mt-1",
        onClick: () => handlePan(0, -30),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiArrowDownBold, {
          className: "text-lg text-white"
        })
      })]
    })]
  });
};
const MyImageZoom = ({
  image,
  children = null,
  onZoomChange = null
}) => {
  const wrapperRef = (0, _react.useRef)(null); // Ref oluştur
  const [openArrow, setOpenArrow] = (0, _react.useState)(false);
  const handlerTransform = e => {
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
var _default = exports.default = MyImageZoom;
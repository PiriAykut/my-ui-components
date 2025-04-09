"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var MyScrollableCard = function MyScrollableCard(_ref) {
  var children = _ref.children,
    className = _ref.className;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isDragging = _useState2[0],
    setIsDragging = _useState2[1];
  var _useState3 = (0, _react.useState)(0),
    _useState4 = _slicedToArray(_useState3, 2),
    startX = _useState4[0],
    setStartX = _useState4[1];
  var _useState5 = (0, _react.useState)(0),
    _useState6 = _slicedToArray(_useState5, 2),
    startY = _useState6[0],
    setStartY = _useState6[1];
  var _useState7 = (0, _react.useState)(0),
    _useState8 = _slicedToArray(_useState7, 2),
    scrollLeft = _useState8[0],
    setScrollLeft = _useState8[1];
  var _useState9 = (0, _react.useState)(0),
    _useState10 = _slicedToArray(_useState9, 2),
    scrollTop = _useState10[0],
    setScrollTop = _useState10[1];
  var _useState11 = (0, _react.useState)(null),
    _useState12 = _slicedToArray(_useState11, 2),
    direction = _useState12[0],
    setDirection = _useState12[1]; // Yatay mı dikey mi olduğuna karar verecek
  var containerRef = (0, _react.useRef)(null);
  var handleMouseDown = function handleMouseDown(e) {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setStartY(e.pageY - containerRef.current.offsetTop);
    setScrollLeft(containerRef.current.scrollLeft);
    setScrollTop(containerRef.current.scrollTop);
    setDirection(null); // Fare basıldığı anda yönü sıfırla
  };
  var handleMouseMove = function handleMouseMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    var x = e.pageX - containerRef.current.offsetLeft;
    var y = e.pageY - containerRef.current.offsetTop;

    // İlk hareket yönünü belirle
    if (direction === null) {
      var diffX = Math.abs(x - startX);
      var diffY = Math.abs(y - startY);
      if (diffX > diffY) {
        setDirection("horizontal");
      } else {
        setDirection("vertical");
      }
    }
    if (direction === "horizontal") {
      var walkX = x - startX; // Hız faktörünü kaldırdım
      containerRef.current.scrollLeft = scrollLeft - walkX; // Düz kaydırma
    } else if (direction === "vertical") {
      var walkY = y - startY;
      containerRef.current.scrollTop = scrollTop - walkY;
    }
  };
  var handleMouseUp = function handleMouseUp() {
    setIsDragging(false);
  };
  var handleWheel = function handleWheel(e) {
    e.preventDefault();
    containerRef.current.scrollLeft += e.deltaY * 2; // Yatay tekerlek kaydırma

    // Eğer dikey kaydırma isteniyorsa deltaX'i kullanabilirsiniz:
    // containerRef.current.scrollTop += e.deltaY * 2;

    // const deltaX = e.deltaX;
    // const deltaY = e.deltaY;

    // if (Math.abs(deltaX) > Math.abs(deltaY)) {
    //     containerRef.current.scrollLeft += deltaX * 2; // Yatay tekerlek kaydırma
    // } else {
    //     containerRef.current.scrollTop += deltaY * 2; // Dikey tekerlek kaydırma
    // }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseUp,
    onMouseUp: handleMouseUp,
    onWheel: handleWheel,
    ref: containerRef,
    children: children
  });
};
var _default = exports["default"] = MyScrollableCard;
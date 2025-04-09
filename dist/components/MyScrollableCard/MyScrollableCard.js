"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const MyScrollableCard = ({
  children,
  className
}) => {
  const [isDragging, setIsDragging] = (0, _react.useState)(false);
  const [startX, setStartX] = (0, _react.useState)(0);
  const [startY, setStartY] = (0, _react.useState)(0);
  const [scrollLeft, setScrollLeft] = (0, _react.useState)(0);
  const [scrollTop, setScrollTop] = (0, _react.useState)(0);
  const [direction, setDirection] = (0, _react.useState)(null); // Yatay mı dikey mi olduğuna karar verecek
  const containerRef = (0, _react.useRef)(null);
  const handleMouseDown = e => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setStartY(e.pageY - containerRef.current.offsetTop);
    setScrollLeft(containerRef.current.scrollLeft);
    setScrollTop(containerRef.current.scrollTop);
    setDirection(null); // Fare basıldığı anda yönü sıfırla
  };
  const handleMouseMove = e => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const y = e.pageY - containerRef.current.offsetTop;

    // İlk hareket yönünü belirle
    if (direction === null) {
      const diffX = Math.abs(x - startX);
      const diffY = Math.abs(y - startY);
      if (diffX > diffY) {
        setDirection("horizontal");
      } else {
        setDirection("vertical");
      }
    }
    if (direction === "horizontal") {
      const walkX = x - startX; // Hız faktörünü kaldırdım
      containerRef.current.scrollLeft = scrollLeft - walkX; // Düz kaydırma
    } else if (direction === "vertical") {
      const walkY = y - startY;
      containerRef.current.scrollTop = scrollTop - walkY;
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleWheel = e => {
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
var _default = exports.default = MyScrollableCard;
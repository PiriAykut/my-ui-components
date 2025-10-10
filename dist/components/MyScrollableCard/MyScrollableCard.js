"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
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
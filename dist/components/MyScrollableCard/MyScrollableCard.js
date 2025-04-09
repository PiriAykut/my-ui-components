import React, { useState, useRef } from "react";
const MyScrollableCard = ({
  children,
  className
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [direction, setDirection] = useState(null); // Yatay mı dikey mi olduğuna karar verecek
  const containerRef = useRef(null);
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
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseUp,
    onMouseUp: handleMouseUp,
    onWheel: handleWheel,
    ref: containerRef
  }, children);
};
export default MyScrollableCard;
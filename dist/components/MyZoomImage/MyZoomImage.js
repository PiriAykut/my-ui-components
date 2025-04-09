import React, { useRef, useState } from "react";
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import "./MyZoomImage.css";
import { PiMinusBold, PiPlusBold, PiX, PiArrowUpBold, PiArrowDownBold, PiArrowLeftBold, PiArrowRightBold, PiArrowsIn } from "react-icons/pi";
const Controls = ({
  wrapperRef,
  openArrow
}) => {
  const {
    zoomIn,
    zoomOut,
    resetTransform,
    centerView
  } = useControls();
  const handlePan = (x, y) => {
    if (wrapperRef.current) {
      // debugger
      // Mevcut pozisyonu al
      const state = wrapperRef.current.instance.transformState;
      // Pozisyonu güncelle
      wrapperRef.current.instance.setTransformState(state.scale, state.positionX + x, state.positionY + y);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "absolute flex flex-col gap-1 z-50 top-3 left-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-1 mb-3"
  }, /*#__PURE__*/React.createElement("button", {
    className: "bg-slate-400 hover:bg-slate-500 rounded-full p-2",
    onClick: () => zoomIn(),
    title: "Zoom +"
  }, /*#__PURE__*/React.createElement(PiPlusBold, {
    className: "text-lg text-white"
  })), /*#__PURE__*/React.createElement("button", {
    className: "bg-slate-400 hover:bg-slate-500 rounded-full p-2",
    onClick: () => zoomOut(),
    title: "Zoom -"
  }, /*#__PURE__*/React.createElement(PiMinusBold, {
    className: "text-lg text-white"
  })), /*#__PURE__*/React.createElement("button", {
    className: "bg-slate-400 hover:bg-slate-500 rounded-full p-2",
    onClick: () => resetTransform(),
    title: "Zoom Cancel"
  }, /*#__PURE__*/React.createElement(PiX, {
    className: "text-lg text-white"
  }))), openArrow && /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center p-2"
  }, /*#__PURE__*/React.createElement("button", {
    className: "bg-blue-400 hover:bg-blue-500 rounded-full p-2 mb-1",
    onClick: () => handlePan(0, 30)
  }, /*#__PURE__*/React.createElement(PiArrowUpBold, {
    className: "text-lg text-white"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex"
  }, /*#__PURE__*/React.createElement("button", {
    className: "bg-blue-400 hover:bg-blue-500 rounded-full p-2",
    onClick: () => handlePan(30, 0)
  }, /*#__PURE__*/React.createElement(PiArrowLeftBold, {
    className: "text-lg text-white"
  })), /*#__PURE__*/React.createElement("button", {
    className: "bg-blue-400 hover:bg-blue-500 rounded-full p-2 ml-1 mr-1",
    onClick: () => centerView(),
    title: "Center"
  }, /*#__PURE__*/React.createElement(PiArrowsIn, {
    className: "text-lg text-white"
  })), /*#__PURE__*/React.createElement("button", {
    className: "bg-blue-400 hover:bg-blue-500 rounded-full p-2",
    onClick: () => handlePan(-30, 0)
  }, /*#__PURE__*/React.createElement(PiArrowRightBold, {
    className: "text-lg text-white"
  }))), /*#__PURE__*/React.createElement("button", {
    className: "bg-blue-400 hover:bg-blue-500 rounded-full p-2 mt-1",
    onClick: () => handlePan(0, -30)
  }, /*#__PURE__*/React.createElement(PiArrowDownBold, {
    className: "text-lg text-white"
  }))));
};
const MyImageZoom = ({
  image,
  children = null,
  onZoomChange = null
}) => {
  const wrapperRef = useRef(null); // Ref oluştur
  const [openArrow, setOpenArrow] = useState(false);
  const handlerTransform = e => {
    setOpenArrow(e.state.scale != 1);
    if (onZoomChange != null) {
      onZoomChange(e.state);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "zoom-container flex justify-center items-center"
  }, /*#__PURE__*/React.createElement(TransformWrapper, {
    ref: wrapperRef,
    className: "w-full flex items-center justify-center",
    onTransformed: handlerTransform
  }, /*#__PURE__*/React.createElement(Controls, {
    wrapperRef: wrapperRef,
    openArrow: openArrow
  }), /*#__PURE__*/React.createElement(TransformComponent, {
    className: "w-full flex items-center justify-center"
  }, children || /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: "Zoomable",
    className: "max-w-full object-cover rounded-md "
  }))));
};
export default MyImageZoom;
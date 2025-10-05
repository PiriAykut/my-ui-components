import React, { useRef, useState } from "react";
import "./MyZoomImage.css";
import {
    PiMinusBold,
    PiPlusBold,
    PiX,
    PiArrowUpBold,
    PiArrowDownBold,
    PiArrowLeftBold,
    PiArrowRightBold,
    PiArrowsIn,
} from "react-icons/pi";

// Opsiyonel bağımlılığı kontrol et
let TransformWrapper, TransformComponent, useControls;
let hasZoomPanPinch = false;

try {
    const zoomPanPinch = require("react-zoom-pan-pinch");
    TransformWrapper = zoomPanPinch.TransformWrapper;
    TransformComponent = zoomPanPinch.TransformComponent;
    useControls = zoomPanPinch.useControls;
    hasZoomPanPinch = true;
} catch (error) {
    console.warn("MyZoomImage: react-zoom-pan-pinch bağımlılığı bulunamadı. MyZoomImage bileşenini kullanmak için 'react-zoom-pan-pinch' paketini yükleyin.");
}

const Controls = ({ wrapperRef, openArrow }) => {
    if (!hasZoomPanPinch) return null;

    const { zoomIn, zoomOut, resetTransform, centerView } = useControls();

    const handlePan = (x, y) => {
        if (wrapperRef.current) {
            // debugger
            // Mevcut pozisyonu al
            const state = wrapperRef.current.instance.transformState;
            // Pozisyonu güncelle
            wrapperRef.current.instance.setTransformState(
                state.scale,
                state.positionX + x,
                state.positionY + y
            );
        }
    };

    return (
        <div className="absolute flex flex-col gap-1 z-50 top-3 left-5">
            <div className="flex gap-1 mb-3">
                <button
                    className="bg-slate-400 hover:bg-slate-500 rounded-full p-2"
                    onClick={() => zoomIn()}
                    title="Zoom +"
                >
                    <PiPlusBold className="text-lg text-white" />
                </button>
                <button
                    className="bg-slate-400 hover:bg-slate-500 rounded-full p-2"
                    onClick={() => zoomOut()}
                    title="Zoom -"
                >
                    <PiMinusBold className="text-lg text-white" />
                </button>
                <button
                    className="bg-slate-400 hover:bg-slate-500 rounded-full p-2"
                    onClick={() => resetTransform()}
                    title="Zoom Cancel"
                >
                    <PiX className="text-lg text-white" />
                </button>
            </div>

            {openArrow && (
                <div className="flex flex-col items-center p-2">
                    <button
                        className="bg-blue-400 hover:bg-blue-500 rounded-full p-2 mb-1"
                        onClick={() => handlePan(0, 30)}
                    >
                        <PiArrowUpBold className="text-lg text-white" />
                    </button>

                    <div className="flex">
                        <button
                            className="bg-blue-400 hover:bg-blue-500 rounded-full p-2"
                            onClick={() => handlePan(30, 0)}
                        >
                            <PiArrowLeftBold className="text-lg text-white" />
                        </button>
                        <button
                            className="bg-blue-400 hover:bg-blue-500 rounded-full p-2 ml-1 mr-1"
                            onClick={() => centerView()}
                            title="Center"
                        >
                            <PiArrowsIn className="text-lg text-white" />
                        </button>
                        <button
                            className="bg-blue-400 hover:bg-blue-500 rounded-full p-2"
                            onClick={() => handlePan(-30, 0)}
                        >
                            <PiArrowRightBold className="text-lg text-white" />
                        </button>
                    </div>
                    <button
                        className="bg-blue-400 hover:bg-blue-500 rounded-full p-2 mt-1"
                        onClick={() => handlePan(0, -30)}
                    >
                        <PiArrowDownBold className="text-lg text-white" />
                    </button>
                </div>
            )}
        </div>
    );
};

const MyImageZoom = ({ image, children = null, onZoomChange = null }) => {
    const wrapperRef = useRef(null); // Ref oluştur
    const [openArrow, setOpenArrow] = useState(false);

    // Bağımlılık yoksa uyarı göster
    if (!hasZoomPanPinch) {
        return (
            <div style={{
                padding: "20px",
                border: "2px dashed #ff6b6b",
                borderRadius: "8px",
                backgroundColor: "#fff5f5",
                color: "#d63031",
                textAlign: "center"
            }}>
                <h3>MyZoomImage Bileşeni Kullanılamıyor</h3>
                <p>Bu bileşeni kullanmak için aşağıdaki paketi yüklemeniz gerekiyor:</p>
                <pre style={{
                    backgroundColor: "#f8f9fa",
                    padding: "10px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    textAlign: "left",
                    overflow: "auto"
                }}>
{`npm install react-zoom-pan-pinch`}
                </pre>
                {children || (
                    <img
                        src={image}
                        alt="Image"
                        style={{ maxWidth: "100%", marginTop: "10px", borderRadius: "4px" }}
                    />
                )}
            </div>
        );
    }

    const handlerTransform = (e) => {
        setOpenArrow(e.state.scale != 1);

        if (onZoomChange != null) {
            onZoomChange(e.state);
        }
    };

    return (
        <div className="zoom-container flex justify-center items-center">
            <TransformWrapper
                ref={wrapperRef}
                className="w-full flex items-center justify-center"
                onTransformed={handlerTransform}
            >
                <Controls wrapperRef={wrapperRef} openArrow={openArrow} />
                <TransformComponent className="w-full flex items-center justify-center">
                    {children || (
                        <img
                            src={image}
                            alt="Zoomable"
                            className="max-w-full object-cover rounded-md "
                        />
                    )}
                </TransformComponent>
            </TransformWrapper>
        </div>
    );
};

export default MyImageZoom;

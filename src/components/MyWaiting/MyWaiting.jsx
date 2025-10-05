import React from "react";
import './MyWaiting.css'; // Modal için CSS dosyası

// Opsiyonel bağımlılığı kontrol et
let Oval;
let hasLoaderSpinner = false;

try {
  const loaderSpinner = require("react-loader-spinner");
  Oval = loaderSpinner.Oval;
  hasLoaderSpinner = true;
} catch (error) {
  console.warn("MyWaiting: react-loader-spinner bağımlılığı bulunamadı. MyWaiting bileşenini kullanmak için 'react-loader-spinner' paketini yükleyin.");
}

export default function MyWaiting({ show = false, message = null }) {
    if (!show) {
        return null;
    }

    return (
        <div className="my-waiting-backdrop">
            <div className="my-waiting-content">
                {hasLoaderSpinner ? (
                    <Oval
                        visible={true}
                        height="60"
                        width="60"
                        color="#fff"
                        secondaryColor="#cdcdcd"
                        ariaLabel="oval-loading"
                        strokeWidth={5}
                    />
                ) : (
                    <div style={{
                        width: "60px",
                        height: "60px",
                        border: "5px solid #cdcdcd",
                        borderTop: "5px solid #fff",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite"
                    }}></div>
                )}
                {message && <span className="my-waiting-message">{message}</span>}
            </div>
        </div>
    );
}

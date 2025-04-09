import React from "react";
import { Oval } from "react-loader-spinner";

import './MyWaiting.css'; // Modal için CSS dosyası

export default function MyWaiting({ show = false, message = null }) {
    if (!show) {
        return null;
    }

    return (
        <div className="my-waiting-backdrop">
            <div className="my-waiting-content">
                <Oval
                    visible={true}
                    height="60"
                    width="60"
                    color="#fff"
                    secondaryColor="#cdcdcd"
                    ariaLabel="oval-loading"
                    strokeWidth={5}
                />
                {message && <span className="my-waiting-message">{message}</span>}
            </div>
        </div>
    );
}

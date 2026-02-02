import React from "react";
import "./MySwitch.css";

const MySwitch = ({ checked, onChange, color = "blue" }) => {
  let colorClass = "bg-blue-500";
  let dotColorClass = "bg-white";
  switch (color) {
    case "blue":
      colorClass = "bg-blue-500";
      break;
    case "green":
      colorClass = "bg-green-500";
      break;
    case "red":
      colorClass = "bg-red-500";
      break;
    case "yellow":
      colorClass = "bg-yellow-500";
      break;
    case "purple":
      colorClass = "bg-purple-500";
        break;
    case "orange":
      colorClass = "bg-orange-500";
      break;
    case "pink":
      colorClass = "bg-pink-500";
      break;
    case "brown":
      colorClass = "bg-brown-500";
      break;
    case "indigo":
      colorClass = "bg-indigo-500";
      break;
    case "gray":
      colorClass = "bg-gray-500";
      break;
    default:
      colorClass = "bg-blue-500";
      break;
  }
  return (
    <div className="relative">
      <div className="flex items-center">
        <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
        <div className={`w-10 h-4 rounded-full shadow-inner ${checked ? colorClass : "bg-gray-400"}`}></div>
        <div className={`dot absolute w-6 h-6 rounded-full shadow -left-1 -top-1 transition transform ${checked ? "translate-x-6 " + dotColorClass : "translate-x-0 bg-white"}`}></div>
      </div>
    </div>
  );
};

export default MySwitch;

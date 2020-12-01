import React from "react";
import "./styles.css";

export default function Button({
  children,
  disabled = false,
  type = "button",
  onClick,
}) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className="transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-blue-700 hover:bg-blue-900 text-white font-normal py-2 px-4 mr-1 rounded">
      {children}
    </button>
  );
}

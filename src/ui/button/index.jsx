import React from "react";
import "./styles.css";

export default function Button({
  children,
  disabled = false,
  type = "button",
  onClick,
}) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className="__rival_button">
      {children}
    </button>
  );
}

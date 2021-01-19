import React from 'react';
import './styles.css';
import Button from '../../ui/button';
import { Link } from "react-router-dom";

export default function Banner({ }) {
  return (
    <div className="banner-wrapper">
      <div className="gap"></div>
      <img src="assets/images/neverbackdown.png" className="cover-img" />
      <div className="banner-title">Challenge anyone to a grappling</div>
      <div className="banner-sub-title">match in your area</div>
      <div className="banner-button">
        <Button onClick={() => { window.location = "/faq"; }} >
          LEARN HOW
        </Button>
      </div>
    </div>
  );
}

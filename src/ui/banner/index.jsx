import React from 'react';
import './styles.css';
import Button from '../../ui/button';

export default function Banner({}) {
  return (
    <div className="banner-wrapper">
      <div className="gap"></div>
      <img src="assets/images/neverbackdown.png" className="cover-img" />
      <div className="banner-title">Challenge anyone to a grappling</div>
      <div className="banner-sub-title">match in your area</div>
      <div className="banner-button">
        <Button type="submit">Learn More</Button>
      </div>
    </div>
  );
}

import React, { Component } from 'react';

// This component renders the Analytics page for an individual ad, including a sidebar that displays
const StatBar = ({adChoice, count, total}) => (
    <div className="stat-box z-depth-1">
      <div className="container stats ">
        <div className="font-18 bold gap red-font" >{adChoice.title}</div>
        <span className="font-16 bold">Total Views:</span> {count}<br></br>
        <span className="font-16 bold">Cost Per View:</span> {`$${adChoice.cost}`}<br></br>
        <span className="font-16 bold">Total Spend:</span> {total}
      </div>
    </div>
)

export default StatBar

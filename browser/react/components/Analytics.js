/* global ga */

import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

// import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Legend, Bar} from 'recharts';


const data = [
      {name: '0', SMA_drug: 100, SMA_vehicle: 100, WT: 100},
      {name: '10', SMA_drug: 85, SMA_vehicle: 65, WT: 100},
      {name: '20', SMA_drug: 85, SMA_vehicle: 55, WT: 100},
      {name: '30', SMA_drug: 80, SMA_vehicle: 45, WT: 100},
      {name: '40', SMA_drug: 80, SMA_vehicle: 40, WT: 95},
      {name: '50', SMA_drug: 70, SMA_vehicle: 35, WT: 95},
      {name: '60', SMA_drug: 68, SMA_vehicle: 30, WT: 95},
];

const data2= [
      {name: 'Overall', SMA_drug: 78, SMA_vehicle: 49, WT: 97}
];


export default class Analytics extends Component {

    render() {

        return (
          <div>
              <Col xs={7} >
                    <h4 className='text-center'>Kaplan-Meier Survival Curves</h4>
                    <LineChart width={550} height={400} data={data} syncId="anyId"
                          margin={{top: 40, right: 80, left: 0, bottom: 0}}>
                      <Brush />
                      <XAxis dataKey="name" label="Days"/>
                      <YAxis label="% Survival"/>
                      <CartesianGrid strokeDasharray="3 3"/>
                      <Tooltip/>
                      <Line type='monotone' dataKey='SMA_drug' stroke='#504ac6' fill='#504ac6' strokeWidth='2'/>
                      <Line type='monotone' dataKey='SMA_vehicle' stroke='#c6504a' fill='#c6504a'  strokeWidth='2'/>
                      <Line type='monotone' dataKey='WT' stroke='#4ac650' fill='#4ac650'  strokeWidth='2'/>
                    </LineChart>

                    <AreaChart width={550} height={200} data={data} syncId="anyId"
                          margin={{top: 10, right: 80, left: 0, bottom: 0}}>
                        <defs>
                            <linearGradient id="colorWT" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#4ac650" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#4ac650" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorDrug" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#504ac6" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#504ac6" stopOpacity={0}/>
                            </linearGradient>
                               <linearGradient id="colorVehicle" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#c6504a" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#c6504a" stopOpacity={0}/>
                            </linearGradient>
                      </defs>
                      <XAxis dataKey="name" label="Days"/>
                      <YAxis/>
                      <CartesianGrid strokeDasharray="3 3"/>
                      <Tooltip/>
                      <Area type='monotone' dataKey='WT' stackId="1" stroke='#4ac650' fillOpacity={1} fill="url(#colorWT)"/>
                      <Area type='monotone' dataKey='SMA_drug' stackId="1" stroke='#82ca9d' fillOpacity={1} fill="url(#colorDrug)"/>
                      <Area type='monotone' dataKey='SMA_vehicle' stackId="1" stroke='#82ca9d' fillOpacity={1} fill="url(#colorVehicle)" />
                    </AreaChart>
              </Col>
              <Col xs={5}>
                  <h4 className='text-center'>Average Survival</h4>
                  <BarChart width={400} height={400} data={data2}
                        margin={{top: 40, right: 30, left: 20, bottom: 5}}>
                   <XAxis dataKey="name"/>
                   <YAxis label="Avg # of days"/>
                   <CartesianGrid strokeDasharray="3 3"/>
                   <Tooltip/>
                   <Legend />
                   <Bar dataKey='SMA_drug' fill='#504ac6' />
                   <Bar dataKey='SMA_vehicle' fill='#c6504a' />
                   <Bar dataKey='WT' fill='#4ac650' />
                  </BarChart>
              </Col>
          </div>

        )
    }
}

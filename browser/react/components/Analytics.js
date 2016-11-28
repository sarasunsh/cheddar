import React, { Component } from 'react';
import axios from 'axios';
import { filterFunc, dataSplit } from './filterFunc';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const test= [
      {name: 'Average', Average: 78}
];

export default class Analytics extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [],
            filters: {
                'gender': false,
                'age': false,
                'petOwner': false
            },
            graphData: []
        }
        this.filterData = this.filterData.bind(this);
        this.toggleClick = this.toggleClick.bind(this);
    }

    componentDidMount(){
        // axios.get(`/api/ad/${this.props.currentAd.id}`)
        axios.get('/api/ad/2')
        .then(res => this.setState({ data: res.data }))
        .catch(err => console.log(err))
    }

    filterData(){
        if (this.state.data) {
            const scores = filterFunc(this.state.data, this.state.filters)
            if (Object.keys(scores).length > 1) {
              const splits = dataSplit(scores)
              this.setState({graphData: splits})
            } else {
              this.setState({graphData: scores[""].reduce((a,b)=>a+b, 0) / scores[""].length})
            }
        } else {
            return 0
        }
    }

    toggleClick(fltr){
        let newFilters = Object.assign(this.state.filters, {[fltr]: !this.state.filters[fltr]})
        this.setState({filters: newFilters})
        this.filterData()
    }

    render(){
      console.log('length', this.state.graphData.length, this.state.graphData)
        return (
            <div>
              <div className="col s3">
                  <div className="switch" onChange={() => this.toggleClick('gender')}>
                    <p> Filter by gender </p>
                    <label>
                      Off
                      <input type="checkbox"/>
                      <span className="lever"></span>
                      On
                    </label>
                  </div>
                  <div className="switch" onChange={() => this.toggleClick('age')}>
                    <p> Filter by age </p>
                    <label>
                      Off
                      <input type="checkbox"/>
                      <span className="lever"></span>
                      On
                    </label>
                  </div>
                 <div className="switch" onChange={() => this.toggleClick('petOwner')}>
                    <p> Filter by pet ownership status </p>
                    <label>
                      Off
                      <input type="checkbox"/>
                      <span className="lever"></span>
                      On
                    </label>
                  </div>
              </div>
              <div className="col s9">
                {this.state.graphData.length <= 1 ?
                  <BarChart width={400} height={400} data={test}
                        margin={{top: 40, right: 30, left: 20, bottom: 5}}>
                   <XAxis dataKey="name"/>
                   <YAxis />
                   <CartesianGrid strokeDasharray="3 3"/>
                   <Tooltip/>
                   <Legend />
                   <Bar dataKey='Average' fill='#504ac6' />
                  </BarChart>
                  :
                  <div>
                    <BarChart width={600} height={300} data={this.state.graphData[0]}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    {this.state.graphData[1].map((row,idx) => (
                        <Bar key={idx} dataKey={row.name} fill="#8884d8" />
                      )
                    )}
                  </BarChart>
                   <BarChart width={600} height={300} data={this.state.graphData[1]}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    {this.state.graphData[0].map((row,idx) => (
                        <Bar key={idx} dataKey={row.name} fill="#8884d8" />
                      )
                    )}
                  </BarChart>
                  </div>
                }
              </div>
            </div>
        );
    }
}

import React, { Component } from 'react';
import axios from 'axios';
import { filterFunc } from './filterFunc';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default class Analytics extends Component {
    constructor(props){
        super(props)
        this.state = {
            rawData: [],
            filters: {
                'gender': false,
                'age': false,
                'petOwner': false
            },
            total: 0,
            count: 0,
            graphData: []
        }
        this.toggleClick = this.toggleClick.bind(this);
    }

    componentDidMount(){
        // axios.get(`/api/ad/${this.props.currentAd.id}`)
        axios.get('/api/ad/2')
        .then(res => {
            const filtered = filterFunc(res.data[2], this.state.filters)
            this.setState({
                total: res.data[0],
                count: res.data[1],
                rawData: res.data[2],
                graphData: filtered
            })
        })
        .catch(err => console.log(err))
    }

    toggleClick(fltr){
        let newFilters = Object.assign(this.state.filters, {[fltr]: !this.state.filters[fltr]});
        const newData = filterFunc(this.state.rawData, newFilters);
        this.setState({
            filters: newFilters,
            graphData: newData
        });
    }

    render(){
        console.log(this.state)
        const data = this.state.graphData

        const fillDict = {
            "Average": '#ad1457',
            "gender:male": "#3f51b5",
            'gender:female': "#8884d8"
        }
        return (
            <div>
              <h5>{this.state.count} people have watched this ad.</h5>
              <h5>{this.state.total} has been paid out to viewers for this ad.</h5>
              <div className="col s4">
                <div className="card-panel teal lighten-4 z-depth-5">Select up to two filters. </div>
                  <div className="switch" onChange={() => this.toggleClick('gender')}>
                    <p> Gender </p>
                    <label>
                      Off
                      <input type="checkbox"/>
                      <span className="lever"></span>
                      On
                    </label>
                  </div>
                  <div className="switch" onChange={() => this.toggleClick('age')}>
                    <p> Age </p>
                    <label>
                      Off
                      <input type="checkbox"/>
                      <span className="lever"></span>
                      On
                    </label>
                  </div>
                 <div className="switch" onChange={() => this.toggleClick('petOwner')}>
                    <p> Pet ownership status </p>
                    <label>
                      Off
                      <input type="checkbox"/>
                      <span className="lever"></span>
                      On
                    </label>
                  </div>
              </div>
              <div className="col s4">
                {data.length === 1 ?
                     <BarChart width={600} height={300} data={data}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend />
                        {Object.keys(data[0]).filter(key => key !== 'name').map((label,idx) => (
                            <Bar key={idx} dataKey={label} fill={fillDict[label]} />
                          )
                        )}
                    </BarChart>
                    :
                    data.map(cut => (
                            <BarChart width={600} height={300} data={cut}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip/>
                                <Legend />
                                {Object.keys(cut[0]).filter(key => key !== 'name').map((label,idx) => (
                                    <Bar key={idx} dataKey={label} fill="#8884d8" />
                                  )
                                )}
                            </BarChart>
                        )
                    )
                }
              </div>
            </div>
        );
    }
}


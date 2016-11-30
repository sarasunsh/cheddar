import React, { Component } from 'react';
import axios from 'axios';
import { filterFunc, generateConfig } from './filterFunc';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import ReactHighcharts from 'react-highcharts'; // Expects that Highcharts was loaded in the code.


export default class Analytics extends Component {
    constructor(props){
        super(props)
        this.state = {
            rawData: [],
            filters: {
                'gender': false,
                'age': false,
                'petOwner': false,
                'income':false
            },
            total: 0,
            count: 0,
            graphData: [ [ ['Overall'], [ {name: 'Average', data: [0] } ] ] ],
            disabled: false
        }
        this.toggleClick = this.toggleClick.bind(this);
    }

    componentDidMount(){
        axios.get(`/api/ad/2`)
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

        if (Object.keys(newFilters).filter(key => newFilters[key]).length < 2) {
            this.setState({
                filters: newFilters,
                graphData: newData,
                disabled: false
            });
        } else {
            this.setState({
                filters: newFilters,
                graphData: newData,
                disabled: true
            });
        }
    }

    render(){
        const filters = Object.keys(this.state.filters)
        const configArr = this.state.graphData.map(set => generateConfig(set[0], set[1]))

        return (
            <div>
              <h5>{this.state.count} people have watched this ad.</h5>
              <h5>{this.state.total} has been paid out to viewers for this ad.</h5>
              <div className="col s4">
                <div style={this.state.disabled ? {visibility:"visible"} : {visibility:"hidden"}} className="card-panel teal lighten-4 z-depth-5">You can only select up to two filters. Please unselect one filter in order to add another.</div>
                {filters.map((filterName, idx) => (
                      <div key={idx} className="switch" onChange={() => this.toggleClick(filterName)}>
                        <p> {filterName} </p>
                        <label>
                          Off
                          <input disabled={this.state.disabled && !this.state.filters[filterName]} type="checkbox"/>
                          <span className="lever"></span>
                          On
                        </label>
                      </div>
                    )
                )}
              </div>
              <div className="col s4">
                {configArr.map((config, idx) => (
                        <ReactHighcharts key={idx} config={config}></ReactHighcharts>
                    )
                )}
              </div>
            </div>
        )
    }
}


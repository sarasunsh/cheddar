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
                'income':false,
                maritalStatus: false,
                'education': false
            },
            total: 0,
            count: 0,
            graphData: [ [ ['Overall'], [ { data: [] } ] ] ],
            disabled: false
        }
        this.toggleClick = this.toggleClick.bind(this);
    }

    componentDidMount(){
        axios.get(`/api/ad/${this.props.adChoice.id}`)
        // axios.get(`/api/ad/2`)
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
        const newFilters = Object.assign(this.state.filters, {[fltr]: !this.state.filters[fltr]});
        const newData = filterFunc(this.state.rawData, newFilters);
        const bool = (Object.keys(newFilters).filter(key => newFilters[key]).length < 2) ? false: true;
        this.setState({
            filters: newFilters,
            graphData: newData,
            disabled: bool
        });

        if (bool) {
            Materialize.toast('You can only select up to two filters. If you would like to add another filter, please first remove one of the current selections.', 3000, 'rounded')
        }
    }

    render(){
        const filters = Object.keys(this.state.filters)
        const configArr = this.state.graphData.map(set => generateConfig(set[0], set[1]))
        if (configArr.length < 2) {
            configArr.map(config => config['legend'] = {enabled:false}) // generate config objects for chart
        }

    return (
      <div id="ads">
        <ul id="slide-out" className="side-nav fixed">
            <div className="userView">
              {/*    <table>
                    <thead>
                      <tr>
                          <th data-field="id">Views</th>
                          <th data-field="name">Cost Per View</th>
                          <th data-field="price">Total Spend</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>{this.state.count}</td>
                        <td>{this.props.adChoice.cost}</td>
                        <td>{this.state.total}</td>
                      </tr>
                    </tbody>
                  </table> */}
                 <div className="card-panel teal lighten-4 z-depth-3">
                    <li>Views: {this.state.count}</li>
                    <li>Cost Per View: {`$${this.props.adChoice.cost}`}</li>
                    <li>Total Spend: {this.state.total}</li>
                 </div>

                  <h6>Filter by demographic:</h6>
                {filters.map((filterName, idx) => (
                      <li key={idx} className="switch" onChange={() => this.toggleClick(filterName)}>
                        <div className="col s5">{filterName}</div>

                        <div className="col s7">

                            <label>
                              Off
                              <input disabled={this.state.disabled && !this.state.filters[filterName]} type="checkbox"/>
                              <span className="lever"></span>
                              On
                            </label>
                        </div>
                      </li>
                    )
                )}
            </div>
        </ul>
        <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
        <div className="container videocards">
           {configArr.map((config, idx) => (
                  <ReactHighcharts class="center-align" key={idx} config={config}></ReactHighcharts>
              )
          )}
        </div>
      </div>
    )
  }
}



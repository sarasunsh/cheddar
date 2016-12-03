import React, { Component } from 'react';
import axios from 'axios';
import { filterFunc, generateConfig, formatFilter } from './filterFunc';
import ReactHighcharts from 'react-highcharts'; // Expects that Highcharts was loaded in the code.
import StatBar from './StatBar';

// This component renders the Analytics page for an individual ad, including a sidebar that displays statistics and a section with
export default class Analytics extends Component {
    constructor(props){
        super(props)
        this.state = {
            rawData: [], // all the View data for this particular ad
            filters: { // all filters are initially turned off
                'gender': false,
                'age': false,
                'petOwner': false,
                'income':false,
                'maritalStatus': false,
                'education': false
            },
            total: 0, // total number of Smile Points awarded to viewers for watching the ad
            count: 0, // total number of views
            graphData: [ [ ['Overall'], [ { data: [] } ] ] ], // cuts of the data for the graphs -- these will be produced by the helper funcs from filterFunc
            disabled: false // Only 0-2 filters can be selected, the filters will be disabled at 2 until 1 filter is unselected
        }
        this.toggleClick = this.toggleClick.bind(this);
    }

    componentDidMount(){
        // Retrieve the View data for the ad from the database (includes User and Ad details)
        axios.get(`/api/ad/${this.props.adChoice.id}`)
        .then(res => {
            // Filter the data for the graphs (see filterFunc for more detail)
            const filtered = filterFunc(res.data[2], this.state.filters);
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
        // When a filter is toggle, the graph data should be updated accordingly and -- if a filter was added and the total number of filters is now 2 -- the user cannot select any more and will be notified
        const newFilters = Object.assign(this.state.filters, {[fltr]: !this.state.filters[fltr]});
        const newData = filterFunc(this.state.rawData, newFilters);
        const bool = (Object.keys(newFilters).filter(key => newFilters[key]).length < 2) ? false: true;
        this.setState({
            filters: newFilters,
            graphData: newData,
            disabled: bool
        });

        if (bool) {
            Materialize.toast('You can only select two filters. If you would like to add another, please first remove one of the current selections.', 1000, 'rounded')
        }
    }

    render(){
        const filters = Object.keys(this.state.filters)

        // generate config objects for chart
        const configArr = this.state.graphData.map(set => generateConfig(set[0], set[1]))
        if (configArr.length < 2) {
            configArr.map(config => config['legend'] = {enabled:false})
        }

        return (
          <div id="ads">
              <ul id="slide-out" className="side-nav fixed">
                <StatBar adChoice={this.props.adChoice} count={this.state.count} total={this.state.total}/>
                <div>
                  <div className="userView">
                    <div className="font-18 bold ">Filter by demographic</div>
                    <hr></hr>
                    {filters.map((filterName, idx) => (
                      <li key={idx} className="switch" onChange={() => this.toggleClick(filterName)}>
                        <div className="col s7 filter-name">{formatFilter(filterName)}</div>
                        <div className="col s5">
                          <label>
                            <input disabled={this.state.disabled && !this.state.filters[filterName]} type="checkbox"/>
                            <span className="lever"></span>
                          </label>
                        </div>
                      </li>
                    ))}
                  </div>
                </div>
              </ul>
              <div className="container videocards">
               {/* Create charts */}
                {configArr.map((config, idx) => (
                    <ReactHighcharts
                      class="center-align"
                      key={idx}
                      config={config}>
                    </ReactHighcharts>
                ))}
              </div>
          </div>
        )
    }
}

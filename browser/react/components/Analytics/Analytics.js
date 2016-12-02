import React, { Component } from 'react';
import axios from 'axios';
import { filterFunc, generateConfig, formatFilter } from './filterFunc';
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
                'maritalStatus': false,
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
        // axios.get(`/api/ad/${this.props.adChoice.id}`)
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
        const configArr = this.state.graphData.map(set => generateConfig(set[0], set[1]))
        if (configArr.length < 2) {
            configArr.map(config => config['legend'] = {enabled:false}) // generate config objects for chart
        }

        const test = {
            0: "trending_up",
            1: "trending_down"
        }
        return (
            <div id="ads">
                <ul id="slide-out" className="side-nav fixed">
                    <div className="stat-box z-depth-1">
                        <div className="container stats ">
                        {/*    {this.props.adChoice.title} */}
                            <div className="font-18 bold gap red-font" >Video Title goes here</div>
                            <span className="font-16 bold">Total Views:</span> {this.state.count}<br></br>
                            {/*<span className="bold">Cost Per View:</span> {`$${this.props.adChoice.cost}`}<br></br>*/}
                            <span className="font-16 bold">Cost Per View:</span> {`$5`}<br></br>
                            <span className="font-16 bold">Total Spend:</span> {this.state.total}
                        </div>
                    </div>
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
                                )
                            )}
                        </div>
                    </div>
                </ul>
                <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
                <div className="container videocards">
                    <ul className="collapsible" data-collapsible="accordion">
                        {configArr.map((config, idx) => (
                            <li key={idx}>
                                <div className="collapsible-header turqoise active"><i className="material-icons">{test[idx]}</i>{`Graph ${idx+1}`}</div>
                                <div className="collapsible-body">
                                    <ReactHighcharts
                                        class="center-align"
                                        config={config}>
                                    </ReactHighcharts>
                                </div>
                            </li>
                            )
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}

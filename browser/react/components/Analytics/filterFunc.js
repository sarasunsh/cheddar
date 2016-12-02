const constants = require('../../../../server/db/constants');

// Helper function that will return a config object for a HighCharts bar chart
export function generateConfig(categories, series) {
    const capCat = categories.map(cat => formatFilter(cat));
    const config =
    {
        chart: {
            type: 'column',
            // borderWidth: 1,
            plotBorderWidth: 1,
            marginRight: 100,
            plotBackgroundColor: '#FFFFFF',
            plotShadow: true
        },
        title: {
            text: 'Average Smile Score',
            style: {
                color: '#e57373',
                fontWeight: 'bold'
            }
        },
        subtitle: {
            text: 'Percentage of the Ad Spent Smiling'
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                }
            }
        },
        legend: {
            align: 'right',
            verticalAlign: 'right',
            layout: 'vertical',
            itemMarginTop: 10,
            x: 0,
            y: 100
        },
        xAxis: {
            categories: capCat,
            labels: {
                style: {
                    "fontSize": "16px"
                }
            }
        },
        yAxis: {
            min: 0,
            labels: {
                format: '{value}%',
                style: {
                    "fontSize": "13px"
                }
            },
            title: {
                text: 'Time spent smiling',
                margin: 20
            },
            crosshair: true
        },
        series: series
    }
    return config;
}

export function formatFilter(str){
    const result = str.replace( /([A-Z])/g, " $1" );
    return result.charAt(0).toUpperCase() + result.slice(1); // capitalize the first letter
}

// Input: raw View data for an ad, a filter category, a specific value for that filter
// Output: an array of View objects that passed through filter
function applyFilter(dataArr, filterVal, filterName){
    return dataArr.filter(obj => obj['user'][filterName] === filterVal);
}

// Input: an array of View objects that may have been filtered
// Output: a float representing the average smile score of those Views
function calcAvg(filteredData){
    const result = filteredData.map(obj => obj.smilyScore);
    return Math.round((result.reduce((a,b) => a+b, 0) / result.length)*100)/100;
}

// Input: raw View data for an ad and two filter categories
// Output: an array of the second filter's possible values, a HighCharts-formatted data series
function filterPass(dataArr, filterA, filterB){
    const valsToTestA = constants[filterA];
    const valsToTestB = constants[filterB];

    const series = valsToTestA.map((val) => {
            return {name:val, data: []}
    });

    for (let secondPassFilter of series){
        for (let firstPassFilter of valsToTestB){
            let firstPass = applyFilter(dataArr, firstPassFilter, filterB);
            let secondPass = applyFilter(firstPass, secondPassFilter.name, filterA);
            secondPassFilter['data'].push(calcAvg(secondPass))
        }
    }

    return [valsToTestB, series];
}

// filterFunc takes in the raw data on an ad's views and a filters object which will look like this:
// {
//     'gender': false,
//     'age': false,
//     'petOwner': false
// }
// It will then iteratively filter the data according to those filters that had been marked as true
// and calculate average smile score for each category
export function filterFunc(dataArr, filters){
    const toggledFilters = Object.keys(filters).filter(key => filters[key])

    // If no filters have been selected, just show average smile score for that ad
    if (toggledFilters.length === 0){
        return [ [ ['Overall'], [ {name: 'Average', data: [calcAvg(dataArr)] } ] ] ];

    // If only one filter is selected, simply apply that filter to the data
    } else if (toggledFilters.length === 1){
        const valsToTest = constants[toggledFilters[0]];
        const result = valsToTest.map(val => applyFilter(dataArr, val, toggledFilters[0])).map(result => calcAvg(result))
        return [ [ valsToTest, [ {name: toggledFilters[0], colorByPoint: true, data: result} ] ] ];

    // If two filters are selected, apply the filters in both possible orders to generate two "cuts" of data -- e.g. gender broken out by age, age broken out by gender
    } else {
        const series1 = filterPass(dataArr, toggledFilters[0], toggledFilters[1]);
        const series2 = filterPass(dataArr, toggledFilters[1], toggledFilters[0]);

        return [series1, series2]
    }
}

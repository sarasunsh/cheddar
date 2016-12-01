const constants = require('../../../../server/db/constants');

// Helper function that will return a config object for a HighCharts bar chart
export function generateConfig(categories, series) {
    const config =
    {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Average Smile Score (%)'
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                }
            }
        },
        xAxis: {
            categories: categories,
            crosshair: true
        },
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: 'Percent of ad spent smiling'
            }
        },
        series: series
    }
    return config;
}

export function formatFilter(str){
    var re = /[A-Z]/g
    if (re.exec(str)) {
      let cap = re.exec(str)[0]
      str = str.replace(cap, ' '+cap)
    }
    return str[0].toUpperCase()+str.slice(1);
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

const constants = require('../../../../server/db/constants');

// Input: raw View data for an ad
// Output: an array of View objects that passed through filter
function applyFilter(dataArr, filterVal, filterName){
    return dataArr.filter(obj => obj['user'][filterName] === filterVal)
}

// Input: an array of View objects that may have been filtered
// Output: a float representing the average smile score of those Views
function calcAvg(filteredData){
    const result = filteredData.map(obj => obj.smilyScore);
    return result.reduce((a,b) => a+b, 0) / result.length;
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

    if (toggledFilters.length === 0){
        return [ [ ['Overall'], [ {name: 'Average', data: [calcAvg(dataArr)] } ] ] ];
    } else if (toggledFilters.length === 1){
        const valsToTest = constants[toggledFilters[0]];
        const result = valsToTest.map(val => applyFilter(dataArr, val, toggledFilters[0])).map(result => calcAvg(result))
        return [ [ valsToTest, [ {name: 'Only One', data: result} ] ] ];
    } else {
        const valsToTest1 = constants[toggledFilters[0]];
        const valsToTest2 = constants[toggledFilters[1]];

        const series1 = valsToTest1.map((val) => {
            return {name:val, data: []}
        });
        const series2 = valsToTest2.map((val) => {
            return {name:val, data: []}
        });

        for (let secondPassFilter of series2){
            for (let firstPassFilter of valsToTest1){
                let firstPass = applyFilter(dataArr, firstPassFilter, toggledFilters[0]);
                let secondPass = applyFilter(firstPass, secondPassFilter.name, toggledFilters[1]);
                secondPassFilter['data'].push(calcAvg(secondPass))
            }
        }

        for (let secondPassFilter of series1){
            for (let firstPassFilter of valsToTest2){
                let firstPass = applyFilter(dataArr, firstPassFilter, toggledFilters[1]);
                let secondPass = applyFilter(firstPass, secondPassFilter.name, toggledFilters[0]);
                secondPassFilter['data'].push(calcAvg(secondPass))
            }
        }

        return [ [valsToTest2, series1], [valsToTest1, series2] ]
    }
}

export function generateConfig(categories, series) {
    const config =
    {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Average Smile Score'
        },
        xAxis: {
            categories: categories,
            crosshair: true
        },
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: '% of ad spent smiling'
            }
        },
        series: series
    }
    return config;
}

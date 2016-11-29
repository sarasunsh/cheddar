export function filterFunc(dataArr, filters){
    const filterVals = {
        'gender': ['male', 'female'],
        'petOwner': [true, false],
        'age': ['18-30', '31-40', '41-60', 'over 61']
    };

    const toggledFilters = Object.keys(filters).filter(key => filters[key])

    if (toggledFilters.length === 0){
        const scores = dataArr.map(obj => obj.smilyScore);
        return [{ name: 'Average', Average: scores.reduce((a,b) => a+b, 0) / scores.length }];
    } else {
        const result = {'total': dataArr};
        const filterKeys = Object.keys(filters);
        let filterCount = 1;

        // First we check which of the filters have been marked as TRUE
        for (let i = 0; i < filterKeys.length; i++){ // loop through each filter
            const category = filterKeys[i] // e.g. 'gender'
            if (filters[category]){ // check if filter category is marked as true
                filterCount += 1;
                // If the filter has been marked as true, pull out the "bins" for that specific filter (e.g. male/female for gender)
                const valsToTest = filterVals[filterKeys[i]];

                // Apply each filter bin to the data
                for (let j = 0; j < valsToTest.length; j++) {
                    const categoryVal = valsToTest[j]; // 'male', e.g.

                    // The filter needs to be applied to each subcategory, in the event that the data has already been broken out by another filter
                    const resultKeys = Object.keys(result); // Check the existing rows
                    for (let k = 0; k < resultKeys.length; k++) {
                        const title = resultKeys[k] // get the row Key e.g. total for 'total': [obj, obj...]
                        if (title.indexOf(category) === -1) {
                            const filteredData = result[title].filter(obj => obj['user'][category] === categoryVal) // apply the relevant filter
                            const newLabel = title+' + '+category+':'+categoryVal; //update the row title to reflect what filters have been applied
                            result[newLabel] = filteredData;
                        }
                    }
                }
            }
        }

        // We only want to keep the rows that had all the correct filter applied to them
        const realResult = {};
        const resultKeys = Object.keys(result);
        for (var i = 0; i < resultKeys.length; i++) {
            if (resultKeys[i].split('+').length === filterCount){
                const rawScores = result[resultKeys[i]].map(obj => obj.smilyScore);
                realResult[resultKeys[i].slice(8)] = rawScores.reduce((a,b)=> a+b, 0) / rawScores.length;
            }
        }

        // return realResult;
        //  ------realResult will look something like this: ------
            // { 'gender:male + age:18-30': [],
            //   'gender:female + age:18-30': [],
            //   'gender:male + age:31-40': [ 45.9491782123223, 87.2721635503694 ],
            //   'gender:female + age:31-40': [ 7.24998479709029, 56.6975717898458 ],
            //   'gender:male + age:41-60':
            //        [ 54.300981387496,
            //          75.0065764179453,
            //          39.0831215539947,
            //          74.3686443660408 ],
            //   'gender:female + age:41-60':
            //        [ 84.7930817864835,
            //          84.619707101956,
            //          71.8618392013013,
            //          4.8501466633752 ],
            //   'gender:male + age:over 61': [],
            //   'gender:female + age:over 61': []
            // }
        // If there were two filters applied to the data, then it should be split into two "cuts"
        if (toggledFilters.length===2){
            return dataSplit(realResult)
        } else {

            realResult['name'] = toggledFilters[0]; // If only one filter was applied, additional reformatting is not necessary
            return [realResult]
        }
    }
}

// This function converts the arrays from dataSplit to the format required by Re-charts
function chartFormat(result){
    const keys = Object.keys(result); // the keys are the category values, e.g. 'gender:male'
    const data = [];
    for (let i=0; i < keys.length; i++){
        const row = {}
        row.name = keys[i] // Recharts expects that they output should have the category value stored as name
        const elements = result[keys[i]] // this pulls the split values, e.g. [ 'age:18-30', 0,
    //     'age:31-40', 133.2213417626917,
    //     'age:41-60', 242.75932372547678,
    //     'age:over 61', 0 ]
        elements.map(function(el, idx) {
            if (idx%2 ===0) { // the even elements are the labels, the odd elements are the values
                row[el] = elements[idx+1]
            }
        })
        data.push(row)
    }
    return data;
        // e.g. const data = [
        //       {name: '18-30', male: 4000, female: 2400},
        //       {name: '31-40', male: 2000, female: 9800},
        //       {name: '41-60', male: 1890, female: 4800},
        //       {name: 'over 61', male: 2390, female: 3800},
        // ];
}

// This function takes the realResult from filterFunc above and generates two "splits" of the data
 function dataSplit(data){
    const keys = Object.keys(data); // the keys are the combinations of filters, e.g. 'gender:male + age:18-30'
    const result1 = {};
    const result2 = {};
    for (let i=0; i < keys.length; i++){
        const labels = keys[i].split(' + ');
        if (!result1[labels[0]]){
            result1[labels[0]] = [ labels[1], data[keys[i]] ] // compute average
        } else {
            result1[labels[0]].push( labels[1], data[keys[i]])
        }
        if (!result2[labels[1]]){
            result2[labels[1]] = [ labels[0], data[keys[i]] ]
        } else {
            result2[labels[1]].push( labels[0], data[keys[i]] )
        }
    }
    // result1 will look something like this
    // { 'gender:male':
    //     [ 'age:18-30', 0,
    //     'age:31-40', 133.2213417626917,
    //     'age:41-60', 242.75932372547678,
    //     'age:over 61', 0 ],
    // 'gender:female':
    //     [ 'age:18-30', 0,
    //     'age:31-40', 63.947556586936095,
    //     'age:41-60',246.12477475311596,
    //     'age:over 61', 0 ]
    // }
    //  result2 will look something like this (the other way to split the data)
    // {
    //     'age:18-30':
    //         [ 'gender:male', 0, 'gender:female', 0 ],
    //     'age:31-40':
    //         [ 'gender:male', 133.2213417626917, 'gender:female', 63.947556586936095 ],
    //     'age:41-60':
    //         [ 'gender:male', 242.75932372547678, 'gender:female', 246.12477475311596 ],
    //     'age:over 61':
    //         [ 'gender:male', 0, 'gender:female', 0 ]
    // }
    return [chartFormat(result1), chartFormat(result2)]
}

export function scale(domain, range) {
    const m = (range[1] - range[0]) / (domain[1] - domain[0]);
    return (value: number) => {
        const res = range[0] + m * (value - domain[0]);
        return res
    }
}


function findMinMax(data){
    let min1 = Math.min(...data);
    let max1 = Math.max(...data);
    let length = Math.floor(max1-min1).toString().length;  // how big is the difference between th 
    let min = Math.round((min1)/10**(length-1))*10**(length-1) // Find nearest 1,10,100,... to min
    let max = Math.round((max1)/10**(length-1))*10**(length-1) // Find nearest 1,10,100,... to max
    return [min, max]
}

export function setYaxis(series) {
    let min = findMinMax(series[0].values)[0];
    let max = findMinMax(series[0].values)[1];

    for (let i = 1; i < series.length; i++){
        if (findMinMax(series[i].values)[0] < min) {
            min = findMinMax(series[i].values)[0];
        };
        if (findMinMax(series[i].values)[1] > max) {
            min = findMinMax(series[i].values)[1];
        };

    }

    let steps = 4;
    let stepSize = (max - min) / (steps - 1);

    if (stepSize > 1) {
        stepSize = Math.ceil(stepSize);
    }
  
    // Generate labels with whole number steps
    let yLabels = Array.from({ length: steps }, (_, i) => min + i * stepSize);
    yLabels.push(yLabels[yLabels.length-1] + stepSize/2);
    yLabels.unshift(yLabels[0] - stepSize/2);
    return yLabels
}
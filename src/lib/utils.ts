export function scale(domain, range) {
    const m = (range[1] - range[0]) / (domain[1] - domain[0])
    return (value: number) => {
        const res = range[0] + m * (value - domain[0])
        return res
    }
}

export function setYaxis(series) {
    const allValues = series.flatMap(s => s.values);

    let min1 = Math.min(...allValues)
    let max1 = Math.max(...allValues)

    let length = Math.floor(max1-min1).toString().length

    let min = Math.floor((min1)/10**(length-1))*10**(length-1) 
    let max = Math.ceil((max1)/10**(length-1))*10**(length-1) 

    let steps = 4;
    let stepSize = (max - min) / (steps - 1)

    // do not allow decimals unless its a small difference between smallest and largest number
    if (stepSize > 1) {
        stepSize = Math.ceil(stepSize)
    }
  
    // Generate labels for y-axis
    let yLabels = Array.from({ length: steps }, (_, i) => min + i * stepSize)
    yLabels.push(yLabels[yLabels.length-1] + stepSize/2)
    yLabels.unshift(yLabels[0] - stepSize/2)
    return yLabels
}
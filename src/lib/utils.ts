export function scale(domain, range) {
    const m = (range[1] - range[0]) / (domain[1] - domain[0])
    return (value: number) => {
        const res = range[0] + m * (value - domain[0])
        return res
    }
}

export function setYaxis(series,graphtype) {
    const allValues = series.flatMap(s => s.values)

    let min1 = (graphtype === "line" ? Math.min(...allValues) : Math.min(0,Math.min(...allValues)))
    let max1 = Math.max(...allValues)
    let dec = false

    if (min1 === max1) {
        min1 = min1 - 1
        max1 = max1 + 1
    }

    // Number of digits
    let length = Math.floor(Math.log10(max1-min1)+1)

    // If difference between largest and smallest number is less than 1, multiply by 10, divide by 10 after y_axis is made
/*     if (max1-min1 < 2) {
        dec = true
        max1 = max1*10
        min1 = min1*10
    } */

    // Find the nearest whole 10,100,1000, etc
    let min = Math.floor((min1)/10**(length-1))*10**(length-1) 
    let max = Math.ceil((max1)/10**(length-1))*10**(length-1) 

    let range = max-min

    let stepSize = Math.pow(10, Math.floor(Math.log10(range))); // (max - min) / (steps - 1)
    console.log(stepSize)
    // if difference between largest and highest number is small, make smaller stepsize and thus more steps
    for (let j = 0; range / stepSize < 5; j++) {
        if (range / stepSize < 2) {
            stepSize /= 5;
        } else if (range / stepSize < 5) {
            stepSize /= 2;
        }
    }
/*     if (range / stepSize < 2) {
        stepSize /= 5;
    } else if (range / stepSize < 5) {
        stepSize /= 2;
    } */
    console.log(stepSize)
    // Determine the start and end of the range, rounded nicely
    let start = Math.floor(min / stepSize) * stepSize;
    let end = Math.ceil(max / stepSize) * stepSize;
    // Generate 5 evenly spaced elements
    let y_axis = [];

    const numberofsteps = range/stepSize
    y_axis.push(start);
    for (let i = 1; y_axis[i-1] < max; i++) {
        y_axis.push(start + i * (end - start) / (numberofsteps));
    }
   /*  y_axis = y_axis.map(n => Math.round(n)) */
    if (min1 >= y_axis[1]) {
        y_axis.splice(0,1)
    }
    if (max1 <= y_axis[y_axis.length-2]) {
        y_axis.splice(y_axis.length-1,1)
    }
    y_axis.push(y_axis[y_axis.length-1] + stepSize/2)
    y_axis.unshift(y_axis[0] - stepSize/2)
/*     if (dec === true) {
        for (let i = 0; i < y_axis.length; i++) {
            y_axis[i] = y_axis[i]/10
        }
    } */
    return y_axis
}
export function scale(domain, range) {
    const m = (range[1] - range[0]) / (domain[1] - domain[0])
    return (value: number) => {
        const res = range[0] + m * (value - domain[0])
        return res
    }
}

export function setYaxis(series, graphtype) {
    const allValues = series.flatMap(s => s.values)
    let min1 = (graphtype === "line" ? Math.min(...allValues) : Math.min(0,Math.min(...allValues)))
    let max1 = Math.max(...allValues)
    let dec = false

    // If all values are the same, add some padding
    if (min1 === max1) {
        min1 = min1 - 1
        max1 = max1 + 1
    }

    // If difference between largest and smallest number is less than 1, multiply by 10, divide by 10 after y_axis is made
    if (max1-min1 < 2) {
        dec = true
        max1 = max1*10
        min1 = min1*10
    }

    // Number of digits
    let length = Math.floor(Math.log10(max1-min1)+1)
    // Find the nearest whole 1,10,100,1000, etc
    let min = Math.floor((min1)/10**(length-1))*10**(length-1) 
    let max = Math.ceil((max1)/10**(length-1))*10**(length-1) 
    let range = max-min
    let stepSize = Math.pow(10, Math.floor(Math.log10(range))); 

    // When difference between max and min is small, allow decimals, and make them nice
    if (range / stepSize < 2) {
        stepSize /= 5;
    } else if (
        range / stepSize < 5) {
        stepSize /= 2;
    }

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
    y_axis = y_axis.map(n => Math.round(n))
    
    if (min1 >= y_axis[1]) {
        y_axis.splice(0,1)
    }

    if (max1 <= y_axis[y_axis.length-2]) {
        y_axis.splice(y_axis.length-1,1)
    }
    y_axis.push(y_axis[y_axis.length-1] + stepSize/2)
    y_axis.unshift(y_axis[0] - stepSize/2)

    if (dec === true) {
        for (let i = 0; i < y_axis.length; i++) {
            y_axis[i] = y_axis[i]/10
        }
    }
    return y_axis
}

export function setXaxis(values, density) {
    // Check if density is less than 0.01, if so take away
    let delete_before = 0
    let delete_after = density.length-1

    for (let i = 0; i < density.length; i++){
        delete_before = i;
        if (density[i] > 0.01){
            break;
        }
    }
    for (let i = density.length-1; i >= 0; i--){
        delete_after = i;
        if (density[i] > 0.01){
            break;
        }
    }

    values = values.slice(delete_before, delete_after+1)

    let min1 = Math.min(...values) 
    let max1 = Math.max(...values)
    let dec = false

    // If all values are the same, add some padding
    if (min1 === max1) {
        min1 = min1 - 1
        max1 = max1 + 1
    }

    // If difference between largest and smallest number is less than 1, multiply by 10, divide by 10 after y_axis is made
    if (max1-min1 < 2) {
        dec = true
        max1 = max1*10
        min1 = min1*10
    }

    // Number of digits
    let length = Math.floor(Math.log10(max1-min1)+1)
    // Find the nearest whole 1,10,100,1000, etc
    let min = Math.floor((min1)/10**(length-1))*10**(length-1) 
    let max = Math.ceil((max1)/10**(length-1))*10**(length-1) 
    let range = max-min
    let stepSize = Math.pow(10, Math.floor(Math.log10(range)));

    // When difference between max and min is small, allow decimals, and make them nice
    if (range / stepSize < 2) {
        stepSize /= 5;
    } else if (
        range / stepSize < 5) {
        stepSize /= 2;
    }

    // Determine the start and end of the range, rounded nicely
    let start = Math.floor(min / stepSize) * stepSize;
    let end = Math.ceil(max / stepSize) * stepSize;
    // Generate 5 evenly spaced elements
    let x_axis = [];
    const numberofsteps = range/stepSize
    x_axis.push(start);

    for (let i = 1; x_axis[i-1] < max; i++) {
        x_axis.push(start + i * (end - start) / (numberofsteps));
    }
    x_axis = x_axis.map(n => Math.round(n))
    
    if (min1 >= x_axis[1]) {
        x_axis.splice(0,1)
    }

    if (max1 <= x_axis[x_axis.length-2]) {
        x_axis.splice(x_axis.length-1,1)
    }

    if (dec === true) {
        for (let i = 0; i < x_axis.length; i++) {
            x_axis[i] = x_axis[i]/10
        }
    }
    return x_axis
}
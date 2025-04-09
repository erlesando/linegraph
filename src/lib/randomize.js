export function randomizeData(newdata) {
    newdata.series = newdata.series.map(s => ({
        ...s,
        values: s.values.map(() => Math.floor(Math.random() * 10 ))
    }))
    return newdata;
}

export function randomizeData_negative(newdata) {
    newdata.series = newdata.series.map(s => ({
        ...s,
        values: s.values.map(() => Math.floor(Math.random() * 26 - 10))
    }))
    return newdata;
}

function sample_exp(lambda, n) {
    // Sample n values from uniform distribution in [0, 1]
    let u = Array.from({ length: n }, () => Math.random());
    // Exponential distribution: -ln(1 - u) / lambda
    let vals = u.map((val,i) => -Math.log(1-u[i])/lambda);
    return vals;
}

function sample_stdnormal(n) {
    // Box-Muller transform to sample from standard normal distribution
    let theta = Array.from({ length: n/2 }, () => Math.random() * 2 * Math.PI);
    let exp_data = sample_exp(0.5, n/2)
    const x = exp_data.map((val, i) => Math.sqrt(val) * Math.cos(theta[i]));
    const y = exp_data.map((val, i) => Math.sqrt(val) * Math.sin(theta[i]));
    let vals = [...x, ...y]
    return vals;
}

function sample_normal(mean, variance, n) {
    let stdnorm_data = sample_stdnormal(n)
    let vals = stdnorm_data.map(num => num * Math.sqrt(variance) + mean)
    return vals
}

function find_index(length, array, value) {
    let index = 0;
    for (let i = 0; i < length; i++) {
        if (array[i] > value) {
            index = i-1;
            break;
        }
    }
    return index;
}

export function randomize_data(newdata, type, n){
    let vals;
    if (type === "uniform"){
        vals = Array.from({ length: n }, () => Math.random());
    } else if (type === "exponential"){
        vals = sample_exp(1.5, n)
    } else if (type === "normal"){
        vals = sample_normal(0,1,n)
    }

    let num_bins = 30
    let bin_size = (Math.max(...vals)-Math.min(...vals))/num_bins
    let frequency = Array(num_bins+1).fill(0)
    let xcols = Array.from({ length: num_bins+1 }, (_, i) => (i*bin_size+Math.min(...vals)))
    vals.forEach(num => {
        let bin_index = find_index(num_bins, xcols, num)
        frequency[bin_index] += 1
    })
    let density = frequency.map((val) => val/(n*bin_size))
    
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
    console.log(delete_before, delete_after)
    xcols = xcols.slice(delete_before, delete_after+1)
    density = density.slice(delete_before, delete_after+1)

    newdata.xColumns = xcols.map(num => Math.round(num*10)/10)
    newdata.series[0].values = density;
    return newdata
}
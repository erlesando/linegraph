export function sample_unif(newdata, n) {
    vals = Array.from({ length: n }, () => Math.floor(Math.random() * 10 ))
    xcols = Array.from({ length: n }, (_, i) => i+1)
/*     newdata.series = newdata.series.map(s => ({
        ...s,
        values: s.values.map(() => Math.floor(Math.random()))
    })) */
    return {xcols, vals};
}

export function sample_exp(lambda, n) {
    // Exponential distribution: -ln(1 - u) / lambda where u is a uniform random variable in [0, 1]

    let vals = Array.from({ length: n }, () => -Math.log(1-Math.random())/lambda);

/*     newdata.xColumns = Array.from({ length: num_bins+1 }, (_, i) => Math.round((i+1)*bin_size*100)/100)
    newdata.series[0].values = frequency; */
    return vals;
}

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

export function sample_stdnormal(n) {
    let theta = Array.from({ length: n/2 }, () => Math.random() * 2 * Math.PI);
    let exp_data = sample_exp(0.5, n/2)
    const x = exp_data.map((val, i) => Math.sqrt(val) * Math.cos(theta[i]));
    const y = exp_data.map((val, i) => Math.sqrt(val) * Math.sin(theta[i]));
    let vals = [...x, ...y]
    console.log(vals)
    return vals;
}

export function sample_normal(mean, variance, n) {
    let stdnorm_data = sample_stdnormal(n)
    let vals = stdnorm_data.map(num => num * Math.sqrt(variance) + mean)
    return vals
}

export function randomize_data(newdata, type, n){
    let vals;

    if (type === "uniform"){
        vals =  sample_unif(newdata, n)
    } else if (type === "exp"){
        vals = sample_exp(2, n)
    } else if (type === "normal"){
        vals = sample_normal(0,1,n)
    }

    let num_bins = 30
    let bin_size = Math.floor((Math.max(...vals)-Math.min(...vals))/num_bins*10)/10
    let frequency = Array(num_bins+1).fill(0)

    vals.forEach(num => {
        let bin_index = Math.floor(num/bin_size)
        
        frequency[bin_index+14] += 1
    })

    newdata.xColumns = Array.from({ length: num_bins+1 }, (_, i) => Math.round((i-14)*bin_size*100)/100)
    newdata.series[0].values = frequency;
    console.log(frequency)
    return newdata
}
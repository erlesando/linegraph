<script>
    let { data,
        x,
        y
    } = $props()

    let hoveredValue = $state([null, 0])
    const onFocus = () => showValue = ""
    const onBlur = () => showValue = ""
    let showValue = $state("")

    import { scale, setYaxis } from '$lib/utils'

    function serie2path(series_values) {
        let path = "M "
        let x_coord = ""
        let y_coord = ""
        for (let i = 0; i < series_values.length; i++){
            x_coord = x(i+0.5)
            y_coord = y(series_values[i])
            path = path + x_coord + " " + y_coord
            if (i < series_values.length-1){
                path = path + " L"
            }
        }
        return path
    }

    const width = 1200
    const height = 600
    console.log("x0:",x(1))
    console.log("y0:",y(1))
    
</script>

<!-- <path class="path" d={path0} stroke-width="4px" stroke={data[0].series[0].color} fill="none" style="stroke-dasharray: {width*2};  stroke-dashoffset: {width*2};"/>
{#each data[0].series[0].values as dataPoint, i}
    <circle cx="{x(i+0.5)}" cy="{y(dataPoint)}" r="10" fill="{data[0].series[0].color}"/>
    <circle 
        cx="{x(i+0.5)}" 
        cy="{y(dataPoint)}" 
        r="20" 
        opacity=0% 
        aria-label="circle"
        role="presentation" 
        onblur={onBlur} 
        onfocus={onFocus} 
        onmouseover={() => hoveredValue = [dataPoint,i]} 
        onmouseout={() => hoveredValue = [null,i]}>
    </circle>
    {#if hoveredValue[0] !== null}
        <text 
            x="{x(hoveredValue[1]+0.5)}"
            y="{y(hoveredValue[0])}"
            font-size="16" 
            font-family="ariel"
            fill="black"
            text-anchor="middle" 
            alignment-baseline="middle"
            > 
            <tspan x="{x(hoveredValue[1]+0.5)}" y="{y(hoveredValue[0])-30}">{data[0].series[0].legend} </tspan>
            <tspan x="{x(hoveredValue[1]+0.5)}" y="{y(hoveredValue[0])-15}">{hoveredValue[0]}</tspan>
            </text>
    {/if}                  
{/each}

<path class="path" d={path1} stroke-width="4px" stroke={data[0].series[1].color} fill="none" style="stroke-dasharray: {width*2};  stroke-dashoffset: {width*2};"/>
{#each data[0].series[1].values as dataPoint, i}
    <circle cx="{x(i+0.5)}" cy="{y(dataPoint)}" r="10" fill="{data[0].series[1].color}"/>
    <circle 
        cx="{x(i+0.5)}" 
        cy="{y(dataPoint)}" 
        r="20" 
        opacity=0% 
        aria-label="circle"
        role="presentation" 
        onblur={onBlur} 
        onfocus={onFocus} 
        onmouseover={() => hoveredValue = [dataPoint,i]} 
        onmouseout={() => hoveredValue = [null,i]}>
    </circle>
    {#if hoveredValue[0] !== null}
        <text 
            x="{x(hoveredValue[1]+0.5)}"
            y="{y(hoveredValue[0])}"
            font-size="16" 
            font-family="ariel"
            fill="black"
            text-anchor="middle" 
            alignment-baseline="middle"
            > 
            <tspan x="{x(hoveredValue[1]+0.5)}" y="{y(hoveredValue[0])-30}">{data[0].series[0].legend} </tspan>
            <tspan x="{x(hoveredValue[1]+0.5)}" y="{y(hoveredValue[0])-15}">{hoveredValue[0]}</tspan>
            </text>
    {/if}                  
{/each} -->

{#each data[0].series as serie, j}
    {@const path = serie2path(serie.values)}
    <path class="path" d={path} stroke-width="4px" stroke={serie.color} fill="none" style="stroke-dasharray: {width*2};  stroke-dashoffset: {width*2};"/>
    {#each serie.values as dataPoint, i}
        <circle cx="{x(i+0.5)}" cy="{y(dataPoint)}" r="10" fill="{serie.color}"/>
        <circle 
            cx="{x(i+0.5)}" 
            cy="{y(dataPoint)}" 
            r="20" 
            opacity=0% 
            aria-label="circle"
            role="presentation" 
            onblur={onBlur} 
            onfocus={onFocus} 
            onmouseover={() => hoveredValue = [dataPoint,i,j]} 
            onmouseout={() => hoveredValue = [null,i, j]}>
        </circle>
        {#if hoveredValue[0] !== null}
            <text 
                x="{x(hoveredValue[1]+0.5)}"
                y="{y(hoveredValue[0])}"
                font-size="16" 
                font-family="ariel"
                fill="black"
                text-anchor="middle" 
                alignment-baseline="middle"
                > 
                <tspan x="{x(hoveredValue[1]+0.5)}" y="{y(hoveredValue[0])-30}">{data[0].series[hoveredValue[2]].legend} </tspan>
                <tspan x="{x(hoveredValue[1]+0.5)}" y="{y(hoveredValue[0])-15}">{hoveredValue[0]}</tspan>
                </text>
        {/if}                  
    {/each}
{/each}


<style>
    .path {
        animation: dash 2s linear forwards;
    }

    @keyframes dash {
        to {
            stroke-dashoffset: 0;
        }
        }
</style>
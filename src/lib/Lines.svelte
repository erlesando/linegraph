<script>
    let { data } = $props()
    let hoveredValue = $state([null, 0, 0],)
    const onFocus = () => showValue = ""
    const onBlur = () => showValue = ""
    let showValue = $state("")

    import { scale, setYaxis } from '$lib/utils'
    import CoordinateSystem from './CoordinateSystem.svelte';

    function serie2path(serie_values) {
        let path = "M "
        let x_coord = ""
        let y_coord = ""
        for (let i = 0; i < serie_values.length; i++){
            x_coord = x(i+0.5)
            y_coord = y(serie_values[i])
            path = path + x_coord + " " + y_coord
            if (i < serie_values.length-1){
                path = path + " L"
            }
        }
        return path
    }

    let width = $state(1200)
    let height = $state(600)

    let yAxis = setYaxis(data[0].series)
    let yaxis = yAxis.slice(1,yAxis.length-1)

    const x = $derived(scale([0, data[0].xColumns.length], [0, width]))
    const y = $derived(scale([yAxis[0], yAxis[yAxis.length-1]], [height, 0]))
</script>

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
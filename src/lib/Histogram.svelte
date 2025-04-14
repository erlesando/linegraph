<script>
    let { series_i,
        numberofseries,
        series_number,
        xColumns,
        width,
        height,
        x_hist,
        x,
        y
    } = $props()

    let hoveredValue = $state([null, 0])
    let barwidth = x_hist(xColumns[1])-x_hist(xColumns[0])
    const onFocus = () => showValue = ""
    const onBlur = () => showValue = ""
    let showValue = $state("")

    import { scale, setYaxis } from '$lib/utils'
    import { data } from './data'
</script>

{#each series_i.values as dataPoint, i}
    {#if x_hist(xColumns[i])+barwidth/2 >= 0 && x_hist(xColumns[i])+barwidth/2 < width}
        {#if dataPoint != 0}
            <path
                class="path" 
                d = "M {x_hist(xColumns[i])+barwidth/2} {y(0)} 
                    L {x_hist(xColumns[i])+barwidth/2} {y(dataPoint)}"
                stroke-width="{barwidth+1}"
                stroke="white" 
                fill="none" 
                style="stroke-dasharray: {height};  stroke-dashoffset: {height}"
                aria-label="rectangle"
                role="presentation"
                onblur={onBlur} 
                onfocus={onFocus} 
                onmouseover={() => hoveredValue = [dataPoint,i]} 
                onmouseout={() => hoveredValue = [null,i]}
                />
            <path 
                class="path" 
                d = "M {x_hist(xColumns[i])+barwidth/2} {y(0)} 
                    L {x_hist(xColumns[i])+barwidth/2} {y(dataPoint)}"
                stroke-width="{barwidth}" 
                stroke={series_i.color} 
                fill="none" 
                style="stroke-dasharray: {height};  stroke-dashoffset: {height}"
                aria-label="rectangle"
                role="presentation"
                onblur={onBlur} 
                onfocus={onFocus} 
                onmouseover={() => hoveredValue = [dataPoint,i]} 
                onmouseout={() => hoveredValue = [null,i]}
                />    
        {/if}
    {/if}
    {#if hoveredValue[0] !== null}
        <text 
            font-size="16" 
            font-family="ariel"
            fill="black"
            text-anchor="middle" 
            alignment-baseline="middle"> 
            <tspan 
                x="{width-series_i.legend.length*5}" 
                y="{20}"
                >{series_i.legend} 
            </tspan>
            </text>
    {/if}
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
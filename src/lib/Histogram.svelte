<script>
    let { series_i,
        numberofseries,
        series_number,
        width,
        height,
        x,
        y
    } = $props()

    let hoveredValue = $state([null, 0])
    let barwidth = (width)/(series_i.values.length+2)
    const onFocus = () => showValue = ""
    const onBlur = () => showValue = ""
    let showValue = $state("")

    import { scale, setYaxis } from '$lib/utils'
    import { data } from './data'
</script>

{#each series_i.values as dataPoint, i}
    {#if dataPoint != 0}
        <path
            class="path" 
            d = "M {x(i+1.5) + barwidth*series_number} {y(0)} 
                L {x(i+1.5) + barwidth*series_number} {y(dataPoint)}"
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
            d = "M {x(i+1.5) + barwidth*series_number} {y(0)} 
                 L {x(i+1.5) + barwidth*series_number} {y(dataPoint)}"
            stroke-width="{barwidth}" 
            stroke={series_i.color} 
            fill="none" 
            style="stroke-dasharray: {height};  stroke-dashoffset: {height}"
            aria-label="rectangle"
            role="presentation"
            />    
    {/if}
    {#if hoveredValue[0] !== null}
        <text 
            font-size="16" 
            font-family="ariel"
            fill="black"
            text-anchor="middle" 
            alignment-baseline="middle"> 
            <tspan 
                x="{x(hoveredValue[1]+0.5) - barwidth/2*(numberofseries - 1) + barwidth*series_number}" 
                y="{(hoveredValue[0] < 0 ? (y(hoveredValue[0])+15) : (y(hoveredValue[0])-20))}"
                >{series_i.legend} 
            </tspan>
            <tspan 
                x="{x(hoveredValue[1]+0.5) - barwidth/2*(numberofseries - 1) + barwidth*series_number}" 
                y="{(hoveredValue[0] < 0 ? (y(hoveredValue[0])+30) : (y(hoveredValue[0])-5))}"
                >{hoveredValue[0]}
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
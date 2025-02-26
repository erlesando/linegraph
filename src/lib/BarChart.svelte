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
    let barwidth = (width/2)/(numberofseries*series_i.values.length)
    const onFocus = () => showValue = ""
    const onBlur = () => showValue = ""
    let showValue = $state("")

    import { scale, setYaxis } from '$lib/utils'
</script>

{#each series_i.values as dataPoint, i}
    <rect 
        width="{barwidth}" 
        height="{Math.abs(y(0)-y(dataPoint))}" 
        x="{x(i+0.5) - barwidth/2*numberofseries + barwidth*series_number}"
        y="{dataPoint < 0 ? y(0) : y(dataPoint)}" 
        fill="{series_i.color}"
        aria-label="rectangle"
        role="presentation" 
        onblur={onBlur} 
        onfocus={onFocus} 
        onmouseover={() => hoveredValue = [dataPoint,i]} 
        onmouseout={() => hoveredValue = [null,i]}
        />
    {#if hoveredValue[0] !== null}
        <text 
            font-size="16" 
            font-family="ariel"
            fill="black"
            text-anchor="middle" 
            alignment-baseline="middle"> 
            <tspan 
                x="{x(hoveredValue[1]+0.5) - barwidth/2*(numberofseries - 1) + barwidth*series_number}" 
                y="{(hoveredValue[0] < 0 ? (y(hoveredValue[0])+15) : (y(hoveredValue[0])-30))}"
                >{series_i.legend} 
            </tspan>
            <tspan 
                x="{x(hoveredValue[1]+0.5) - barwidth/2*(numberofseries - 1) + barwidth*series_number}" 
                y="{(hoveredValue[0] < 0 ? (y(hoveredValue[0])+30) : (y(hoveredValue[0])-15))}"
                >{hoveredValue[0]}
            </tspan>
            </text>
    {/if}
{/each}


<style>
    @keyframes dash {
        to {
            stroke-dashoffset: 0;
        }
        }
</style>
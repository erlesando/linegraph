<script>
    let { series_i,
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
    const path = serie2path(series_i.values)
</script>

<path 
    class="path" 
    d={path} 
    stroke-width="4px" 
    stroke={series_i.color} 
    fill="none" 
    style="stroke-dasharray: {width*2};  stroke-dashoffset: {width*2};"
    />
{#each series_i.values as dataPoint, i}
    <circle 
        cx="{x(i+0.5)}" 
        cy="{y(dataPoint)}" 
        r="10" 
        fill="{series_i.color}"/>
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
            alignment-baseline="middle"> 
            <tspan 
                x="{x(hoveredValue[1]+0.5)}" 
                y="{y(hoveredValue[0])-30}"
                >{series_i.legend} 
            </tspan>
            <tspan 
                x="{x(hoveredValue[1]+0.5)}" 
                y="{y(hoveredValue[0])-15}"
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
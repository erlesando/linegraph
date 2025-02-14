<script lang="ts">
    let { debug=false, column_names, xlabel = "", ylabel = "", series, animation} = $props();

    import { scale, setYaxis} from '$lib/utils';

    let hoveredValue = $state([null, 0, 0],);
    let showValue = $state("")

    const onFocus = () => showValue = "";
    const onBlur = () => showValue = "";

    let width = $state(1200);
    let height = $state(600);

    let yAxis = setYaxis(series);
    let yaxis = yAxis.slice(1,yAxis.length-1);

    const x = $derived(scale([0, column_names.length], [0, width]));
    const y = $derived(scale([yAxis[0], yAxis[yAxis.length-1]], [height, 0]));
    </script>

    <div>
        <h1>LineGraph</h1> 
        <svg width={width} height={height} bind:clientWidth={width} bind:clientHeight={height} >
        <g class="grid x-grid" id="xGrid" style="stroke:#E8E8E8;stroke-width:2">
            {#each column_names as xaxis_i, i}
            <line x1="{x(i+0.5)}" x2="{x(i+0.5)}" y1="{height+5}" y2="{-5}"></line>
            {/each}
        </g>
        <g class="grid y-grid" id="yGrid">
            {#each yaxis as yaxis_i, i}
            <line x1="{x(0)-5}" x2="{width+5}" y1="{y(yaxis_i)}" y2="{y(yaxis_i)}" style="stroke:#E8E8E8;stroke-width:2"></line>
            {/each}
        </g>
        <g class="labels x-labels" text-anchor="middle">
            {#each column_names as xaxis_i, i}
            <text x="{x(i+0.5)}" y={height+30}>{xaxis_i}</text>
            {/each}
            <text x="{width/2}" y={height+70} style="font-size:25px" class="label-title">{xlabel}</text>
        </g>
        <g class="labels y-labels" dominant-baseline="middle" text-anchor="middle">
            {#each yaxis as yaxis_i, i}
            <text x={x(-0.1)} y={y(yaxis_i)}>{Math.round(yaxis_i * 10) / 10}</text>
            {/each}
            <text x={x(-0.2)} y={height/2} class="label-title" style="font-size:25px" transform="rotate(-90 {x(-0.2)} {height/2})">{ylabel}</text>
        </g>
        <g >
            {#each series as serie, j}
                {#each serie.values as dataPoint, i}
                    <circle cx="{x(i+0.5)}" cy="{y(dataPoint)}" r="10" fill="{serie.color}"></circle>
                    <circle cx="{x(i+0.5)}" cy="{y(dataPoint)}" r="20" opacity=0% aria-label="circle" role="presentation" onblur={onBlur} onfocus={onFocus} onmouseover={() => hoveredValue = [dataPoint,i,j]} onmouseout={() => hoveredValue = [null,i, j]}></circle>
                    {#if hoveredValue[0] !== null}
                        <rect 
                            x="{x(hoveredValue[1]+0.5)+10}"
                            y="{y(hoveredValue[0]) - 10}"
                            width="100" 
                            height="40" 
                            fill= #E8E8E8
                            stroke="black" 
                            rx="5"
                        />
                        <text 
                            x="{x(hoveredValue[1]+0.5)+60}"
                            y="{y(hoveredValue[0])+20}"
                            font-size="14" 
                            fill="black"
                            text-anchor="middle" 
                            alignment-baseline="middle"
                            > 
                            <tspan x="{x(hoveredValue[1]+0.5)+60}" y="{y(hoveredValue[0])+8}">{series[hoveredValue[2]].legend} </tspan>
                            <tspan x="{x(hoveredValue[1]+0.5)+60}" y="{y(hoveredValue[0])+22}">{hoveredValue[0]}</tspan>
                             </text>
                    {/if}
                    {#if i<serie.values.length-1}
                        <!-- <line x1="{x(i+0.5)}" x2="{x(i+1.5)}" y1="{y(dataPoint)}" y2="{y(serie.values[i+1])}" style="stroke:{serie.color};stroke-width:2" /> -->
                        <path class="path" d="M{x(i+0.5)}, {y(dataPoint)}, {x(i+1.5)}, {y(serie.values[i+1])}" stroke-width="4" stroke={serie.color}/>
                    {/if}                     
                {/each}
 
            {/each}
        </g>
        </svg>
    </div>

    {#if debug === true}
        <br><br><br><br>
         <pre>{JSON.stringify(yaxis)}</pre>
    {/if}
   
<style>
    svg {
        border:1px solid black;
        margin: 20px 80px;
        overflow: visible;
    }
    .path {
        stroke-dasharray: 1000;
        stroke-dashoffset: 1000;
        animation: dash 5s linear forwards;
    }

    @keyframes dash {
        to {
            stroke-dashoffset: 0;
        }
        }
  </style>
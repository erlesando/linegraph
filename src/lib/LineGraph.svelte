<script lang="ts">
    let { debug=false, column_names, xlabel = "", ylabel = "", series } = $props();
    let showTextbox = false;
    let show = false;
    import { draw } from 'svelte/transition';
	import { scale, setYaxis} from '$lib/utils';
    import { json } from '@sveltejs/kit';

    let width = $state(1200);
    let height = $state(600);

    let yAxis = setYaxis(series);
    let yaxis = $state([]);

    const x = $derived(scale([0, column_names.length], [0, width]));
    const y = $derived(scale([yAxis[0], yAxis[yAxis.length-1]], [height, 0]));

    yaxis = yAxis.slice(1,yAxis.length-1)
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
                    <circle cx="{x(i+0.5)}" cy="{y(dataPoint)}" r="10" fill="{serie.color}" onmouseover={() => showTextbox = true} onmouseout={() => showTextbox = false}></circle>
                    {#if showTextbox === true}
                        <div class="textbox">Hello! I'm a textbox.</div>
                    {/if}
                    {#if i<serie.values.length-1}
                        <line x1="{x(i+0.5)}" x2="{x(i+1.5)}" y1="{y(dataPoint)}" y2="{y(serie.values[i+1])}" style="stroke:{serie.color};stroke-width:2"></line>
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

    .textbox {
        position: absolute;
        top: 60px;
        left: 50%;
        transform: translateX(-50%);
        background-color: white;
        color: black;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        white-space: nowrap;
    }
  </style>
<script lang="ts">
    let { 
        data
     } = $props();

    import { scale, setYaxis } from '$lib/utils'
    import Lines from '$lib/Lines.svelte'
    import BarChart from './BarChart.svelte';
    import Histogram from './Histogram.svelte';

    let graphtype = data.graphtype
    let numberofseries = data.series.length

    let width = $state(1200)
    let height = $state(600)

    let yAxis = setYaxis(data.series, graphtype)
    let yaxis = yAxis.slice(1,yAxis.length-1)

    let xaxis_length = (graphtype === "hist" ? data.xColumns.length + 2 : data.xColumns.length)

    const x = $derived(scale([0, xaxis_length], [0, width]))
    const y = $derived(scale([yAxis[0], yAxis[yAxis.length-1]], [height, 0]))
</script>

<div>
    <h1>{data.title}</h1> 
    <svg 
        width={width} 
        height={height} 
        bind:clientWidth={width} 
        bind:clientHeight={height} >
    <g class="grid x-grid" id="xGrid" style="stroke:#E8E8E8;stroke-width:2">
        {#each data.xColumns as xaxis_i, i}
            <line 
                x1="{x(i+0.5)}" 
                x2="{x(i+0.5)}" 
                y1="{height+5}" 
                y2="{-5}"/>
        {/each}
        {#if data.graphtype === "hist"}
            <line 
                x1="{x(data.xColumns.length+0.5)}" 
                x2="{x(data.xColumns.length+0.5)}" 
                y1="{height+5}" 
                y2="{-5}"/>
            <line 
                x1="{x(data.xColumns.length+1.5)}" 
                x2="{x(data.xColumns.length+1.5)}" 
                y1="{height+5}" 
                y2="{-5}"/>
        {/if}
    </g>
    <g class="grid y-grid" id="yGrid">
        {#each yaxis as yaxis_i, i}
            {#if (yaxis_i === 0)}
                <line 
                    x1="{x(0)-5}" 
                    x2="{width+5}" 
                    y1="{y(yaxis_i)}" 
                    y2="{y(yaxis_i)}" 
                    style="stroke:#A9A9A9;stroke-width:2"/>
            {:else}
                <line 
                    x1="{x(0)-5}" 
                    x2="{width+5}" 
                    y1="{y(yaxis_i)}" 
                    y2="{y(yaxis_i)}" 
                    style="stroke:#E8E8E8;stroke-width:2"/>                    
            {/if}
        {/each}
    </g>
    <g class="labels x-labels" text-anchor="middle">
        {#if data.graphtype === "hist"}
        {#each data.xColumns as xaxis_i, i}
            <text x="{x(i+1.5)}" y={height+30}>{xaxis_i}</text>
        {/each}
        <text 
            x="{width/2}" 
            y={height+70} 
            style="font-size:25px" 
            class="label-title"
            >{data.xlabel}
        </text> 
        {:else}
            {#each data.xColumns as xaxis_i, i}
                <text x="{x(i+0.5)}" y={height+30}>{xaxis_i}</text>
            {/each}
            <text 
                x="{width/2}" 
                y={height+70} 
                style="font-size:25px" 
                class="label-title"
                >{data.xlabel}
            </text>        
        {/if}
    </g>
    <g class="labels y-labels" dominant-baseline="middle" text-anchor="middle">
        {#each yaxis as yaxis_i, i}
            <text 
                x=-20px 
                y={y(yaxis_i)}
                >{Math.round(yaxis_i * 10) / 10}
            </text>
        {/each}
        <text 
            x={-60} 
            y={height/2} 
            class="label-title" 
            style="font-size:25px" 
            transform="rotate(-90 {-60} {height/2})"
            >{data.ylabel}
        </text>
    </g>
    {#each data.series as series_i, i}
        {#if (data.graphtype === "line")}
            <Lines {series_i} {width} {height} {x} {y}/>
        {:else if (data.graphtype === "bar")}
            <BarChart {series_i} series_number={i} {numberofseries} {width} {height} {x} {y}/>
        {:else if (data.graphtype === "hist")}
            <Histogram {series_i} series_number={i} {numberofseries} {width} {height} {x} {y}/>
        {/if}
    {/each}
    </svg>
</div>
   
<style>
    svg {
        border:1px solid black;
        margin: 20px 80px;
        overflow: visible;
    }
  </style>
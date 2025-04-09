<script>
	import Table from './Table.svelte'
    import Table_hist from './Table_hist.svelte'
    import {randomizeData, randomizeData_negative, randomize_data} from './randomize.js'

	let { 
        data=$bindable(), 
        recreateCoord=$bindable()
    } = $props();

    let recreateTable = $state(true)
    let newdata = $state(JSON.parse(JSON.stringify(data)))

    function handleSubmit(newdata) {
        data = JSON.parse(JSON.stringify(newdata))
        recreateCoord = false
        setTimeout(() => recreateCoord = true, 0);
    }

    function handleReset() {
        newdata = JSON.parse(JSON.stringify(data))
    }
</script>

<div class="modal">
    <h1>Data</h1>
    <label for="title">Tittel: </label>
    <input type= "text", id="title" bind:value={newdata.title} /> <br>
    <label for="graphtype">Diagram: </label>
    <select id="graphtype" bind:value={newdata.graphtype}>
        <option value="line">Linje</option>
        <option value="bar">Søylediagram</option>
        <option value="hist">Histogram</option>
    </select><br>
    <label for="xlabel">x-akse: </label>
    <input type= "text", id="xlabel" bind:value={newdata.xlabel} /><br>
    <label for="ylabel">y-akse: </label>
    <input type= "text", id="ylabel" bind:value={newdata.ylabel} /><br> <br>
    <button 
        onclick={() => handleSubmit(newdata)}
        >Lagre
    </button>
    <button 
        onclick={handleReset}
        >Reset
    </button>
    <button onclick={() => {randomizeData(newdata)}}
        >Randomize
    </button>
    <button onclick={() => {randomize_data(newdata, "exponential", 100000)}}
        >Exponential
    </button>
    <button onclick={() => {randomize_data(newdata, "normal", 100000)}}
        >Normal
    </button> <br><br>
    {#if recreateTable}
        {#if newdata.graphtype === "hist"}
            <Table_hist bind:newdata/>
        {:else}
            <Table bind:newdata />
        {/if}
    {/if}
</div>

<style>
    .modal{
/*         right:0px;
        top:0px;
        position:absolute; */
        border-radius: 10px;
        min-width: 500px;
        width: fit-content;
        height: fit-content;
        max-width: 95%;
        text-align: left;
        background: white;
    }
</style>
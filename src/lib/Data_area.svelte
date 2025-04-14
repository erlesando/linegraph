<script>
	import Table from './Table.svelte'
    import Table_hist from './Table_hist.svelte'
    import {randomizeData, randomizeData_negative, randomize_data} from './randomize.js'

	let { 
        data=$bindable(), 
        recreateCoord=$bindable()
    } = $props();
    
    let showModal = $state(false);
    let dialog = $state()

    function toggleModal() {
        showModal = !showModal;
    }

    let recreateTable = $state(true)
    let newdata = $state(JSON.parse(JSON.stringify(data)))
    let dist = $state()
    let params = $state({})
    let num_bins = $state(100)

    function handleSubmit(newdata) {
        data = JSON.parse(JSON.stringify(newdata))
        recreateCoord = false
        setTimeout(() => recreateCoord = true, 0);
    }

    function handleReset() {
        newdata = JSON.parse(JSON.stringify(data))
    }

    $effect(() => {
		if (showModal) dialog.showModal();
	});
</script>

{#if showModal}
  <dialog
    bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => { if (e.target === dialog) dialog.close(); }}>
        <div class="modal">
            <h2>Serie</h2>
            <label for="distribution">Fordeling: </label>
            <select id="distribution" bind:value={dist}>
                <option value="uniform">Uniform</option>
                <option value="normal">Normal</option>
                <option value="exponential">Eksponential</option>
            </select><br><br>
            <label for="num_bin">Antall søyler: </label>
            <input type= "range", id="num_bins" bind:value={num_bins} min=11 max=400/> {num_bins} <br><br>
            {#if dist === "normal"}
                <label for="mean">Gjennomsnitt: </label>
                <input type= "number", id="mean" bind:value={params.mean} defaultValue=0/> <br><br>
                <label for="stddev">Standardavvik: </label>
                <input type= "number", id="stddev" bind:value={params.stddev} defaultValue=1 /> <br><br>
            {:else if dist === "exponential"}
                <label for="lambda">Lambda: </label>
                <input type= "number", id="lambda" bind:value={params.lambda} defaultValue=1 /> <br><br>
            {:else if dist === "uniform"}
                <label for="min">Min: </label>
                <input type= "number", id="min" bind:value={params.min} defaultValue=0 /> <br><br>
                <label for="max">Max: </label>
                <input type= "number", id="max" bind:value={params.max} defaultValue=1 /> <br><br>
            {/if}
            <button onclick={() => {randomize_data(newdata, num_bins, dist, params, 100000)
                showModal = false}}
                >Okay
            </button>
        </div>
    </dialog>

{/if}

<div>
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
    <button onclick={() => {toggleModal()}}
        >Randomize
    </button> 
    <button onclick={() => {randomizeData(newdata)}}
        >Randomize Data
    </button><br><br>
    {#if recreateTable}
        {#if newdata.graphtype === "hist"}
            <Table_hist bind:newdata/>
        {:else}
            <Table bind:newdata />
        {/if}
    {/if}
</div>

<style>
    div{
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

    .modal{
        padding: 50px;
        border-radius: 10px;
        min-width: 500px;
        width: fit-content;
        height: fit-content;
        min-height: 600px;
        max-width: 95%;
        text-align: left;
        background: white;
    }

    dialog::backdrop{
        width: 100%;
        height: 100%;
        position: fixed;
        background: rgba(0,0,0,0.8);
    }
</style>
<script>
	import Table from './Table.svelte'

	let { 
        showModal = $bindable(), 
        data=$bindable(), 
        recreateCoord=$bindable(), 
        newdata=$bindable(), 
        add, 
        id
    } = $props();

    let dialog = $state()
    let recreateTable = $state(true)

    function handleSubmit(newdata, add, id) {
        if (add) {
            data.push(JSON.parse(JSON.stringify(newdata)))
        } else {
            data[id] = JSON.parse(JSON.stringify(newdata))
        }
        showModal = false
        recreateCoord = false
        setTimeout(() => recreateCoord = true, 0);
    }

    function handleReset() {
        newdata = JSON.parse(JSON.stringify(data[0]))
/*         recreateTable = false
        setTimeout(() => recreateTable = true, 500); */
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
        <label for="title">Tittel: </label>
        <input type= "text", id="title" bind:value={newdata.title} /> <br>
        <label for="graphtype">Diagram: </label>
        <select id="graphtype" bind:value={newdata.graphtype}>
            <option value="line">Linje</option>
            <option value="bar">Søylediagram</option>
        </select><br>
        <label for="xlabel">x-akse: </label>
        <input type= "text", id="xlabel" bind:value={newdata.xlabel} /><br>
        <label for="ylabel">y-akse: </label>
        <input type= "text", id="ylabel" bind:value={newdata.ylabel} /><br> <br>
        {#if recreateTable}    
            <Table bind:newdata />
        {/if}
        <button 
            onclick={() => handleSubmit(newdata,add,id)}
            >Lagre
        </button>
        <button 
            onclick={handleReset}
            >Reset
        </button>
    </div>
</dialog>
{/if}

<style>
	dialog::backdrop{
        width: 100%;
        height: 100%;
        position: fixed;
        background: rgba(0,0,0,0.8);
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
</style>
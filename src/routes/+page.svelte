<script>
    import Header from "$lib/Header.svelte";
	import Modal from "$lib/Modal.svelte"
    import CoordinateSystem from "$lib/CoordinateSystem.svelte";
    import Lines from "$lib/Lines.svelte";

    let { 
        data=$bindable()
    } = $props();
    let mydata = $state(data.data)
    let recreateCoord = $state(true);
    let debug = $state(false)
    let showModal = $state(false);
    let add = $state(false);
    let id = $state(0);

    function recreate() {
        show = false;
        // Ensures it's removed before setting it back
        setTimeout(() => show = true, 0);
    }

    let newdata = $state()

    let newdata_new= $state({
            title:"",
            ylabel:"",
            xlabel:"",
            graphtype: "line",
            xColumns:["xcol"],
            series: [
                { 
                    legend: "", 
                    values: [0], 
                    color: "#FF0000"},
            ]
            })
</script>

<Header />
<Modal 
    bind:showModal 
    bind:data={mydata} 
    bind:recreateCoord 
    bind:newdata 
    {add} 
    {id}/>
<main>
    {#if recreateCoord}
        {#each mydata as data,i}
            <CoordinateSystem {data} />
            <br><br><br><br>
            <button 
                onclick={() => toggleModal(false, i)}>
                Endre eller legg til data
            </button> 
            <br>
        {/each}
    {/if}
    <br><br><br><br>
	<button 
        onclick={() => toggleModal(true)}>
        Legg til ny graf
    </button>
    <button 
        onclick={() => debug=!debug}>
        Debug
    </button>
</main>

{#if debug}
    <br><br><br><br>
    <pre>{JSON.stringify(mydata)}</pre>
{/if}

<style>

</style>

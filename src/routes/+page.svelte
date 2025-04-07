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

    function changeData(newGraph, i) {
        id = i
        if (newGraph){
            add = true
            newdata = JSON.parse(JSON.stringify(newdata_new))
        } else {
            add = false
            newdata = JSON.parse(JSON.stringify(mydata[i]))
        }
    }
</script>

<Header />
<main>
    {#if recreateCoord}
        {#each mydata as data,i}
            <div class="coordandtable">
                <CoordinateSystem {data} />
                <br>
                <Modal
                    bind:data={mydata[i]}
                    bind:recreateCoord
                    />                
            </div>
            <br><br><br><br>
        {/each}
    {/if}
    <br><br><br>
	<button
        onclick={() => mydata.push(newdata_new)}>
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
    div {
        display:grid;
        grid-template-columns: repeat(4, 1fr);
        margin:auto;
        padding:auto;
    }
</style>


<!--
Hva skal gjøres videre?
- Ikke bruk modal
- randomizeData normalfordeling, gammafordeling, uniform fordeling, ...
- 
-->
<script>
    import Header from "$lib/Header.svelte";
	import Modal from "$lib/Modal.svelte"
    import CoordinateSystem from "$lib/CoordinateSystem.svelte";
    import Lines from "$lib/Lines.svelte";

    let recreateCoord = $state(true);
    let debug = $state(false)

    function recreate() {
        show = false;
        // Ensures it's removed before setting it back
        setTimeout(() => show = true, 0);
    }

    let data = $state([{
            title:"Tittel",
            ylabel:"y-label",
            xlabel:"x-label",
            graphtype: "line",
            xColumns:['andy', 'braden', 'cody', 'dory', 'edith'],
            series: [
                { 
                    legend: "Name", 
                    values: [1.3, 1.5, 3.6, 3.4, 1.5], 
                    color: "red", 
                    id: 1 },
                { 
                    legend: "Foo", 
                    values: [3, 2.5, 1.6, 2, 1.5], 
                    color: "blue", 
                    id: 2 }
            ],
            id:1
            }])


	let showModal = $state(false);
	
    function toggleModal() {
        showModal = !showModal;   
    }
</script>

<Header />
<Modal bind:showModal bind:data bind:recreateCoord/>
<main>
    {#if recreateCoord}
        <CoordinateSystem { data } /> 
    {/if}
    <br><br><br><br>
	<button onclick={toggleModal}>Endre eller legg til data</button> <br>
	<button onclick={toggleModal}>Legg til ny graf</button>
    <button onclick={() => debug=!debug}>Debug</button>
</main>

{#if debug}
    <br><br><br><br>
    <pre>{JSON.stringify(data)}</pre>
{/if}

<style>

</style>

<script>
    import LineGraph from "$lib/LineGraph.svelte";
    let showTextbox = false;
</script>

<LineGraph
    debug={false}
    column_names={[
        'andy', 'braden', 'cody', 'dory', 'edith'
        ]}
    ylabel="Number"
    xlabel="Pupils"
    series={[
        {
            legend: 'name',
            values: [1.1, 1.5, 3.6, 3.4, 1.5],
            color: 'blue'
        },
        {
            legend: 'foo',
            values: [3, 2.5, 1.6, 2, 1.5],
            color: 'red'
        }
    ]}
    animation="line"
/>


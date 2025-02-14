<script>
    import LineGraph from "$lib/LineGraph.svelte";
    let showTextbox = false;
</script>

<LineGraph
    debug={false}
    column_names={[
        'andy', 'braden', 'cody', 'dory', 'edith', 'erle'
        ]}
    ylabel="Number"
    xlabel="Pupils"
    series={[
        {
            legend: 'name',
            values: [10, 15, 83, 29, 40, 39],
            color: 'blue'
        },
        {
            legend: 'foo',
            values: [3, 2.5, 1.6, 2, 1.5, 89],
            color: 'red'
        }
    ]}
    animation="line"
/>


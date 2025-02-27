<script>
    import Svg from '$lib/circle.svg';
    let colors = $state(['#BBFF00', '#06F586', '#ff3e00', '#8D462E', '#FF0037']);

    let fillings = $state(0);

    $effect(() => {
        console.log(fillings);
    });
</script>

<div>
    <div class="flex gap-2 mb-4">
    </div>
    <input bind:value={colors[fillings]} type="color" name="color" />
</div>

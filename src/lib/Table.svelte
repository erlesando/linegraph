<script>
    let { 
      newdata=$bindable()
    } = $props()

	let rowCount = $derived(Math.max(1,newdata.xColumns.length));
	let hoveredRow = $state(null);
	
	function deleteRow(rowIndex) {
        if (newdata.series.length > 0 && newdata.xColumns.length>0){
            newdata.series = newdata.series.map(s => ({
                ...s,
                values: s.values.filter((_, i) => i !== rowIndex)
                }));
            newdata.xColumns = newdata.xColumns.filter((_,i) => i !== rowIndex);
            if (newdata.xColumns.length === 0){
                newdata.xColumns = ["xcol"]
                for (let i = 0; i < newdata.series.length; i++) {
                    newdata.series[i].values=[0]
                }
            }
        }
    }
	
  function deleteColumn(colIndex) {
      if (newdata.series.length > 0 && newdata.xColumns.length>0){
          newdata.series = newdata.series.filter((_, i) => i !== colIndex);
          if (newdata.series.length === 0){
              newdata.series[0] = {
                legend: "", 
                values: Array(newdata.xColumns.length).fill(0), 
                color: "#FF0000"}
          }
      }
  }

	function addRow() {
        if (newdata.series.length > 0 && newdata.xColumns.length>0){
            newdata.xColumns=[...newdata.xColumns,"xcol"];
            for (let i = 0; i < newdata.series.length; i++) {
                newdata.series[i].values.push(0)
            }
        }
        else {
            newdata.xColumns.push("xcol");
            if (newdata.series.length > 0){
                for (let i = 0; i < newdata.series.length; i++) {
                    newdata.series[i].values.push(0)
            }
            }
        }
	}
	
	function addColumn() {
		const newSeries = {
			legend: "",
			values: Array(newdata.xColumns.length).fill(0),
			color: "#FF0000",
			id: newdata.series[newdata.series.length-1].id+1
		}
		newdata.series = [ ...newdata.series, newSeries]
	}
</script>

<table onmouseleave={() => hoveredRow=null}>
  <thead>
    <tr onmouseenter={() => hoveredRow = null}>
      <th></th>
			{#each newdata.series as s, colIndex}
				<th style="position: relative">
					<input placeholder="legend" bind:value={s.legend}>
					<button style="width:20px; height: 20px; top:0; right:0; position: absolute" 
						onclick={() => deleteColumn(colIndex)}
            ><img style="width:20px; height:auto" src="/images/delete.svg" alt="delete">
					</button>
          <input class="color" type="color" bind:value={s.color}/>
				</th>
			{/each}
			<th style="background:white; border:none">
				<button onclick={() => addColumn()}
          >+
        </button>
      </th>
    </tr>
  </thead>
  <tbody>
    {#each Array(rowCount) as _, rowIndex}
      <tr onmouseenter={() => hoveredRow = rowIndex} >
				<td><input bind:value={newdata.xColumns[rowIndex]}></td>
        {#each newdata.series as s}
          <td><input type="number" bind:value={s.values[rowIndex]}></td>
        {/each}
				<td style="background:white; border:none">
					{#if hoveredRow === rowIndex}
						<button 
              onclick={() => deleteRow(rowIndex)}
              ><img style="width:20px; height:auto" src="/images/delete.svg" alt="delete">
            </button>
					{/if}				
				</td>
			</tr>
    {/each}
		<tr onmouseenter={() => hoveredRow = null}>
			<th style="background:white; border:none">
			<button 
          onclick={() => addRow()}
          >+
      </button>
		</th></tr>
  </tbody>
</table>

<style>
	table {
	  margin: 0px auto; 
	  border-collapse: collapse;
	  table-layout: auto; /* Ensures width is determined by content */
	}

	input {
	  width: 50%;
	  border: none;
	  padding: 4px;
	  font-size: 14px;
	  background: rgba(0,0,0,0%);
	}

	input:focus {
	  outline: none;
	  background-color: rgba(0,0,0,0%);
	}

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
		white-space: nowrap; /* Ensures content stays in a single line */
		width: 100px
  }

  th {
    background-color: #f4f4f4;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  select option {
    color: #fff;
  }
  select option:hover {
    background-color: #f4f4f4;
    box-shadow: inset 20px 20px #fff;
  }

  input[type="color"] {
    position: absolute;
    bottom: -4px;
    right: -3px;
    width: 25px; /* Adjust size */
    height: 28px;
    border: none;
    padding: 0;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
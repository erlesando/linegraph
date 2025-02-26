<script>
    let { 
      newdata=$bindable()
    } = $props()

	let rowCount = $state(newdata.xColumns.length);
	let hoveredRow = $state(null);
	
	function deleteRow(rowIndex) {
        if (newdata.series.length > 0 && newdata.xColumns.length>0){
            newdata.series = newdata.series.map(s => ({
                ...s,
                values: s.values.filter((_, i) => i !== rowIndex)
                }));
            newdata.xColumns = newdata.xColumns.filter((_,i) => i !== rowIndex);
            rowCount = newdata.xColumns.length;
            if (newdata.xColumns.length === 0){
                rowCount = 1
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
                newdata.series[0] = {legend: "", values: Array(newdata.xColumns.length).fill(0), color: ""}
            }
        }
    }

	function addRow() {
        if (newdata.series.length > 0 && newdata.xColumns.length>0){
            newdata.xColumns=[...newdata.xColumns,"xcol"];
            for (let i = 0; i < newdata.series.length; i++) {
                newdata.series[i].values.push(0)
            }
            rowCount = newdata.xColumns.length
        }
        else {
            newdata.xColumns.push("xcol");
            if (newdata.series.length > 0){
                for (let i = 0; i < newdata.series.length; i++) {
                    newdata.series[i].values.push(0)
            }
            }
            rowCount = newdata.xColumns.length
        }
	}
	
	function addColumn() {
		const newSeries = {
			legend: "",
			values: Array(newdata.xColumns.length).fill(0),
			color: "",
			id: newdata.series[newdata.series.length-1].id+1
		}
		rowCount = newdata.xColumns.length
		newdata.series = [ ...newdata.series, newSeries]
	}
</script>

<table onmouseleave={() => hoveredRow=null}>
  <thead>
    <tr onmouseenter={() => hoveredRow = null}>
      <th></th>
			{#each newdata.series as s, colIndex}
				<th style="position: relative">
					<input bind:value={s.legend}>
					<button style="width:20px; height: 20px; top:0; right:0; position: absolute" 
						onclick={() => deleteColumn(colIndex)}
            >X
					</button>
          <select style="background-color:{s.color}; width:20px; height: 20px; bottom:0; right:0; position: absolute" bind:value={s.color}> 
            <option style="background-color:red" value="red"></option>
            <option style="background-color:blue" value="blue"></option>
            <option style="background-color:green" value="green"></option>
            <option style="background-color:purple" value="purple"></option>
            <option style="background-color:pink" value="pink"></option>
            <option style="background-color:orange" value="orange"></option>
            <option style="background-color:brown" value="brown"></option>
          </select>
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
              >X
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
</style>
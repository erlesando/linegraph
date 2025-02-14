/* <LineGraph
    debug={false}
    column_names={[
        'andy', 'braden', 'cody', 'dory', 'edith'
        ]}
    ylabel="y-akse tittel"
    xlabel="x-akse tittel"
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
/> */

let data = [];

export function poll() {
	return data = [1,2,3,4,6];
}
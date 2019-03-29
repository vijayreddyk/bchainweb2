/**
 * This JavaScript file is a collection of callBackFunctions used to calcualte totals in the dashboard flipviews.
 * This file is used in 'dashBoardActivityForFFusers'.
 */

function calculateActivitySummaryTotalForFANDF(data, table_name_id,columns_length, total_width) {
	if( isDrillDownRequired() ){
		setListener(table_name_id, $('#' + table_name_id + ' tr').length
				- data.length);
	}
	$('#' + table_name_id)
	.append(
			'<tr><td colspan="'
			+ (columns_length + 1)
			+ '"><div class="blackline" style="margin-top:2px; width: '+total_width+'px;"></div></td></tr>');
	if (data != null) {
		var i = 0, j = 0;
		var tot_columns_length = columns_length + 1; // including S.No
		var tableTotal = document.getElementById(table_name_id);
		var row = tableTotal
		.insertRow($('#' + table_name_id + ' tr').length);
		var visit_cnt = getsum(data, 14);
		for (i = 0; i < tot_columns_length; i++) {
			var sum = 0.0;
			for (j = 0; j < data.length; j++) {
				if (data[j][i - 1] != null && data[j][i - 1] != ""
						&& data[j][i - 1] != "0")
					sum = parseFloat(sum)
					+ parseFloat(data[j][i - 1]);
			}
			var cell = row.insertCell(i);
			cell.className = 'table_column_style';
			cell.height = "24";
			cell.align = "left";
			cell.valign = "middle";
			if (i == 0) {
				cell.width = "50";
				cell.col
				cell.innerHTML = "Total";
			} else if (i == 1 || i == 2 || i == 3) {
				cell.innerHTML = "";
			}
			else if(i==8)
			{   /*
							  data - 19: assign_visit,
							  data - 20: assign_cnt.
			 */
				var cellvalue = returnDevideValue(getsum(data, 20),getsum(data, 19));
				cell.innerHTML = cellvalue;
			}
			else if(i==9)
			{
				cell.innerHTML = returnDevideValue(getsum(data, 22),
						getsum(data, 21));
			}
			else if(i==10)
			{
				cell.innerHTML = returnDevideValue(getsum(data, 24),getsum(data, 23));
			}
			else if(i==11){
				cell.innerHTML = returnDevideValue(getsum(data, 26),getsum(data, 25));
			}
			else if(i==13){
				var total_visit_cases = getsum(data,18);
				if(total_visit_cases!=null && total_visit_cases!=0){
					cell.innerHTML=Number(((parseFloat(visit_cnt)/ parseFloat(total_visit_cases))).toFixed(2));
				}else{
					cell.innerHTML = '0.00';
				}
			}
			else if(i==14){
				var contacts_made_cnt = getsum(data,17);
				if(visit_cnt != null && visit_cnt != 0){
					cell.innerHTML = returnDevideValue(visit_cnt,contacts_made_cnt);	
				}else{
					cell.innerHTML = '0.00%';
				}
			}
			else {
				cell.innerHTML = Number((parseFloat(sum)).toFixed(2));
			}
		}

	} // end of for 
}
	function calculateFosActivityTotalForDayJson(data, table_name_id,
			columns_length, total_width) {
		 if(isDrillDownRequired()){
		 setListener(table_name_id, $('#' + table_name_id + ' tr').length
                    - data.length);
		 }
		$('#' + table_name_id)
				.append(
						'<tr><td colspan="'
								+ (columns_length + 1)
								+ '"><div class="blackline" style="margin-top:2px;width: '+total_width+'px;"></div></td></tr>');

		if (data != null) {
			var i = 0, j = 0;
			var tot_columns_length = columns_length + 1; // including S.No
			var tableTotal = document.getElementById(table_name_id);
			var row = tableTotal
					.insertRow($('#' + table_name_id + ' tr').length);
			var total_cases_called = 0;
			for (i = 0; i < tot_columns_length; i++) {

				var sum = 0.0;
				if (i > 4) {
					for (j = 0; j < data.length; j++) {
						if (data[j][i - 1] != null && data[j][i - 1] != ""
								&& data[j][i - 1] != "0")
							sum = parseFloat(sum)
									+ parseFloat(data[j][i - 1]);
					}
				}
				var cell = row.insertCell(i);
				cell.className = 'table_column_style';
				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				if (i == 0) {
					cell.width = "50";
					cell.col
					cell.innerHTML = "Total";
				} else if (i == 1 || i == 3 || i == 4) {
					cell.innerHTML = "";
				} else if (i == 2) {
					cell.innerHTML = "";
				} else {

					cell.innerHTML = Number((parseFloat(sum)).toFixed(2));
				}
			}

		} // end of for 
	}
	function getsum(data, index) {
		var j = 0, sum = 0;
		if (data != null) {
			for (j = 0; j < data.length; j++) {
				
			
				if (data[j][index] != null && data[j][index] != ""
						&& data[j][index] != "0")
					sum = parseFloat(sum) + parseFloat(data[j][index]);
			}
		}
		return sum;
	}
	/*
		c1- Demoninator
		c2- Numerator
		return percentage - formula: [c2 * 100]/c1.
	*/
	function returnDevideValue(c1, c2) {
		var value = 0.00;
		if (c1 != null && c1 > 0) {
			value = Number((parseFloat(c2) * 100 / parseFloat(c1))
					.toFixed(2));
		}
		return value;
	}
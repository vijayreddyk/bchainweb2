/**
 * This JavaScript file is a collection of callBackFunctions used to calcualte totals in the dashboard flipviews.
 * This file is used in Dashboard 0-90.
 */

// Generic function for all FOS activity Generation flip-views total calculation in numbers.
function calculateCallingActivityTotalNumber(data, table_name_id, columns_length, total_width){
	
	if(isDrillDownRequired()){
		 setListener(table_name_id, $('#' + table_name_id + ' tr').length - data.length);
		 }
	
	$('#'+table_name_id).append('<tr><td colspan="'+(columns_length+1)+'"><div class="blackline" style="margin-top:2px; width: '+total_width+'px;"></div></td></tr>');

	if(data!=null){
	    var i = 0, j = 0;
		var tot_columns_length = columns_length+1; // including S.No
		var tableTotal = document.getElementById(table_name_id);
		var row = tableTotal.insertRow($('#'+table_name_id+' tr').length);
		for (i = 0; i < tot_columns_length; i++) {

			var sum = 0.00;
			
			if (i>2) {
				for (j = 0; j < data.length; j++) {
					if (data[j][i - 1] != null && data[j][i - 1] != ""
							&& data[j][i - 1] != "0")
						sum = parseFloat(sum) + parseFloat(data[j][i - 1]);
				}
			}

			var cell = row.insertCell(i);
			cell.className = 'table_column_style';
			cell.height = "24";
			cell.align = "left";
			cell.valign = "middle";
			if (i == 0) {
				cell.width = "80";
				cell.innerHTML = "Total";
			} else if ( i == 1 || i == 2 ) {
				cell.innerHTML = "";
			} else if(i == 5){
				cell.innerHTML = (Number((parseFloat(sum)).toFixed(2)) / data.length).toFixed(2);
			}
		 else {
				cell.innerHTML = (Number((parseFloat(sum)).toFixed(2))).toFixed(2);
		 }
		}

	} 
}

//Generic function for all Calling Activity flip-views total calculation in percentage(%).
function calculateCallingActivityTotalPercent(data, table_name_id, columns_length, total_width){
	
	if(isDrillDownRequired()){
		 setListener(table_name_id, $('#' + table_name_id + ' tr').length - data.length);
		 }
	
	$('#'+table_name_id).append('<tr><td colspan="'+(columns_length+1)+'"><div class="blackline" style="margin-top:2px; width: '+total_width+'px;"></div></td></tr>');

	if(data!=null){
	    var i = 0, j = 0;
		var tot_columns_length = columns_length+1; // including S.No
		var tableTotal = document.getElementById(table_name_id);
		var row = tableTotal.insertRow($('#'+table_name_id+' tr').length);
		for (i = 0; i < tot_columns_length; i++) {

			var sum = 0.00;
			
			if (i>2) {
				for (j = 0; j < data.length; j++) {
					if (data[j][i - 1] != null && data[j][i - 1] != ""
							&& data[j][i - 1] != "0")
						sum = parseFloat(sum) + parseFloat(data[j][i - 1]);
				}
			}

			var cell = row.insertCell(i);
			cell.className = 'table_column_style';
			cell.height = "24";
			cell.align = "left";
			cell.valign = "middle";
			if (i == 0) {
				cell.width = "80";
				cell.innerHTML = "Total";
			} else if ( i == 1 || i == 2 ) {
				cell.innerHTML = "";
			} else if(i == 5 || i > 9){
				cell.innerHTML = (Number((parseFloat(sum)).toFixed(2)) / data.length).toFixed(2);
			}
		 else {
				cell.innerHTML = (Number((parseFloat(sum)).toFixed(2))).toFixed(2);
		 }
		}

	} 
}

// Generic function for all FOS activity Generation flip-views total calculation in numbers.
function calculateFosActivityGenTotalNumber(data, table_name_id, columns_length, total_width){
	
	if(isDrillDownRequired()){
		 setListener(table_name_id, $('#' + table_name_id + ' tr').length - data.length);
		 }

	$('#' + table_name_id)
	.append(
			'<tr><td colspan="'
			+ (columns_length + 1)
			+ '"><div class="blackline" style="margin-top:2px; width: '+total_width+'px;"></div></td></tr>');
	if (data != null) {
		var i = 0, j = 0;
		var isPercentage = document.getElementById("noOrPercent").value;
		var tot_columns_length = columns_length + 1; // including S.No
		var tableTotal = document.getElementById(table_name_id);
		var row = tableTotal.insertRow($('#' + table_name_id + ' tr').length);
		var fptpConvertedTotal = 0;
		var tptpConvertedTotal = 0;
		var totalCasesOrCalls = 0;
		for (i = 0; i < tot_columns_length; i++) {
			var sum = 0;
			var table = document.getElementById(table_name_id);
			if (i >= 3) {
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
				cell.innerHTML = "Total";
			} else if (i == 1 || i == 2) {
				continue;
			} else if (i == tot_columns_length - 1) {//net rate
				cell.width = "100";
				cell.innerHTML = totalCasesOrCalls != 0 ? (((Number(fptpConvertedTotal) + Number(tptpConvertedTotal)) / Number(totalCasesOrCalls))
						.toFixed(4) * 100).toFixed(2)
						: 0.00;
				cell.innerHTML = cell.innerHTML + '%';

			} else {
				cell.width = "100";
				if (i >= 3)
					cell.innerHTML = (Number((parseFloat(sum))
							.toFixed(2))).toFixed(2);
			}
			if ((i == 3)
					|| (i == 4)) {//total cases allocated(Cases filter)/ Total Calls Made (Calls filter)
				totalCasesOrCalls = (Number((parseFloat(sum))
						.toFixed(2))).toFixed(2);
			} else if (i == tot_columns_length - 4) {//fptp conversion
				fptpConvertedTotal = (Number((parseFloat(sum))
						.toFixed(2))).toFixed(2);
			} else if (i == tot_columns_length - 3) {//tptp conversion
				tptpConvertedTotal = (Number((parseFloat(sum))
						.toFixed(2))).toFixed(2);
			}
		}
	}
}
//Generic function for all FOS activity Generation flip-views total calculation in percentage(%).
function calculateFosActivityGenTotalPercent(data, table_name_id, columns_length, total_width){
	
	if(isDrillDownRequired()){
		 setListener(table_name_id, $('#' + table_name_id + ' tr').length - data.length);
		 }
	
	$('#' + table_name_id)
	.append(
			'<tr><td colspan="'
			+ (columns_length + 1)
			+ '"><div class="blackline" style="margin-top:2px; width: '+total_width+'px;"></div></td></tr>');
	if (data != null) {
		var i = 0, j = 0;
		var isPercentage = document.getElementById("noOrPercent").value;
		var tot_columns_length = columns_length + 1; // including S.No
		var tableTotal = document.getElementById(table_name_id);
		var row = tableTotal.insertRow($('#' + table_name_id + ' tr').length);
		var fptpConvertedTotal = 0;
		var tptpConvertedTotal = 0;
		var totalCasesOrCalls = 0;
		for (i = 0; i < tot_columns_length; i++) {
			var sum = 0;
			var table = document.getElementById(table_name_id);
			if (i >= 3) {
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
				cell.innerHTML = "Total";
			} else if (i == 1 || i == 2) {
				continue;
			} else if (i == tot_columns_length - 1) {//net rate
				cell.width = "100";
				cell.innerHTML = (Number((parseFloat(sum)).toFixed(2)) / data.length).toFixed(2);
				cell.innerHTML = cell.innerHTML + '%';
			} else if (i > tot_columns_length - 13) {
				cell.width = "100";
				cell.innerHTML = Number(
						(parseFloat(sum)).toFixed(2) / data.length)
						.toFixed(2);
				cell.innerHTML = cell.innerHTML + '%';
				if (i == 4) {//total cases allocated(Cases filter)/ Total Calls Made (Calls filter)
					totalCasesOrCalls = Number(
							(parseFloat(sum)).toFixed(2) / data.length)
							.toFixed(2);
				} else if (i == tot_columns_length - 4) {//fptp conversion
					fptpConvertedTotal = Number(
							(parseFloat(sum)).toFixed(2) / data.length)
							.toFixed(2);
				} else if (i == tot_columns_length - 3) {//tptp conversion
					tptpConvertedTotal = Number(
							(parseFloat(sum)).toFixed(2) / data.length)
							.toFixed(2);
				}

			} else {
				cell.width = "100";
				if (i >= 3)
					cell.innerHTML = Number((parseFloat(sum))
							.toFixed(2));

			}
		}
	}
}
// Next 3 days total calculation.
function fosActivityNextThreeDaysCallback(data, table_name_id, columns_length, total_width){
	
	if(isDrillDownRequired()){
		 setListener(table_name_id, $('#' + table_name_id + ' tr').length - data.length);
		 }
	
	$('#' + table_name_id)
	.append(
			'<tr><td colspan="'
			+ (columns_length + 1)
			+ '"><div class="blackline" style="margin-top:2px; width: '+total_width+'px;"></div></td></tr>');
	if (data != null) {
		var i = 0, j = 0;
		var isPercentage = document.getElementById("noOrPercent").value;
		var tot_columns_length = columns_length + 1; // including S.No
		var row = tableTotal.insertRow($('#' + table_name_id + ' tr').length);
		for (i = 0; i < tot_columns_length; i++) {
			var sum = 0;
			if (i >= 5) {
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
				cell.innerHTML = "Total";
			} else if (i == 1 || i == 2) {
				continue;
			} else if (i == tot_columns_length - 1) {
				cell.width = "100";
				cell.innerHTML = (Number((parseFloat(sum)).toFixed(2)) / data.length).toFixed(2);
			} else {
				cell.width = "100";
				if (i >= 5)
					cell.innerHTML = (Number((parseFloat(sum)).toFixed(2))).toFixed(2);
			}
		}
	}
}
/*for Drill downs*/
function setListener(tableid, startindex) {
	var table = document.getElementById(tableid);
	if (table != null) {
		for (var i = startindex; i < table.rows.length; i++) {
			table.rows[i].cells[1].onmouseover = function() {
				this.style.color = "#ff0000";
				this.style.textDecoration = 'underline';
				this.style.cursor = 'pointer';
			};
			table.rows[i].cells[1].onmouseout = function() {
				this.style.color = "#000000";
				this.style.textDecoration = 'none';
			};
			table.rows[i].cells[1].onclick = function() {
				var id = this.innerHTML;
				if (id == null || id == "") {
					alert("please choose Ecode");
					document.getElementById("ecode").focus();
					return false;
				}
				var URL = "dashboard090ListController.htm?formAction=DRILL_DOWN&id=" + id + "&levelCode=" + drill_level_code;
				if (levelCode == 'level4_code') {
					URL = "dashboard090ListController.htm?formAction=DRILL_DOWN&id="+ id+ "&levelCode=level6_code";
				}else if (levelCode == 'level5_code') {
					URL = "dashboard090ListController.htm?formAction=DRILL_DOWN&id="+ id+ "&levelCode=level2_code";
				}else if (levelCode == 'level6_code') {
					
					if (    tableid == 'genericHistory_calling_activity_tl_ops_month_to_date_details_perc' ||
							tableid == 'genericHistory_calling_activity_tl_ops_for_the_day_details_perc' ||
							tableid == 'genericHistory_fos_activity_generation_tl_ops_month_to_date_details_no_cases' ||
							tableid == 'genericHistory_fos_activity_generation_tl_ops_month_to_date_details_perc_cases' ||
							tableid == 'genericHistory_fos_activity_generation_tc_month_to_date_details_no_calls' ||
							tableid == 'genericHistory_fos_activity_generation_tc_month_to_date_details_perc_calls' ||
							tableid == 'genericHistory_calling_activity_tl_ops_month_to_date_details_no'
							|| tableid == 'genericHistory_calling_activity_tl_ops_for_the_day_details_no'
							|| tableid == 'genericHistory_tlops_prev_mth_activity_summary_details'
							|| tableid == 'genericHistory_tlops_activity_summary_details') {
						
						URL = "dashboard090ListController.htm?formAction=DRILL_DOWN&id="
								+ id + "&levelCode=level5_code";
					} else {
						URL = "dashboard090ListController.htm?formAction=DRILL_DOWN&id="
								+ id + "&levelCode=level3_code";
					}
				} else if (levelCode == 'level8_code') {
					URL = "dashboard090ListController.htm?formAction=DRILL_DOWN&id="
							+ id + "&levelCode=level4_code";
				} else if (levelCode == 'level9_code') {
					URL = "dashboard090ListController.htm?formAction=DRILL_DOWN&id="
							+ id + "&levelCode=level8_code";
				} else if (levelCode == 'level10_code') {
					URL = "dashboard090ListController.htm?formAction=DRILL_DOWN&id="
							+ id + "&levelCode=level9_code";
				} 
				var winFeature = ' directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=yes,resizable=yes,';
				window.open(URL, 12, winFeature);
			};
		}
	}
}


// Activity - TC - For the Day Total calcuation. (TC 0-90)
function calculateTcActivityFTD(data,table_name_id,columns_length,total_width) {
	$('#'+table_name_id).append('<tr><td colspan="'+(columns_length+1)+'"><div class="blackline" style="margin-top:2px; width: '+total_width+'px;"></div></td></tr>');

	if(data!=null){
	    var i = 0, j = 0;
		var tot_columns_length = columns_length+1; // including S.No
		var tableTotal = document.getElementById(table_name_id);
		var row = tableTotal.insertRow($('#'+table_name_id+' tr').length);
		for (i = 0; i < tot_columns_length; i++) {

			var sum = 0.00;
			
			if (i>2) {
				for (j = 0; j < data.length; j++) {
					if (data[j][i - 1] != null && data[j][i - 1] != ""
							&& data[j][i - 1] != "0")
						sum = parseFloat(sum) + parseFloat(data[j][i - 1]);
				}
			}

			var cell = row.insertCell(i);
			cell.className = 'table_column_style';
			cell.height = "24";
			cell.align = "left";
			cell.valign = "middle";
			if (i == 0) {
				cell.width = "80";
				cell.innerHTML = "Total";
			} else if ( i == 1 || i == 2 ) {
				cell.innerHTML = "";
			}
		 else {
				cell.innerHTML = (Number((parseFloat(sum)).toFixed(2))).toFixed(2);
		 }
		}

	} 
}

// Activity - TC - Month to Date Total Calculation (TC 0-90)
function calculateTcActivityMTD(data,table_name_id,columns_length,total_width) {
	$('#'+table_name_id).append('<tr><td colspan="'+(columns_length+1)+'"><div class="blackline" style="margin-top:2px; width: '+total_width+'px;"></div></td></tr>');
	
	if(data!=null){
	    var i = 0, j = 0;
		var tot_columns_length = columns_length+1; // including S.No
		var tableTotal = document.getElementById(table_name_id);
		var row = tableTotal.insertRow($('#'+table_name_id+' tr').length);
		for (i = 0; i < tot_columns_length; i++) {

			var sum = 0.00;
			
			if (i>2) {
				for (j = 0; j < data.length; j++) {
					if (data[j][i - 1] != null && data[j][i - 1] != ""
							&& data[j][i - 1] != "0")
						sum = parseFloat(sum) + parseFloat(data[j][i - 1]);
				}
			}

			var cell = row.insertCell(i);
			cell.className = 'table_column_style';
			cell.height = "24";
			cell.align = "left";
			cell.valign = "middle";
			if (i == 0) {
				cell.width = "80";
				cell.innerHTML = "Total";
			} else if ( i == 1 || i == 2 ) {
				cell.innerHTML = "";
			}
		 else {
				cell.innerHTML = (Number((parseFloat(sum)).toFixed(2))).toFixed(2);
		 }
		}

	} 
}

//Activity - For the Day Total Calculation.
function calculateActivityForTheDayTotal(data,table_name_id,columns_length,total_width) {
	
	if(isDrillDownRequired()){
		 setListener(table_name_id, $('#' + table_name_id + ' tr').length - data.length);
		 }
	
	$('#'+table_name_id).append('<tr><td colspan="'+(columns_length+1)+'"><div class="blackline" style="margin-top:2px; width: '+total_width+'px;"></div></td></tr>');
	
	if(data!=null){
	    var i = 0, j = 0;
		var tot_columns_length = columns_length+1; // including S.No
		var tableTotal = document.getElementById(table_name_id);
		var row = tableTotal.insertRow($('#'+table_name_id+' tr').length);
		for (i = 0; i < tot_columns_length; i++) {

			var sum = 0.00;
			
			if (i>2) {
				for (j = 0; j < data.length; j++) {
					if (data[j][i - 1] != null && data[j][i - 1] != ""
							&& data[j][i - 1] != "0")
						sum = parseFloat(sum) + parseFloat(data[j][i - 1]);
				}
			}

			var cell = row.insertCell(i);
			cell.className = 'table_column_style';
			cell.height = "24";
			cell.align = "left";
			cell.valign = "middle";
			if (i == 0) {
				cell.width = "80";
				cell.innerHTML = "Total";
			} else if ( i == 4 || i == 1 || i == 2 || i == 3 ) {
				cell.innerHTML = "";
			}
		 else {
				cell.innerHTML = (Number((parseFloat(sum)).toFixed(2))).toFixed(2);
		 }
		}

	} 
}

//Activity - Month to Date Total Calculation.
function calculateActivityMonthToDayTotal(data,table_name_id,columns_length,total_width) {
	
	if(isDrillDownRequired()){
		 setListener(table_name_id, $('#' + table_name_id + ' tr').length - data.length);
		 }
	
	$('#'+table_name_id).append('<tr><td colspan="'+(columns_length+1)+'"><div class="blackline" style="margin-top:2px; width: '+total_width+'px;"></div></td></tr>');

	if(data!=null){
	    var i = 0, j = 0;
		var tot_columns_length = columns_length+1; // including S.No
		var tableTotal = document.getElementById(table_name_id);
		var row = tableTotal.insertRow($('#'+table_name_id+' tr').length);
		for (i = 0; i < tot_columns_length; i++) {

			var sum = 0.00;
			
			if (i>2) {
				for (j = 0; j < data.length; j++) {
					if (data[j][i - 1] != null && data[j][i - 1] != ""
							&& data[j][i - 1] != "0")
						sum = parseFloat(sum) + parseFloat(data[j][i - 1]);
				}
			}

			var cell = row.insertCell(i);
			cell.className = 'table_column_style';
			cell.height = "24";
			cell.align = "left";
			cell.valign = "middle";
			if (i == 0) {
				cell.width = "80";
				cell.innerHTML = "Total";
			} else if ( i == 4 || i == 1 || i == 2 || i == 3) {
				cell.innerHTML = "";
			}
		 else {
				cell.innerHTML = (Number((parseFloat(sum)).toFixed(2))).toFixed(2);
			}
		}

	} 
}

//Activity - For Next 3 Days Total Calculation.
function calculateActivityNextThreeDaysTotal(data,table_name_id,columns_length,total_width) {
	
	if(isDrillDownRequired()){
		 setListener(table_name_id, $('#' + table_name_id + ' tr').length - data.length);
		 }
	
	$('#'+table_name_id).append('<tr><td colspan="'+(columns_length+1)+'"><div class="blackline" style="margin-top:2px; width: '+total_width+'px;"></div></td></tr>');
	
	if(data!=null){
	    var i = 0, j = 0;
		var tot_columns_length = columns_length+1; // including S.No
		var tableTotal = document.getElementById(table_name_id);
		var row = tableTotal.insertRow($('#'+table_name_id+' tr').length);
		for (i = 0; i < tot_columns_length; i++) {

			var sum = 0.00;
			
			if (i>2) {
				for (j = 0; j < data.length; j++) {
					if (data[j][i - 1] != null && data[j][i - 1] != ""
							&& data[j][i - 1] != "0")
						sum = parseFloat(sum) + parseFloat(data[j][i - 1]);
				}
			}

			var cell = row.insertCell(i);
			cell.className = 'table_column_style';
			cell.height = "24";
			cell.align = "left";
			cell.valign = "middle";
			if (i == 0) {
				cell.width = "80";
				cell.innerHTML = "Total";
			} else if ( i == 4 || i == 1 || i == 2 || i == 3 ) {
				cell.innerHTML = "";
			}
		 else {
				cell.innerHTML = (Number((parseFloat(sum)).toFixed(2))).toFixed(2);
		 }
		}

	} 
}

// Returns devided value
function returnDevideValue(c1, c2) {
	var value = 0.00;
	if (c1 != null && c1 > 0) {
		value = (Number((parseFloat(c2) * 100 / parseFloat(c1))
				.toFixed(2))).toFixed(2);
	}
	return value;
}
// Returns Sum
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
// FOS Activity Summary (AM 0-90)
function calculateActivitySummaryTotal(data, table_name_id,columns_length, total_width) {
	if(isDrillDownRequired()){
		 setListener(table_name_id, $('#' + table_name_id + ' tr').length - data.length);
	}
	$('#' + table_name_id).append('<tr><td colspan="'
							+ (columns_length + 1)
							+ '"><div class="blackline" style="margin-top:2px; width: '+total_width+'px;"></div></td></tr>');

	if (data != null) {
		var i = 0, j = 0;
		var tot_columns_length = columns_length + 1; // including S.No
		var tableTotal = document.getElementById(table_name_id);
		var row = tableTotal
				.insertRow($('#' + table_name_id + ' tr').length);
		var visit_cnt = getsum(data, 10);
		for (i = 0; i < tot_columns_length; i++) {

			var sum = 0.0;
			if (i==3 ||i == 4 || i == 8 || i == 9) {
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
				cell.innerHTML = "Total";
			} else if (i == 1 || i == 2 || i == 3) {
				cell.innerHTML = "";
			} else if (i == 5) {
				var totalvisits = 0.0;
				if (visit_cnt > 0) {
					for (j = 0; j < data.length; j++) {
						totalvisits = totalvisits
								+ (data[j][11] * data[j][12] * data[j][2]);
					}
					cell.innerHTML = returnDevideValue(totalvisits,
							visit_cnt)
							+ "%";
				} else {
					cell.innerHTML = "0.00%";
				}
			} else if (i == 10) {
				cell.innerHTML = returnDevideValue(visit_cnt, getsum(
						data, 13));
			} else if (i == 9) {
				var summm = getsum(data, 14);
				if (summm == 0 || summm == null || summm == "")
					cell.innerHTML = "0.00";
				else
					cell.innerHTML = (Number((parseFloat(visit_cnt) / parseFloat(summm)).toFixed(2))).toFixed(2);
			} else if (i == 6) {
				cell.innerHTML = returnDevideValue(getsum(data, 16),
						getsum(data, 15));
			} else if (i == 7) {
				cell.innerHTML = returnDevideValue(getsum(data, 18),
						getsum(data, 17));
			} else {

				cell.innerHTML = (Number((parseFloat(sum)).toFixed(2))).toFixed(2);
			}
		}

	} 
}

// Activity - FOS - For the Day (AM 0-90)
function calculateFosActivityTotalForDayJson(data, table_name_id,columns_length, total_width) {

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
				
				cell.innerHTML = "Total";
			} else if (i == 1 || i == 3 || i == 4) {
				cell.innerHTML = "";
			} else if (i == 2) {
				cell.innerHTML = "";
			} else {

				cell.innerHTML = (Number((parseFloat(sum)).toFixed(2))).toFixed(2);
			}
		}

	} 
}
/* BM 0-90*/
//AM Activity Summary
function calculateFosActivitySummaryTotal(data, table_name_id,
		columns_length, total_width) {
	setListener(table_name_id, $('#' + table_name_id + ' tr').length
			- data.length);
	calculateActivitySummaryTotal(data, table_name_id, columns_length,
			total_width);
}
//Activity - AM - For the Day
function calculateFosActivityTotalForDayJsonWithDrillDown(data,
		table_name_id, columns_length, total_width) {
	setListener(table_name_id, $('#' + table_name_id + ' tr').length
			- data.length);
	calculateFosActivityTotalForDayJson(data, table_name_id,
			columns_length, total_width);
}
// TLOps Activity Summary
function calculateTcSummaryActivityTotal(data, table_name_id,
		columns_length, total_width) {
	setListener(table_name_id, $('#' + table_name_id + ' tr').length
			- data.length);
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
		var total_cases_called = 0;
		for (i = 0; i < tot_columns_length; i++) {
			var sum = 0;
			if (i == 3 || i == 6) {
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
				
				cell.innerHTML = "Total";
			} else if (i == 1) {
				cell.innerHTML = "";
			} else if (i == 2) {
				cell.innerHTML = "";
			} else if (i == 4) { // capacity utilization
				var working_days = getsum(data, 9);
				total_cases_called = getsum(data, 8);
				var tccnt = getsum(data, 14);
				if (working_days > 0 && tccnt > 0) {
					cell.innerHTML = Number((parseFloat(total_cases_called
							/ (working_days * tccnt))).toFixed(2));
				} else {
					cell.innerHTML = '0.00';
				}
			} else if (i == 5) {
				var allocated_cases = tableTotal.rows[$('#'
						+ table_name_id + ' tr').length - 1].cells[3].innerHTML;
				var ftp_conversion = 0;
				if (allocated_cases != null
						&& parseFloat(allocated_cases) > 0) {
					for (j = 0; j < data.length; j++) {
						if (data[j][10] != null && data[j][10] != ""
								&& data[j][10] != "0")
							ftp_conversion = parseFloat(ftp_conversion)
									+ parseFloat(data[j][10]);
					}
					cell.innerHTML = Number((parseFloat(ftp_conversion
							/ allocated_cases)).toFixed(2));
				}

			} else if (i == 7) {
				var cases_called = 0;
				for (j = 0; j < data.length; j++) {
					if (data[j][13] != null && data[j][13] != ""
							&& data[j][13] != "0")
						cases_called = parseFloat(cases_called)
								+ parseFloat(data[j][13]);
				}
				if (cases_called != null && cases_called > 0) {
					cell.innerHTML = Number((parseFloat(total_cases_called
							/ cases_called)).toFixed(2));
				}
			} else if (i == 8) {
				var fos_collection = 0;
				var fos_false_collection = 0;
				for (j = 0; j < data.length; j++) {
					if (data[j][11] != null && data[j][11] != ""
							&& data[j][11] != "0")
						fos_false_collection = parseFloat(fos_false_collection)
								+ parseFloat(data[j][11]);
					if (data[j][12] != null && data[j][12] != ""
							&& data[j][12] != "0")
						fos_collection = parseFloat(fos_collection)
								+ parseFloat(data[j][12]);
				}
				if (fos_collection > 0 || fos_collection > 0) {
					cell.innerHTML = Number((parseFloat(fos_false_collection
							* 100
							/ (fos_collection + fos_false_collection)))
							.toFixed(2));
				}
			}

			else {

				cell.innerHTML = Number((parseFloat(sum)).toFixed(2));
			}

		} // end of for 
	}
}
//
function tlTcActivityDayCallback(data, table_name_id, columns_length, total_width) {
	
	setListener(table_name_id, $('#' + table_name_id + ' tr').length
			- data.length);
	$('#' + table_name_id)
	.append(
			'<tr><td colspan="'
			+ (columns_length + 1)
			+ '"><div class="blackline" style="margin-top:2px; width: '+total_width+'px;"></div></td></tr>');
	if (data != null) {
		var i = 0, j = 0;
		var isPercentage = document.getElementById("noOrPercent").value;
		var tot_columns_length = columns_length + 1; // including S.No
		var tableTotal = document.getElementById(table_name_id);
		var row = tableTotal.insertRow($('#' + table_name_id + ' tr').length);
		for (i = 0; i < tot_columns_length; i++) {
			var sum = 0;
			if (i >= 2) {
				for (j = 0; j < data.length; j++) {
					if (data[j][i - 1] != null && data[j][i - 1] != ""
							&& data[j][i - 1] != "0")
						sum = parseFloat(sum)
								+ parseFloat(data[j][i - 1]);

				}
			}
			var table = document.getElementById(table_name_id);
			var cell = row.insertCell(i);
			cell.className = 'table_column_style';
			cell.height = "24";
			cell.align = "left";
			cell.valign = "middle";
			if (i == 0) {
				cell.width = "50";
				
				cell.innerHTML = "Total";
			} else if (i == 1 || i == 2) {
				cell.width = '1';
			}else {
				cell.width = "100";
				if (i >= 3)
					cell.innerHTML = (Number((parseFloat(sum))
							.toFixed(2))).toFixed(2);
					//cell.innerHTML = parseFloat(getsum(data,i-1));
			}
		}
	}

}

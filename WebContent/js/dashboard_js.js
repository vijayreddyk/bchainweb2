/*******************************************************************************
 * Project MCMS, all source code and data files except images,
 * Copyright 2008-2015 Grit-Innovation Software Pvt. Ltd., India
 *
 * Permission is granted to Magma Fin Corp. to use and modify as they see fit.
 *******************************************************************************/
var HOLIDAYCAPACITY;
(function($) {
    $.QueryString = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);


function onTogglebtnclick(val){
	var obj = document.getElementById(val);
	if(obj.hasAttribute("multiple")){
		var option = document.createElement("option");
		option.text = "Select";
		option.value = "";
		obj.add(option, obj.options[0]);
		
	obj.options[0].selected = "Selected";
	obj.removeAttribute("multiple");
	obj.removeAttribute("size");
	obj.style.height = "24px";
	}else{
		if(obj.options[0].value=="")
			obj.remove(obj.options[0]);
			
		obj.setAttribute("multiple","multiple");
		
		obj.setAttribute("size","4");
		obj.style.height = "65px";
	}
}
/*
 * Replacing All Null Values in Array
 */
function replaceNullOccurence(data){
	var hasNull=false;
	var text="";
	for(var i=0;i<data.length;i++){
		for(var j=0;j<data[i].length;j++){
			text+=data[i][j]+"::";
			if(data[i][j]==null){
				data[i][j]="0";
				hasNull=true;
			}
		}
		text+="\n";
	}
	if(hasNull==true){
		//console.log(text);
		console.log("Null Replaced................");	
	}
	return data;
}
var formAction = $.QueryString["formAction"];
/**
 * 31 to 90 fos details
 */
$(document).ready(function() {
	$(".bucketfosActivityflip").click(function() {
		get31to90FosActivityDetails();
		$(".bucketfosActivitypanel").slideToggle("slow");
	});
});
function get31to90FosActivityDetails() {
	var zhCode = document.getElementById("zhCode");
	if(zhCode!=null)
	{
	zhCode=zhCode.value;	
	}
	var fosCode = document.getElementById("fosCode").value;
	var divCode = document.getElementById("divCode").value;
	var locCode = document.getElementById("locCode").value;
	if(locCode==null || locCode==""){		
		locCode=locationCode;
	}
	var openBucket = document.getElementById("openBucket").value;
	var caseType = document.getElementById("caseType").value;

	var table = document.getElementById("bucketfosActivityDetails");
	var noOfRow = table.rows.length;
	if (parseInt(noOfRow) == 0)
		DWRUtil.get31to90FosActivityDetails(userId, userRole, fosCode,
				divCode, locCode, openBucket, caseType, zoneCode,zhCode,
				tl31to90fosActivityDetailsCallback);

}
function onchangeFosEcode(id) {
	$('#bucketfosActivityDetails').html("");
	$('#bucketfosActivityActDetails').html("");
	$('#bucketfosActivityCurrentDetails').html("");
	$('#bucketfosActivityPreDetails').html("");
	$('#bucketfosActivityMonthDetails').html("");
	$('#bucketfoscurMonTargetActivityDetails').html("");
	$('#bucketfosActivityCurrentMTDActDetails').html("");
	$('#bucketfosActivityPreviousMTDActDetails').html("");
	$('#fosActTargetCal').html("");
	$('#fosActActualCal').html("");
	$('#fosActCurrentCal').html("");
	$('#fosActPrevCal').html("");
	$('#fosActMtdCal').html("");
	var zhCode = document.getElementById("zhCode");
	if(zhCode!=null)
	{
		zhCode = zhCode.value;
	}
	var fosCode = document.getElementById("fosCode").value;
	var divCode = document.getElementById("divCode").value;
	var locCode = document.getElementById("locCode").value;
	var openBucket = document.getElementById("openBucket").value;
	var caseType = document.getElementById("caseType").value;
	if(id=="zhCode")
	{
		DWRUtil.getShCodeByZhCode(userId,zhCode, getShCodeByZhCodeCallback);
		fosCode="";
	}
	DWRUtil.get31to90FosActivityDetails(userId, userRole, fosCode, divCode,
			locCode, openBucket, caseType, zoneCode,zhCode,
			tl31to90fosActivityDetailsCallback);
	DWRUtil.get31to90FosActivityMtdActDetails(userId, userRole, fosCode,
			divCode, locCode, openBucket, caseType, zoneCode,zhCode,
			tl31to90fosActivityMtdActDetailsCallback);
	DWRUtil.get31to90FosActivityCurrentDetails(userId, userRole, fosCode,
			divCode, locCode, openBucket, caseType, zoneCode,zhCode,
			tl31to90fosActivityCurrentDetailsCallback);
	DWRUtil.get31to90FosActivityPreDetails(userId, userRole, fosCode,
			divCode, locCode, openBucket, caseType, zoneCode,zhCode,
			tl31to90fosActivityPreDetailsCallback);
	DWRUtil.get31to90FosActivityMonthDetails(userId, userRole, fosCode,
			divCode, locCode, openBucket, caseType, zoneCode,zhCode,
			tl31to90fosActivityMonthDetailsCallback);
}
function getShCodeByZhCodeCallback(data)
{
	var i=0;
	var fosCode = document.getElementById("fosCode");
	var len = data.length;
	fosCode.options.length = 0;
	fosCode.options[0]= new Option("Select","");
	for(var i=0;i<len;i++)
	{
		fosCode.options[fosCode.options.length]= new Option(data[i].substr(data[i].indexOf("$")+1),data[i].substr(0,data[i].indexOf("$")));
	}
}
function tl31to90fosActivityDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("bucketfosActivityDetails");
			var row = table.insertRow(i);

			for (j = 0; j < 21; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("fosActTargetCal");
		calulateTotalForActTarget(data, tableTotal, 21);
		/*if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head"  || userRole=="Location Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){
			setListener("bucketfosActivityDetails");
			}*/
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("bucketfosActivityDetails",0);
			}
	} else {
		var table = document.getElementById("bucketfosActivityDetails");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}

}

/**
 * 31 to 90 fos details Actual
 */
$(document).ready(function() {
	$(".bucketfosActivityActflip").click(function() {
		get31to90FosActivityMtdActDetails();
		$(".bucketfosActivityActpanel").slideToggle("slow");
	});
});
function get31to90FosActivityMtdActDetails() {
	var zhCode = document.getElementById("zhCode");
	if(zhCode!=null)
	{
	zhCode=zhCode.value;	
	}
	var fosCode = document.getElementById("fosCode").value;
	var divCode = document.getElementById("divCode").value;
	var locCode = document.getElementById("locCode").value;
	if(locCode==null || locCode==""){		
		locCode=locationCode;
	}
	var openBucket = document.getElementById("openBucket").value;
	var caseType = document.getElementById("caseType").value;

	var table = document.getElementById("bucketfosActivityActDetails");
	var noOfRow = table.rows.length;

	if (noOfRow == 0) {
		DWRUtil.get31to90FosActivityMtdActDetails(userId, userRole,
				fosCode, divCode, locCode, openBucket, caseType, zoneCode,zhCode,
				tl31to90fosActivityMtdActDetailsCallback);
	}
}

function tl31to90fosActivityMtdActDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("bucketfosActivityActDetails");
			var row = table.insertRow(i);

			for (j = 0; j < 21; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("fosActActualCal");
		calulateTotalForActTarget(data, tableTotal, 21);
		/*if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head"   || userRole=="Location Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){
			setListener("bucketfosActivityActDetails");
			}*/
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("bucketfosActivityActDetails",0);
		}
	} else {
		var table = document.getElementById("bucketfosActivityActDetails");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}

}

/**
 * 31 to 90 fos details FOS Activation Report Current
 */
$(document).ready(function() {
	$(".bucketfosActivityCurrentflip").click(function() {
		get31to90FosActivityCurrentDetails();
		$(".bucketfosActivityCurrentpanel").slideToggle("slow");
	});
});
function get31to90FosActivityCurrentDetails() {
	var zhCode = document.getElementById("zhCode");
	if(zhCode!=null)
	{
	zhCode=zhCode.value;	
	}
	var fosCode = document.getElementById("fosCode").value;
	var divCode = document.getElementById("divCode").value;
	var locCode = document.getElementById("locCode").value;
	if(locCode==null || locCode==""){		
		locCode=locationCode;
	}
	var openBucket = document.getElementById("openBucket").value;
	var caseType = document.getElementById("caseType").value;

	var table = document.getElementById("bucketfosActivityCurrentDetails");
	var noOfRow = table.rows.length;

	if (noOfRow == 0) {
		DWRUtil.get31to90FosActivityCurrentDetails(userId, userRole,
				fosCode, divCode, locCode, openBucket, caseType, zoneCode,zhCode,
				tl31to90fosActivityCurrentDetailsCallback);
	}
}

function tl31to90fosActivityCurrentDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("bucketfosActivityCurrentDetails");
			var row = table.insertRow(i);
			HOLIDAYCAPACITY = data[i][8];
			for (j = 0; j < 9; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		if(roleId=='26')
			fosCnt=i;
		var tableTotal = document.getElementById("fosActCurrentCal");
		calulateTotalActivityTracker(data, tableTotal, 9);
		/*if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head"   || userRole=="Location Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){
			setListener("bucketfosActivityCurrentDetails");
			}*/
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("bucketfosActivityCurrentDetails",0);
		}
	} else {
		var table = document.getElementById("bucketfosActivityCurrentDetails");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}

}
function daysInMonth(month, year)
{
	var dd = new Date(year, month, 0);
	return dd.getDate();
}

function calulateTotalActivityTracker(data, tableTotal, noOfColumns) {
	if (data != null) {
		var i = 0, j = 0;
		var row = tableTotal.insertRow(0);
		for (i = 0; i < noOfColumns; i++) {
			var sum = 0;
			if (i > 2) {
				for (j = 0; j < data.length; j++) {
					if (data[j][i - 1] != null && data[j][i - 1] != ""
							&& data[j][i - 1] != "0")
						sum = parseFloat(sum) + parseFloat(data[j][i - 1]);
				}
			}
			//				 			alert(sum);
			var cell = row.insertCell(i);
			cell.height = "24";
			cell.align = "left";
			cell.valign = "middle";
			if (i == 0) {
				cell.width = "40";
				cell.innerHTML = "Total";
			} else if (i == 1 || i == 2) {
				cell.width = "80";
				cell.innerHTML = "";
			} else if (i == 7) {
				cell.width = "80";
				var val = "0";
				if (noOfVisits != "0")
					{
				
				if(tableTotal.id == "fosActMtdCal")
				{
					var d= new Date();
					var day = d.getDate();
					var month = d.getUTCMonth();
					var year = d.getUTCFullYear();
					if(day == 1)
					{
						if(month==0)
							month = 12;
						day = daysInMonth(month,year);
					}
					else
						day=day-1;
					val = (tableTotal.rows[0].cells[6].innerHTML /(( noOfVisits * fosCnt * day)-(HOLIDAYCAPACITY*fosCnt))) * 100;
				}
				else
				{
					/*alert(HOLIDAYCAPACITY);
					alert(fosCnt);
					*/val = (tableTotal.rows[0].cells[6].innerHTML / (noOfVisits*fosCnt)-(HOLIDAYCAPACITY*fosCnt)) * 100;
					//val = (tableTotal.rows[0].cells[6].innerHTML / noOfVisits) * 100;
				
				}
					}
				cell.innerHTML = Number((parseFloat(val)).toFixed(2));
			} else if (i == 8) {
				cell.width = "80";
				var val = "0";
				if (tableTotal.rows[0].cells[6].innerHTML != "0")
					val = (tableTotal.rows[0].cells[4].innerHTML / tableTotal.rows[0].cells[6].innerHTML) * 100;
				cell.innerHTML = Number((parseFloat(val)).toFixed(2));
				;
			} else {
				cell.width = "80";
				cell.innerHTML = Number((parseFloat(sum)).toFixed(2));
				;
			}

		}

	}
}
/**
 * 31 to 90 fos details FOS Activation Report Previous
 */
$(document).ready(function() {
	$(".bucketfosActivityPreflip").click(function() {
		get31to90FosActivityPreDetails();
		$(".bucketfosActivityPrepanel").slideToggle("slow");
	});
});
function get31to90FosActivityPreDetails() {
	var zhCode = document.getElementById("zhCode");
	if(zhCode!=null)
	{
	zhCode=zhCode.value;	
	}
	var fosCode = document.getElementById("fosCode").value;
	var divCode = document.getElementById("divCode").value;
	var locCode = document.getElementById("locCode").value;
	if(locCode==null || locCode==""){		
		locCode=locationCode;
	}
	var openBucket = document.getElementById("openBucket").value;
	var caseType = document.getElementById("caseType").value;

	var table = document.getElementById("bucketfosActivityPreDetails");
	var noOfRow = table.rows.length;

	if (noOfRow == 0) {
		DWRUtil.get31to90FosActivityPreDetails(userId, userRole, fosCode,
				divCode, locCode, openBucket, caseType, zoneCode,zhCode,
				tl31to90fosActivityPreDetailsCallback);
	}
}

function tl31to90fosActivityPreDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("bucketfosActivityPreDetails");
			var row = table.insertRow(i);
			HOLIDAYCAPACITY = data[i][8];
			for (j = 0; j < 9; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		if(roleId=='26')
			fosCnt=i;
		var tableTotal = document.getElementById("fosActPrevCal");
		calulateTotalActivityTracker(data, tableTotal, 9);
		/*if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head"  || userRole=="Location Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){
			setListener("bucketfosActivityPreDetails");
			}*/
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("bucketfosActivityPreDetails",0);
		}
	} else {
		var table = document.getElementById("bucketfosActivityPreDetails");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}

}
/**
 * 31 to 90 fos details FOS Activation Report Month
 */
$(document).ready(function() {
	$(".bucketfosActivityMonthflip").click(function() {
		get31to90FosActivityMonthDetails();
		$(".bucketfosActivityMonthpanel").slideToggle("slow");
	});
});
function get31to90FosActivityMonthDetails() {
	var zhCode = document.getElementById("zhCode");
	if(zhCode!=null)
	{
	zhCode=zhCode.value;	
	}
	var fosCode = document.getElementById("fosCode").value;
	var divCode = document.getElementById("divCode").value;
	var locCode = document.getElementById("locCode").value;
	if(locCode==null || locCode==""){		
		locCode=locationCode;
	}
	var openBucket = document.getElementById("openBucket").value;
	var caseType = document.getElementById("caseType").value;

	var table = document.getElementById("bucketfosActivityMonthDetails");
	var noOfRow = table.rows.length;

	if (noOfRow == 0) {
		DWRUtil.get31to90FosActivityMonthDetails(userId, userRole, fosCode,
				divCode, locCode, openBucket, caseType, zoneCode,zhCode,
				tl31to90fosActivityMonthDetailsCallback);
	}
}

function tl31to90fosActivityMonthDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("bucketfosActivityMonthDetails");
			var row = table.insertRow(i);
			HOLIDAYCAPACITY = data[i][8];
			for (j = 0; j < 9; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		if(roleId=='26')
		fosCnt=i;
		var tableTotal = document.getElementById("fosActMtdCal");
		calulateTotalActivityTracker(data, tableTotal, 9);
		/*if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head"   || userRole=="Location Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){*/
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("bucketfosActivityMonthDetails",0);
			}
	} else {
		var table = document.getElementById("bucketfosActivityMonthDetails");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}

}

/**
 * 91-730 dash board
 */
$(document).ready(function() {
	$(".bucketActivityreportflip").click(function() {
		get91to730FosActivityDetails();
		$(".bucketActivitreportypanel").slideToggle("slow");
	});
});
function get91to730FosActivityDetails() {
	var table = document.getElementById("buckActivityreportDetails");
	var noOfRow = table.rows.length;
	if (noOfRow == 0) {
		DWRUtil.get91to730FosActivityDetails(userId,BUCKETUSER,activity_done_today, tl91to730fosActivityDetailsCallback);
	}
}

function tl91to730fosActivityDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document
					.getElementById("buckActivityreportDetails");
			var row = table.insertRow(i);

			for (j = 0; j < 18; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("buckActivityreportDetailsCal");
		calulateTotalForActivities(data, tableTotal, 18);
		/*if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){*/
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("buckActivityreportDetails",0);
			}
	} else {
		var table = document.getElementById("buckActivityreportDetails");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}

}
function calulateTotalForActivities(data, tableTotal, noOfColumns) {
	if (data != null) {
		var i = 0, j = 0;
		var row = tableTotal.insertRow(0);
		for (i = 0; i < noOfColumns; i++) {
			var sum = 0;
			if (i > 2) {
				for (j = 0; j < data.length; j++) {
					if (data[j][i - 1] != null && data[j][i - 1] != ""
							&& data[j][i - 1] != "0")
						sum = parseFloat(sum) + parseFloat(data[j][i - 1]);
				}
			}
			//		 			alert(sum);
			var cell = row.insertCell(i);
			cell.height = "24";
			cell.align = "left";
			cell.valign = "middle";
			if (i == 0) {
				cell.width = "40";
				cell.innerHTML = "Total";
			} else if (i == 1 || i == 2) {
				cell.width = "80";
				cell.innerHTML = "";
			} else if (i == 6) {
				cell.width = "80";
				var val = "0";
				if (tableTotal.rows[0].cells[5].innerHTML != "0")
					val = (tableTotal.rows[0].cells[4].innerHTML / tableTotal.rows[0].cells[5].innerHTML) * 100;
				cell.innerHTML = Number((parseFloat(val)).toFixed(2));
				;
			} else {
				cell.width = "80";
				cell.innerHTML = Number((parseFloat(sum)).toFixed(2));
				;
			}

		}

	}
}
function calulateTotalForActTarget(data, tableTotal, noOfColumns) {
	if (data != null) {
		var i = 0, j = 0;
		var row = tableTotal.insertRow(0);
		for (i = 0; i < noOfColumns; i++) {
			var sum = 0;
			if (i > 2) {
				for (j = 0; j < data.length; j++) {
					if (data[j][i - 1] != null && data[j][i - 1] != ""
							&& data[j][i - 1] != "0")
						sum = parseFloat(sum) + parseFloat(data[j][i - 1]);
				}
			}
			//		 			alert(sum);
			var cell = row.insertCell(i);
			cell.height = "24";
			cell.align = "left";
			cell.valign = "middle";
			if (i == 0) {
				cell.width = "40";
				cell.innerHTML = "Total";
			} else if (i == 1 || i == 2) {
				cell.width = "80";
				cell.innerHTML = "";
			} else if (i == 9) {
				cell.width = "80";
				var val = (tableTotal.rows[0].cells[7].innerHTML / tableTotal.rows[0].cells[4].innerHTML) * 100;
				cell.innerHTML = Number((parseFloat(val)).toFixed(2));
				;
			} else if (i == 11) {
				cell.width = "80";
				var val = (tableTotal.rows[0].cells[10].innerHTML / tableTotal.rows[0].cells[3].innerHTML) * 100;
				cell.innerHTML = Number((parseFloat(val)).toFixed(2));
				;
			} else if (i == 14) {
				cell.width = "80";
				var val = (tableTotal.rows[0].cells[13].innerHTML / tableTotal.rows[0].cells[6].innerHTML) * 100;
				cell.innerHTML = Number((parseFloat(val)).toFixed(2));
				;
			} else if (i == 17) {
				cell.width = "80";
				var val = (tableTotal.rows[0].cells[16].innerHTML / tableTotal.rows[0].cells[6].innerHTML) * 100;
				cell.innerHTML = Number((parseFloat(val)).toFixed(2));
				;
			} else if (i == 20) {
				cell.width = "80";
				var val = (tableTotal.rows[0].cells[19].innerHTML / tableTotal.rows[0].cells[18].innerHTML) * 100;
				cell.innerHTML = Number((parseFloat(val)).toFixed(2));
				;
			} else {
				cell.width = "80";
				cell.innerHTML = Number((parseFloat(sum)).toFixed(2));
				;
			}

		}

	}
}

/*
target uploaded kpi calculation 
 */
function calulateTotalTargetUploaded(data, tableTotal, noOfColumns) {
	if (data != null) {
		var i = 0, j = 0;
		var row = tableTotal.insertRow(0);
		for (i = 0; i < noOfColumns; i++) {
			var sum = 0;
			if (i > 2) {
				for (j = 0; j < data.length; j++) {
					if (data[j][i - 1] != null && data[j][i - 1] != ""
							&& data[j][i - 1] != "0")
						sum = parseFloat(sum) + parseFloat(data[j][i - 1]);
				}
			}
			//	 			alert(sum);
			var cell = row.insertCell(i);
			cell.height = "24";
			cell.align = "left";
			cell.valign = "middle";

			if (i == 0) {
				cell.width = "40";
				cell.innerHTML = "Total";
			} else if (i == 1 || i == 2) {
				cell.width = "80";
				cell.innerHTML = "";
			} else if (i == 8 || i == 9 || i == 10) {
				cell.width = "80";
				var val = (sum) / data.length;
				cell.innerHTML = Number((parseFloat(val)).toFixed(2));
			} else {
				cell.width = "80";
				cell.innerHTML = Number((parseFloat(sum)).toFixed(2));
				;
			}

		}

	}
}

function calulateTotal(data, tableTotal, noOfColumns) {
	if (data != null) {
		var i = 0, j = 0;
		var row = tableTotal.insertRow(0);
		for (i = 0; i < noOfColumns; i++) {
			var sum = 0;
			if (i > 2) {
				for (j = 0; j < data.length; j++) {
					if (data[j][i - 1] != null && data[j][i - 1] != ""
							&& data[j][i - 1] != "0")
						sum = parseFloat(sum) + parseFloat(data[j][i - 1]);
				}
			}
//			alert(sum);
			var cell = row.insertCell(i);
			cell.height = "24";
			cell.align = "left";
			cell.valign = "middle";
			if (i == 0) {
				cell.width = "40";
				cell.innerHTML = "Total";
			} else if (i == 1 || i == 2) {
				cell.width = "80";
				cell.innerHTML = "";
			} else if(tableTotal.id=="buckActivityreportDetails181to730Cal" && i==8){
				cell.width = "80";
				var val=0;
				var rb_odpos = parseFloat(tableTotal.rows[0].cells[5].innerHTML);
				var resolution = parseFloat(tableTotal.rows[0].cells[6].innerHTML);
				var resolution_sns = parseFloat(tableTotal.rows[0].cells[7].innerHTML);
				var total_odpos = parseFloat(tableTotal.rows[0].cells[4].innerHTML);
				val = ((rb_odpos+resolution+resolution_sns)/total_odpos) * 100;
				cell.innerHTML = ((val).toFixed(2));
			} else {
				cell.width = "80";
				cell.innerHTML = Number((parseFloat(sum)).toFixed(2));
			}

		}

	}
}

/**
 * 91-730 dash board
 */
$(document).ready(function() {
	$(".bucketActivityreportyesflip").click(function() {
		get91to730FosActivityYesDetails();
		$(".bucketActivitreportyyespanel").slideToggle("slow");
	});
});
function get91to730FosActivityYesDetails() {
	var table = document.getElementById("buckActivityreportyesDetails");
	var noOfRow = table.rows.length;
	if (noOfRow == 0) {
		DWRUtil.get91to730FosActivityYesDetails(userId,BUCKETUSER,activity_done_yesterday,tl91to730fosActivityYesDetailsCallback);
	}
}

function tl91to730fosActivityYesDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("buckActivityreportyesDetails");
			var row = table.insertRow(i);

			for (j = 0; j < 18; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("buckActivityreportDetailsCalYes");
		calulateTotalForActivities(data, tableTotal, 18);
		/*if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){*/
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("buckActivityreportyesDetails",0);
			}
	} else {
		var table = document.getElementById("buckActivityreportyesDetails");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}
}

/**
 * 91-730 dash board
 */
$(document).ready(function() {
	$(".bucketActivityreportyesmtdflip").click(function() {
		get91to730FosActivityYesMtdDetails();
		$(".bucketActivitreportyyesmtdpanel").slideToggle("slow");
	});
});
function get91to730FosActivityYesMtdDetails() {
	var table = document.getElementById("buckActivityreportyesmtdDetails");
	var noOfRow = table.rows.length;
	if (noOfRow == 0) {
		DWRUtil.get91to730FosActivityYesMtdDetails(userId, userRole,BUCKETUSER, activity_done_mtd,tl91to730fosActivityYesMtdDetailsCallback);
	}
}

function tl91to730fosActivityYesMtdDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("buckActivityreportyesmtdDetails");
			var row = table.insertRow(i);

			for (j = 0; j < 18; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("buckActivityreportDetailsCalMtd");
		calulateTotalForActivities(data, tableTotal, 18);
		/*if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){*/
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("buckActivityreportyesmtdDetails",0);
			}
	} else {
		var table = document.getElementById("buckActivityreportyesmtdDetails");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}

}
/**
 * 91-730 dash board
 */
$(document).ready(function() {
	$(".bucketActivityreportmonthflip").click(function() {
		get91to730FosActivityMontDetails();
		$(".bucketActivitreportmonthpanel").slideToggle("slow");
	});
});
function get91to730FosActivityMontDetails() {
	var table = document.getElementById("buckActivityreportmonthDetails");
	var noOfRow = table.rows.length;
	if (noOfRow == 0) {
		DWRUtil.get91to730FosActivityMonthDetails(userId,activity_assigned_for_month,tl91to730fosActivityMonthDetailsCallback);
	}
}

function tl91to730fosActivityMonthDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("buckActivityreportmonthDetails");
			var row = table.insertRow(i);

			for (j = 0; j < 15; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("buckActivityreportDetailsCalRep");
		calulateTotal(data, tableTotal, 15);
		/*if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){*/
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("buckActivityreportmonthDetails",0);
			}
	} else {
		var table = document.getElementById("buckActivityreportmonthDetails");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}

}

//fos activity details
$(document).ready(function() {
	$(".fosActivityflip").click(function() {
		getFosActivityDetails();
		$(".fosActivitypanel").slideToggle("slow");
	});
});
function getFosActivityDetails() {
	var table = document.getElementById("fosActivityDetails");
	var noOfRow = table.rows.length;

	if (noOfRow == 0) {
		DWRUtil.getFosActivityDetails(userId, userRole,
				fosActivityDetailsCallback);
	}
}

function fosActivityDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("fosActivityDetails");
			var row = table.insertRow(i);

			for (j = 0; j < 17; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
	} else {
		var table = document.getElementById("fosActivityDetails");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}

}

//tl Activity outcome1

$(document).ready(function() {
	$(".tcActivityflip").click(function() {
		getTCActivityDetails();
		$(".tcActivitypanel").slideToggle("slow");
	});
});
function getTCActivityDetails() {
	var table = document.getElementById("tcActivityDetails");
	var noOfRow = table.rows.length;

	if (noOfRow == 0) {
		DWRUtil.getTCActivityDetails(userId, userRole,
				tCActivityDetailsCallback);
	}
}

function tCActivityDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("tcActivityDetails");
			var row = table.insertRow(i);

			for (j = 0; j < 13; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
	} else {
		var table = document.getElementById("tcActivityDetails");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}

}

/**
tlActivty outcome 2
 */

$(document).ready(function() {
	$(".tc1Activityflip").click(function() {
		getTC1ActivityDetails();
		$(".tc1Activitypanel").slideToggle("slow");
	});
});
function getTC1ActivityDetails() {
	var table = document.getElementById("tc1ActivityDetails");
	var noOfRow = table.rows.length;

	if (noOfRow == 0) {
		DWRUtil.getTC1ActivityDetails(userId, userRole,
				tC1ActivityDetailsCallback);
	}
}

function tC1ActivityDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("tc1ActivityDetails");
			var row = table.insertRow(i);

			for (j = 0; j < 12; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
	} else {
		var table = document.getElementById("tc1ActivityDetails");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}

}
/**
 * PTP NR tracking details
 */
$(document).ready(function() {
	$(".ptpflip").click(function() {
		getPtpDetails();
		$(".ptppanel").slideToggle("slow");
	});
});
function getPtpDetails() {
	var table = document.getElementById("ptpDetails");
	var noOfRow = table.rows.length;

	if (noOfRow == 0) {
		DWRUtil.getPtpTrackerDetails(userId, userRole, ptpDetailsCallback);
	}
}

function ptpDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("ptpDetails");
			var row = table.insertRow(i);

			for (j = 0; j < 17; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
	} else {
		var table = document.getElementById("ptpDetails");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}

}
function onchangeBucket(val) {
	if (val == "31-90") {
		document.getElementById("bucket0").style.display = "none";
		document.getElementById("bucket31to90Filter").style.display = "block";
		document.getElementById("bucket31to90").style.display = "block";
		document.getElementById("bucket91to730").style.display = "none";
		document.getElementById("bucket730Plus").style.display = "none";
	} else if (val == "91-730") {
		document.getElementById("bucket0").style.display = "none";
		document.getElementById("bucket31to90Filter").style.display = "none";
		document.getElementById("bucket31to90").style.display = "none";
		document.getElementById("bucket91to730").style.display = "block";
		document.getElementById("bucket730Plus").style.display = "none";
	} else if (val == "730+") {
		document.getElementById("bucket0").style.display = "none";
		document.getElementById("bucket31to90Filter").style.display = "none";
		document.getElementById("bucket31to90").style.display = "none";
		document.getElementById("bucket91to730").style.display = "none";
		document.getElementById("bucket730Plus").style.display = "block";
	} else {
		document.getElementById("bucket0").style.display = "none";
		document.getElementById("bucket31to90Filter").style.display = "none";
		document.getElementById("bucket31to90").style.display = "none";
		document.getElementById("bucket91to730").style.display = "none";
		document.getElementById("bucket730Plus").style.display = "none";
	}

}
/**
 * 91-730 Activity Score sheet legal
 */
$(document).ready(function() {
	$(".bucketfosActivitycollscorePipeflip").click(function() {
		get91730ReportScoreActivityPipeDetails();
		$(".bucketfosActivitycollscorePipepanel").slideToggle("slow");
	});
});
function get91730ReportScoreActivityPipeDetails() {
	var table = document.getElementById("buckActivityreportcollscorePipeDetails");
	var noOfRow = table.rows.length;
	if (noOfRow == 0) {
		DWRUtil.get91to7300ReportScorevityPipeDetails(userId,pipe_line_category,tl91to730ReportScoreActivityPipeDetailsCallback);
	}
}

function tl91to730ReportScoreActivityPipeDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("buckActivityreportcollscorePipeDetails");
			var row = table.insertRow(i);

			for (j = 0; j < 28; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("legalPipeCal");
		calulateTotal(data, tableTotal, 28);
		//if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("buckActivityreportcollscorePipeDetails",0);
			}
	} else {
		var table = document.getElementById("buckActivityreportcollscorePipeDetails");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}

}

/**
 * 91-730 Activity Score sheet legal
 */
$(document).ready(function() {
	$(".bucketfosActivitycollscoreLegalflip").click(function() {
		get91730ReportScoreActivityLegalDetails();
		$(".bucketfosActivitycollscoreLegalpanel").slideToggle("slow");
	});
});
function get91730ReportScoreActivityLegalDetails() {
	var table = document.getElementById("buckActivityreportcollscoreLegalDetails");
	var noOfRow = table.rows.length;
	if (noOfRow == 0) {
		DWRUtil.get91to7300ReportScorevityLegalDetails(userId,legal_inventory_month,tl91to730ReportScoreActivityLegalDetailsCallback);
	}
}

function tl91to730ReportScoreActivityLegalDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("buckActivityreportcollscoreLegalDetails");
			var row = table.insertRow(i);

			for (j = 0; j < 5; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("legalCal");
		calulateTotal(data, tableTotal, 5);
		//if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("buckActivityreportcollscoreLegalDetails",0);
			}
	} else {
		var table = document.getElementById("buckActivityreportcollscoreLegalDetails");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}

}

/**
 * 91-730 fos details
 */
$(document).ready(function() {
	$(".bucketfosActivitycollscoreflip").click(function() {
		get31to90ReportScoreActivityDetails();
		$(".bucketfosActivitycollscorepanel").slideToggle("slow");
	});
});
function get31to90ReportScoreActivityDetails() {
	var table = document.getElementById("buckActivityreportcollscoreDetails");
	var noOfRow = table.rows.length;
	if (noOfRow == 0) {
		DWRUtil.get31to90ReportScorevityDetails(userId, repossession_ftp_report,tl31to90ReportScoreActivityDetailsCallback);
	}
}

function tl31to90ReportScoreActivityDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("buckActivityreportcollscoreDetails");
			var row = table.insertRow(i);

			for (j = 0; j < 9; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("reposssiosionCal");
		calulateTotal(data, tableTotal, 9);
		//if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("buckActivityreportcollscoreDetails",0);
			}
	} else {
		var table = document.getElementById("buckActivityreportcollscoreDetails");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}

}
/**
 * 91-730 fos details
 */
$(document).ready(function() {
	$(".bucketfosActivitycolltwoflip").click(function() {
		get31to90ReportColl2ActivityDetails();
		$(".bucketfosActivitycolltwopanel").slideToggle("slow");
	});
});
function get31to90ReportColl2ActivityDetails() {
	var table = document.getElementById("buckActivityreportcolltwoDetails");
	var noOfRow = table.rows.length;

	if (noOfRow == 0) {
		DWRUtil.get31to90ReportColl2ActivityDetails(userId,actual_performance_181_730,tl31to90ReportColl2ActivityDetailsCallback);
	}
}

function tl31to90ReportColl2ActivityDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("buckActivityreportcolltwoDetails");
			var row = table.insertRow(i);

			for (j = 0; j < 9; j++) {
				var cell = row.insertCell(j);
				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "105";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("buckActivityreportDetails181to730Cal");
		calulateTotal(data, tableTotal, 9);
		//if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("buckActivityreportcolltwoDetails",0);
			}
	} else {
		var table = document.getElementById("buckActivityreportcolltwoDetails");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}

}
$(document).ready(function() {
	$(".bucketfosActivitycollTargettwoflip").click(function() {
		get31to90ReportColl2ActivityTargetDetails();
		$(".bucketfosActivitycollTargettwopanel").slideToggle("slow");
	});
});
function get31to90ReportColl2ActivityTargetDetails() {
	var table = document.getElementById("buckActivityreportcolltwoTargetDetails");
	var noOfRow = table.rows.length;
	if (noOfRow == 0) {
		DWRUtil.get31to90ReportColl2TargetActivityDetails(userId,target_uploaded_kpi_181_730,tl31to90ReportColl2ActivityDetailsTargetCallback);
	}
}

function tl31to90ReportColl2ActivityDetailsTargetCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("buckActivityreportcolltwoTargetDetails");
			var row = table.insertRow(i);

			for (j = 0; j < 11; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "105";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("buckActivityreportDetailsTarget181to730Cal");
		calulateTotal(data, tableTotal, 11);
		//if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("buckActivityreportcolltwoTargetDetails",0);
			}
	} else {
		var table = document.getElementById("buckActivityreportcolltwoTargetDetails");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}

}
/**
 * 91-730 fos details
 */
$(document).ready(function() {
	$(".bucketfosActivitycollflip").click(function() {
		get31to90ReportCollDetails();
		$(".bucketfosActivitycollpanel").slideToggle("slow");
	});
});
function get31to90ReportCollDetails() {
	var table = document.getElementById("buckActivityreportcollDetails");
	var noOfRow = table.rows.length;
	if (noOfRow == 0) {
		DWRUtil.get31to90ReportCollActivityDetails(userId,BUCKETUSER,actual_performance_91_180,	tl31to90ReportDetailsActivityDetailsCallback);
	}
}

function tl31to90ReportDetailsActivityDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("buckActivityreportcollDetails");
			var row = table.insertRow(i);

			for (j = 0; j < 11; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("buckActivityreportDetails91to180Cal");
		calulateTotalForActPerf91to180New(data, tableTotal, 11);
		//if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("buckActivityreportcollDetails",0);
			}
	} else {
		var table = document.getElementById("buckActivityreportcollDetails");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}

}
function calulateTotalForActPerf91to180New(data, tableTotal,
		noOfColumns) {
	if (data != null) {
		var i = 0, j = 0;
		var row = tableTotal.insertRow(0);
		for (i = 0; i < noOfColumns; i++) {
			var sum = 0;
			if (i > 2) {
				for (j = 0; j < data.length; j++) {
					if (data[j][i - 1] != null
							&& data[j][i - 1] != ""
							&& data[j][i - 1] != "0")
						sum = parseFloat(sum)
								+ parseFloat(data[j][i - 1]);
				}
			}
			//		 			alert(sum);
			var cell = row.insertCell(i);
			cell.height = "24";
			cell.align = "left";
			cell.valign = "middle";
			if (i == 0) {
				cell.width = "40";
				cell.innerHTML = "Total";
			} else if (i == 1 || i == 2) {
				cell.width = "80";
				cell.innerHTML = "";
			} else if (i == 6) {
				cell.width = "80";
				var val = "0";
				if (tableTotal.rows[0].cells[4].innerHTML != "0")
					val = (tableTotal.rows[0].cells[5].innerHTML / tableTotal.rows[0].cells[4].innerHTML) * 100;
				cell.innerHTML = Number((parseFloat(val))
						.toFixed(2));
			} else if (i == 8) {
				cell.width = "80";
				var val = "0";					
					var total_rf_120_odops = 0;
					
					for(var j=0;j<data.length;j++)
					{
						total_rf_120_odops = total_rf_120_odops + parseFloat(data[j][10]);
					}
					if (total_rf_120_odops != "0")
					{
						val = (tableTotal.rows[0].cells[7].innerHTML/total_rf_120_odops) * 100;
					}
				cell.innerHTML = ((parseFloat(val)).toFixed(2));
			} else if (i == 10) {
				cell.width = "80";
				var val = "0";
				if (tableTotal.rows[0].cells[3].innerHTML != "0")
					val = (tableTotal.rows[0].cells[9].innerHTML / tableTotal.rows[0].cells[3].innerHTML) * 100;
				cell.innerHTML = Number((parseFloat(val))
						.toFixed(2));
			} else {
				cell.width = "80";
				cell.innerHTML = Number((parseFloat(sum))
						.toFixed(2));
			}

		}

	}
	
}
function calulateTotalForActPerf91to180(data, tableTotal,
		noOfColumns) {
	if (data != null) {
		var i = 0, j = 0;
		var row = tableTotal.insertRow(0);
		for (i = 0; i < noOfColumns; i++) {
			var sum = 0;
			if (i > 2) {
				for (j = 0; j < data.length; j++) {
					if (data[j][i - 1] != null
							&& data[j][i - 1] != ""
							&& data[j][i - 1] != "0")
						sum = parseFloat(sum)
								+ parseFloat(data[j][i - 1]);
				}
			}
			//		 			alert(sum);
			var cell = row.insertCell(i);
			cell.height = "24";
			cell.align = "left";
			cell.valign = "middle";
			if (i == 0) {
				cell.width = "40";
				cell.innerHTML = "Total";
			} else if (i == 1 || i == 2) {
				cell.width = "80";
				cell.innerHTML = "";
			} else if (i == 6) {
				cell.width = "80";
				var val = "0";
				if (tableTotal.rows[0].cells[4].innerHTML != "0")
					val = (tableTotal.rows[0].cells[5].innerHTML / tableTotal.rows[0].cells[4].innerHTML) * 100;
				cell.innerHTML = Number((parseFloat(val))
						.toFixed(2));
				;
			} else if (i == 8) {
				cell.width = "80";
				var val = "0";
				if (tableTotal.rows[0].cells[4].innerHTML != "0")
					val = (tableTotal.rows[0].cells[7].innerHTML / tableTotal.rows[0].cells[4].innerHTML) * 100;
				cell.innerHTML = Number((parseFloat(val))
						.toFixed(2));
				;
			} else if (i == 10) {
				cell.width = "80";
				var val = "0";
				if (tableTotal.rows[0].cells[3].innerHTML != "0")
					val = (tableTotal.rows[0].cells[9].innerHTML / tableTotal.rows[0].cells[3].innerHTML) * 100;
				cell.innerHTML = Number((parseFloat(val))
						.toFixed(2));
				;
			} else {
				cell.width = "80";
				cell.innerHTML = Number((parseFloat(sum))
						.toFixed(2));
				;
			}

		}

	}
}
$(document).ready(function() {
	$(".bucketfosActivityTargetcollflip").click(function() {
		get31to90ReportCollTargetDetails();
		$(".bucketfosActivityTargetcollpanel").slideToggle("slow");
	});
});
function get31to90ReportCollTargetDetails() {
	var table = document.getElementById("buckActivityreportTargetcollDetails");
	var noOfRow = table.rows.length;
	if (noOfRow == 0) {
		DWRUtil.get31to90ReportCollActivityTargetDetails(userId,BUCKETUSER, target_uploaded_kpi_91_180,	tl31to90ReportDetailsActivityDetailsTargetCallback);
	}
}

function tl31to90ReportDetailsActivityDetailsTargetCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("buckActivityreportTargetcollDetails");
			var row = table.insertRow(i);

			for (j = 0; j < 11; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("buckActivityreportDetailsTarget91to180Cal");
		calulateTotalTargetUploaded(data, tableTotal, 11);
		//if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("buckActivityreportTargetcollDetails",0);
			}
	} else {
		var table = document.getElementById("buckActivityreportTargetcollDetails");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}

}
//new dashboard start for 2 May 2014
$(document).ready(function() {
	$("#bucketfosActivitytargetExflip").click(function() {
		get91to180ReportTargetExDetails();
		$("#bucketfosActivitytargetExpanel").slideToggle("slow");
	});
});
function get91to180ReportTargetExDetails() {
	var table = document.getElementById("buckActivityreporttargetExDetails");
	var noOfRow = table.rows.length;
	if (noOfRow == 0) {
		DWRUtil.get91to180ReportTargetExDetails(userId, target_upload_exception_summary_query1,get91to180ReportTargetExDetailsCallback);
	}
}

function get91to180ReportTargetExDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("buckActivityreporttargetExDetails");
			var row = table.insertRow(i);

			for (j = 0; j < 6; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("buckActivityreportDetailstargetEx91to180Cal");
		calulateTotal(data,tableTotal,6); //need call new function.
		//if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("buckActivityreporttargetExDetails",0);
			}
	} else {
		var table = document.getElementById("buckActivityreporttargetExDetails");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}
}
$(document).ready(function() {
	$("#bucketfosActivitytargetExtwoflip").click(function() {
		get181to730ReportTargetExDetails();
		$("#bucketfosActivitytargetExtwopanel").slideToggle("slow");
	});
});
function get181to730ReportTargetExDetails() {
	var table = document.getElementById("buckActivityreporttargetExtwoDetails");
	var noOfRow = table.rows.length;
	if (noOfRow == 0) {
		DWRUtil.get181to730ReportTargetExDetails(userId, target_upload_exception_summary_query2,get181to730ReportTargetExDetailsCallback);
	}
}

function get181to730ReportTargetExDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("buckActivityreporttargetExtwoDetails");
			var row = table.insertRow(i);

			for (j = 0; j < 6; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("buckActivityreportDetailstargetEx181to730Cal");
		calulateTotal(data,tableTotal,6); //need call new function.
		//if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("buckActivityreporttargetExtwoDetails",0);
			}
	} else {
		var table = document.getElementById("buckActivityreporttargetExtwoDetails");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}
}
//new dashboard end 2 May 2014
// New dashboard for CR 11097 on 13 May 2014 start
function calulateTotalLastColumn(data, tableTotal, noOfColumns) {
if (data != null) {
var i = 0, j = 0;
var row = tableTotal.insertRow(0);
for (i = 0; i < noOfColumns; i++) {
	var sum = 0;
	if (i > noOfColumns-2) {
		for (j = 0; j < data.length; j++) {
			if (data[j][i - 1] != null && data[j][i - 1] != ""
					&& data[j][i - 1] != "0")
				sum = parseFloat(sum) + parseFloat(data[j][i - 1]);
		}
	}
	var cell = row.insertCell(i);
	cell.height = "24";
	cell.align = "left";
	cell.valign = "middle";
	if (i == 0) {
		cell.width = "40";
		cell.innerHTML = "Total";
	} else if(i == noOfColumns-1) {
		cell.width = "80";
		cell.innerHTML = Number((parseFloat(sum)).toFixed(2));
	}
	else 
	{
		cell.width = "80";
		cell.innerHTML = "";
	}

}

}
}
$(document).ready(function() {
	$("#asYesTLSumActFlip").click(function() {
		get91to730AsYesTLSumActDetails();
		$("#asYesTLSumActPanel").slideToggle("slow");
	});
});
function get91to730AsYesTLSumActDetails() {
	var table = document.getElementById("asYesTLSumActDetails");
	var noOfRow = table.rows.length;
	if (noOfRow == 0) {
			DWRUtil.get91to730AsYesTLSumActDetails(userId, asYesTLSumActHistory,get91to730AsYesTLSumActDetailsCallback);
	}
}
function get91to730AsYesTLSumActDetailsCallback(data)
{
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("asYesTLSumActDetails");
			var row = table.insertRow(i);

			for (j = 0; j < 15; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("asYesTLSumAct91to730Cal");
		calulateTotal(data,tableTotal,15); 
		//if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("asYesTLSumActDetails",0);
			}
	} else {
		var table = document.getElementById("asYesTLSumActDetails");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}
}
$(document).ready(function() {
	$("#mtdTLSumActFlip").click(function() {
		get91to730MtdTLSumActDetails();
		$("#mtdTLSumActPanel").slideToggle("slow");
	});
});
function get91to730MtdTLSumActDetails() {
	var table = document.getElementById("mtdTLSumActDetails");
	var noOfRow = table.rows.length;
	if (noOfRow == 0) {
			DWRUtil.get91to730MtdTLSumActDetails(userId,mtdTLSumActHistory,get91to730MtdTLSumActDetailsCallback);
	}
}
function get91to730MtdTLSumActDetailsCallback(data)
{
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("mtdTLSumActDetails");
			var row = table.insertRow(i);

			for (j = 0; j < 15; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("mtdTLSumAct91to730Cal");
		calulateTotal(data,tableTotal,15); //need call new function.
		//if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("mtdTLSumActDetails",0);
			}
	} else {
		var table = document.getElementById("mtdTLSumActDetails");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}
}
$(document).ready(function() {
	$("#foswisePropAllocExFlip").click(function() {
		get91to730FoswiseReportPropAllocExDetails();
		$("#foswisePropAllocExPanel").slideToggle("slow");
	});
});
function get91to730FoswiseReportPropAllocExDetails() {
	var table = document.getElementById("foswisePropAllocExDetails");
	var noOfRow = table.rows.length;
	var bucketUser = document.getElementById("bucketUser");
	if (bucketUser != null)
		bucketUser = bucketUser.value;
	if (noOfRow == 0) {
			DWRUtil.get91to730FoswiseReportPropAllocExDetails(userId, PAED_fos_wise,get91to730FoswiseReportPropAllocExDetailsCallback);
	}
}

function get91to730FoswiseReportPropAllocExDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("foswisePropAllocExDetails");
			var row = table.insertRow(i);

			for (j = 0; j < 9; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("foswisePropAllocEx91to730Cal");
		calulateTotalLastColumn(data,tableTotal,9); //need call new function.
		//if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("foswisePropAllocExDetails",0);
			}
	} else {
		var table = document.getElementById("foswisePropAllocExDetails");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}
}
$(document).ready(function() {
	$("#tlwisePropAllocExFlip").click(function() {
		get91to730TlwiseReportPropAllocExDetails();
		$("#tlwisePropAllocExPanel").slideToggle("slow");
	});
});
function get91to730TlwiseReportPropAllocExDetails() {
	var table = document.getElementById("tlwisePropAllocExDetails");
	var noOfRow = table.rows.length;
	var bucketUser = document.getElementById("bucketUser");
	if (bucketUser != null)
		bucketUser = bucketUser.value;
	if (noOfRow == 0) {
		DWRUtil.get91to730TlwiseReportPropAllocExDetails(userId, PAED_tl_wise,	get91to730TlwiseReportPropAllocExDetailsCallback);
	}
}

function get91to730TlwiseReportPropAllocExDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("tlwisePropAllocExDetails");
			var row = table.insertRow(i);

			for (j = 0; j < 7; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("tlwisePropAllocEx91to730Cal");
		calulateTotalLastColumn(data,tableTotal,7); //need call new function.
		//if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("tlwisePropAllocExDetails",0);
			}
	} else {
		var table = document.getElementById("tlwisePropAllocExDetails");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}
}
$(document).ready(function() {
	$("#unallocatedPropAllocExFlip").click(function() {
		get91to730UnallocatedReportPropAllocExDetails();
		$("#unallocatedPropAllocExPanel").slideToggle("slow");
	});
});
function get91to730UnallocatedReportPropAllocExDetails() {
	var table = document.getElementById("unallocatedPropAllocExDetails");
	var noOfRow = table.rows.length;
	var bucketUser = document.getElementById("bucketUser");
	if (bucketUser != null)
		bucketUser = bucketUser.value;
	if (noOfRow == 0) {
		DWRUtil.get91to730UnallocatedReportPropAllocExDetails(userId,zoneCode,PAED_unallocated_forthe_month,get91to730UnallocatedReportPropAllocExDetailsCallback);
	}
}

function get91to730UnallocatedReportPropAllocExDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("unallocatedPropAllocExDetails");
			var row = table.insertRow(i);

			for (j = 0; j < 4; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("unallocatedPropAllocEx91to730Cal");
		calulateTotalLastColumn(data,tableTotal,4); //need call new function.
	} else {
		var table = document.getElementById("unallocatedPropAllocExDetails");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}
}
/**
Not Freshly Allocated this month
add by KM on 14May,2104
**/
$(document).ready(function() {
	$("#notFreshPropAllocExFlip").click(function() {
		get91to730NotFreshPropAllocExDetails();
		$("#notFreshPropAllocExPanel").slideToggle("slow");
	});
});
function get91to730NotFreshPropAllocExDetails() {
	var table = document.getElementById("notFreshPropAllocExDetails");
	var noOfRow = table.rows.length;
	var bucketUser = document.getElementById("bucketUser");
	if (bucketUser != null)
		bucketUser = bucketUser.value;
	if (noOfRow == 0) {
		DWRUtil.get91to730NotFreshPropAllocExDetails(userId, zoneCode,PAED_not_freshly_allocated_this_month,get91to730NotFreshPropAllocExDetailsCallback);
	}
}

function get91to730NotFreshPropAllocExDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("notFreshPropAllocExDetails");
			var row = table.insertRow(i);

			for (j = 0; j < 4; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("notFreshPropAllocEx91to730Cal");
		calulateTotalLastColumn(data,tableTotal,4); //need call new function.
	} else {
		var table = document.getElementById("notFreshPropAllocExDetails");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}
}
/**
Not Freshly Allocated this month
End by KM on 14May,2104
**/
// New dashboard for CR 11097 on 13 May 2014 end
/**
 * 730 PLUS dash board
 */
$(document).ready(function() {
	$(".bucketActivityreportflip730").click(function() {
		get730FosActivityDetails();
		$(".bucketActivitreportypanel730").slideToggle("slow");
	});
});
function get730FosActivityDetails() {
	var table = document.getElementById("buckActivityreportDetails730");
	var noOfRow = table.rows.length;
	if (noOfRow == 0) {
		DWRUtil.get91to730FosActivityDetails(userId,BUCKETUSER,activity_done_today,tl730fosActivityDetailsCallback);
	}
}

function tl730fosActivityDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("buckActivityreportDetails730");
			var row = table.insertRow(i);

			for (j = 0; j < 18; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("fosActRunTimeCal");
		calulateTotalForActivities(data, tableTotal, 18);
		//if(userRole=="Branch Administrator" || userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("buckActivityreportDetails730",0);
			}
	} else {
		var table = document.getElementById("buckActivityreportDetails730");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}

}
/**
 * 730 PLUS dash board
 */
$(document).ready(function() {
	$(".bucketActivityreportyesflip730").click(function() {
		get730FosActivityYesDetails();
		$(".bucketActivitreportyyespanel730").slideToggle("slow");
	});
});
function get730FosActivityYesDetails() {
	var table = document.getElementById("buckActivityreportyesDetails730");
	var noOfRow = table.rows.length;
	var bucketUser = document.getElementById("bucketUser");
	if (bucketUser != null)
		bucketUser = bucketUser.value;
	if (noOfRow == 0) {
		DWRUtil.get91to730FosActivityYesDetails(userId,	bucketUser, activity_done_yesterday,tl730fosActivityYesDetailsCallback);
	}
}

function tl730fosActivityYesDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("buckActivityreportyesDetails730");
			var row = table.insertRow(i);

			for (j = 0; j < 18; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("fosActYesCal");
		calulateTotalForActivities(data, tableTotal, 18);
		//if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("buckActivityreportyesDetails730",0);
			}
	} else {
		var table = document.getElementById("buckActivityreportyesDetails730");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}

}
/**
 * 91-730 dash board
 */
$(document).ready(
		function() {
			$(".bucketActivityreportyesmtdflip730").click(
					function() {
						get730FosActivityYesMtdDetails();
						$(".bucketActivitreportyyesmtdpanel730")
								.slideToggle("slow");
					});
		});
function get730FosActivityYesMtdDetails() {
	var table = document.getElementById("buckActivityreportyesmtdDetails730");
	var noOfRow = table.rows.length;
	if (noOfRow == 0) {
		DWRUtil.get91to730FosActivityYesMtdDetails(userId,userRole, BUCKETUSER, activity_done_mtd,tl730fosActivityYesMtdDetailsCallback);
	}
}

function tl730fosActivityYesMtdDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("buckActivityreportyesmtdDetails730");
			var row = table.insertRow(i);

			for (j = 0; j < 18; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("fosActMtd730Cal");
		calulateTotalForActivities(data, tableTotal, 18);
		//if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("buckActivityreportyesmtdDetails730",0);
			}
	} else {
		var table = document.getElementById("buckActivityreportyesmtdDetails730");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}

}
/**
 * 730 PLUS dash board
 */
$(document).ready(function() {

	$(".bucketActivityreportmonthflip730").click(function() {
		get730FosActivityMontDetails();
		$(".bucketActivitreportmonthpanel730").slideToggle("slow");
	});
});
function get730FosActivityMontDetails() {
	var table = document.getElementById("buckActivityreportmonthDetails730");
	var noOfRow = table.rows.length;
	if (noOfRow == 0) {
		DWRUtil.get91to730FosActivityMonthDetails(userId,activity_assigned_for_month,tl730fosActivityMonthDetailsCallback);
	}
}

function tl730fosActivityMonthDetailsCallback(data) {
	
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("buckActivityreportmonthDetails730");
			var row = table.insertRow(i);

			for (j = 0; j < 15; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("fosActAssMtdCal");
		calulateTotal(data, tableTotal, 15);
		//if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("buckActivityreportmonthDetails730",0);
			}
	} else {
		var table = document.getElementById("buckActivityreportmonthDetails730");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}

}
/**
 * 730 PLUS fos details
 */
$(document).ready(function() {
	$(".bucketfosActivitycollflip730").click(function() {
		get730ReportCollDetails();
		$(".bucketfosActivitycollpanel730").slideToggle("slow");
	});
});
function get730ReportCollDetails() {
	var table = document.getElementById("buckActivityreportcollDetails730");
	var noOfRow = table.rows.length;
	if (noOfRow == 0) {
		DWRUtil.get31to90ReportCollActivityDetails(userId,BUCKETUSER,collections_730,tl730ReportDetailsActivityDetailsCallback);
	}
}

function tl730ReportDetailsActivityDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("buckActivityreportcollDetails730");
			var row = table.insertRow(i);

			for (j = 0; j < 19; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("fosAct730PlusCal");
		calulateTotal(data, tableTotal, 19);
		//if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("buckActivityreportcollDetails730",0);
			}
	} else {
		var table = document.getElementById("buckActivityreportcollDetails730");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}

}
/**
 * 730 PLUS Activity Score sheet legal
 */
$(document).ready(function() {
	$(".bucketfosActivitycollscoreLegalflip730").click(function() {
		get730ReportScoreActivityLegalDetails();
		$(".bucketfosActivitycollscoreLegalpanel730").slideToggle("slow");
	});
});
function get730ReportScoreActivityLegalDetails() {
	var table = document.getElementById("buckActivityreportcollscoreLegalDetails730");
	var noOfRow = table.rows.length;
	if (noOfRow == 0) {
		DWRUtil.get91to7300ReportScorevityLegalDetails(userId,legal_inventory_month,tl730ReportScoreActivityLegalDetailsCallback);
	}
}

function tl730ReportScoreActivityLegalDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("buckActivityreportcollscoreLegalDetails730");
			var row = table.insertRow(i);

			for (j = 0; j < 5; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("fosActLegal730Cal");
		calulateTotal(data, tableTotal, 5);
		//if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("buckActivityreportcollscoreLegalDetails730",0);
			}
	} else {
		var table = document.getElementById("buckActivityreportcollscoreLegalDetails730");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}
}
/**
 * 730 PLUS Activity Score sheet legal
 */
$(document).ready(function() {
	$(".bucketfosActivitycollscorePipeflip730").click(function() {
		get730ReportScoreActivityPipeDetails();
		$(".bucketfosActivitycollscorePipepanel730").slideToggle("slow");
	});
});
function get730ReportScoreActivityPipeDetails() {
	var table = document.getElementById("buckActivityreportcollscorePipeDetails730");
	var noOfRow = table.rows.length;
	if (noOfRow == 0) {
		DWRUtil.get91to7300ReportScorevityPipeDetails(userId,pipe_line_category,tl730ReportScoreActivityPipeDetailsCallback);
	}
}

function tl730ReportScoreActivityPipeDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("buckActivityreportcollscorePipeDetails730");
			var row = table.insertRow(i);

			for (j = 0; j < 28; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("fosActLegalPipe730Cal");
		calulateTotal(data, tableTotal, 28);
		//if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("buckActivityreportcollscorePipeDetails730",0);
			}
	} else {
		var table = document.getElementById("buckActivityreportcollscorePipeDetails730");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}
}
/**
 * 730 PLUS ODPOS Resolution
 */
$(document).ready(function() {
	$(".bucketOdPosResolutionflip730").click(function() {
		get730OdposResolutionDetails();
		$(".bucketOdPosResolutionpanel730").slideToggle("slow");
	});
});
function get730OdposResolutionDetails() {
	var table = document.getElementById("buckOdPosResolutionDetails730");
	var noOfRow = table.rows.length;

	if (noOfRow == 0) {
		DWRUtil.getOdposResolutionDetails(userId, financial_dashboard_odpos, tl730OdposResolutionDetailsCallback);
	}
}

function tl730OdposResolutionDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("buckOdPosResolutionDetails730");
			var row = table.insertRow(i);

			for (j = 0; j < 7; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("fosActOdPosCal");
		calulateFinancialTotal(data, tableTotal, 7);
		//if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("buckOdPosResolutionDetails730",0);
			}
	} else {
		var table = document.getElementById("buckOdPosResolutionDetails730");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}
}
/**
 * 730 PLUS Cash Collection
 */
$(document).ready(function() {
	$(".bucketCashCollectionflip730").click(function() {
		get730CashCollectionDetails();
		$(".bucketCashCollectionpanel730").slideToggle("slow");
	});
});
function get730CashCollectionDetails() {
	var table = document.getElementById("buckCashCollectionDetails730");
	var noOfRow = table.rows.length;

	if (noOfRow == 0) {
		DWRUtil.getCashCollectionDetails(userId, financial_dashboard_cashCollection, tl730CashCollectionDetailsCallback);
	}
}

function tl730CashCollectionDetailsCallback(data) {
	if (data != null) {
		data=replaceNullOccurence(data);
		var i = 0, j = 0;

		while (data[i] != null) {
			var table = document.getElementById("buckCashCollectionDetails730");
			var row = table.insertRow(i);

			for (j = 0; j < 7; j++) {
				var cell = row.insertCell(j);

				cell.height = "24";
				cell.align = "left";
				cell.valign = "middle";
				//	cell.class="opengrid_style";

				if (j == 0) {
					cell.width = "30";
					cell.innerHTML = i + 1;
				} else {
					cell.width = "80";
					cell.innerHTML = data[i][j - 1];
				}
			}
			i++;
		}
		var tableTotal = document.getElementById("fosActCashCollCal");
		calulateFinancialTotal(data, tableTotal, 7);
		//if(userRole=="Branch Administrator" || userRole == "Zonal Administrator" || userRole=="National Head" || (formAction=="DRILL_DOWN" && userRole=="Branch Administrator")){
		if(levelCode=="level4_code" || levelCode=="level9_code" || levelCode == "level10_code"){
			setListener("buckCashCollectionDetails730",0);
			}
	} else {
		var table = document.getElementById("buckCashCollectionDetails730");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No Records Found";
	}
}
function calulateFinancialTotal(data, tableTotal, noOfColumns) {
	if (data != null) {
		var i = 0, j = 0;
		var row = tableTotal.insertRow(0);
		for (i = 0; i < noOfColumns; i++) {
			var sum = 0;
			if (i > 1) {
				for (j = 0; j < data.length; j++) {
					if (data[j][i - 1] != null
							&& data[j][i - 1] != ""
							&& data[j][i - 1] != "0")
						sum = parseFloat(sum)
								+ parseFloat(data[j][i - 1]);
				}
			}
			var cell = row.insertCell(i);
			cell.height = "24";
			cell.align = "left";
			cell.valign = "middle";

			if (i == 0) {
				cell.width = "40";
				cell.innerHTML = "Total";
			} else if (i == 1) {
				cell.width = "80";
				cell.innerHTML = "";
			} else if (i == 4) {
				cell.width = "80";
				var val = "0";
				val = (tableTotal.rows[0].cells[2].innerHTML * tableTotal.rows[0].cells[3].innerHTML) / 100;
				cell.innerHTML = Number((parseFloat(val))
						.toFixed(2));
				;
			} else if (i == 6) {
				cell.width = "80";
				var val = "0";
				if (tableTotal.rows[0].cells[4].innerHTML != "0")
					val = (tableTotal.rows[0].cells[5].innerHTML / tableTotal.rows[0].cells[4].innerHTML) * 100;
				cell.innerHTML = Number((parseFloat(val))
						.toFixed(2));
			} else {
				cell.width = "80";
				cell.innerHTML = Number((parseFloat(sum))
						.toFixed(2));
			}

		}

	}
}


//Drill down code end
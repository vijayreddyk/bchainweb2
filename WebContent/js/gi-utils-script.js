/*******************************************************************************
 * Project Sales App, all source code and data files except images,
 *  Copyright 2008-2015 Grit-Innovation Software Pvt. Ltd., India
 *
 * Permission is granted to Magma Fin Corp. to use and modify as they see fit.
 *******************************************************************************/
/**
*	PURPOSE : TO DELETE ALL ROWS IN A TABLE
* 	PARAMETER : TABLE ID (need to pass only id)
**/
function deleteTableRows(tableName) {
	/*var table = document.getElementById(tableName);
	while (table.rows.length > 0) {
		table.deleteRow(table.rows.length - 1);
	}*/
	$("#"+tableName).html("");
}

/**
*	PURPOSE : TO GET NUMBER OF DAYS IN MONTH
*	PARAMETERS : MONTH(should start 1), YEAR
**/
function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}
/**
*	PURPOSE : TO GET NOUMBER OF DAYS PASSED IN CURRENT MONTH FROM TODAY
**/
function getPastDaysCountInCurrentMonth() {
	var today = new Date();
	today = today.getDate();
	return 1-today;
}
/**
*	PURPOSE : TO GET NUMBER OF DAYS REMAINING IN CURRENT MONTH FROM TODAY
**/
function getFutureDaysCountInCurrentMonth(){
	var today = new Date();
	var totalDays = daysInMonth(today.getMonth()+1,today.getYear());
	today = today.getDate();
	return totalDays-today;
}
/**
*	PURPOSE : FOR TESTING EITHER OR NULL OR EMPTY STRING
**/
function isNUllOrEmpty(fieldValue){
	if(fieldValue == null ){		
		return true;
	}
	else if(fieldValue!=null &&  (fieldValue.length <= 0 || fieldValue == "")){
		return true;
	}
	return false;
}
/**
* 	PURPOSE : TO CHECK IF QUERYSTRING PRESENT IN URL , RETURN THE QUERYSTRING VALUE FOR REQUESTED PARAMETER
**/
function getUrlParameters(parameter, currLocation, decode) {
	parArr = currLocation.split("?")[1].split("&"), returnBool = true;
	for (var i = 0; i < parArr.length; i++) {
		parr = parArr[i].split("=");
		if (parr[0] == parameter) {
			return (decode) ? decodeURIComponent(parr[1]) : parr[1];
			returnBool = true;
		} else {
			returnBool = false;
		}
	}
	if (!returnBool)
		return false;
}




function getParameters(parameter, currLocation, decode)
{
	var currLocation=currLocation.replace('{','').replace('}','');
	parArr=currLocation.split(","), returnBool = true;
	for (var i = 0; i < parArr.length; i++) {
		parr = parArr[i].split("=");
		if (parr[0].trim() == parameter.trim()) {
			return parr[1];
		}
	}
	
return null;
}
/**
* 	PURPOSE : TO ALLOW ONLY NUMBERS IN INPUT FIELDS
* 	EVENT : onkeypress
**/
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}
/**
*	parameter : 03-Aug-2015
*	change To : 2015-08-03
**/
function getMonthFormatedDate(formatDate){
	var splitDate = formatDate.split("-");
	var monthArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var monthNo = jQuery.inArray(splitDate[1], monthArray)+1;
	if(monthNo>9){
		return splitDate[2]+'-'+monthNo+'-'+splitDate[0];
	}
	else{
		return splitDate[2]+'-0'+monthNo+'-'+splitDate[0];
	}
}
/**
 * 
 * @param formatDate YYYY-MM-DD
 * @returns MM/DD/YYYY
 */
function getFormatedDate(formatDate){
	var splitDate = formatDate.split("-");
	return splitDate[1]+'/'+splitDate[2]+'/'+splitDate[0];
}
function getFormateDate(formatDate){
	var splitDate = formatDate.split("/");
	return splitDate[2]+'-'+splitDate[0]+'-'+splitDate[1];
}
function getCurrentMonthFirstDate(){
	var d = new Date();
	var currMonth = d.getMonth();
	var currYear = d.getFullYear();
	return new Date(currYear,currMonth,1);
}
function getCurrentMonthlastDate(){
	var d = new Date();
	var currMonth = d.getMonth();
	var currYear = d.getFullYear();
	return new Date(currYear,currMonth,daysInMonth(currMonth+1,currYear));
}
/**
 * @param panelId
 * @param isTabShownTemp
 * @returns {Boolean}
 */
function showDashboardPanel(panelId, isTabShownTemp){
	$("#"+panelId).show();
	isTabShownTemp = true;
	return isTabShownTemp;
}

function hideDashboardPanel(panelId, isTabShownTemp){
	$("#"+panelId).hide();
	isTabShownTemp = false;
	return isTabShownTemp;
}

/**
* create header to table from array
**/
function generateHeader(columnNames){
	var columns = [], columnNamesLength = columnNames.length;
	for (i = 0; i < columnNamesLength; i++) {
		localColumnName = columnNames[i];
		columns.push({
			title : columnNames[i]
		});
	}
	return columns;
}

/**
*
**/
function checkExist(){
	var noOfElements = document.forms[0].elements.length;
	var checkValueExist = false;

	for ( var i = 0; i < noOfElements; i++) {
		//alert(document.forms[0].elements[i].type);
		if (document.forms[0].elements[i].type == "text"
			|| document.forms[0].elements[i].type == "select-all" ||  document.forms[0].elements[i].type == "select-one") {

			if (document.forms[0].elements[i].value != ""
				&& document.forms[0].elements[i].id != "pageNumber"
					&& document.forms[0].elements[i].id != "defaultFetchSize") {
				checkValueExist = true;
			}
		}
	}
	if (checkValueExist) {
		return true;
	} else {
		return false;
	}
}

/**
*
**/
function getDateFormat(dateToFormat){
	var formattedDate = dateToFormat.split('/');
	return formattedDate[2] +'-'+ formattedDate[0] +'-'+ formattedDate[1];
}

function doSelectAll1(selectId,checkBoxId){
	if (document.getElementById(checkBoxId).checked) {
		selectAll(selectId, true);
	} else {
		selectAll(selectId, false);
	}
}
function selectAll(selectBox,selectAll) {
	// have we been passed an ID
	if (typeof selectBox == "string") {
		selectBox = document.getElementById(selectBox);
	}
	// is the select box a multiple select box?
	if (selectBox.type == "select-multiple") {
		for (var i = 0; i < selectBox.options.length; i++) {
			selectBox.options[i].selected = selectAll;
		}
	}
}
function constructDropDownMultiSelect(output,fieldName,fieldId,onChangeMethod,fieldDiveId,labelName,propName){
	var selDropDown = "<select name='"+fieldName+"' id='"+fieldId+"' multiple='multiple' size='5' onchange='"+onChangeMethod+"'>";
	if(output.length>0){
		var strArray=output.split(",");
		var len=strArray.length;
		for(var kp=0;kp<len;kp++){
			selDropDown+="<option value='"+strArray[kp++]+"'>"+strArray[kp]+"</option>";
		}
	}else{
		alert('No '+labelName+' found for selected '+propName);
	}
	selDropDown+="</select>";
		$('#'+fieldDiveId).html('');
	$('#'+fieldDiveId).html(selDropDown);
}
/**
 * this function uses in Myvisits and team visits jsp file
 */
function constructDropDown(){
	var selDropDown = "<select  id='months' class='textbox'>";
	var len=6;
	var d = new Date();
	var month = new Array();
	month[0] = "January";
	month[1] = "February";
	month[2] = "March";
	month[3] = "April";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "August";
	month[8] = "September";
	month[9] = "October";
	month[10] = "November";
	month[11] = "December";
	var year = d.getFullYear();
	for(var kp=0;kp<len;kp++){
		var pos=d.getMonth()-kp;
		if(pos<0)
		{
			pos+=12;
			year = d.getFullYear()-1;
		}
		var n = month[pos];
		selDropDown+="<option value='"+kp+"-"+year+"'>"+n+"-"+year+"</option>";
	}
	selDropDown+="</select>"
	$('#cal').html('');
	$('#cal').html(selDropDown);
}
function populateSelect(comboId,data){
	var selectCombo = document.getElementById(comboId);
	$('#'+comboId+' option[value!=""]').remove();
	for (var i = 0; i < data.length; i++) {
		var opt = document.createElement('option');
		opt.innerHTML = data[i]['label'];
		opt.value = data[i]['value'];
		if(typeof data[i]['selected'] !== "undefined")
			opt.selected = "selected";
		selectCombo.appendChild(opt);
	}
}
function validatePeriod() {
	if (document.getElementById('start').value == '') {
		alert("Please choose a from date!");
	}
}

function resetTablesData(parentClassName,className){
	 var delTables = $("."+parentClassName+" table."+className);
	 var len = delTables.length;
	 for(var i=0;i<len;i++){
		 deleteTableRows(delTables[i].id);
	 }
	
}




function populateDataToTable(tableName,data, className)
{
	var table,noOfRow=0,addRow,row,cell,map,list,dataMap,dataKeys,noData=0;;
	if(data!=null && data.length>0)
	{
		table= document.getElementById(tableName);
		for(var i=0;i<data.length;i++)
		{
			map=data[i];	
			list=map['data'];
			if(map['tableType'].toLowerCase()=='horizontal')
			{
				if(list!=null && list.length>0)
				{
					for(var j=0;j<list.length;j++)
					{
						noData++;
						dataMap=list[j];
						dataKeys = Object.keys(dataMap);
						if(j==0)
						{
							noOfRow = parseInt(table.rows.length);
							addRow = parseInt(noOfRow);
							row = table.insertRow(addRow);
							row.innerHTML = "<th colspan=\""+dataKeys.length+"\">"+map['tableTitle']+"</th>";
							
							noOfRow = parseInt(table.rows.length);
							addRow = parseInt(noOfRow);
							row = table.insertRow(addRow);
							var str;
							for (var k = 0; k < dataKeys.length; k++) {
								if(k==0)
									str = "<th>"+dataKeys[k]+"</th>";
								else
									str += "<th>"+dataKeys[k]+"</th>";
							}
							row.innerHTML = str;

						}

						noOfRow = parseInt(table.rows.length);
						addRow = parseInt(noOfRow);
						row = table.insertRow(addRow);
						for (var k = 0; k < dataKeys.length; k++) {
							cell = row.insertCell(k);
							cell.innerHTML = dataMap[dataKeys[k]];
							if(k==0){
								cell.style="background-color:#fbfbfa";
							}
						}
					}
				}
				noOfRow = parseInt(table.rows.length);
				addRow = parseInt(noOfRow);
				row = table.insertRow(addRow);
			}
			else if(map['tableType'].toLowerCase()=='horizontal_wrap')
			{
				if(list!=null && list.length>0)
				{
					for(var j=0;j<list.length;j++)
					{
						noData++;
						dataMap=list[j];
						dataKeys = Object.keys(dataMap);
						if(j==0)
						{
							noOfRow = parseInt(table.rows.length);
							addRow = parseInt(noOfRow);
							row = table.insertRow(addRow);
							row.innerHTML = "<th colspan=\""+dataKeys.length+"\">"+map['tableTitle']+"</th>";

						}
						var cellCount=0;
						var str ;
						for (var k = 0; k <=dataKeys.length; k++) {
							if(k==0){
								noOfRow = parseInt(table.rows.length);
								addRow = parseInt(noOfRow);
								row = table.insertRow(addRow);
							}
							if(cellCount>=parseInt(map['noOfColumn']))
							{
								cellCount=0;
								row.innerHTML=str;
								str = "";
								noOfRow = parseInt(table.rows.length);
								addRow = parseInt(noOfRow);
								row = table.insertRow(addRow);
							}
							if(k<parseInt(map['noOfColumn'])){
								if(cellCount==0)
									str = "<th>"+dataMap[dataKeys[k]]+"</th>";
								else
									str	+= "<th>"+dataMap[dataKeys[k]]+"</th>";
								cellCount++;
							}
							else{
								if(cellCount==0)
									str = "<td>"+dataMap[dataKeys[k]]+"</td>";
								else
									str	+= "<td>"+dataMap[dataKeys[k]]+"</td>";
								cellCount++;
							}
							

						}
					}

				}
				noOfRow = parseInt(table.rows.length);
				addRow = parseInt(noOfRow);
				row = table.insertRow(addRow);
			}
			else
			{

				if(list!=null && list.length>0)
				{
					for(var j=0;j<list.length;j++)
					{
						var dataMap=list[j];
						var dataKeys = Object.keys(dataMap);
						noData++;

						for (var k = 0; k < dataKeys.length; k++) {
							if(k==0)
							{
								noOfRow = parseInt(table.rows.length);
								addRow = parseInt(noOfRow);
								row = table.insertRow(addRow);
								var row=table.insertRow(addRow);
								row.innerHTML = "<th colspan=\"2\">"+ map['tableTitle']+"</th>";
							}
							if(dataMap[dataKeys[k]]=='$#title#$'){
								noOfRow = parseInt(table.rows.length);
								addRow = parseInt(noOfRow);
								row = table.insertRow(addRow);
								var row=table.insertRow(addRow);
								row.innerHTML = "<th colspan=\"2\">"+ dataKeys[k]+"</th>";
							}
							else{
								noOfRow = parseInt(table.rows.length);
								addRow = parseInt(noOfRow);
								row = table.insertRow(addRow);
								var cell = row.insertCell(0);
								if(className!=null)
									cell.className = className;
								cell.innerHTML = dataKeys[k];
								var cell1 = row.insertCell(1);
								if(!isNUllOrEmpty(dataMap[dataKeys[k]]))
									cell1.innerHTML = dataMap[dataKeys[k]];
								else
									cell1.innerHTML = '';
							}
						}
						noOfRow = parseInt(table.rows.length);
						addRow = parseInt(noOfRow);
						row = table.insertRow(addRow);
					}

				}

			}
		}
	}
	else
	{
		var table = document.getElementById(tableName);
		var noOfRow = parseInt(table.rows.length);
		var addRow = parseInt(noOfRow);
		var row = table.insertRow(addRow);
		var cell1 = row.insertCell(0);
		cell1.innerHTML = 'No Data Available';

	}
	if(noData==0)
	{
		var table = document.getElementById(tableName);
		var noOfRow = parseInt(table.rows.length);
		var addRow = parseInt(noOfRow);
		var row = table.insertRow(addRow);
		var cell1 = row.insertCell(0);
		cell1.innerHTML = 'No Data Available';
	}
	fnHideProcessing();
	
	var htTabContent = $(".nav-sidebar-tab-content").height()+15;
	if(originalHtNavBar > htTabContent)
		$(".nav-sidebar").css("height",originalHtNavBar+"px");
	else
		$(".nav-sidebar").css("height", htTabContent+"px");
}

function fnShowProcessing(){
  	$('#loadingDashboard').show();
	return false;
}

function fnHideProcessing(){
	$('#loadingDashboard').hide();
	return false;
}

function removeBracesOfArrayList(arraylist){
	if(arraylist[0]=='['){
		arraylist = arraylist.substring(1,arraylist.length);
	}
	if(arraylist[arraylist.length-1]==']'){
		arraylist = arraylist.substring(0,arraylist.length-1);
	}
	return arraylist;
}

/**
 * @param checkBoxId
 * 
 * The below method will useful to uncheck the checkbox when multiselection deselect one option
 * 
 */

function deSelectAllCheckBox(checkBoxId){
	if($('#'+checkBoxId).attr('checked')){
		$('#'+checkBoxId).prop('checked',false);
	}
}

function selectOrDeselectAll(optionsId,checkBoxId){
	var isChecked=$('#'+checkBoxId).prop('checked');
	if($('#'+checkBoxId).prop('checked')){
		$('#'+optionsId+' option').prop('selected', true);
	}else{
		$('#'+optionsId+' option').prop('selected', false);
	}
	
}

function isCheckBoxChecked(checkBoxId){
	var isCheckBoxChecked=$('#'+checkBoxId).prop('checked');
	if( typeof isCheckBoxChecked =='undefined'){
		isCheckBoxChecked = false;
	}
	return isCheckBoxChecked;
}


function deSelectAllCheckBoxBasedOnOptions(optionsId,chechBoxId){
	//alert('deSelectAllCheckBoxBasedOnOptions()');
	$('#'+optionsId+'  option').each(function() {
	    //alert(this.selected);
		if(!this.selected){
			$('#'+chechBoxId).prop('checked',false);
		}
	});
}

function GetIEVersion() {
	  var sAgent = window.navigator.userAgent;
	  var Idx = sAgent.indexOf("MSIE");

	  // If IE, return version number.
	  if (Idx > 0) 
	    return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));

	  // If IE 11 then look for Updated user agent string.
	  else if (!!navigator.userAgent.match(/Trident\/7\./)) 
	    return 11;

	  else
	    return 0; //It is not IE
	}


/*******************************************************************************
 * Project MCMS, all source code and data files except images,
 * Copyright 2008-2015 Grit-Innovation Software Pvt. Ltd., India
 *
 * Permission is granted to Magma Fin Corp. to use and modify as they see fit.
 *******************************************************************************/
/**
 * Author : Aparna
 * Created On : 3 Sep 2014
 */
myData=[];

function setActive(){
	ddl = document.getElementById("userStatusId");
	ddl.value = 1;
}
/**
 * To Populate Primary Location drop down
 */
function displayPrimaryLocation(roleId){
	if(roleId!=null && roleId.value!="" && roleId.value==7){
		document.getElementById("primaryLocationDiv").style.display="block";
	}
	else{
		document.getElementById("primaryLocationDiv").style.display="none";
		document.getElementById('primaryLocCode').getElementsByTagName('option')[0].selected = 'selected';
		document.getElementById("catchmentDiv").style.display="none";
		document.getElementById("districtDiv").style.display="none";
		document.getElementById("subDistrictDiv").style.display="none";
		document.getElementById("pincodeDiv").style.display="none";
		document.getElementById("localityDiv").style.display="none";
		document.getElementById('roleId').getElementsByTagName('option')[0].selected = 'selected';
	}
}
/**
 * To populate catchment area n district basing on primary Location
 * @param obj
 */
function loadCatchmentAreas(obj)
{
	if(obj.value!=null && obj.value!=""){
		document.getElementById("overlay_main").style.display="block";
		DWRUtil.getCatchmentAreasByLocation(obj.value,catchmentAreaCallback);
		loadDistricts(obj.value);
	}
	else{
		document.getElementById("catchmentDiv").style.display="none";
		document.getElementById("districtDiv").style.display="none";
		document.getElementById("subDistrictDiv").style.display="none";
		document.getElementById("pincodeDiv").style.display="none";
		 document.getElementById("localityDiv").style.display="none";
	}
	
}
function catchmentAreaCallback(data)
{
	if(data!=null)
	{
		document.getElementById("catchmentDiv").style.display="block";
		document.getElementById("caCode").checked=false;
		var len = data.length;
		var myData = new Array();
		for(var i=0;i<len;i++)
		{
			myData[i]=new Array();
			myData[i][0]='<INPUT TYPE="checkbox" NAME="caCode" id="caCode" value="'+data[i].substr(0,data[i].indexOf("$"))+'">';
			myData[i][1]=data[i].substr(data[i].indexOf("$")+1);
		}
		mygrid.clearAll();
		mygrid.parse(myData,"jsarray");
	}
}
function doSelectAll(obj){
	var elements;
	if(obj.id=="caCode"){
		elements=document.getElementsByName("caCode");
	}
	else if(obj.id=="district"){
		elements = document.getElementsByName("dataObject.districtCode");
	}
	else if(obj.id=="subdistrict"){
		elements = document.getElementsByName("dataObject.subDistrictCode");
	}
	else if(obj.id=="pincode"){
		elements = document.getElementsByName("dataObject.pincode");
	}
	else if(obj.id=="locality"){
		elements = document.getElementsByName("dataObject.localityCode");
	}
	var len = elements.length;
	if(obj.checked)
	{
		for(var i=0;i<len;i++)
		{
			elements[i].checked = true;
		}
	}
	else
	{
		for(var i=0;i<len;i++)
		{
			elements[i].checked = false;
		}
	}
	if(obj.id=="district" || obj.id=="subdistrict" || obj.id=="pincode"){
		doSelectDistrict(obj);
	}
}
function loadDistricts(obj_value)
{	
	document.getElementById("subDistrictDiv").style.display="none";
	document.getElementById("pincodeDiv").style.display="none";
	 document.getElementById("localityDiv").style.display="none";
	var obj=document.getElementById("roleId");
	if(obj!=null && obj.value!="" && obj.value == '7')
	{	
		document.getElementById("overlay_main").style.display="block";
		DWRUtil.getMultipleDistrictsByLocation(obj_value,districtCallback);
	}
}
 function districtCallback(data)
 {
  	if(data!=null)
 	{
 		document.getElementById("districtDiv").style.display="block";
 		document.getElementById("district").checked = false;
		var len = data.length;
		var myData = new Array();
		for(var i=0;i<len;i++)
		{
			var district = data[i].substr(0,data[i].indexOf("$"));
			myData[i]=new Array();
			myData[i][0]='<INPUT TYPE="checkbox" NAME="dataObject.districtCode" id="dataObject.districtCode" onclick="doSelectDistrict(this)" value="' +district+ '" >  ';
			myData[i][1]=data[i].substr(data[i].indexOf("$")+1);
		}
		mygrid11.clearAll();//clear districts
		mygrid11.parse(myData,"jsarray");
		document.getElementById("overlay_main").style.display="none";
 	}
 }
 function doSelectDistrict(obj){
	 var drop_name;
	 var elements;
	 var len;
	 if(obj.id=="district" || obj.id=="dataObject.districtCode"){
		 elements = document.getElementsByName("dataObject.districtCode");
		 document.getElementById("pincodeDiv").style.display="none";
		 document.getElementById("localityDiv").style.display="none";
		 len = elements.length;
	 }
	 else if(obj.id=="subdistrict" || obj.id=="dataObject.subDistrictCode"){
		 elements = document.getElementsByName("dataObject.subDistrictCode");
		 document.getElementById("localityDiv").style.display="none";
		 len = elements.length;
	 }
	 else if(obj.id=="pincode" || obj.id=="dataObject.pincode"){
		 elements = document.getElementsByName("dataObject.pincode");
		 len = elements.length;
		 document.getElementById("localityDiv").style.display="none";
	 }
	 var select_values ="";
	 
	 var loadFlag=false;//Flag to load Sub-districts
	 if(obj.checked){
		 loadFlag=true;
	 }else {
		 var flag =0;
		 for(var i=0;i<len;i++){
			 if(!elements[i].checked){ //if none checked then hide  pincodes
				 flag =1;
			 } else {
				 flag=0;
				 break;
			 }
		 }
		 if(flag){
			 if(obj.id=="district" || obj.id=="dataObject.districtCode"){
			 document.getElementById("subDistrictDiv").style.display="none";
			 document.getElementById("pincodeDiv").style.display="none";
			 document.getElementById("localityDiv").style.display="none";
			 }
			 else if(obj.id=="subdistrict" || obj.id=="dataObject.subDistrictCode"){
				 document.getElementById("pincodeDiv").style.display="none";
				 document.getElementById("localityDiv").style.display="none";
			 }
			 else if(obj.id=="pincode" || obj.id=="dataObject.pincode"){
				 document.getElementById("localityDiv").style.display="none";
			 }
		 }else{
			 loadFlag=true;
		 }		
	 }
	 if(loadFlag){
		 var count=0;
		 for(var i=0;i<len;i++){
			 if(elements[i].checked){
				 if(elements[i].value!=null && elements[i].value!=''){
					 select_values=select_values + elements[i].value+',';
					 if(obj.id=="district" || obj.id=="dataObject.districtCode"){
					 count++;
					 if(count>3){
						 elements[i].checked=false;
					 }
					 }
				 }
			 }
		 }
		 if(count>3 && (obj.id=="district" || obj.id=="dataObject.districtCode")){
			 document.getElementById("district").checked=false;
			 alert("Maximum you select only 3 Districts");
		 }
		 select_values = select_values.substring(0, select_values.length-1);
		 if((obj.id=="district" || obj.id=="dataObject.districtCode") && count<=3){
		 document.getElementById("districtDiv").style.display="block";			
		 mygrid10.clearAll();//clear subdistricts
		 mygrid9.clearAll();//clear pincodes
		 mygrid8.clearAll();//clear locality codes
		 document.getElementById("overlay_main").style.display="block";
		 DWRUtil.getAllSubDistrictsForChosenDistricts(select_values,multiSubDistrictCallback);
		 }
		 else if(obj.id=="district"){
			 document.getElementById("districtDiv").style.display="block";			
			 mygrid10.clearAll();//clear subdistricts
			 mygrid9.clearAll();//clear pincodes
			 mygrid8.clearAll();//clear locality codes
			 document.getElementById("overlay_main").style.display="block";
			 DWRUtil.getAllSubDistrictsForChosenDistricts(select_values,multiSubDistrictCallback);
		 }
		 else if(obj.id=="subdistrict" || obj.id=="dataObject.subDistrictCode"){
			 document.getElementById("subDistrictDiv").style.display="block";			
				mygrid9.clearAll();//clear pincodes
				mygrid10.clearAll();//clear locality codes
				document.getElementById("overlay_main").style.display="block";
				DWRUtil.getPincodeByMultipleSubDistricts(select_values,multiPincodeCallback);
		 }
		 else if(obj.id=="pincode" || obj.id=="dataObject.pincode"){
			 mygrid10.clearAll();
			 document.getElementById("overlay_main").style.display="block";
		 	DWRUtil.getLocalityByMultiplePincodes(select_values,multiLocalityCallback);
		 }
	 }
}
function multiSubDistrictCallback(data)
{
	if(data!=null)
	{
		document.getElementById("subDistrictDiv").style.display="block";
		document.getElementById("subdistrict").checked = false;
		var len = data.length;
		var myData = new Array();
		for(var i=0;i<len;i++)
		{
			var subdistrict = data[i].substr(0,data[i].indexOf("$"));
			myData[i]=new Array();
			myData[i][0]='<INPUT TYPE="checkbox" NAME="dataObject.subDistrictCode" id="dataObject.subDistrictCode" onclick="doSelectDistrict(this)" value="' +subdistrict+ '" >  ';
			myData[i][1]=data[i].substr(data[i].indexOf("$")+1);
		}
		
		mygrid8.clearAll();//clear subdistricts
		mygrid8.parse(myData,"jsarray");
		document.getElementById("overlay_main").style.display="none";
	}
}
function multiPincodeCallback(data)
{
	if(data!=null)
	{
		document.getElementById("pincodeDiv").style.display="block";
		document.getElementById("pincode").checked = false;
		var len = data.length;
		var myData = new Array();
		for(var i=0;i<len;i++)
		{
			myData[i]=new Array();
			myData[i][0]='<INPUT TYPE="checkbox" NAME="dataObject.pincode" id="dataObject.pincode" onclick="doSelectDistrict(this)" value="'+data[i].substr(0,data[i].indexOf("-"))+'"  >';
			myData[i][1]=data[i].substr(data[i].indexOf(",")+1);
		}
		mygrid9.clearAll(); //clear pins
		mygrid9.parse(myData,"jsarray");
		document.getElementById("overlay_main").style.display="none";
	}
}
function multiLocalityCallback(data)
{
	if(data!=null)
	{
		document.getElementById("localityDiv").style.display="block";
		document.getElementById("locality").checked = false;
		var len = data.length;
		var myData = new Array();
		for(var i=0;i<len;i++)
		{
			myData[i]=new Array();
			myData[i][0]='<INPUT TYPE="checkbox" NAME="dataObject.localityCode" id="dataObject.localityCode" onclick="doSelectLocality(this)" value="'+data[i].substr(0,data[i].indexOf("$"))+'">';
			myData[i][1]=data[i].substr(data[i].indexOf("$")+1);
		}
		mygrid10.clearAll();
		mygrid10.parse(myData,"jsarray");
		document.getElementById("overlay_main").style.display="none";
	}
}
function doSelectLocality(obj){
   	var localities ="";
 	var elements = document.getElementsByName("dataObject.localityCode");
 	var len = elements.length;
 	if(obj.checked)
 	{
 		for(var i=0;i<len;i++)
 		{
 			if(elements[i].checked){
 			 	if(elements[i].value!=null && elements[i].value!='')
 			 		localities=localities + elements[i].value+',';
 			}
 			}
 		localities = localities.substring(0, localities.length-1);
 	} else {
 		for(var i=0;i<len;i++)
 		{
 			elements[i].checked = false;
 		}
 	}
 }
function checkCheckBoxs(id)
{
	var elements = document.getElementsByName(id);
	var len = elements.length;
	var check;
	for(var i=0;i<len;i++)
	{
		if(!elements[i].checked){ //if none checked then hide  pincodes
			check =1;
		} else {
			check=0;
			break;
		}
	}
	return check;
}
/**
 * On Form Confirm validating the page
 */
function doSave(typ)
{
	if(typ=="confirm")
		document.forms[0].formAction.value="CONFIRM";
	else
		document.forms[0].formAction.value="SAVE";
	document.forms[0].method="POST";
	document.forms[0].action="terminalUserMaintenanceFormController.htm";
	var roleId=document.getElementById("roleId");
	var primaryLocCode = document.getElementById("primaryLocCode");
	var caCode = document.getElementById("caCode");
	var districtId = document.getElementById("dataObject.districtCode");
	var subdistrictId = document.getElementById("dataObject.subDistrictCode");
	var pincode = document.getElementById("dataObject.pincode");
	var localityCode = document.getElementById("dataObject.localityCode");
	var userStatusId = document.getElementById("userStatusId");
	var chkResetPwd		= document.getElementById("chkResetPwd");
	var txtpassword		= document.getElementById("password");
	if(roleId.value!=null && roleId.value!="" && roleId.value=="7"){
		if(primaryLocCode.value==null || primaryLocCode.value==""){
			primaryLocCode.style.backgroundColor='#FFD9D9';
			primaryLocCode.focus();
			return false;
		}
		else if(checkCheckBoxs("caCode")){
			alert("Catchment Area is Mandatory");
			caCode.style.backgroundColor='#FFD9D9';
			caCode.focus();
			return false;
		}
		else if(checkCheckBoxs("dataObject.districtCode")){
			alert("Districts is Mandatory !");
			districtId.style.backgroundColor='#FFD9D9';
			districtId.focus();
			return false;
		}
		else if(checkCheckBoxs("dataObject.subDistrictCode")){
			alert("Sub District is Mandatory !");
			subdistrictId.style.backgroundColor='#FFD9D9';
			subdistrictId.focus();
			return false;
		}
		else if(checkCheckBoxs("dataObject.pincode")){
			alert("Pincode is Mandatory !");
			pincode.style.backgroundColor='#FFD9D9';
			pincode.focus();
			return false;
		}
		else if(checkCheckBoxs("dataObject.localityCode")){
			alert("Post Office is Mandatory !");
			localityCode.style.backgroundColor='#FFD9D9';
			localityCode.focus();
			return false;
		}
		else if(userStatusId.value==null || userStatusId.value==""){
			userStatusId.style.backgroundColor='#FFD9D9';
			userStatusId.focus();
			return false;
		}
		else if(typ=="confirm" && userStatusId.value!=original_status){
			if(userStatusId.value==7 || userStatusId.value==6){
				userStatusId.style.backgroundColor='#FFD9D9';
				userStatusId.focus();
				return false;
			}
		}
		else if(typ=="save" && (userStatusId.value==7 || userStatusId.value==6)){
			userStatusId.style.backgroundColor='#FFD9D9';
			userStatusId.focus();
			return false;
		}
		else if(typ=="confirm"){
			if(chkResetPwd.checked){
				if(trim(txtpassword.value).length==0 || trim(txtpassword.value).length<6 || isNaN(trim(txtpassword.value))==true)
	 			{
	 				txtpassword.style.backgroundColor='#FFD9D9';
	 				txtpassword.focus();
	 				return false;
	 			}
			}
			
		}		
		document.forms[0].submit();
	}
	else{
		roleId.style.backgroundColor='#FFD9D9';
		roleId.focus();
		return false;
	}
	
}
function showPassword(chkElement)
{
	if(chkElement.checked)
		document.getElementById("passwordDiv").style.display="block";
	else
		document.getElementById("passwordDiv").style.display="none";
}
function dispResetTxtBox()
{
	document.getElementById("passwordDiv").style.display="none";
}
function displayLocation(){
	document.getElementById('roleId').getElementsByTagName('option')[0].selected = 'selected';
	displayPrimaryLocation(document.getElementById("roleId"));
}
function setValue(){
	document.getElementById("roleId").value = selectedRoleId;
	document.getElementById("primaryLocCode").value = selectedPrimaryLocId;
}
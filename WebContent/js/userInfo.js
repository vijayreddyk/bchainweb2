/*******************************************************************************
 * Project MCMS, all source code and data files except images,
 * Copyright 2008-2015 Grit-Innovation Software Pvt. Ltd., India
 *
 * Permission is granted to Magma Fin Corp. to use and modify as they see fit.
 *******************************************************************************/
function checkCheckBoxs(id)
{
	var elements = document.getElementsByName(id);
	var len = elements.length;
	var check=1;
	for(var i=0;i<len;i++)
	{
		if(!elements[i].checked){ 
			check =1;
		} else {
			check=0;
			break;
		}
	}
	return check;
}

function loadDistrict()
{	
	document.getElementById("subDistrictDiv").style.display="none";
	document.getElementById("pincodeDiv").style.display="none";
	document.getElementById("localityDiv").style.display="none";
	document.getElementById("districtDiv").style.display="none";
	//document.getElementById("districtDropDown").options.length=0;
	var obj=document.getElementById("userHasRole.roleId");
	/*
	Changed By Aparna on 6 mar 2014 for Tele caller 0-30
	prev con : if(obj!=null && obj.value!="" && obj.value!=3 && obj.value!=4 && obj.value!=5 && obj.value!=6 && obj.value!=14 && obj.value!=15 && obj.value!=16 && obj.value!=17 && obj.value!=19 && obj.value!=18 || obj.value!=20 || obj.value!=21 || obj.value!=22 || obj.value!=23 || obj.value!=24 || obj.value!=25 || obj.value!=26 || obj.value!=27 || obj.value!=28 || obj.value!=29 || obj.value!=30 || obj.value!=31 || obj.value!=32)
	*/
	if(obj!=null && obj.value!="" && obj.value!=3 && obj.value!=4 && obj.value!=5 && obj.value!=6 && obj.value!=14 && obj.value!=15 && obj.value!=16 && obj.value!=17 && obj.value!=19 && obj.value!=18 || obj.value!=20 || obj.value!=21 || obj.value!=22 || obj.value!=23 || obj.value!=24 || obj.value!=25 || obj.value!=26 || obj.value!=27 || obj.value!=28 || obj.value!=29 || obj.value!=31 || obj.value!=32)
	{	
		var locCode = document.getElementById("dataObject.primaryLocCode").value;
		DWRUtil.getMultipleDistrictsByLocation(locCode,districtCallback);
	}
}


function districtCallback(data)
{
	document.getElementById("subDistrictDiv").style.display="none";
	document.getElementById("pincodeDiv").style.display="none";
	document.getElementById("localityDiv").style.display="none";
	document.getElementById("districtDiv").style.display="block";
	
	if(data!=null)
	{
/*		var districts = document.getElementById("districtDropDown");
		var len = data.length;
 		districts.options[0]= new Option("Select District","");
		for(var i=0;i<len;i++)
		{
			districts.options[i+1]= new Option(data[i].substr(data[i].indexOf("$")+1),data[i].substr(0,data[i].indexOf("$")));
		}
*/	
 		document.getElementById("districtDiv").style.display="block";
 		document.getElementById("district").checked=false;
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
	
	}else{
		alert("No districts for the selected location!");
	}
}

/*function doSelectDistrict(obj)
{
	var districts="";
	var elements = document.getElementsByName("dataObject.districtCode");
	var len = elements.length;
	if(obj.checked)
	{
		for(var i=0;i<len;i++)
		{
			if(elements[i].value!=null && elements[i].value!='')
				districts=districts + elements[i].value+',';
		}
		
		document.getElementById("districtDiv").style.display="block";
		DWRUtil.getSubDistrictByMultipleDistricts(districts,multiSubDistrictCallback);
	} else {
		for(var i=0;i<len;i++)
		{
			elements[i].checked = false;
		}
	}
}
*/
function doSelectDistrict(obj){
 	document.getElementById("pincodeDiv").style.display="none";
 	document.getElementById("localityDiv").style.display="none";
 	var districts ="";
  	var elements = document.getElementsByName("dataObject.districtCode");
	var len = elements.length;
	var loadSubDistrictsFlag=false;//Flag to load Sub-districts
	
	if(obj.checked)
	{
		loadSubDistrictsFlag=true;
	}else {
		var flag =0;
		for(var i=0;i<len;i++)
		{
			if(!elements[i].checked){ //if none checked then hide  pincodes
				flag =1;
			} else {
				flag=0;
				break;
			}
		}
	
		if(flag) 
		{
			document.getElementById("subDistrictDiv").style.display="none";
			document.getElementById("pincodeDiv").style.display="none";
			document.getElementById("localityDiv").style.display="none";
		}else{
			loadSubDistrictsFlag=true;
		}		
	}
	
	if(loadSubDistrictsFlag){
		for(var i=0;i<len;i++)
		{
			if(elements[i].checked){
			 	if(elements[i].value!=null && elements[i].value!='')
					districts=districts + elements[i].value+',';
			}
		}
		document.getElementById("districtDiv").style.display="block";			
		districts = districts.substring(0, districts.length-1);
		mygrid10.clearAll();//clear subdistricts
		mygrid9.clearAll();//clear pincodes
		mygrid8.clearAll();//clear locality codes
		//DWRUtil.getSubDistrictByMultipleDistricts(districts,multiSubDistrictCallback);
		DWRUtil.getAllSubDistrictsForChosenDistricts(districts,multiSubDistrictCallback);
	}
}


function loadValues()
{
	//var districtCode = document.getElementById("districtDropDown").value;
	var districtCode = document.getElementById("districtDiv").value;
	var subDistrictCode = document.getElementById("subDistrictDiv").value;
	var pincode = document.getElementById("pincodeDiv").value;
	var selectedDistrict="${commandObject.selectedDistricts}";
	if(selectedDistrict==null || selectedDistrict.length==2 ){
		document.getElementById("subDistrictDiv").style.display="none";
		document.getElementById("pincodeDiv").style.display="none";
		document.getElementById("localityDiv").style.display="none";
	}
}

function loadSubDistrict()
{	
	document.getElementById("pincodeDiv").style.display="none";
	document.getElementById("localityDiv").style.display="none";
	document.getElementById("subDistrictDiv").style.display="none";
	//document.getElementById("dataObject.subDistricts").options.length=0;
	//var districtCode = document.getElementById("districtDropDown").value;
	var districtCode = document.getElementById("districtDiv").value;
	var obj=document.getElementById("userHasRole.roleId");
	
	/*
	Changed by Aparna on 6 mar 2014 for Tele caller 0-30
	prev con : if(obj!=null && obj.value!="" && obj.value!=3 && obj.value!=4 && obj.value!=5 && obj.value!=6 && obj.value!=14 && obj.value!=15 && obj.value!=16 && obj.value!=17 && obj.value!=19 && obj.value!=18 || obj.value!=20 || obj.value!=21 || obj.value!=22 || obj.value!=23 || obj.value!=24 || obj.value!=25 || obj.value!=26 || obj.value!=27 || obj.value!=28 || obj.value!=29 || obj.value!=30 || obj.value!=31 || obj.value!=32)
	*/
	if(districtCode!=null && districtCode!="" && obj!=null && obj.value!="" && ( obj.value=='7' || obj.value=='30'))
	{
		//DWRUtil.getSubDistrictByMultipleDistricts(districtCode,multiSubDistrictCallback);
		DWRUtil.getAllSubDistrictsForChosenDistricts(districtCode,multiSubDistrictCallback);
		
	}
	else
		{
			document.getElementById("subDistrictDiv").style.display="none";
		}
}

function multiSubDistrictCallback(data)
{
	if(data!=null)
	{
		document.getElementById("subDistrictDiv").style.display="block";
		document.getElementById("subdistrict").checked=false;
		var len = data.length;
		var myData = new Array();
		for(var i=0;i<len;i++)
		{
			var subdistrict = data[i].substr(0,data[i].indexOf("$"));
			myData[i]=new Array();
			myData[i][0]='<INPUT TYPE="checkbox" NAME="dataObject.subDistrictCode" id="dataObject.subDistrictCode" onclick="doSelectSubDistrict(this)" value="' +subdistrict+ '" >  ';
			myData[i][1]=data[i].substr(data[i].indexOf("$")+1);
		}
		
		mygrid10.clearAll();//clear subdistricts
		mygrid10.parse(myData,"jsarray");
	}else{
		alert("No sub-districts for the selected district(s)!");
	}
}
 
 function doSelectSubDistrict(obj){
	 	document.getElementById("localityDiv").style.display="none";
	 	var subDistricts ="";
	  	var elements = document.getElementsByName("dataObject.subDistrictCode");
		var len = elements.length;
		var loadPinsFlag=false;//Flag to load Pincodes
		
		if(obj.checked)
		{
			loadPinsFlag=true;
		}else {
			var flag =0;
			for(var i=0;i<len;i++)
			{
				if(!elements[i].checked){ //if none checked then hide  pincodes
					flag =1;
				} else {
					flag=0;
					break;
				}
			}
		
			if(flag) 
			{
				document.getElementById("pincodeDiv").style.display="none";
				document.getElementById("localityDiv").style.display="none";
			}else{
				loadPinsFlag=true;
			}		
		}
		
		if(loadPinsFlag){
			for(var i=0;i<len;i++)
			{
				if(elements[i].checked){
				 	if(elements[i].value!=null && elements[i].value!='')
						subDistricts=subDistricts + elements[i].value+',';
				}
 			}
			document.getElementById("subDistrictDiv").style.display="block";			
			subDistricts = subDistricts.substring(0, subDistricts.length-1);
			mygrid9.clearAll();//clear pincodes
			mygrid8.clearAll();//clear locality codes
			DWRUtil.getPincodeByMultipleSubDistricts(subDistricts,multiPincodeCallback);
		}
 }

 function loadPincode()
 {	
 	document.getElementById("localityDiv").style.display="none";
	document.getElementById("pincodeDiv").options.length=0;	
 	var obj=document.getElementById("userHasRole.roleId");
 	/*
 	Changed By Aparna on 6 mar 2014 for Tele caller 0-30
 	prev con : if(obj!=null && obj.value!="" && obj.value!=3 && obj.value!=4 && obj.value!=5 && obj.value!=6 && obj.value!=14 && obj.value!=15 && obj.value!=16 && obj.value!=17 && obj.value!=19 && obj.value!=18 || obj.value!=20 || obj.value!=21 || obj.value!=22 || obj.value!=23 || obj.value!=24 || obj.value!=25 || obj.value!=26 || obj.value!=27 || obj.value!=28 || obj.value!=29 || obj.value!=30 || obj.value!=31 || obj.value!=32)
 	*/
 	if(obj!=null && obj.value!="" && obj.value!=3 && obj.value!=4 && obj.value!=5 && obj.value!=6 && obj.value!=14 && obj.value!=15 && obj.value!=16 && obj.value!=17 && obj.value!=19 && obj.value!=18 || obj.value!=20 || obj.value!=21 || obj.value!=22 || obj.value!=23 || obj.value!=24 || obj.value!=25 || obj.value!=26 || obj.value!=27 || obj.value!=28 || obj.value!=29 || obj.value!=31 || obj.value!=32)
 	{
 		var subDistrictCode = document.getElementById("subDistrictDiv").value;
 		DWRUtil.getPincodeByMultipleSubDistricts(subDistrictCode,multiPincodeCallback);
 	}
 }

 function multiPincodeCallback(data)
 {
 	if(data!=null)
 	{
 		document.getElementById("pincodeDiv").style.display="block";
 		document.getElementById("pincode").checked=false;
 		var len = data.length;
 		var myData = new Array();
 		for(var i=0;i<len;i++)
 		{
 			myData[i]=new Array();
 			myData[i][0]='<INPUT TYPE="checkbox" NAME="dataObject.pincode" id="dataObject.pincode" onclick="doSelectPincodes(this)" value="'+data[i].substr(0,data[i].indexOf("-"))+'"  >';
 			myData[i][1]=data[i].substr(data[i].indexOf(",")+1);
 		}
 		mygrid9.clearAll(); //clear pins
 		mygrid9.parse(myData,"jsarray");
 	}else{
 		alert("No pincodes for the selected sub-district(s)!");
 	}
 }
 
 function loadSections(id){
	 if(id.value!="" && id.value!=null){
		loadCatchmentAreas();
		loadDistrict();
	 }
	 else{
		 document.getElementById("catchmentDiv").style.display="none";
		 document.getElementById("subDistrictDiv").style.display="none";
		 document.getElementById("pincodeDiv").style.display="none";
		 document.getElementById("localityDiv").style.display="none";
		 document.getElementById("districtDiv").style.display="none";
	 }
	}
function loadCatchmentAreas()
	{	
		var obj=document.getElementById("userHasRole.roleId");
		if(obj!=null && obj.value!="" && obj.value!=3 && obj.value!=4 && obj.value!=5 && obj.value!=6 && obj.value!=14 && obj.value!=15 && obj.value!=16 && obj.value!=17 && obj.value!=19 && obj.value!=18 || obj.value!=20 || obj.value!=21 || obj.value!=22 || obj.value!=23 || obj.value!=24 || obj.value!=25 || obj.value!=26 || obj.value!=27 || obj.value!=28 || obj.value!=29 || obj.value!=30 || obj.value!=31)
		{
			var locCode = document.getElementById("dataObject.primaryLocCode").value;
			DWRUtil.getCatchmentAreasByLocation(locCode,catchmentAreaCallback);
		}
	}
	function catchmentAreaCallback(data)
	{
		if(data!=null)
		{
			document.getElementById("catchmentDiv").style.display="block";
			document.getElementById("catchment").checked=false;
			var len = data.length;
			var myData = new Array();
			for(var i=0;i<len;i++)
			{
				myData[i]=new Array();
				myData[i][0]='<INPUT TYPE="checkbox" NAME="dataObject.caCode" id="dataObject.caCode" value="'+data[i].substr(0,data[i].indexOf("$"))+'">';
				myData[i][1]=data[i].substr(data[i].indexOf("$")+1);
			}
			mygrid2.clearAll();
			mygrid2.parse(myData,"jsarray");
		}else{
			alert("No catchment area for the location!");
		}
	}
	
	function doSelectAllCatchments(obj)
	{
		var elements = document.getElementsByName("dataObject.caCode");
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
	}
	
	function dispResetTxtBox()
	{
		document.getElementById("passwordDiv").style.display="none";
	}

/*	function loadValues()
	{

		var districtCode = document.getElementById("districtDropDown").value;
		var subDistrictCode = document.getElementById("subDistrictDiv").value;
		var pincode = document.getElementById("pincodeDiv").value;
		var selectedDistrict="${commandObject.selectedDistricts}";
		if(districtCode==null || districtCode.length==0 ){
			document.getElementById("subDistrictDiv").style.display="none";
			document.getElementById("pincodeDiv").style.display="none";
			document.getElementById("localityDiv").style.display="none";
		}
	}
*/

 function doSelectPincodes(obj){
   	var pincodes ="";
 	var elements = document.getElementsByName("dataObject.pincode");
 	var len = elements.length;
 	document.getElementById("localityDiv").style.display="none";
	var loadLocalitiesFlag=false;//Flag to load Localities
	
	if(obj.checked)
	{
		loadLocalitiesFlag=true;
 	}else {
 		var flag =0;
 		for(var i=0;i<len;i++)
 		{
 			if(!elements[i].checked){ //if none checked then hide  localitycodes
 				flag =1;
 			} else {
 				flag=0;
 				break;
 			}
 		}
 		if(flag) 
 		{
 			document.getElementById("localityDiv").style.display="none";
 		}else{
 			loadLocalitiesFlag=true;
 		}			
 	}

	if(loadLocalitiesFlag){
		for(var i=0;i<len;i++)
	 		{
	 			if(elements[i].checked){
	 			 	if(elements[i].value!=null && elements[i].value!=''){
	 			 		pincodes=pincodes + elements[i].value+',';
	 			 	}
	 			}
	 		}
	 		pincodes = pincodes.substring(0, pincodes.length-1);
	 		mygrid8.clearAll();
	 		DWRUtil.getLocalityByMultiplePincodes(pincodes,multiLocalityCallback);
	}
 }

 function loadLocality()
 {	
	 document.getElementById("localityDiv").options.length=0;
	 var obj=document.getElementById("userHasRole.roleId");
	 /*
	 Changed by Aparna on 6 mar 2014 for Tele caller 0-30
	 prev con : if(obj!=null && obj.value!="" && obj.value!=3 && obj.value!=4 && obj.value!=5 && obj.value!=6 && obj.value!=14 && obj.value!=15 && obj.value!=16 && obj.value!=17 && obj.value!=19 && obj.value!=18 || obj.value!=20 || obj.value!=21 || obj.value!=22 || obj.value!=23 || obj.value!=24 || obj.value!=25 || obj.value!=26 || obj.value!=27 || obj.value!=28 || obj.value!=29 || obj.value!=30 || obj.value!=31 || obj.value!=32)
	 */
 	if(obj!=null && obj.value!="" && obj.value!=3 && obj.value!=4 && obj.value!=5 && obj.value!=6 && obj.value!=14 && obj.value!=15 && obj.value!=16 && obj.value!=17 && obj.value!=19 && obj.value!=18 || obj.value!=20 || obj.value!=21 || obj.value!=22 || obj.value!=23 || obj.value!=24 || obj.value!=25 || obj.value!=26 || obj.value!=27 || obj.value!=28 || obj.value!=29 || obj.value!=31 || obj.value!=32)
 	{
 		var pincodes = document.getElementById("dataObject.pincode").value;
 		DWRUtil.getLocalityByMultiplePincodes(pincodes,multiLocalityCallback);
 	}
 }

 function multiLocalityCallback(data)
 {
 	if(data!=null)
 	{
 		document.getElementById("localityDiv").style.display="block";
 		document.getElementById("locality").checked=false;
 		var len = data.length;
 		var myData = new Array();
 		for(var i=0;i<len;i++)
 		{
 			myData[i]=new Array();
 			myData[i][0]='<INPUT TYPE="checkbox" NAME="dataObject.localityCode" id="dataObject.localityCode" onclick="doSelectLocality(this)" value="'+data[i].substr(0,data[i].indexOf("$"))+'">';
 			myData[i][1]=data[i].substr(data[i].indexOf("$")+1);
 		}
 		mygrid8.clearAll();
 		mygrid8.parse(myData,"jsarray");
 	}else{
 		alert("No post office for the selected pincode(s)!");
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

 function doSelectAllDistrict(obj)
 {
 	var districts ="";
 	var elements = document.getElementsByName("dataObject.districtCode");
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
 	doSelectDistrict(obj);
 }


 function doSelectAllSubDistrict(obj)
 {
 	var subDistricts ="";
 	var elements = document.getElementsByName("dataObject.subDistrictCode");
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
 	doSelectSubDistrict(obj);
 }

 function doSelectAllPincodes(obj)
 {
 	var elements = document.getElementsByName("dataObject.pincode");
 	var len = elements.length;
 	if(obj.checked)
 	{
 		for(var i=0;i<len;i++)
 		{
 			elements[i].checked = true;
 		}
 	} else {
 		for(var i=0;i<len;i++)
 		{
 			elements[i].checked = false;
 		}
 	}
 	doSelectPincodes(obj);
 }

 function doSelectAllLocality(obj)
 {
 	var elements = document.getElementsByName("dataObject.localityCode");
 	var len = elements.length;
 	if(obj.checked)
 	{
 		for(var i=0;i<len;i++)
 		{
 			elements[i].checked = true;
 		}
 	} else {
 		for(var i=0;i<len;i++)
 		{
 			elements[i].checked = false;
 		}
 	}
 	doSelectLocality(obj);
 }

 function doConfirm()
 {
 	document.forms[0].formAction.value="CONFIRM";
 	document.forms[0].method="POST";
 	document.forms[0].action="terminalUserMaintenanceFormController.htm";
 	//document.forms[0].submit();

	//Form Validation
	var roleId			= document.getElementById("userHasRole.roleId");
	var caCodeId		= document.getElementById("dataObject.caCode");
	var userStatId		= document.getElementById("dataObject.userStatusId");
	var branchCodeId	= document.getElementById("dataObject.branchCode");
	var locCodeID		= document.getElementById("dataObject.locCode");
	var primaryLocId	= document.getElementById("dataObject.primaryLocCode");
	var zoneCodeId		= document.getElementById("dataObject.zoneCode");
 	var chkResetPwd		= document.getElementById("chkResetPwd");
 	var txtpassword		= document.getElementById("password");
 	//var districtId		= document.getElementById("districtDropDown");
 	var districtId		= document.getElementById("dataObject.districtCode");
 	var subDistrictId	= document.getElementById("dataObject.subDistrictCode");
 	var pincodeId		= document.getElementById("dataObject.pincode");
 	var localityCodeId	= document.getElementById("dataObject.localityCode");
 	if(roleId.selectedIndex!=0)
 	{	
 		
 		if(roleId.value==7 && (primaryLocId.selectedIndex==0||primaryLocId.selectedIndex==-1))
 		{
 			primaryLocId.style.backgroundColor='#FFD9D9';
 			primaryLocId.focus();
 			return false;
 		}
 		if(roleId.value==7)
 		{
 			if(checkCheckBoxs("dataObject.caCode")){
 			caCodeId.style.backgroundColor='#FFD9D9';
 			caCodeId.focus();
 			return false;
 			}
 			if(checkCheckBoxs("dataObject.districtCode")){
 				districtId.style.backgroundColor='#FFD9D9';
 				districtId.focus();
 				return false;
 			}
 			if(checkCheckBoxs("dataObject.subDistrictCode"))
 			{
 				subDistrictId.style.backgroundColor='#FFD9D9';
 				subDistrictId.focus();
 				return false;
 			}
 			if(checkCheckBoxs("dataObject.pincode"))
 			{
 				pincodeId.style.backgroundColor='#FFD9D9';
 				pincodeId.focus();
 				return false;
 			}
 			if(checkCheckBoxs("dataObject.localityCode"))
 			{
 				localityCodeId.style.backgroundColor='#FFD9D9';
 				localityCodeId.focus();
 				return false;
 			}
 		}
 		else if(roleId.value==4 && branchCodeId.selectedIndex==0)
 		{
 			branchCodeId.style.backgroundColor='#FFD9D9';
 			branchCodeId.focus();
 			return false;		
 		}
 		else if(roleId.value==3 && zoneCodeId.selectedIndex==0)
 		{
 			zoneCodeId.style.backgroundColor='#FFD9D9';
 			zoneCodeId.focus();
 			return false;		
 		}
 		else if((roleId.value==5 ||roleId.value==6) && locCodeID.selectedIndex==0)
 		{
 			locCodeID.style.backgroundColor='#FFD9D9';
 			locCodeID.focus();
 			return false;		
 		}
 		if(chkResetPwd.checked)
 		{		
 			if(trim(txtpassword.value).length==0 || trim(txtpassword.value).length<6)
 			{
 				txtpassword.style.backgroundColor='#FFD9D9';
 				txtpassword.focus();
 				return false;
 			}
 		}
 		if(userStatId)
 		{
 			if(userStatId.selectedIndex!=0)
 			{					
 				//return true;
 			}
 			else
 			{
 				userStatId.style.backgroundColor='#FFD9D9';
 				userStatId.focus();
 				return false;
 			}
 		}
 	}
 	else
 	{
 		roleId.style.backgroundColor='#FFD9D9';
 		roleId.focus();
 		return false;
 	}
 }

 function doSelectZone(obj){
		var roleId=document.getElementById("userHasRole.roleId");
		var elements = document.getElementsByName("dataObject.zoneCode");
		var zones="";
		var len = elements.length;
			for(var i=0;i<len;i++)
			{
				if(elements[i].checked){
					if(elements[i].value!=null && elements[i].value!='')
						zones=zones + elements[i].value+',';	
				}
			}
			if(roleId.value==3){
			document.getElementById("branchMultiDiv").style.display="block";			
			DWRUtil.getBranchesByMultipleZones(zones,branchGridCallback);
			}
	}

	function doSelectAllBucket(obj)
	{
		var elements = document.getElementsByName("dataObject.bucketCode");
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
	}
	function doSelectAllDivisions(obj)
	{
		var elements = document.getElementsByName("dataObject.divCode");
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
	}
	function doSelectAllCatchments(obj)
	{
		var elements = document.getElementsByName("dataObject.caCode");
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
	}
	function doSelectAllLocations(obj)
	{
		var elements = document.getElementsByName("dataObject.locCode");
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
	}
	function doSelectAllZones(obj)
	{
		var roleId=document.getElementById("userHasRole.roleId");
		var zones="";
		var elements = document.getElementsByName("dataObject.zoneCode");
		var len = elements.length;
		if(obj.checked)
		{
			for(var i=0;i<len;i++)
			{
				elements[i].checked = true;
				if(elements[i].value!=null && elements[i].value!='')
					zones=zones + elements[i].value+',';
			}
			if(roleId.value==3){
				document.getElementById("branchMultiDiv").style.display="block";			
				DWRUtil.getBranchesByMultipleZones(zones,branchGridCallback);
				}
		}
		else
		{
			for(var i=0;i<len;i++)
			{
				elements[i].checked = false;
			}
		}
	}
	function showPassword(chkElement)
	{
		if(chkElement.checked)
			document.getElementById("passwordDiv").style.display="block";
		else
			document.getElementById("passwordDiv").style.display="none";
	}
	function doSelectAllBranches(obj)
	{
		var roleId=document.getElementById("userHasRole.roleId");
		var elements = document.getElementsByName("dataObject.branchCode");
		var branches="";
		var len = elements.length;
		if(obj.checked)
		{
			for(var i=0;i<len;i++)
			{
				elements[i].checked = true;
				
				if(elements[i].value!=null && elements[i].value!='')
				branches=branches + elements[i].value+',';
			}
			if(roleId.value==4){
			DWRUtil.getLocationsByMultipleBranchs(branches,multipleLocationsCallback);
			}
		}
		
		else
		{
			for(var i=0;i<len;i++)
			{
				elements[i].checked = false;
			}
			mygrid5.clearAll();
		}
	}
	function doSelectBranch(val){
		//document.getElementById("dataObject.primaryLocCode").style.display = "none";
		var obj=document.getElementById("userHasRole.roleId");
		var elements = document.getElementsByName("dataObject.branchCode");
		var branches="";
		var len = elements.length;
			for(var i=0;i<len;i++)
			{
				if(elements[i].checked){
					if(elements[i].value!=null && elements[i].value!='')
						branches=branches + elements[i].value+',';	
				}
			}		
			if(obj.value==4){
				mygrid5.clearAll();
			DWRUtil.getLocationsByMultipleBranchs(branches,multipleLocationsCallback);
			}
	}
	function multipleLocationsCallback(data)
	{
		if(data!=null)
		{	
			var obj=document.getElementById("userHasRole.roleId");
			var locations = document.getElementById("dataObject.primaryLocCode").value;
			document.getElementById("mutilplelocLocation").style.display="block";
			if(obj.value!=null && obj.value!='4' && obj.value!='34')
				$('#span_text').html("Deposit To Location");
				else
					$('#span_text').html("Locations");
			var len = data.length;
			var j=0;
			var myData2 = new Array();
			if(obj.value!=null && obj.value=='34'){
				for(var i=0;i<len;i++)
				{
					myData2[j]=new Array();
					myData2[j][0]='<INPUT TYPE="checkbox" NAME="dataObject.locCode" id="dataObject.locCode" value="'+data[i].substr(0,data[i].indexOf("$"))+'">';
					myData2[j][1]=data[i].substr(data[i].indexOf("$")+1);
					j++;
				}
			}
			else{
				for(var i=0;i<len;i++)
				{
					if(locations!=data[i].substr(0,data[i].indexOf("$")))
					{
						myData2[j]=new Array();
						myData2[j][0]='<INPUT TYPE="checkbox" NAME="dataObject.locCode" id="dataObject.locCode" value="'+data[i].substr(0,data[i].indexOf("$"))+'">';
						myData2[j][1]=data[i].substr(data[i].indexOf("$")+1);
						j++;
					}
				}
			}
			mygrid5.clearAll();
			mygrid5.parse(myData2,"jsarray");
		}else{
			alert("No location for the selected branch(es)!");
		}
	}

	function loadBranches()
	{	
		document.getElementById("priLocDiv").style.display="none";
//		document.getElementById("locDiv").style.display="none";
		document.getElementById("catchmentDiv").style.display="none";
		document.getElementById("districtDiv").style.display="none";
		document.getElementById("subDistrictDiv").style.display="none";
		document.getElementById("pincodeDiv").style.display="none";
		document.getElementById("localityDiv").style.display="none";
		document.getElementById("mutilplelocLocation").style.display="none";
		var obj=document.getElementById("userHasRole.roleId");
		if(obj!=null && obj.value!="" && obj.value!=3 && obj.value!=8 && obj.value!=10)
		{
			var zoneCode = document.getElementById("dataObject.zoneCode").value;
			if(zoneCode!=null && zoneCode!="")
				{
						
					var elements = document.forms[0].elements;
					checkedItemCount=0;
					for(var i=0;i<elements.length;i++)
					{
						if(elements[i].type=="checkbox" && elements[i].id!="chkResetPwd")
						{
							elements[i].checked=false;
						}	 
					}
					var branches = document.getElementById("dataObject.branchCode").value;
					if(branches!=null)
					{
						
						var elements = document.forms[0].elements;
						checkedItemCount=0;
						for(var i=0;i<elements.length;i++)
						{
							if(elements[i].type=="checkbox" && elements[i].id!="chkResetPwd")
							{
								elements[i].checked=false;
							}	 
						}
					}
					if(obj!=null && obj.value!="" && (obj.value==5 || obj.value==6 || obj.value==7 || obj.value==30 || obj.value==34))
					{
						document.getElementById("branchMultiDiv").style.display="none";
						document.getElementById("branchDiv").style.display="block";
						DWRUtil.getBranchesByZone(zoneCode,branchCallback);	
						}
					if(obj!=null && obj.value!="" && (obj.value==4 || obj.value==11 || obj.value==14 || obj.value==15 || obj.value==16 || obj.value==17 || obj.value==19 || obj.value==18 || obj.value==20 || obj.value==21 || obj.value==22 || obj.value==23 || obj.value==24 || obj.value==25 || obj.value==26 || obj.value==27 || obj.value==28 || obj.value==29  || obj.value==31))
						{
						document.getElementById("branchMultiDiv").style.display="block";
						document.getElementById("branchDiv").style.display="none";
						DWRUtil.getBranchesByZone(zoneCode,branchGridCallback);	
						}
				
				}
			else
			{
				
				document.getElementById("priLocDiv").style.display="none";
				//document.getElementById("locDiv").style.display="none";
				document.getElementById("catchmentDiv").style.display="none";
				document.getElementById("branchDiv").style.display="none";
				document.getElementById("districtDiv").style.display="none";
				document.getElementById("subDistrictDiv").style.display="none";
				document.getElementById("pincodeDiv").style.display="none";
				document.getElementById("localityDiv").style.display="none";			
			}
			
		}
	}
	function loadBranchesByZone()
	{	
		document.getElementById("priLocDiv").style.display="none";
		//document.getElementById("locDiv").style.display="none";
		document.getElementById("catchmentDiv").style.display="none";
		document.getElementById("districtDiv").style.display="none";
		document.getElementById("subDistrictDiv").style.display="none";
		document.getElementById("pincodeDiv").style.display="none";
		document.getElementById("localityDiv").style.display="none";
		
		var obj=document.getElementById("userHasRole.roleId");
		if(obj!=null && obj.value!="" && obj.value!=3)
		{
			DWRUtil.getBranchesByZone(userZone,branchCallback);
		}
	}
	function loadBranchesGridByZone()
	{	
		document.getElementById("priLocDiv").style.display="none";
		//document.getElementById("locDiv").style.display="none";
		document.getElementById("catchmentDiv").style.display="none";
		document.getElementById("districtDiv").style.display="none";
		document.getElementById("subDistrictDiv").style.display="none";
		document.getElementById("pincodeDiv").style.display="none";
		document.getElementById("localityDiv").style.display="none";

		var obj=document.getElementById("userHasRole.roleId");
		if(obj!=null && obj.value!="" && obj.value!=3)
		{
			DWRUtil.getBranchesByZone(userZone,branchGridCallback);
		}
	}
	function branchCallback(data)
	{
		if(data!=null)
		{
			var branches = document.getElementById("dataObject.branchCode");
			if(branches!=null)
			{
				var elements = document.forms[0].elements;
				checkedItemCount=0;
				for(var i=0;i<elements.length;i++)
				{
					if(elements[i].type=="checkbox" && elements[i].id!="chkResetPwd")
					{
						elements[i].checked=false;
					}	 
				}
			}
			var len = data.length;
			branches.options.length = 0;
			branches.options[0]= new Option("Select Branch","");
			for(var i=0;i<len;i++)
			{
				branches.options[branches.options.length]= new Option(data[i].substr(data[i].indexOf("$")+1),data[i].substr(0,data[i].indexOf("$")));
			}
		}else{
			alert("No branch for the selected zone!");
		}
	}
	function branchGridCallback(data)
	{
		if(data!=null)
		{	
			var branches = document.getElementById("dataObject.branchCode").value;
	/* 		if(branches!=null)
			{
				var elements = document.forms[0].elements;
				checkedItemCount=0;
				for(var i=0;i<elements.length;i++)
				{
					if(elements[i].type=="checkbox")
					{
						elements[i].checked=false;
					}	 
				}
			} */
			var len = data.length;
			var j=0;
			var myData = new Array();
			for(var i=0;i<len;i++)
			{
				if(branches!=data[i].substr(0,data[i].indexOf("$")))
				{
					myData[j]=new Array();
					myData[j][0]='<INPUT TYPE="checkbox" NAME="dataObject.branchCode" onclick="doSelectBranch(this)" id="dataObject.branchCode" value="'+data[i].substr(0,data[i].indexOf("$"))+'">';
					myData[j][1]=data[i].substr(data[i].indexOf("$")+1);
					j++;
				}
			}
			mygrid4.clearAll();
			mygrid4.parse(myData,"jsarray");
		}else{
			alert("No branches for the selected zone!");
		}
	}
 

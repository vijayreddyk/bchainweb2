/*******************************************************************************
 * Project MCMS, all source code and data files except images,
 * Copyright 2008-2015 Grit-Innovation Software Pvt. Ltd., India
 *
 * Permission is granted to Magma Fin Corp. to use and modify as they see fit.
 *******************************************************************************/
/**
 * 
 */
function resetCommonCheckBox(){
	var elements = document.getElementsByName("selectAll");
	var len = elements.length;
	for(var i=0;i<len;i++)
	{
		elements[i].checked = false;
	}
}
function resetCheckBoxByName(ch_name){
	var elements = document.getElementsByName(ch_name);
	if(elements!=null){
		var len = elements.length;
		for(var i=0;i<len;i++)
		{
			elements[i].checked = false;
		}
	}
	
}
//on role drop change
function displayLocation(){

	var roleId=document.getElementById("roleId");
	document.getElementById("mutilpleBuckets").style.display="none";
	document.getElementById("mutilpleDivisions").style.display="none";
	resetCommonCheckBox();
	resetCheckBoxByName("branchCode");
	resetCheckBoxByName("bucketCode");
	resetCheckBoxByName("divCode");
	var branchCode = userBranch;
	var multiselectbr = document.getElementById("isMultiBranchUser");
	if(ismultiuser==true){
		branchCode = document.getElementById("branchCode").value;
	}
	if(userRole=="Branch Administrator" || userRole=="RH" || userRole=="BM 0-90" || userRole=="TM 0-90" ||  userRole=="SCM 0-90" ||  userRole=="RBM 0-90"){
		if(ismultiuser==true){
			loadBranches();
		}
		/*document.getElementById("zoneMultiDiv").style.display="none";
		document.getElementById("zoneSingleDiv").style.display="none";
		*/
		
		if(roleId!=null && roleId.value!="" && roleId.value != 1 && roleId.value != 2 && roleId.value != 33  && roleId.value != 9 && roleId.value != 12 && roleId.value != 13 && roleId.value != 46){
			if(roleId.value==7 || roleId.value==5){
				document.getElementById("zoneSingleDiv").style.display="block";
				document.getElementById("zoneMultiDiv").style.display="none";
				document.getElementById("branchMultiDiv").style.display="none";
				document.getElementById("branchDiv").style.display="block";
			}else{
				document.getElementById("zoneSingleDiv").style.display="none";
				document.getElementById("zoneMultiDiv").style.display="block";
				document.getElementById("branchMultiDiv").style.display="block";
				document.getElementById("branchDiv").style.display="none";
			}
		}else{
			document.getElementById("zoneSingleDiv").style.display="none";
			document.getElementById("zoneMultiDiv").style.display="none";
			document.getElementById("branchMultiDiv").style.display="none";
			document.getElementById("branchDiv").style.display="none";
		}
		if(roleId!=null && roleId.value!="" && (roleId.value==34 || roleId.value==4 || roleId.value==38 || roleId.value==40 || roleId.value==63)){
			if(roleId.value !=4)
				document.getElementById("mutilpleBuckets").style.display="block";
			document.getElementById("mutilpleDivisions").style.display="block";
			if(!ismultiuser)
			DWRUtil.getLocationsByBranch(branchCode,multipleLocationsCallback);
		}
		else if(roleId.value!=null && roleId.value!="" && (roleId.value==7 || roleId.value==16 || roleId.value==23 || roleId.value==26 || roleId.value==27 || roleId.value==28 || roleId.value==29 || roleId.value==30 || roleId.value==31 || roleId.value==35 || roleId.value==36 || roleId.value==37 || roleId.value==42 || roleId.value==45 || roleId.value==67)){
			if(roleId.value!=7 && roleId.value!=42){
				document.getElementById("mutilpleBuckets").style.display="block";
			}
			else{
				document.getElementById("mutilpleBuckets").style.display="none";
			}
			document.getElementById("mutilpleDivisions").style.display="none";
			if(roleId.value==7 || roleId.value==30 || roleId.value==35){
				if(!ismultiuser)
				DWRUtil.getLocationsByBranch(branchCode,locationCallback);			
				document.getElementById("mutilplelocLocation").style.display="none";
			}
			else{
				document.getElementById("priLocDiv").style.display="none";
				document.getElementById("mutilplelocLocation").style.display="none";
			}
		}
		else{
			document.getElementById("mutilpleBuckets").style.display="none";
			document.getElementById("mutilpleDivisions").style.display="none";
			document.getElementById("mutilplelocLocation").style.display="none";
			
		}
		document.getElementById("priLocDiv").style.display="none";
		document.getElementById("catchmentDiv").style.display="none";
		document.getElementById("districtDiv").style.display="none";
		document.getElementById("subDistrictDiv").style.display="none";
		document.getElementById("pincodeDiv").style.display="none";
		document.getElementById("localityDiv").style.display="none";
	
	}
	else if(userRole=="Zonal Administrator" || userRole=="POC Support" || userRole=="Zonal Accountant Admin" ){
		document.getElementById("zoneMultiDiv").style.display="none";
		if(ismultizoneuser){
			document.getElementById("zoneSingleDiv").style.display="block";
		}else{
		document.getElementById("zoneSingleDiv").style.display="none";
		loadBranches();
		}
		if(roleId!=null && roleId.value!="" && (roleId.value==34 || roleId.value==4 || roleId.value==33 || roleId.value==16 || roleId.value==23 
				|| roleId.value==26 || roleId.value==27 || roleId.value==28 || roleId.value==29 || roleId.value==30 || roleId.value==31 || roleId.value==35 
				|| roleId.value==36 || roleId.value==37 || roleId.value==38|| roleId.value==42 || roleId.value==45 || roleId.value==39 || roleId.value==40  
				|| roleId.value==41  || roleId.value==48 || roleId.value==52 || roleId.value==50 ||roleId.value==49 ||roleId.value==51 || roleId.value==58 
				|| roleId.value==60 || roleId.value==57 || roleId.value==59 || roleId.value==63 || roleId.value==65 || roleId.value==67 || roleId.value==68 
				|| roleId.value==69 || roleId.value==74)){
			if(roleId.value!=42){
				document.getElementById("mutilpleBuckets").style.display="block";
				/*if(roleId.value==58 || roleId.value==60){
					document.getElementById("mutilpleBuckets").style.display="none";
				}*/
			}
			if(roleId.value==34 || roleId.value==4 || roleId.value==33 || roleId.value==38 || roleId.value==39 || roleId.value==40  || roleId.value==41  
					|| roleId.value==48 || roleId.value==58 || roleId.value==60 || roleId.value==63 || roleId.value==65 || roleId.value==68 || roleId.value==69 
					|| roleId.value==74){
				document.getElementById("mutilpleDivisions").style.display="block";
			}
			else{
				document.getElementById("mutilpleDivisions").style.display="none";
			}
			if(roleId.value!=33 && roleId.value!=65){
				if(!ismultizoneuser)
				loadBranches();
			}
			else{
				
				/*document.getElementById("branchMultiDiv").style.display="none";
				document.getElementById("branchDiv").style.display="none";*/
				document.getElementById("mutilplelocLocation").style.display="none";
				document.getElementById("priLocDiv").style.display="none";
				document.getElementById("catchmentDiv").style.display="none";
				document.getElementById("districtDiv").style.display="none";
				document.getElementById("subDistrictDiv").style.display="none";
				document.getElementById("pincodeDiv").style.display="none";
				document.getElementById("localityDiv").style.display="none";
			}
		}
		else{
			/*document.getElementById("branchMultiDiv").style.display="none";
			document.getElementById("branchDiv").style.display="none";*/
			document.getElementById("mutilpleBuckets").style.display="none";
			document.getElementById("mutilpleDivisions").style.display="none";
			document.getElementById("mutilplelocLocation").style.display="none";
            if(roleId.value==64){
            	document.getElementById("mutilpleBuckets").style.display="block";
			}
			if(!ismultizoneuser)
			loadBranches();	
		}
		
		if(roleId!=null && roleId.value!="" && roleId.value != 1 && roleId.value != 2 && roleId.value != 33 && roleId.value != 46 && roleId.value != 52 && roleId.value != 60 && roleId.value != 61 && roleId.value != 62 && roleId.value!=65 && roleId.value!=66 && roleId.value!=73){
			if(roleId.value==7 ||  roleId.value==5){
				document.getElementById("zoneSingleDiv").style.display="block";
				document.getElementById("zoneMultiDiv").style.display="none";
				document.getElementById("branchMultiDiv").style.display="none";
				document.getElementById("branchDiv").style.display="block";
				document.getElementById("regionMultiDiv").style.display="none";
			}else{
				document.getElementById("zoneSingleDiv").style.display="none";
				document.getElementById("zoneMultiDiv").style.display="block";
				document.getElementById("branchMultiDiv").style.display="block";
				document.getElementById("branchDiv").style.display="none";
				if(roleId.value == 70 || roleId.value == 71 || roleId.value == 72){
					  resetCheckBoxByName("zoneCode");
					  document.getElementById("regionMultiDiv").style.display="none";
					  document.getElementById("branchMultiDiv").style.display="none";
				}
			}
		}else{
			document.getElementById("zoneSingleDiv").style.display="none";
			document.getElementById("zoneMultiDiv").style.display="none";
			document.getElementById("branchMultiDiv").style.display="none";
			document.getElementById("branchDiv").style.display="none";
			document.getElementById("regionMultiDiv").style.display="none";
		}
	}
	else if(userRole=="TL F&F" || userRole=="Regional F&F" || userRole=="Zonal F&F" || userRole=="National F&F" ){
		
		if(roleId!=null && roleId.value!="" && ( roleId.value==49 || roleId.value==50 ||  roleId.value==51 || roleId.value==35 || roleId.value==36 || roleId.value==37  || roleId.value==67 )){
			document.getElementById("mutilpleBuckets").style.display="block";
			document.getElementById("zoneSingleDiv").style.display="none";
			document.getElementById("zoneMultiDiv").style.display="block";
			document.getElementById("branchMultiDiv").style.display="block";
			document.getElementById("branchDiv").style.display="none";
			document.getElementById("priLocDiv").style.display="none";
		}
		else
		{
			document.getElementById("zoneSingleDiv").style.display="none";
			document.getElementById("zoneMultiDiv").style.display="none";
			document.getElementById("branchMultiDiv").style.display="none";
			document.getElementById("branchDiv").style.display="none";
		}
		if(roleId!=null && roleId.value!="" && ( roleId.value==38 )){
			document.getElementById("mutilpleBuckets").style.display="block";
			document.getElementById("zoneMultiDiv").style.display="block";
			document.getElementById("branchMultiDiv").style.display="block";
			document.getElementById("mutilpleDivisions").style.display="block";
		}
		
		if(roleId!=null && roleId.value!="" && ( roleId.value==7 )){
			document.getElementById("zoneSingleDiv").style.display="block";
			document.getElementById("branchDiv").style.display="block";
			document.getElementById("zoneCode").value = '';
			document.getElementById("branchCode").value = '';
		}
		document.getElementById("priLocDiv").style.display="none";
		document.getElementById("catchmentDiv").style.display="none";
		document.getElementById("districtDiv").style.display="none";
		document.getElementById("subDistrictDiv").style.display="none";
		document.getElementById("pincodeDiv").style.display="none";
		document.getElementById("localityDiv").style.display="none";
		
	}
	else{
		if(roleId!=null && roleId.value!="" && (roleId.value==33 || roleId.value==52 || roleId.value==65)){
			document.getElementById("mutilpleBuckets").style.display="block";
			document.getElementById("mutilpleDivisions").style.display="block";
			/*document.getElementById("zoneMultiDiv").style.display="none";
			document.getElementById("zoneSingleDiv").style.display="none";*/
		}
		else if(roleId!=null && roleId.value!="" && (roleId.value==13 ||roleId.value==46 || roleId.value==12 ||  roleId.value==9 ||roleId.value==61 || roleId.value==62 || roleId.value==66 || roleId.value==73)){
			/*document.getElementById("zoneMultiDiv").style.display="none";
			document.getElementById("zoneSingleDiv").style.display="none";*/
			document.getElementById("mutilpleBuckets").style.display="none";
			document.getElementById("mutilpleDivisions").style.display="none";
		}else if(roleId!=null && roleId.value==60){
			document.getElementById("mutilpleDivisions").style.display="block";
		}
		else if(roleId!=null && roleId.value!="" && (roleId.value==3 || roleId.value==47 || roleId.value==8 || roleId.value==10 || roleId.value==51 || roleId.value==59 || roleId.value==64)){
			var zoneCode = document.getElementById("zoneCode").value;
			if(zoneCode!=null)
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
			}
			
			
			
			
			mygrid3.clearAll();
			mygrid3.parse(myData,"jsarray");
			if(roleId.value==3 || roleId.value==51 || roleId.value==64){
				document.getElementById("mutilpleBuckets").style.display="block";
				document.getElementById("mutilpleDivisions").style.display="block";
			}else if(roleId!=null && roleId.value==59){
				document.getElementById("mutilpleDivisions").style.display="block";
			}
		}
		else{
			document.getElementById('zoneCode').getElementsByTagName('option')[0].selected = 'selected';
			document.getElementById("zoneMultiDiv").style.display="block";
			document.getElementById("zoneSingleDiv").style.display="none";
			if(roleId!=null && roleId.value!="" && (roleId.value==4  || roleId.value==48|| roleId.value==34 || roleId.value==38 || roleId.value==39 || roleId.value==40  || roleId.value==41  || roleId.value==50 || roleId.value==63 || roleId.value==68 || roleId.value==69 || roleId.value==74)){
				document.getElementById("mutilpleBuckets").style.display="block";
				document.getElementById("mutilpleDivisions").style.display="block";
			}
			else if(roleId!=null && roleId.value!="" && (roleId.value==16 || roleId.value==23 || roleId.value==26 || roleId.value==27 || roleId.value==28 || roleId.value==29 || roleId.value==30 || roleId.value==31 || roleId.value==35 || roleId.value==36 || roleId.value==37 || roleId.value==45 || roleId.value==49 || roleId.value==67)){
				document.getElementById("mutilpleBuckets").style.display="block";
			}else if(roleId!=null && roleId.value==58){
				document.getElementById("mutilpleDivisions").style.display="block";
			}
		}
		if(roleId.selectedIndex==0){
			document.getElementById("zoneSingleDiv").style.display="none";
		}
		if(roleId!=null && roleId.value!="" && roleId.value != 1 && roleId.value != 2 && roleId.value != 9 && roleId.value != 12 
				&& roleId.value != 13  && roleId.value != 33 && roleId.value != 46 && roleId.value != 52 && roleId.value != 53 
				&& roleId.value != 60 && roleId.value != 61 && roleId.value!=62 && roleId.value!=65 && roleId.value!=66 && roleId.value!=73){
			if(roleId.value==7 || roleId.value==5){
				document.getElementById("zoneSingleDiv").style.display="block";
				document.getElementById("zoneMultiDiv").style.display="none";
				document.getElementById("branchMultiDiv").style.display="none";
				document.getElementById("branchDiv").style.display="block";
				document.getElementById("regionMultiDiv").style.display="none";
			}else{
				document.getElementById("zoneSingleDiv").style.display="none";
				document.getElementById("zoneMultiDiv").style.display="block";
				document.getElementById("branchMultiDiv").style.display="block";
				document.getElementById("branchDiv").style.display="none";
				if(roleId.value == 70 || roleId.value == 71 || roleId.value == 72){
				  resetCheckBoxByName("zoneCode");
				  document.getElementById("regionMultiDiv").style.display="none";
				  document.getElementById("branchMultiDiv").style.display="none";
				}
			}
		}else{
			document.getElementById("zoneSingleDiv").style.display="none";
			document.getElementById("zoneMultiDiv").style.display="none";
			document.getElementById("branchMultiDiv").style.display="none";
			document.getElementById("branchDiv").style.display="none";
			document.getElementById("regionMultiDiv").style.display="none";
		}
		if(roleId!=null && roleId.value!="" && (roleId.value==57 || roleId.value==58 || roleId.value==59 || roleId.value==60)){
			document.getElementById("mutilpleBuckets").style.display="block";
		}
		if(roleId!=null && roleId.value!="" && (roleId.value == 70 || roleId.value == 71 || roleId.value == 72)){
			if(formMode == 'NEW'){
			  document.getElementById("branchMultiDiv").style.display="none";
			  document.getElementById("branchDiv").style.display="none";
		    }
		}
		document.getElementById("mutilplelocLocation").style.display="none";
//		document.getElementById("locDiv").style.display="none";
		document.getElementById("priLocDiv").style.display="none";
		document.getElementById("catchmentDiv").style.display="none";
		document.getElementById("districtDiv").style.display="none";
		document.getElementById("subDistrictDiv").style.display="none";
		document.getElementById("pincodeDiv").style.display="none";
		document.getElementById("localityDiv").style.display="none";
	}
	
	if(roleId!=null && (roleId.value=='49' || roleId.value=='50' || roleId.value=='51' || roleId.value=='52')){
		document.getElementById("mutilpleDivisions").style.display="none";
	}
}
// on zone change
function loadBranches(){
	
	var roleId=document.getElementById("roleId");
	var zoneCodeId=document.getElementById("zoneCode");
	resetCommonCheckBox();
	if(userRole!=null && userRole!="" && (userRole=="Zonal Administrator" || userRole=="Zonal Accountant Admin")){
		var zoneCode=userZone;
		if(ismultizoneuser){
			zoneCode = document.getElementById("zoneCode").value;
		}
		/*if(roleId!=null && roleId.value!="" && (roleId.value==5 || roleId.value==7 || roleId.value==30 || roleId.value==34)){
				document.getElementById("branchMultiDiv").style.display="none";
				document.getElementById("branchDiv").style.display="block";
				DWRUtil.getBranchesByZone(zoneCode,branchCallback);
		}
		else if(roleId!=null && roleId.value!="" && (roleId.value==3 || roleId.value==4 || roleId.value==48 || roleId.value==11 || roleId.value==14|| roleId.value==35 || roleId.value==38 || roleId.value==16 || roleId.value==23 || roleId.value==26 || roleId.value==27 || roleId.value==28 || roleId.value==29 || roleId.value==31 || roleId.value==36 || roleId.value==37 || roleId.value==42 || roleId.value==45 || roleId.value==39 || roleId.value==40  || roleId.value==41 )){
			
			document.getElementById("branchMultiDiv").style.display="block";
			document.getElementById("branchDiv").style.display="none";
			DWRUtil.getBranchesByZone(zoneCode,branchGridCallback);
		}*/
		
		if(roleId!=null && roleId.value!="" && roleId.value != 1 && roleId.value != 2  && roleId.value != 9  && roleId.value != 12  && roleId.value != 13 && roleId.value != 33 && roleId.value != 46){
			
			if(roleId.value==7 || roleId.value==5){
				
				document.getElementById("branchMultiDiv").style.display="none";
				document.getElementById("branchDiv").style.display="block";
				DWRUtil.getBranchesByZone(zoneCode,branchCallback);
			}else{
				
				document.getElementById("branchMultiDiv").style.display="block";
				document.getElementById("branchDiv").style.display="none";
				DWRUtil.getBranchesByZone(zoneCode,branchGridCallback);
			}
		}else{
			document.getElementById("branchMultiDiv").style.display="none";
			document.getElementById("branchDiv").style.display="none";
		}
	}else if(userRole=="Branch Administrator" || userRole=="BM 0-90" || userRole=="TM 0-90" ||  userRole=="SCM 0-90" ||  userRole=="RBM 0-90"  || userRole=="RH"){
		if(roleId!=null && roleId.value!="" && (roleId.value==35 || roleId.value==27 || roleId.value==28))
			{
			var div = document.getElementById("multiBranch");
			if(div!=null){
			document.getElementById("multiBranch").style.display="block";
			}
			    document.getElementById("branchMultiDiv").style.display="block";
			    document.getElementById("branchDiv").style.display="none";	
			 
			    
			    loadUserBranches();
			}else{
				document.getElementById("branchMultiDiv").style.display="none";
				document.getElementById("branchDiv").style.display="block";	
				var zoneCode=document.getElementById("zoneCode").value;
				if(roleId.value==7){
					DWRUtil.getBranchesByZone(zoneCode,branchCallback);
				}
			}
	}
	else{
		var zoneCode=document.getElementById("zoneCode").value;
		if(roleId!=null && roleId.value!="" && (roleId.value==5 || roleId.value==7 || roleId.value==30 || roleId.value==34 )){
			if(zoneCodeId.selectedIndex==0)
			{
				document.getElementById("branchMultiDiv").style.display="none";
				document.getElementById("branchDiv").style.display="none";
				
			}
			else
			{
				document.getElementById("branchMultiDiv").style.display="none";
				document.getElementById("branchDiv").style.display="block";
				DWRUtil.getBranchesByZone(zoneCode,branchCallback);
				
			}
		}
		else if(roleId!=null && roleId.value!="" && (roleId.value==3  || roleId.value==35|| roleId.value==38 || roleId.value==4|| roleId.value==48 || roleId.value==11 || roleId.value==14 || roleId.value==16 || roleId.value==23 || roleId.value==26 || roleId.value==27 || roleId.value==28 || roleId.value==29 || roleId.value==31 || roleId.value==36 || roleId.value==37 || roleId.value==42 || roleId.value==45|| roleId.value==39 || roleId.value==40  || roleId.value==41  || roleId.value==49    || roleId.value==50  || roleId.value==51  || roleId.value==52 || roleId.value==67 || roleId.value==68 || roleId.value==69)){
			if(zoneCodeId.selectedIndex==0)
			{
				document.getElementById("branchMultiDiv").style.display="none";
				document.getElementById("branchDiv").style.display="none";
				
			}
			else
			{
			
			document.getElementById("branchMultiDiv").style.display="block";
			document.getElementById("branchDiv").style.display="none";
			DWRUtil.getBranchesByZone(zoneCode,branchGridCallback);
			}
		}
	}
		
	
	document.getElementById("mutilplelocLocation").style.display="none";
	document.getElementById("priLocDiv").style.display="none";
	document.getElementById("catchmentDiv").style.display="none";
	document.getElementById("districtDiv").style.display="none";
	document.getElementById("subDistrictDiv").style.display="none";
	document.getElementById("pincodeDiv").style.display="none";
	document.getElementById("localityDiv").style.display="none";
	loadLocations();
	
}

function loadUserBranches(){
	mygrid4.clearAll();
	mygrid4.parse(userbranchFormulti,"jsarray");
}
function doSelectZone(zone_id){
	var roleId=document.getElementById("roleId");
	var elements = document.getElementsByName("zoneCode");
	
	var zones="";
	var len = elements.length;	
	
	for(var i=0;i<len;i++){
			if(elements[i].checked){
				if(elements[i].value!=null && elements[i].value!='')
					zones = zones + elements[i].value+',';	
			}
		}
		if(roleId.value!=7 && roleId.value!=1 && roleId.value!=2  && roleId.value!=9  && roleId.value!=12  
				&& roleId.value!=13 && roleId.value!=46 && roleId.value!=5){
			if(roleId.value == 70 || roleId.value == 71 || roleId.value == 72){
				if(zones != ""){
				  document.getElementById("regionMultiDiv").style.display="block";
				}else{
				  resetCommonCheckBox();
				  document.getElementById("regionMultiDiv").style.display="none";
				  document.getElementById("branchMultiDiv").style.display="none";		
				}
				DWRUtil.getRegionsByMultipleZones(zones,regionGridCallback);
			}else{
			   document.getElementById("branchMultiDiv").style.display="block";			
			   DWRUtil.getBranchesByMultipleZones(zones,branchGridCallback);
			}
		}else{
			document.getElementById("branchMultiDiv").style.display="none";
		}
	
}
function branchCallback(data)
{
	if(data!=null)
	{
		var branches = document.getElementById("branchCode");
		var len = data.length;
		branches.options.length = 0;
		branches.options[0]= new Option("Select Branch","");
		for(var i=0;i<len;i++)
		{
			branches.options[branches.options.length]= new Option(data[i].substr(data[i].indexOf("$")+1),data[i].substr(0,data[i].indexOf("$")));
		}
	}
}
function branchGridCallback(data)
{   
	if(data!=null)
	{	
		// Get all the branches at the instance and filter only the checked ones
		var branch_div = document.getElementsByName("branchCode");
		var no_of_branches = branch_div.length;
		var checked_branches = new Array();
		for(var i=0;i<no_of_branches;i++){
			if(branch_div[i].checked){
				if(branch_div[i].value!=null && branch_div[i].value!=''){
						checked_branches.push(branch_div[i].value.trim());
				}
			}
		}
		// check the branches, if they are already checked.
		var len = data.length;
		var myData = new Array();
		var j=0;
		for(var i=0;i<len;i++){
				myData[j]=new Array();
				var valid_branch_code = data[i].substr(0,data[i].indexOf("$"));
				if (checked_branches.indexOf(valid_branch_code) > -1) {
					myData[j][0]='<INPUT TYPE="checkbox" NAME="branchCode" onclick="doSelectBranch(this)" id="branchCode" value="'+data[i].substr(0,data[i].indexOf("$"))+'" checked>';
				} else {
					myData[j][0]='<INPUT TYPE="checkbox" NAME="branchCode" onclick="doSelectBranch(this)" id="branchCode" value="'+data[i].substr(0,data[i].indexOf("$"))+'">';
				}
				myData[j][1]=data[i].substr(data[i].indexOf("$")+1);
				j++;
		}
		mygrid4.clearAll();
		mygrid4.parse(myData,"jsarray");
	}
}

function loadlocfrommultiBranch(branches){
	var roleId=document.getElementById("roleId");
	document.getElementById("priLocDiv").style.display="none";
	document.getElementById("mutilplelocLocation").style.display="none";
	document.getElementById("catchmentDiv").style.display="none";
	document.getElementById("districtDiv").style.display="none";
	document.getElementById("subDistrictDiv").style.display="none";
	document.getElementById("pincodeDiv").style.display="none";
	document.getElementById("localityDiv").style.display="none";
	resetCommonCheckBox();
	DWRUtil.getLocationsByBranch(branches,locationCallback);
}

function loadlocfrommultiBranchTC(branches){
	var roleId=document.getElementById("roleId");
	document.getElementById("priLocDiv").style.display="none";
	document.getElementById("mutilplelocLocation").style.display="none";
	document.getElementById("catchmentDiv").style.display="none";
	document.getElementById("districtDiv").style.display="none";
	document.getElementById("subDistrictDiv").style.display="none";
	document.getElementById("pincodeDiv").style.display="none";
	document.getElementById("localityDiv").style.display="none";
	//resetCommonCheckBox();
	DWRUtil.getLocationsByBranch(branches,locationCallback);
}

var locationData;
function locationCallback(data)
{
	if(data!=null)
	{
		locationData = data;
		var roleId=document.getElementById("roleId");
		if(roleId!=null && roleId.value!="" && (roleId.value==5 || roleId.value==7 || roleId.value==30 || roleId.value==35|| roleId.value==55))
		{
			document.getElementById("priLocDiv").style.display="block";
		}

		var locations = document.getElementById("primaryLocCode");
		var len = data.length;
		locations.options.length = 0;
		locations.options[0]= new Option("Select Location","");
		for(var i=0;i<len;i++)
		{
			locations.options[locations.options.length]= new Option(data[i].substr(data[i].indexOf("$")+1),data[i].substr(0,data[i].indexOf("$")));
		}
	}
}
function multipleLocationsCallback(data)
{
	var roleId = document.getElementById("roleId");
	if(roleId.value==54)
		document.getElementById("priLocDiv").style.display="block";
	if(data!=null)
	{	
		var locations = document.getElementById("primaryLocCode");
		document.getElementById("mutilplelocLocation").style.display="block";
		if(roleId.value==54)
			document.getElementById("span_text").innerHTML="Deposit To Locations";
		else
			document.getElementById("span_text").innerHTML="Locations";
		var len = data.length;
		var j=0;
		var myData = new Array();
		for(var i=0;i<len;i++)
		{
			if(locations!=data[i].substr(0,data[i].indexOf("$")))
			{
				myData[j]=new Array();
				myData[j][0]='<INPUT TYPE="checkbox" NAME="locCode" id="locCode" value="'+data[i].substr(0,data[i].indexOf("$"))+'">';
				myData[j][1]=data[i].substr(data[i].indexOf("$")+1);
				j++;
			}
		}
		mygrid5.clearAll();
		mygrid5.parse(myData,"jsarray");
	}
}
//primary location change
function loadDepositLocations()
{
	var selectedPrimaryLoc = document.getElementById("primaryLocCode").value;
	var roleId=document.getElementById("roleId");
	if(locationData!=null)
	{
		
		if(roleId!=null && roleId.value!="" && (roleId.value==5 || roleId.value==6))
		{
			var locations = document.getElementById("primaryLocCode");
			if(locations.selectedIndex==0)
			{
				document.getElementById("mutilplelocLocation").style.display="none";
				
				
			}
			else
			{
			document.getElementById("mutilplelocLocation").style.display="block";
			document.getElementById("span_text").innerHTML="Deposit To Locations"
			var len = locationData.length;
			var myData = new Array();
			var j=0;
			for(var i=0;i<len;i++)
			{
				if(selectedPrimaryLoc!=locationData[i].substr(0,locationData[i].indexOf("$")))
				{
					myData[j]=new Array();
					myData[j][0]='<INPUT TYPE="checkbox" NAME="locCode" id="locCode" value="'+locationData[i].substr(0,locationData[i].indexOf("$"))+'">';
					myData[j][1]=locationData[i].substr(locationData[i].indexOf("$")+1);
					j++;
				}
			}
			mygrid5.clearAll();
			mygrid5.parse(myData,"jsarray");
			}
		}
		else if(roleId!=null && roleId.value!="" && roleId.value==7)
		{
			var locations = document.getElementById("primaryLocCode");
			if(locations.selectedIndex==0)
			{
				document.getElementById("catchmentDiv").style.display="none";
				document.getElementById("districtDiv").style.display="none";
				document.getElementById("subDistrictDiv").style.display="none";
				document.getElementById("pincodeDiv").style.display="none";
				document.getElementById("localityDiv").style.display="none";
			}
			else
			{	
				loadCatchementAreas();
				loadDistricts();
			}
		}

	}
	else if(selectedPrimaryLoc!=null && selectedPrimaryLoc!="" && roleId!=null && roleId.value!="" && roleId.value==7)
		{
		loadCatchementAreas();
		loadDistricts();
		}
}
function loadCatchementAreas()
{	
	var roleId=document.getElementById("roleId");
	if(roleId!=null && roleId.value!="" && roleId.value==7)
	{
		var locCode = document.getElementById("primaryLocCode").value;
		DWRUtil.getCatchmentAreasByLocation(locCode,caCallback);
	}
}
function caCallback(data)
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
			myData[i][0]='<INPUT TYPE="checkbox" NAME="caCode" id="caCode" value="'+data[i].substr(0,data[i].indexOf("$"))+'">';
			myData[i][1]=data[i].substr(data[i].indexOf("$")+1);
		}
		mygrid2.clearAll();
		mygrid2.parse(myData,"jsarray");

	}
}
function loadDistricts()
{	
	document.getElementById("subDistrictDiv").style.display="none";
	document.getElementById("pincodeDiv").style.display="none";
	document.getElementById("localityDiv").style.display="none";
	document.getElementById("districtDiv").style.display="none";
 	var roleId=document.getElementById("roleId");
	if(roleId!=null && roleId.value!="" && roleId.value==7)
	{	
		var locCode = document.getElementById("primaryLocCode").value;
		DWRUtil.getMultipleDistrictsByLocation(locCode,districtCallback);
	}
}

function districtCallback(data)
{
	 document.getElementById("subDistrictDiv").style.display="none";
	document.getElementById("pincodeDiv").style.display="none";
	document.getElementById("localityDiv").style.display="none";

 	document.getElementById("districtDiv").style.display="block";
	document.getElementById("district").checked=false;
	if(data!=null)
	{
 		document.getElementById("districtDiv").style.display="block";
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

	}
}
function doSelectBranch(){
	var roleId=document.getElementById("roleId");
	var elements = document.getElementsByName("branchCode");
	var branches="";
	//resetCommonCheckBox();
	loadLocations();
	var len = elements.length;
		for(var i=0;i<len;i++)
		{
			if(elements[i].checked){
				if(elements[i].value!=null && elements[i].value!=''){
					branches=branches + elements[i].value+',';	
					
				}
					
			}
		}
		
	if(roleId.value==35 || roleId.value==55){
		if(branches=="" || branches==null){
			document.getElementById("priLocDiv").style.display="none";
		}else{
			document.getElementById("priLocDiv").style.display="block";
			loadlocfrommultiBranch(branches);
		}
		
	}
	else if(branches=="" || branches==null){
		document.getElementById("mutilplelocLocation").style.display="none";
	}
	else if(roleId.value==4|| roleId.value==48 || roleId.value==39 ||roleId.value==42 || roleId.value==40  || roleId.value==41 || roleId.value==58 || roleId.value==63){
			DWRUtil.getLocationsByMultipleBranchs(branches,multipleLocationsCallback);
		}
	else if(roleId.value==54)
	{
		DWRUtil.getLocationsByMultipleBranchs(branches,multipleLocationsCallback);
		document.getElementById("priLocDiv").style.display="block";
		loadlocfrommultiBranch(branches);
	}
	
}

//on branch change
function loadLocations()
{	
	
	var roleId=document.getElementById("roleId");
	document.getElementById("priLocDiv").style.display="none";
	document.getElementById("mutilplelocLocation").style.display="none";
	document.getElementById("catchmentDiv").style.display="none";
	document.getElementById("districtDiv").style.display="none";
	document.getElementById("subDistrictDiv").style.display="none";
	document.getElementById("pincodeDiv").style.display="none";
	document.getElementById("localityDiv").style.display="none";
	var branchCodeId=document.getElementById("branchCode");
	if(branchCodeId.selectedIndex==0)
	{
		document.getElementById("priLocDiv").style.display="none";
		document.getElementById("mutilplelocLocation").style.display="none";
		
		
	}
	else
	{
		if(roleId!=null && roleId.value!="" && (roleId.value==5 || roleId.value==7 || roleId.value==30 || roleId.value==35))
		{
			var branchCode = document.getElementById("branchCode").value;
			
				DWRUtil.getLocationsByBranch(branchCode,locationCallback);
		
		}
		else if(roleId!=null && roleId.value!="" && (roleId.value==34)){
		
				var branchCode = document.getElementById("branchCode").value;
				DWRUtil.getLocationsByBranch(branchCode,multipleLocationsCallback);
	
		}
	}
}
function doSave(){
	
	try{
	var fORMSUBMITFLAG = false;
	var roleId=document.getElementById("roleId");
	var caCodeId=document.getElementById("caCode");
	var userStatId=document.getElementById("userStatusId");
	var branchCodeId=document.getElementById("branchCode");
	var primaryLocCode=document.getElementById("primaryLocCode");
	var locCodeId=document.getElementById("locCode");
	var zoneCodeId=document.getElementById("zoneCode");
	var districtId	= document.getElementById("dataObject.districtCode");
	var subDistrictId=document.getElementById("dataObject.subDistrictCode");
	var pincodeId=document.getElementById("dataObject.pincode");
	var localityCodeId=document.getElementById("dataObject.localityCode");
	
	if(roleId.selectedIndex!=0){
		if(userRole=="Branch Administrator"|| userRole=="RH" || userRole=="TM 0-90" || userRole=="SCM 0-90"  || userRole=="RBM 0-90"){
			if(roleId!=null && roleId.value!="" && (roleId.value==42 || roleId.value==34 || roleId.value==38 || roleId.value==40)){
				if(checkCheckBoxs("locCode")){
					alert("Location is mandatory");
					fORMSUBMITFLAG=false;
		 			return false;
		 		}
				else if(checkCheckBoxs("bucketCode")){
					alert("Module Type is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
				else if(checkCheckBoxs("divCode")){
					alert("Division is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
			}
			else if(roleId!=null && roleId.value!="" && (roleId.value==16 || roleId.value==23 || roleId.value==26 || roleId.value==27 || roleId.value==28 || roleId.value==29 || roleId.value==30 || roleId.value==31 || roleId.value==35 || roleId.value==36 || roleId.value==37  || roleId.value==45 || roleId.value==67)){
				if(checkCheckBoxs("bucketCode")){
					alert("Module Type is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
				if(ismultiuser && roleId.value==35){
					if(checkCheckBoxs("branchCode")){
					alert("Branch Code mandatory");
					fORMSUBMITFLAG=false;
					return false;
					}
				}
				// 
				if(checkCheckBoxs("branchCode")){
					alert("Territory is mandatory");
					FORMSUBMITFLAG=false;
					return false;
				}
				//
			}
			else if(roleId!=null && roleId.value!="" && (roleId.value==7)){
				if(zoneCodeId.selectedIndex==0){
					zoneCodeId.style.backgroundColor='#FFD9D9';
					zoneCodeId.focus();
					fORMSUBMITFLAG=false;
					return false;
					
		 		}
				if(branchCodeId.selectedIndex==0){
					branchCodeId.style.backgroundColor='#FFD9D9';
					branchCodeId.focus();
					fORMSUBMITFLAG=false;
					return false;
		 		}
				if(primaryLocCode)
				{
					if(primaryLocCode.selectedIndex==0 ||primaryLocCode.selectedIndex==-1)
					{
					primaryLocCode.style.backgroundColor='#FFD9D9';
					primaryLocCode.focus();
					fORMSUBMITFLAG=false;
					return false;
					}
				}
				if(checkCheckBoxs("caCode")){
		 			caCodeId.style.backgroundColor='#FFD9D9';
		 			caCodeId.focus();
		 			fORMSUBMITFLAG=false;
		 			return false;
		 			}
				if(checkCheckBoxs("dataObject.districtCode")){
	 				districtId.style.backgroundColor='#FFD9D9';
	 				districtId.focus();
	 				fORMSUBMITFLAG=false;
	 				return false;
	 			}
				if(checkCheckBoxs("dataObject.subDistrictCode"))
				{
					subDistrictId.style.backgroundColor='#FFD9D9';
					subDistrictId.focus();
					fORMSUBMITFLAG=false;
					return false;
					
				}
				if(checkCheckBoxs("dataObject.pincode"))
				{
							pincodeId.style.backgroundColor='#FFD9D9';
						pincodeId.focus();
						fORMSUBMITFLAG=false;
						return false;
					
				}
				if(checkCheckBoxs("dataObject.localityCode"))
					{
					localityCodeId.style.backgroundColor='#FFD9D9';
					localityCodeId.focus();
					fORMSUBMITFLAG=false;
					return false;
					}
			}
			else if((roleId!=null && roleId.value!="") && (roleId.value==63)){
				if(checkCheckBoxs("zoneCode")){
					alert("Zone is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
				else if(checkCheckBoxs("branchCode")){
					alert("Territory is mandatory");
					FORMCONFIRMFLAG=false;
					return false;
				}
				else if(checkCheckBoxs("divCode")){
					alert("Division is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
				else if(checkCheckBoxs("bucketCode")){
					alert("Module Type is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
			}
		}
		else if(userRole=="POC Support" || userRole=="HO Administrator" || userRole=="Zonal Administrator" || userRole=="Zonal Accountant Admin" || userRole=="Super Administrator" || userRole=="National Head"){
			if(roleId!=null && roleId.value!="" && (roleId.value==3 || roleId.value==4 || roleId.value==48|| roleId.value==34 || roleId.value==38 || roleId.value==39 || roleId.value==40  || roleId.value==41 || roleId.value==68 || roleId.value==69 || roleId.value==74)){
				
				if(checkCheckBoxs("branchCode")){
					alert("Territory is mandatory");
					FORMCONFIRMFLAG=false;
					return false;
				}
				else if(checkCheckBoxs("divCode")){
					alert("Division is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
				else if(checkCheckBoxs("bucketCode")){
					alert("Module Type is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
				
				
			}
			if(roleId!=null && roleId.value!="" && (roleId.value==16 || roleId.value==23 || roleId.value==26 || roleId.value==27 || roleId.value==28 || roleId.value==29 || roleId.value==30 || roleId.value==31 || roleId.value==35 || roleId.value==36 || roleId.value==37 || roleId.value==45 || roleId.value==49 || roleId.value==50 || roleId.value==51  || roleId.value==52 || roleId.value==67)){
				if(checkCheckBoxs("bucketCode")){
					alert("Module Type is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
			}
			if(roleId!=null && roleId.value!="" && (roleId.value==8 || roleId.value==10 || roleId.value==3 || roleId.value==47 || roleId.value==51) && userRole!="HO Administrator" && userRole!="Super Administrator" && userRole!="Zonal Administrator" && userRole!="POC Support"){
				if(checkCheckBoxs("zoneCode")){
					alert("Zone is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
			}
			if(roleId!=null && roleId.value!="" && userRole!="HO Administrator" && userRole!="Super Administrator" && userRole!="Zonal Administrator" && userRole!="Zonal Accountant Admin" && userRole!="POC Support" && (roleId.value==4 || roleId.value==5 || roleId.value==7 || roleId.value==11 || roleId.value==14 || roleId.value==16 || roleId.value==23 || roleId.value==26 || roleId.value==27 || roleId.value==28 || roleId.value==29 || roleId.value==30 || roleId.value==31 || roleId.value==34 || roleId.value==35 || roleId.value==36 || roleId.value==37 || roleId.value==38 || roleId.value==39 || roleId.value==40  || roleId.value==41 || roleId.value==42 || roleId.value==45 ||  roleId.value==48  || roleId.value==49 || roleId.value==50 || roleId.value==67)){
				if(zoneCodeId)
				{
					if(zoneCodeId.selectedIndex==0 ||zoneCodeId.selectedIndex==-1)
					{
						zoneCodeId.style.backgroundColor='#FFD9D9';
						zoneCodeId.focus();
						fORMSUBMITFLAG=false;
						return false;		
					}
				}	
			}

			if(roleId!=null && roleId.value!="" && (roleId.value==4 || roleId.value==54 || roleId.value==48 || roleId.value==3 || roleId.value==11 || roleId.value==14 || roleId.value==35 || roleId.value==16 || roleId.value==23 || roleId.value==26 || roleId.value==27 || roleId.value==28 || roleId.value==29 || roleId.value==31 || roleId.value==36 || roleId.value==37 || roleId.value==38 || roleId.value==39 || roleId.value==40  || roleId.value==41 || roleId.value==42 || roleId.value==45 || roleId.value==49  || roleId.value==50 || roleId.value==51 || roleId.value==67 || roleId.value==68 || roleId.value==69)){
				if(checkCheckBoxs("branchCode")){
					alert("Territory is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
			}
			
			if(roleId!=null && roleId.value!="" && (roleId.value==5 || roleId.value==7 || roleId.value==30 || roleId.value==34)){
				if(branchCodeId)
				{
					if(branchCodeId.selectedIndex==0 ||branchCodeId.selectedIndex==-1)
					{				
						branchCodeId.style.backgroundColor='#FFD9D9';
						branchCodeId.focus();
						fORMSUBMITFLAG=false;
						return false;
					}
				}
			}
			if(roleId!=null && roleId.value!="" && (roleId.value==5 || roleId.value==7 || roleId.value==30 || roleId.value==35)){
				if(primaryLocCode)
				{
					if(primaryLocCode.selectedIndex==0 ||primaryLocCode.selectedIndex==-1)
					{
					primaryLocCode.style.backgroundColor='#FFD9D9';
					primaryLocCode.focus();
					fORMSUBMITFLAG=false;
					return false;
					}
				}
			}
			if(roleId!=null && roleId.value!="" && (roleId.value==34|| roleId.value==38 || roleId.value==42 || roleId.value==68 || roleId.value==69)){
				if(checkCheckBoxs("locCode")){
					alert("Location is mandatory");
					fORMSUBMITFLAG=false;
		 			return false;
		 		}
			}
			if(roleId.value==7)
			{	
				
				if(checkCheckBoxs("caCode")){
		 			caCodeId.style.backgroundColor='#FFD9D9';
		 			caCodeId.focus();
		 			fORMSUBMITFLAG=false;
		 			return false;
		 			}
				if(checkCheckBoxs("dataObject.districtCode")){
	 				districtId.style.backgroundColor='#FFD9D9';
	 				districtId.focus();
	 				fORMSUBMITFLAG=false;
	 				return false;
	 			}	
				
  				if(checkCheckBoxs("dataObject.subDistrictCode"))
				{
					subDistrictId.style.backgroundColor='#FFD9D9';
					subDistrictId.focus();
					fORMSUBMITFLAG=false;
					return false;
					
				}
  				if(checkCheckBoxs("dataObject.pincode"))
				{
							pincodeId.style.backgroundColor='#FFD9D9';
						pincodeId.focus();
						fORMSUBMITFLAG=false;
						return false;
					
				}
				if(checkCheckBoxs("dataObject.localityCode"))
					{
					localityCodeId.style.backgroundColor='#FFD9D9';
					localityCodeId.focus();
					fORMSUBMITFLAG=false;
					return false;
					}
			}
			if((roleId != null) && (roleId.value==56 || roleId.value==55 || roleId.value==57 || roleId.value==58 || roleId.value==59 || roleId.value==60)){
				if((checkCheckBoxs("zoneCode")) && (roleId.value==56 || roleId.value==55 || roleId.value==57 || roleId.value==58 || roleId.value==59)){
					alert("Zone is mandatory");
					FORMCONFIRMFLAG=false;
					return false;
				}
				if((checkCheckBoxs("branchCode")) && (roleId.value==56 || roleId.value==55 || roleId.value==57 || roleId.value==58 || roleId.value==59)){
					alert("Territory is mandatory");
					FORMCONFIRMFLAG=false;
					return false;
				}
				if(roleId.value==55 && primaryLocCode)
				{
					if(primaryLocCode.selectedIndex==0 ||primaryLocCode.selectedIndex==-1)
					{
					  primaryLocCode.style.backgroundColor='#FFD9D9';
					  primaryLocCode.focus();
					  fORMSUBMITFLAG=false;
					  return false;
					}
				}
				if((roleId.value==58) && (checkCheckBoxs("locCode"))){
					alert("Location is mandatory");
					fORMSUBMITFLAG=false;
		 			return false;
		 		}
				if((checkCheckBoxs("divCode")) && ((roleId.value==58 || roleId.value==59 || roleId.value==60) && (userRole=="HO Administrator"))){
					alert("Division is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
				if((checkCheckBoxs("divCode")) && ((roleId.value==58 || roleId.value==60) && (userRole=="POC Support"))){
					alert("Division is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
				if((checkCheckBoxs("bucketCode")) && (roleId.value==57 || roleId.value==58 || roleId.value==59 || roleId.value==60)){
					alert("Module Type is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
				
			}
			if((roleId!=null && roleId.value!="")&&(roleId.value==63 || roleId.value==64 || roleId.value==65)){
				
					if((checkCheckBoxs("zoneCode")) && (roleId.value!=65)){
						alert("Zone is mandatory");
						fORMSUBMITFLAG=false;
						return false;
					}
					if(checkCheckBoxs("branchCode") && (roleId.value!=65)){
						alert("Territory is mandatory");
						FORMCONFIRMFLAG=false;
						return false;
					}
					if((checkCheckBoxs("locCode"))&&(roleId.value==63)){
						alert("Location is mandatory");
						fORMSUBMITFLAG=false;
			 			return false;
			 		}
					if((checkCheckBoxs("divCode")) && ((userRole=="POC Support") && (roleId.value!=64)) ){
						alert("Division is mandatory");
						fORMSUBMITFLAG=false;
						return false;
					}else{
						if((checkCheckBoxs("divCode")) && (userRole=="HO Administrator" || userRole=="Zonal Administrator" || userRole=="National Head")){
							alert("Division is mandatory");
							fORMSUBMITFLAG=false;
							return false;
						}
					}
					if(checkCheckBoxs("bucketCode")){
						alert("Module Type is mandatory");
						fORMSUBMITFLAG=false;
						return false;
					}
			}
			if((roleId!=null && roleId.value!="")&&(roleId.value==70 || roleId.value==71 || roleId.value==72)){
				if(checkCheckBoxs("zoneCode")){
					alert("Zone is mandatory");
					fORMSUBMITFLAG=false;
					return false;		
			     }
				if(checkCheckBoxs("regionCode")){
					alert("Region is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
				if(checkCheckBoxs("branchCode")){
					alert("Territory is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
				
			}
			
		}
		if(userRole=="TL F&F" || userRole=="Regional F&F" || userRole=="Zonal F&F" || userRole=="National F&F" ){
			if(roleId!=null && roleId.value!="" && ( roleId.value==49 || roleId.value==50 ||  roleId.value==51 || roleId.value==35  || roleId.value==36 || roleId.value==37 || roleId.value==38  || roleId.value==67)){
				if(checkCheckBoxs("zoneCode")){
						alert("Zone is mandatory");
						fORMSUBMITFLAG=false;
						return false;		
				}
				
				if(checkCheckBoxs("branchCode")){
					alert("Territory is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
				
				if(roleId.value==38 && checkCheckBoxs("divCode")){
					alert("Division is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
				if(roleId.value==35 && primaryLocCode){
					if(primaryLocCode.selectedIndex==0 ||primaryLocCode.selectedIndex==-1)
					{
						primaryLocCode.style.backgroundColor='#FFD9D9';
						primaryLocCode.focus();
						fORMSUBMITFLAG=false;
						return false;
					}
				}
				if(checkCheckBoxs("bucketCode")){
					alert("Module Type is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
				
			}
			
			if(roleId.value==7)
			{	
				if(zoneCodeId)
				{
					if(zoneCodeId.selectedIndex==0 ||zoneCodeId.selectedIndex==-1)
					{
						zoneCodeId.style.backgroundColor='#FFD9D9';
						zoneCodeId.focus();
						fORMSUBMITFLAG=false;
						return false;		
					}
				}	
				
				if(branchCodeId)
				{
					if(branchCodeId.selectedIndex==0 ||branchCodeId.selectedIndex==-1)
					{				
						branchCodeId.style.backgroundColor='#FFD9D9';
						branchCodeId.focus();
						fORMSUBMITFLAG=false;
						return false;
					}
				}
				
				if(primaryLocCode)
				{
					if(primaryLocCode.selectedIndex==0 ||primaryLocCode.selectedIndex==-1)
					{
					primaryLocCode.style.backgroundColor='#FFD9D9';
					primaryLocCode.focus();
					fORMSUBMITFLAG=false;
					return false;
					}
				}
				
				if(checkCheckBoxs("caCode")){
		 			caCodeId.style.backgroundColor='#FFD9D9';
		 			caCodeId.focus();
		 			fORMSUBMITFLAG=false;
		 			return false;
		 			}
				if(checkCheckBoxs("dataObject.districtCode")){
	 				districtId.style.backgroundColor='#FFD9D9';
	 				districtId.focus();
	 				fORMSUBMITFLAG=false;
	 				return false;
	 			}	
				
  				if(checkCheckBoxs("dataObject.subDistrictCode"))
				{
					subDistrictId.style.backgroundColor='#FFD9D9';
					subDistrictId.focus();
					fORMSUBMITFLAG=false;
					return false;
					
				}
  				if(checkCheckBoxs("dataObject.pincode"))
				{
					pincodeId.style.backgroundColor='#FFD9D9';
					pincodeId.focus();
					fORMSUBMITFLAG=false;
					return false;
					
				}
				if(checkCheckBoxs("dataObject.localityCode"))
				{
					localityCodeId.style.backgroundColor='#FFD9D9';
					localityCodeId.focus();
					fORMSUBMITFLAG=false;
					return false;
				}
			}
			
		}
		if(userStatId && userRole=="Zonal Administrator" && userRole=="POC Support")
		{
			if(userStatId.selectedIndex!=0)
			{					
				fORMSUBMITFLAG=true;
			}
			else
			{
				userStatId.style.backgroundColor='#FFD9D9';
				userStatId.focus();
				fORMSUBMITFLAG=false;
				return false;
			}
		}
		else{
			fORMSUBMITFLAG=true;
		}
		
	}
	else{
		roleId.style.backgroundColor='#FFD9D9';
		roleId.focus();
		fORMSUBMITFLAG=false;
		return false;
	}
	if(fORMSUBMITFLAG!=false){
		document.forms[0].formAction.value="SAVE";
		document.forms[0].method="POST";
		document.forms[0].action="userMaintenanceFormController.htm";
		document.forms[0].submit();
	}
  }catch(ex){
	  //console.error("outer", ex.message);
	  alert(ex.message);
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
function doSelectAllCatchments(obj)
{
	var elements = document.getElementsByName("caCode");
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
	var elements = document.getElementsByName("locCode");
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
function doSelectAllBucket(obj)
{
	var elements = document.getElementsByName("bucketCode");
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
	var elements = document.getElementsByName("divCode");
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
	var roleId=document.getElementById("roleId");
	var zones="";
	var elements = document.getElementsByName("zoneCode");
	var len = elements.length;
	if(obj.checked)
	{
		for(var i=1;i<len;i++)
		{
			elements[i].checked = true;
			if(elements[i].value!=null && elements[i].value!='')
				zones=zones + elements[i].value+',';
		}
		if(roleId.value!=null && (roleId.value!=7 && roleId.value!=1 && roleId.value!=2 && roleId.value!=46 && roleId.value!=5 && roleId.value!=12 && roleId.value!=13 && roleId.value!=9 && roleId.value!=33 && roleId.value!=52)){
			if(roleId.value == 70 || roleId.value == 71 || roleId.value == 72){
				document.getElementById("regionMultiDiv").style.display="block";
				DWRUtil.getRegionsByMultipleZones(zones,regionGridCallback);
			}else{
				document.getElementById("branchMultiDiv").style.display="block";			
				DWRUtil.getBranchesByMultipleZones(zones,branchGridCallback);
			}		
		}
	}
	else
	{
		for(var i=0;i<len;i++)
		{
			elements[i].checked = false;
		}
		resetCheckBoxByName("branchCode");
		mygrid4.clearAll();
		resetCommonCheckBox();
		if(document.getElementById("priLocDiv")!=null)
			document.getElementById("priLocDiv").style.display="none";
		document.getElementById("mutilplelocLocation").style.display="none";
		if(roleId.value == 70 || roleId.value == 71 || roleId.value == 72){
			mygrid12.clearAll();
			document.getElementById("regionMultiDiv").style.display="none";
			document.getElementById("branchMultiDiv").style.display="none";	
			
		}

	}
}
function doSelectAllBranches(obj)
{
	var roleId=document.getElementById("roleId");
	var elements = document.getElementsByName("branchCode");
	var branches="";
	var len = elements.length;
	if(checkCheckBoxs("zoneCode"))
		len = elements.length-1;
	if(obj.checked)
	{ 
		for(var i=1;i<len;i++)
		{
			elements[i].checked = true;
			
			if(elements[i].value!=null && elements[i].value!='')
			branches=branches + elements[i].value+',';
			
		}
		
		if(roleId.value==35 || roleId.value==55){
			if(branches=="" || branches==null){
				document.getElementById("priLocDiv").style.display="none";
			}else{
				
				document.getElementById("priLocDiv").style.display="block";
				loadlocfrommultiBranchTC(branches);
			}
			
		}
		else if(branches=="" || branches==null){
			document.getElementById("mutilplelocLocation").style.display="none";
		}
		else if(roleId.value==4|| roleId.value==48 || roleId.value==39 ||roleId.value==42 || roleId.value==40  || roleId.value==41 || roleId.value==58 || roleId.value==63){
				DWRUtil.getLocationsByMultipleBranchs(branches,multipleLocationsCallback);
			}
		else if(roleId.value==54)
		{
			DWRUtil.getLocationsByMultipleBranchs(branches,multipleLocationsCallback);
			document.getElementById("priLocDiv").style.display="block";
			loadlocfrommultiBranchTC(branches);
		}

	}
	
	else
	{
		for(var i=0;i<len;i++)
		{
			elements[i].checked = false;
		}
		mygrid5.clearAll();
		if(document.getElementById("priLocDiv")!=null)
			document.getElementById("priLocDiv").style.display="none";
		document.getElementById("mutilplelocLocation").style.display="none";
	}
}
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
			myData[i][0]='<INPUT TYPE="checkbox" NAME="dataObject.subDistrictCode" id="dataObject.subDistrictCode" onclick="doSelectSubDistrict(this)" value="' +subdistrict+ '" >  ';
			myData[i][1]=data[i].substr(data[i].indexOf("$")+1);
		}
		
		mygrid8.clearAll();//clear subdistricts
		mygrid8.parse(myData,"jsarray");
	}
}
function doSelectAllSubDistricts(obj)
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
		mygrid10.clearAll();//clear locality codes
		DWRUtil.getPincodeByMultipleSubDistricts(subDistricts,multiPincodeCallback);

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
			myData[i][0]='<INPUT TYPE="checkbox" NAME="dataObject.pincode" id="dataObject.pincode" onclick="doSelectPincodes(this)" value="'+data[i].substr(0,data[i].indexOf("-"))+'"  >';
			myData[i][1]=data[i].substr(data[i].indexOf(",")+1);
		}
		mygrid9.clearAll(); //clear pins
		mygrid9.parse(myData,"jsarray");
	}
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
	 		mygrid10.clearAll();
	 		DWRUtil.getLocalityByMultiplePincodes(pincodes,multiLocalityCallback);
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
	var FORMCONFIRMFLAG=false;
	var roleId=document.getElementById("roleId");
	var caCodeId=document.getElementById("caCode");
	var userStatId=document.getElementById("userStatusId");
	var branchCodeId=document.getElementById("branchCode");
	var primaryLocCode=document.getElementById("primaryLocCode");
	var locCodeId=document.getElementById("locCode");
	var zoneCodeId=document.getElementById("zoneCode");
	
	var chkResetPwd		= document.getElementById("chkResetPwd");
 	var txtpassword		= document.getElementById("password");
	var districtId	= document.getElementById("dataObject.districtCode");
	var subDistrictId=document.getElementById("dataObject.subDistrictCode");
	var pincodeId=document.getElementById("dataObject.pincode");
	var localityCodeId=document.getElementById("dataObject.localityCode");
	
	if(roleId.selectedIndex!=0){
		if(userRole=="Branch Administrator" || userRole=="RH"|| userRole=="TM 0-90" ||userRole=="SCM 0-90" || userRole=="RBM 0-90"){
			if(roleId!=null && roleId.value!="" && (roleId.value==34 || roleId.value==35 || roleId.value==38 || roleId.value==40 || roleId.value==42)){
				if(checkCheckBoxs("locCode") && roleId.value!=38 && roleId.value!=35){
					alert("Location is mandatory");
					FORMCONFIRMFLAG=false;
		 			return false;
		 		}
				if(checkCheckBoxs("branchCode")){
					alert("Territory is mandatory");
					FORMCONFIRMFLAG=false;
		 			return false;
		 		}
				else if(checkCheckBoxs("bucketCode")){
					alert("Module Type is mandatory");
					FORMCONFIRMFLAG=false;
					return false;
				}
				else if(checkCheckBoxs("divCode") && (roleId.value!=35)){
					alert("Division is mandatory");
					FORMCONFIRMFLAG=false;
					return false;
				}
			}
			else if(roleId!=null && roleId.value!="" && (roleId.value==16 || roleId.value==23 || roleId.value==26 || roleId.value==27 || roleId.value==28 || roleId.value==29 || roleId.value==30 || roleId.value==31 || roleId.value==35 || roleId.value==36 || roleId.value==37 ||  roleId.value==45  || roleId.value==67)){
				if(checkCheckBoxs("zoneCode")){
					alert("Zone is mandatory");
					FORMCONFIRMFLAG=false;
		 			return false;
		 		}
				if(checkCheckBoxs("branchCode")){
					alert("Territory is mandatory");
					FORMCONFIRMFLAG=false;
		 			return false;
		 		}
				if(checkCheckBoxs("bucketCode")){
					alert("Module Type is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}	
				
				
			}
			else if(roleId!=null && roleId.value!="" && (roleId.value==7)){
				if(zoneCodeId.selectedIndex==0){
					zoneCodeId.style.backgroundColor='#FFD9D9';
					zoneCodeId.focus();
					fORMSUBMITFLAG=false;
					return false;
					
		 		}
				if(branchCodeId.selectedIndex==0){
					branchCodeId.style.backgroundColor='#FFD9D9';
					branchCodeId.focus();
					fORMSUBMITFLAG=false;
					return false;
		 		}
				if(primaryLocCode)
				{
					if(primaryLocCode.selectedIndex==0 ||primaryLocCode.selectedIndex==-1)
					{
					primaryLocCode.style.backgroundColor='#FFD9D9';
					primaryLocCode.focus();
					fORMSUBMITFLAG=false;
					return false;
					}
				}
				if(checkCheckBoxs("caCode")){
		 			caCodeId.style.backgroundColor='#FFD9D9';
		 			caCodeId.focus();
		 			fORMSUBMITFLAG=false;
		 			return false;
		 			}
				if(checkCheckBoxs("dataObject.districtCode")){
	 				districtId.style.backgroundColor='#FFD9D9';
	 				districtId.focus();
	 				fORMSUBMITFLAG=false;
	 				return false;
	 			}
				if(checkCheckBoxs("dataObject.subDistrictCode"))
				{
					subDistrictId.style.backgroundColor='#FFD9D9';
					subDistrictId.focus();
					fORMSUBMITFLAG=false;
					return false;
					
				}
				if(checkCheckBoxs("dataObject.pincode"))
				{
							pincodeId.style.backgroundColor='#FFD9D9';
						pincodeId.focus();
						fORMSUBMITFLAG=false;
						return false;
					
				}
				if(checkCheckBoxs("dataObject.localityCode"))
					{
					localityCodeId.style.backgroundColor='#FFD9D9';
					localityCodeId.focus();
					fORMSUBMITFLAG=false;
					return false;
					}
			}
			else if((roleId!=null && roleId.value!="") && (roleId.value==63)){
				if(checkCheckBoxs("zoneCode")){
					alert("Zone is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
				else if(checkCheckBoxs("branchCode")){
					alert("Territory is mandatory");
					FORMCONFIRMFLAG=false;
					return false;
				}
				else if(checkCheckBoxs("divCode")){
					alert("Division is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
				else if(checkCheckBoxs("bucketCode")){
					alert("Module Type is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
			}
		}
		else if(userRole=="Super Administrator" || userRole=="HO Administrator" || userRole=="Zonal Administrator" || userRole=="Zonal Accountant Admin" || userRole=="National Head" || userRole=="POC Support"){
			if(roleId!=null && roleId.value!="" && (roleId.value==33 || roleId.value==48 || roleId.value==3 || roleId.value==4 || roleId.value==34 || roleId.value==38 || roleId.value==39 || roleId.value==40  || roleId.value==41 ||roleId.value==68 || roleId.value==69 || roleId.value==74)){
				if((getValuesFromDropdown("branchCode")==null || getValuesFromDropdown("branchCode")=="") && roleId.value != 33 ){
					alert("Territory is mandatory");
					FORMCONFIRMFLAG=false;
					return false;
				}
				if(checkCheckBoxs("bucketCode")){
					alert("Module Type is mandatory");
					FORMCONFIRMFLAG=false;
					return false;
				}
				
				else if(checkCheckBoxs("divCode")){
					alert("Division is mandatory");
					return false;
				}
			}if(roleId!=null && roleId.value!="" && (roleId.value==37 || roleId.value==67)){
				if(getValuesFromDropdown("zoneCode")==null || getValuesFromDropdown("zoneCode")==""){
					alert("Zone is mandatory");
					FORMCONFIRMFLAG=false;
					return false;
				}
				if(getValuesFromDropdown("branchCode")==null || getValuesFromDropdown("branchCode")==""){
					alert("Territory is mandatory");
					FORMCONFIRMFLAG=false;
					return false;
				}
				if(checkCheckBoxs("bucketCode")){
					alert("Module Type is mandatory");
					FORMCONFIRMFLAG=false;
					return false;
				}
			}
			if(roleId!=null && roleId.value!="" && (roleId.value==16 || roleId.value==23 || roleId.value==26 || roleId.value==27 || roleId.value==28 || roleId.value==29 || roleId.value==30 || roleId.value==31 || roleId.value==35 || roleId.value==36 || roleId.value==37 || roleId.value==45 || roleId.value==49 || roleId.value==50 || roleId.value==51  || roleId.value==52 || roleId.value==67)){
				if(checkCheckBoxs("bucketCode")){
					alert("Module Type is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
			}
			if(roleId!=null && roleId.value!="" && userRole!="HO Administrator" && userRole!="Super Administrator" && userRole!="Zonal Administrator" && userRole!="POC Support"  && userRole!="Zonal Accountant Admin" && (roleId.value==8 || roleId.value==10 || roleId.value==3 || roleId.value==47 || roleId.value==51)){
				if(getValuesFromDropdown("zoneCode")==null || getValuesFromDropdown("zoneCode")==""){
					alert("Zone is mandatory");
					FORMCONFIRMFLAG=false;
					return false;
				}
			}
			if(roleId!=null && roleId.value!="" && userRole!="HO Administrator"  && userRole!="Super Administrator" && userRole!="Zonal Administrator" && userRole!="Zonal Accountant Admin" && userRole!="POC Support" && (roleId.value==4 || roleId.value==48 || roleId.value==5 || roleId.value==7 || roleId.value==11 || roleId.value==14 || roleId.value==16 || roleId.value==23 || roleId.value==26 || roleId.value==27 || roleId.value==28 || roleId.value==29 || roleId.value==31 || roleId.value==34 || roleId.value==35 || roleId.value==36 || roleId.value==37 || roleId.value==38 || roleId.value==39 || roleId.value==40  || roleId.value==41 || roleId.value==42 || roleId.value==45  || roleId.value==49 || roleId.value==50 || roleId.value==67)){
				if(zoneCodeId)
				{
					if(zoneCodeId.selectedIndex==0 ||zoneCodeId.selectedIndex==-1)
					{
						zoneCodeId.style.backgroundColor='#FFD9D9';
						zoneCodeId.focus();
						FORMCONFIRMFLAG=false;
						return false;		
					}
				}	
			}
			if(roleId!=null && roleId.value!="" && (roleId.value==4 || roleId.value==3 || roleId.value==54 || roleId.value==11 || roleId.value==14 || roleId.value==35|| roleId.value==48 || roleId.value==16 || roleId.value==23 || roleId.value==38 || roleId.value==26 || roleId.value==27 || roleId.value==28 || roleId.value==29 || roleId.value==31 || roleId.value==36 || roleId.value==37 || roleId.value==39 || roleId.value==40  || roleId.value==41 || roleId.value==42 || roleId.value==45 || roleId.value==49  || roleId.value==50 || roleId.value==51 || roleId.value==67)){
				if(getValuesFromDropdown("branchCode")==null || getValuesFromDropdown("branchCode")==""){
					alert("Territory is mandatory");
					FORMCONFIRMFLAG=false;
					return false;
				}
			}
			if(roleId!=null && roleId.value!="" && (roleId.value==5 || roleId.value==7 || roleId.value==30 || roleId.value==34)){
				if(branchCodeId)
				{
					if(branchCodeId.selectedIndex==0 ||branchCodeId.selectedIndex==-1)
					{				
						branchCodeId.style.backgroundColor='#FFD9D9';
						branchCodeId.focus();
						FORMCONFIRMFLAG=false;
						return false;
					}
				}
			}
			if(roleId!=null && roleId.value!="" && (roleId.value==5 || roleId.value==7 || roleId.value==30 || roleId.value==35)){
				if(primaryLocCode)
				{
					if(primaryLocCode.selectedIndex==0 ||primaryLocCode.selectedIndex==-1)
					{
					primaryLocCode.style.backgroundColor='#FFD9D9';
					primaryLocCode.focus();
					FORMCONFIRMFLAG=false;
					return false;
					}
				}
			}
			if(roleId!=null && roleId.value!="" && (roleId.value==34 || roleId.value==42)){
				if(checkCheckBoxs("locCode")){
					alert("Location is mandatory");
					FORMCONFIRMFLAG=false;
		 			return false;
		 		}
			}
			if(roleId.value==7)
			{	
				
				if(checkCheckBoxs("caCode")){
		 			caCodeId.style.backgroundColor='#FFD9D9';
		 			caCodeId.focus();
		 			FORMCONFIRMFLAG=false;
		 			return false;
		 			}
				if(checkCheckBoxs("dataObject.districtCode")){
	 				districtId.style.backgroundColor='#FFD9D9';
	 				districtId.focus();
	 				FORMCONFIRMFLAG=false;
	 				return false;
	 			}	
				
  				if(checkCheckBoxs("dataObject.subDistrictCode"))
				{
					subDistrictId.style.backgroundColor='#FFD9D9';
					subDistrictId.focus();
					FORMCONFIRMFLAG=false;
					return false;
					
				}
  				if(checkCheckBoxs("dataObject.pincode"))
				{
							pincodeId.style.backgroundColor='#FFD9D9';
						pincodeId.focus();
						FORMCONFIRMFLAG=false;
						return false;
					
				}
				if(checkCheckBoxs("dataObject.localityCode"))
					{
					localityCodeId.style.backgroundColor='#FFD9D9';
					localityCodeId.focus();
					FORMCONFIRMFLAG=false;
					return false;
					}
			}	
			if((roleId != null) && (roleId.value==56 || roleId.value==55 || roleId.value==57 || roleId.value==58 || roleId.value==59 || roleId.value==60)){
				if((checkCheckBoxs("zoneCode")) && (roleId.value==56 || roleId.value==55 || roleId.value==57 || roleId.value==58 || roleId.value==59)){
					alert("Zone is mandatory");
					FORMCONFIRMFLAG=false;
					return false;
				}
				if((checkCheckBoxs("branchCode")) && (roleId.value==56 || roleId.value==55 || roleId.value==57 || roleId.value==58 || roleId.value==59)){
					alert("Territory is mandatory");
					FORMCONFIRMFLAG=false;
					return false;
				}
				if(roleId.value==55 && primaryLocCode)
				{
					if(primaryLocCode.selectedIndex==0 ||primaryLocCode.selectedIndex==-1)
					{
					  primaryLocCode.style.backgroundColor='#FFD9D9';
					  primaryLocCode.focus();
					  fORMSUBMITFLAG=false;
					  return false;
					}
				}
				if((roleId.value==58) && (checkCheckBoxs("locCode"))){
					alert("Location is mandatory");
					fORMSUBMITFLAG=false;
		 			return false;
		 		}
				if((checkCheckBoxs("divCode")) && ((roleId.value==58 || roleId.value==59 || roleId.value==60) && (userRole=="HO Administrator"))){
					alert("Division is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
				if((checkCheckBoxs("divCode")) && ((roleId.value==60 || roleId.value==58 ) && (userRole=="POC Support"))){
					alert("Division is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
				if((checkCheckBoxs("bucketCode")) && (roleId.value==57 || roleId.value==58 || roleId.value==59 || roleId.value==60)){
					alert("Module Type is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
			}
			if((roleId!=null && roleId.value!="")&&(roleId.value==63 || roleId.value==64 || roleId.value==65)){
				
				if((checkCheckBoxs("zoneCode")) && (roleId.value!=65)){
					alert("Zone is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
				if(checkCheckBoxs("branchCode") && (roleId.value!=65)){
					alert("Territory is mandatory");
					FORMCONFIRMFLAG=false;
					return false;
				}
				if((checkCheckBoxs("locCode"))&&(roleId.value==63)){
					alert("Location is mandatory");
					fORMSUBMITFLAG=false;
		 			return false;
		 		}
				if((checkCheckBoxs("divCode")) && ((userRole=="POC Support") && (roleId.value!=64)) ){
					alert("Division is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}else{
					if((checkCheckBoxs("divCode")) && (userRole=="HO Administrator" || userRole=="Zonal Administrator" || userRole=="National Head")){
						alert("Division is mandatory");
						fORMSUBMITFLAG=false;
						return false;
					}
				}
				if(checkCheckBoxs("bucketCode")){
					alert("Module Type is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
		   }
		  if((roleId!=null && roleId.value!="")&&(roleId.value==70 || roleId.value==71 || roleId.value==72)){
				if(checkCheckBoxs("zoneCode")){
					alert("Zone is mandatory");
					fORMSUBMITFLAG=false;
					return false;		
			     }
				if(checkCheckBoxs("regionCode")){
					alert("Region is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
				if(checkCheckBoxs("branchCode")){
					alert("Territory is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
				
			}
			
		}
		else if(userRole=="TL F&F" || userRole=="Regional F&F" || userRole=="Zonal F&F" || userRole=="National F&F" ){
			if(roleId!=null && roleId.value!="" && ( roleId.value==49 || roleId.value==50 ||  roleId.value==51 || roleId.value==37 || roleId.value==38 || roleId.value==67)){
				if(getValuesFromDropdown("zoneCode")==null || getValuesFromDropdown("zoneCode")==""){
						alert("Zone is mandatory");
						fORMSUBMITFLAG=false;
						return false;		
				}
				
				if(getValuesFromDropdown("branchCode")==null || getValuesFromDropdown("branchCode")==""){
					alert("Territory is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
				if((checkCheckBoxs("divCode")) && roleId.value==38){
					alert("Division is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
				if(checkCheckBoxs("bucketCode")){
					alert("Module Type is mandatory");
					fORMSUBMITFLAG=false;
					return false;
				}
			}
			
			if(roleId!=null && roleId.value!="" && roleId.value==7)
			{	
				if(zoneCodeId)
				{
					if(zoneCodeId.selectedIndex==0 ||zoneCodeId.selectedIndex==-1)
					{
						zoneCodeId.style.backgroundColor='#FFD9D9';
						zoneCodeId.focus();
						FORMCONFIRMFLAG=false;
						return false;		
					}
				}
				
				if(branchCodeId)
				{
					if(branchCodeId.selectedIndex==0 ||branchCodeId.selectedIndex==-1)
					{				
						branchCodeId.style.backgroundColor='#FFD9D9';
						branchCodeId.focus();
						FORMCONFIRMFLAG=false;
						return false;
					}
				}
				
				if(primaryLocCode)
				{
					if(primaryLocCode.selectedIndex==0 ||primaryLocCode.selectedIndex==-1)
					{
					primaryLocCode.style.backgroundColor='#FFD9D9';
					primaryLocCode.focus();
					FORMCONFIRMFLAG=false;
					return false;
					}
				}
				
				if(checkCheckBoxs("caCode")){
		 			caCodeId.style.backgroundColor='#FFD9D9';
		 			caCodeId.focus();
		 			fORMSUBMITFLAG=false;
		 			return false;
		 			}
				if(checkCheckBoxs("dataObject.districtCode")){
	 				districtId.style.backgroundColor='#FFD9D9';
	 				districtId.focus();
	 				fORMSUBMITFLAG=false;
	 				return false;
	 			}	
				
  				if(checkCheckBoxs("dataObject.subDistrictCode"))
				{
					subDistrictId.style.backgroundColor='#FFD9D9';
					subDistrictId.focus();
					fORMSUBMITFLAG=false;
					return false;
					
				}
  				if(checkCheckBoxs("dataObject.pincode"))
				{
							pincodeId.style.backgroundColor='#FFD9D9';
						pincodeId.focus();
						fORMSUBMITFLAG=false;
						return false;
					
				}
				if(checkCheckBoxs("dataObject.localityCode"))
					{
					localityCodeId.style.backgroundColor='#FFD9D9';
					localityCodeId.focus();
					fORMSUBMITFLAG=false;
					return false;
					}
			}
			
		}
		if(chkResetPwd.checked)
 		{		
			var pattern = /^(?=.*?[a-z])(?=.*?[0-9])[a-zA-Z0-9]{6,}$/;
 			if(trim(txtpassword.value).length==0 || trim(txtpassword.value).length<6)
 			{
 				txtpassword.style.backgroundColor='#FFD9D9';
 				txtpassword.focus();
 				FORMCONFIRMFLAG=false;
 				return false;
 			} 			 
 			if(pattern.test(txtpassword.value)==false && roleId.value!=7){
 				alert("Password should contain alphanumerics only");
 				FORMCONFIRMFLAG=false;
 				return false;
 			}
 		}
		if(userStatId)
		{
			
			if(userStatId.selectedIndex!=0 && userStatId.value!=original_status)
			{		
				if(userStatId.value!=7 && userStatId.value!=6){
					FORMCONFIRMFLAG=true;
				}
				else{
					userStatId.style.backgroundColor='#FFD9D9';
					userStatId.focus();
					FORMCONFIRMFLAG=false;
					return false;
				}			
				
			}
			else if(userStatId.selectedIndex!=0 && userStatId.value==original_status){
				FORMCONFIRMFLAG=true;
				
			}
			else
			{
				userStatId.style.backgroundColor='#FFD9D9';
				userStatId.focus();
				FORMCONFIRMFLAG=false;
				return false;
			}
		}
		
		document.getElementById("zoneSelected").value = getValuesFromDropdown("zoneCode");
		
		document.getElementById("branchSelected").value = getValuesFromDropdown("branchCode");
		
			
	}
	else{
		roleId.style.backgroundColor='#FFD9D9';
		roleId.focus();
		FORMCONFIRMFLAG=false;
		return false;
	}
	if(FORMCONFIRMFLAG!=false){

		document.forms[0].formAction.value="CONFIRM";
		document.forms[0].method="POST";
		document.forms[0].action="userMaintenanceFormController.htm";
		document.forms[0].submit();
	}
}

function getValuesFromDropdown(id){
	var roleId=document.getElementById("roleId");
	if(roleId.value!=7 && roleId.value!=5){
		var elements = document.getElementsByName(id);
		if(elements!=null){
			var len = elements.length;
			var selectedValue = "";
			if(len>1){			
				for(var i=0;i<len;i++)
				{
					
					if(elements[i].checked){
						if(i!=0){
							selectedValue = selectedValue+",";
						}
						selectedValue = selectedValue+elements[i].value;
					}
				}
			}else{
				selectedValue = elements[0].value;
			}
			return selectedValue;
		}	
	}else{
		return document.getElementById(id).value;
	}
}
function onClickReset(){
	var chkResetPwd		= document.getElementById("chkResetPwd");
	var txtpassword		= document.getElementById("password");
	if(chkResetPwd.checked)
	{		
		if(trim(txtpassword.value).length==0 || trim(txtpassword.value).length<6)
		{
			txtpassword.style.backgroundColor='#FFD9D9';
			txtpassword.focus();
			return false;
		}
		else{
			location.reload();
		}
	}
	else
	location.reload();
}
function showPassword(chkElement)
{
	if(chkElement.checked)
		document.getElementById("passwordDiv").style.display="block";
	else
		document.getElementById("passwordDiv").style.display="none";
}
function regionGridCallback(data)
{ 
	if(data!=null)
	{	
		// Get all the regions at the instance and filter only the checked once
		var branch_div = document.getElementsByName("regionCode");
		var no_of_branches = branch_div.length;
		var checked_branches = new Array();
		for(var i=0;i<no_of_branches;i++){
			if(branch_div[i].checked){
				if(branch_div[i].value!=null && branch_div[i].value!=''){
						checked_branches.push(branch_div[i].value.trim());
				}
			}
		}
		// check the branches, if they are already checked.
		var len = data.length;
		var myData = new Array();
		var j=0;
		for(var i=0;i<len;i++){
				myData[j]=new Array();
				var valid_branch_code = data[i].substr(0,data[i].indexOf("$"));
				if (checked_branches.indexOf(valid_branch_code) > -1) {
					myData[j][0]='<INPUT TYPE="checkbox" NAME="regionCode" onclick="doSelectRegion(this)" id="regionCode" value="'+data[i].substr(0,data[i].indexOf("$"))+'" checked>';
				} else {
					myData[j][0]='<INPUT TYPE="checkbox" NAME="regionCode" onclick="doSelectRegion(this)" id="regionCode" value="'+data[i].substr(0,data[i].indexOf("$"))+'">';
				}
				myData[j][0]='<INPUT TYPE="checkbox" NAME="regionCode" onclick="doSelectRegion(this)" id="regionCode" value="'+data[i].substr(0,data[i].indexOf("$"))+'">';
				myData[j][1]=data[i].substr(data[i].indexOf("$")+1);
				j++;
		}
		mygrid12.clearAll();
		mygrid12.parse(myData,"jsarray");
	}
}	
function doSelectAllRegions(obj){
	var roleId=document.getElementById("roleId");
	var regions="";
	var elements = document.getElementsByName("regionCode");
	var len = elements.length;
	if(obj.checked)
	{
		for(var i=0;i<len;i++)
		{
			elements[i].checked = true;
			if(elements[i].value!=null && elements[i].value!='')
				regions=regions + elements[i].value+',';
		}
		if((roleId.value!=null) && (roleId.value == 70 || roleId.value == 71 || roleId.value == 72)){
					document.getElementById("branchMultiDiv").style.display="block";			
					DWRUtil.getBranchesByMultipleRegions(regions,branchGridCallback)
		}		
	}
	else{
		if((roleId.value!=null) && (roleId.value == 70 || roleId.value == 71 || roleId.value == 72)){
			 resetCheckBoxByName("regionCode");
			 // resetCommonCheckBox();
			 mygrid4.clearAll();
			 document.getElementById("branchMultiDiv").style.display="none";	
		}
	}
}
function doSelectRegion(obj){
	var roleId=document.getElementById("roleId");
    var regions="";
	var elements = document.getElementsByName("regionCode");
	var len = elements.length;
	for(var i=0;i<len;i++)
	{
		if(elements[i].checked){
			if(elements[i].value!=null && elements[i].value!='')
			  regions=regions + elements[i].value+',';
			}
	}
	if((roleId.value!=null) && (roleId.value == 70 || roleId.value == 71 || roleId.value == 72)){
		if(regions != ""){
			document.getElementById("branchMultiDiv").style.display="block";			
		}else{
		    document.getElementById("branchMultiDiv").style.display="none";
		}
	   DWRUtil.getBranchesByMultipleRegions(regions,branchGridCallback)
	}
}



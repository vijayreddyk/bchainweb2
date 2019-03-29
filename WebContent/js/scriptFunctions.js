/*******************************************************************************
 * Project MCMS, all source code and data files except images,
 * Copyright 2008-2015 Grit-Innovation Software Pvt. Ltd., India
 *
 * Permission is granted to Magma Fin Corp. to use and modify as they see fit.
 *******************************************************************************/


// Removes leading whitespaces
function LTrim(value) {	
	var re = /\s*((\S+\s*)*)/;
	return value.replace(re, "$1");	
}

// Removes ending whitespaces
function RTrim(value) {	
	var re = /((\s*\S+)*)\s*/;
	return value.replace(re, "$1");	
}

// Removes leading and ending whitespaces
function trim(value) {	
	return LTrim(RTrim(value));	
}

function showBackColor(Element)
{
	Element.style.border='1px solid #7F9DB9';
	if(Element.type=="text")
	{
		if(trim(Element.value)!='') Element.style.backgroundColor='#fff'; else Element.style.backgroundColor='#FFD9D9';
	}
	else if(Element.type=="select-one")
	{
		if(Element.selectedIndex!=0)		
			Element.style.backgroundColor='#FFF';
		else
			Element.style.backgroundColor='#FFD9D9';
	}
	else if(Element.type=="select-multiple")
	{		
		if(Element.selectedIndex!=0)		
		{
			Element.style.backgroundColor='#FFF';
		}
		else
			Element.style.backgroundColor='#FFD9D9';
	}
	
}
function enableTextBox(selIndex,txtId)
{
	if(selIndex>0)	
		  document.getElementById(txtId).disabled=false;	
	else
		document.getElementById(txtId).disabled=true;
}


var storeElemArr=new Array();
var noOfElements;
function storeValues()
{	
	noOfElements=document.forms[0].elements.length
	for(var i=0;i<noOfElements;i++)
		{
			if(document.forms[0].elements[i].type=="text")
			{
				storeElemArr[i]=document.forms[0].elements[i].value;			

			}
			if(document.forms[0].elements[i].type=="select-one")
			{
				storeElemArr[i]=document.forms[0].elements[i].selectedIndex;
			}
		}
}
function doResetForm()
{
	var elements = document.forms[0].elements;
	for(var i=0;i<elements.length;i++)
	{
		if(elements[i].type=="checkbox")
		{
			elements[i].checked=false;
		} 
	}
}
function doReset()
{
		
		for(var i=0;i<noOfElements;i++)
		{			
			if(document.forms[0].elements[i].type=="text")
			{
				document.forms[0].elements[i].value=storeElemArr[i];
			}
			if(document.forms[0].elements[i].type=="select-one")
			{
				document.forms[0].elements[i].selectedIndex=storeElemArr[i];
			}
		}
		displayLocation();

}
/*var storeElemArr=new Array();
var noOfElements;
function storeValues()
{
	alert("hi");
	noOfElements=document.forms[0].elements.length
	for(var i=0;i<noOfElements;i++)
		{
			if(document.forms[0].elements[i].type=="text")
			{
				storeElemArr[i]=document.forms[0].elements[i].value;			

			}
			if(document.forms[0].elements[i].type=="select-one")
			{
				storeElemArr[i]=document.forms[0].elements[i].selectedIndex;
			}
		}
}
function doReset()
{
		for(var i=0;i<noOfElements;i++)
		{			
			if(document.forms[0].elements[i].type=="text")
			{
				document.forms[0].elements[i].value=storeElemArr[i];
			}
			if(document.forms[0].elements[i].type=="select-one")
			{
				document.forms[0].elements[i].selectedIndex=storeElemArr[i];
			}
		}
}
*/
        
			


        $(function() {
        	
        	$.validator.addMethod("regex", function(value, element, regexpr) {          
        	    return regexpr.test(value);
        	}, "<br/> Password should contain alphanumerics only.");
        	

		//Create Allocation
			$("#frmCreateAllocation").validate({
                rules: {
                    'proposalAllocation.level1Code': {                        
                        required: true												
                    },
					//'proposalAllocation.level2Code': {                        
                      //  required: true												
                    //},
					//'proposalAllocation.level3Code': {                        
                      //  required: true												
                    //},
					//'proposalAllocation.level4Code': {                        
                      //  required: true												
                    //},
					'proposalAllocation.allocationMthYr': {                        
                        required: true												
                    }
                    
                }, messages: {
                    'proposalAllocation.level1Code':{ 
                        required: ""						
                    }, 
					 //'proposalAllocation.level2Code':{ 
                       // required: ""						
                    //}, 
					 //'proposalAllocation.level3Code':{ 
                       // required: ""						
                    //}, 
					 //'proposalAllocation.level4Code':{ 
                    //    required: ""						
                    //}, 
					 'proposalAllocation.allocationMthYr':{ 
                        required: ""						
                    } 
               }
            });

			//Transfer Allocation
			$("#frmTransferAllocation").validate({
                rules: {
                    'level1Code': {                        
                        required: true												
                    //},
					//'level2Code': {                        
                      //  required: true												
                    //},
					//'level3Code': {                        
                      //  required: true												
                    //},
					//'level4Code': {                        
                      //  required: true												
                    }
                    
                }, messages: {
                    'level1Code':{ 
                        required: ""						
                  //  }, 
					// 'level2Code':{ 
                      //  required: ""						
                    //}, 
					 //'level3Code':{ 
                       // required: ""						
                    //}, 
					 //'level4Code':{ 
                       // required: ""						
                    }					 
               }
            });

			

			//Edit terminal user validation
			$("#frmEditTerminalDetails").validate({
                rules: {
                    'dataObject.terminalId': {                        
                        required: true						
                    },
					'dataObject.intTerminalId': {                        
                        required: true						
                    },
					'dataObject.branchCode': {                        
                        required: true						
                    },
					'dataObject.terminalStatusId': {                        
                        required: true						
                    },
                    'dataObject.devType': {                        
                        required: true						
                    }
					
                    
                }, messages: {
					'dataObject.terminalId': {                        
                        required: ""						
                    },
					'dataObject.intTerminalId': {                        
                        required: ""						
                    },
					'dataObject.branchCode': {                        
                        required: ""						
                    },
                    'dataObject.terminalStatusId':{ 
                        required: "" 						
                    },
                    'dataObject.devType': {                        
                        required: ""						
                    }
			
               }
            });

		$("#frmMoveTerminal").validate({
                rules: {
                    'dataObject.branchCode': {                        
                        required: true						
                    },
					'zoneCode': {                        
                        required: true						
                    }
					
                    
                }, messages: {
					'dataObject.branchCode': {                        
                        required: ""						
                    },
					'zoneCode': {                        
                        required: ""						
                    }
               }
            });


			//CompanySelectList
			$("#frmCompanySelectList").validate({
                rules: {
                    'fundCompCode': {                        
                        required: true						
                    }                    
                }, messages: {
					'fundCompCode': {                        
                        required: ""						
                    }
               }
            });

			
			
			//Mobile No. update validation
			 $("#formmobileUpdate").validate({
                rules: {
                    'updatedMobNo': {                        
                        required: true,
						digits:true,
						maxlength:11,
						minlength:8
                    }                    
                    
                }, messages: {
                    'updatedMobNo':{ 
                        required: "", 
						digits:"<br/>Enter Numeric value only",
						maxlength:"<br/>Maximum length is 11",
						minlength:"<br/>Minimum length is 8"
                    }                    
               }
            });


			//CreateTerminalDetails
			$("#frmCreateTerminalDetails").validate({
                rules: {
                    'dataObject.terminalId': {                        
                        required: true,
						minlength:16
                    },					
					'dataObject.terminalSno': {                        
                        required: true						
                    },					
					'dataObject.branchCode': {                        
                        required: true						
                    },
					'dataObject.terminalStatusId': {                        
                        required: true						
                    },
					'dataObject.msisdn': {                        
                        required: true						
                    },
					'dataObject.simNo': {                        
                        required: true						
                    },
                    'dataObject.devType': {                        
                        required: true						
                    },
                    'dataObject.printMachineId': {                        
                    	minlength:9				
                    }
                    
                }, messages: {
                    'dataObject.terminalId':{ 
                        required: "" ,
						minlength:"<br/>Minimum length is 16"
                    },				
					'dataObject.terminalSno':{ 
                        required: "" 						
                    },				
					'dataObject.branchCode':{ 
                        required: "" 						
                    },
					'dataObject.terminalStatusId':{ 
                        required: "" 						
                    },
					'dataObject.msisdn': {                        
                        required: ""						
                    },
					'dataObject.simNo': {                        
                        required: ""						
                    },	
                    'dataObject.devType': {                        
                        required: ""						
                    },
                    'dataObject.printMachineId': {                        
                    	minlength:"<br/>Minimum length is 9"						
                    }
			
               }
            });


			//Manage Global settings
			$("#frmMngGlobalSettings").validate({
                rules: {
                    'dataObject.value': {                        
                        required: true						
                    }										
                    
                }, messages: {
                    'dataObject.value':{ 
                        required: "" 						
                    }									
			
               }
            });

			
			

			//Create terminal user validation
			/*$("#frmCreateTerminalUser").validate({
                rules: {
                    'userHasRole.roleId': {                        
                        required: true						
                    },
					'userStatusId': {                        
                        required: true						
                    },
					'caCode': {                        
                        required: true						
                    },
					
                    
                }, messages: {
                    'userHasRole.roleId':{ 
                        required: "" 						
                    },
					'userStatusId':{ 
                        required: "" 						
                    },
					'caCode':{ 
                        required: "" 						
                    },
					
			
               }
            });*/
			
			//cancel collection validation
			$("#formCancelCol").validate({
                rules: {
                    'collectionsSummary.cancelReqReason': {                        
                        required: true						
                    },
					'collectionsSummary.cancelVerReason': {                        
                        required: true						
                    },
					'collectionsSummary.cancelAppReason': {                        
                        required: true						
                    },
					'collectionsSummary.cancelRejReason': {                        
                        required: true						
                    }
					
                    
                }, messages: {
                    'collectionsSummary.cancelReqReason':{ 
                        required: " " 						
                    },
					'collectionsSummary.cancelVerReason': {                        
                        required: " "						
                    },
					'collectionsSummary.cancelAppReason': {                        
                        required: " "						
                    },
					'collectionsSummary.cancelRejReason': {                        
                        required: " "						
                    }
								
			
               }
            });

			
			$("#formCancelRepo").validate({
                rules: {
                    'dataObject.remarks': {                        
                        required: true						
                    }
					
                    
                }, messages: {
                    
					'dataObject.remarks': {                        
                        required: "*"						
                    }
								
			
               }
            });
			
			$("#formCancelWaiver").validate({
                rules: {
                    'dataObject.remarks': {                        
                        required: true						
                    }
					
                    
                }, messages: {
                    
					'dataObject.remarks': {                        
                        required: "*"						
                    }
								
			
               }
            });
			//Mobile update list validation
			/*$("#formMobile").validate({
                rules: {
                    'dataObject.criteria[prop.mobileNo].value': {
                        //minlength: 5,
                        digits: true,
						maxlength:11,
                    },				 
                    
                    
                }, messages: {
                    'dataObject.criteria[prop.mobileNo].value':{ 
                        digits: "Enter Numeric value only", 
						maxlength:"Maximum length is 11",
                        //minlength: "User name must be atleaet of 5 characters" 
                    },					                     
                    
               }
            });*/
			//Change Password validation
            $("#frmChngPwd").validate({
                rules: {
                    'currentPassword': {                        
                        required: true
                    },                    
                    'newPassword': {                        
                        required: true,
                        regex:/^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i,
                        minlength:6
					},                    
                    
                    'confirmPassword': {						
                        required: true,
                        regex:/^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i,
                        minlength:6,
						equalTo: "#newPassword"
                    }                    
                }, messages: {
                    'currentPassword':{ 
                        required: "" 						
                    },                  
                    'newPassword':{ 
                        required: "",
						minlength:"<br/>Minimum length is 6",
						maxlength:"<br/>maximum length is 12"
						
                    },                  
                    'confirmPassword':{ 
                        required: "", 
						minlength:"<br/>Minimum length is 6",
						maxlength:"<br/>maximum length is 12",
						equalTo:"<br/>New Password and Confirm Password should match"
                    }                  							
               }
            });



			jQuery.validator.addMethod("currency", function(value, element) { return this.optional(element) || /^(\d{1,20})(\.\d{1,2})?$/.test(value); }
, "Payment Amount must be in currency format xx.xx");

jQuery.validator.addMethod("lettersonly", function(value, element) {  return this.optional(element) || /^[a-z]+$/i.test(value);}
, "Letters only please"); 

			//payment collection breakup validation
			$("#formPayment").validate({
                rules: {
                    'collSummary.collectedAmt': {                        
                        required: true,
						maxlength:12,
						currency: true
						
                    },
                    'collSummary.collectionMode': {
                        required: true
                    },
                    'collSummary.chequeNo': {
                        minlength:5,
						currency: true
                    },
					'collDtl[0].collectedAmt': {                    
                        currency: true
                    },
					'collDtl[1].collectedAmt': {                    
                        currency: true
                    },
					'collDtl[2].collectedAmt': {                    
                        currency: true
                    },
				'collDtl[3].collectedAmt': {                    
                        currency: true
                    },
					'collDtl[4].collectedAmt': {                    
                        currency: true
                    },
				'collDtl[5].collectedAmt': {                    
                        currency: true
                    },
					'collDtl[6].collectedAmt': {                    
                        currency: true
                    },
					'collDtl[7].collectedAmt': {                    
                        currency: true
                    },
					'collDtl[8].collectedAmt': {                    
                        currency: true
                    },
					'collDtl[9].collectedAmt': {                    
                        currency: true
                    },
					'collDtl[10].collectedAmt': {                    
                        currency: true
                    },
					'collDtl[11].collectedAmt': {                    
                        currency: true
                    },
					'collDtl[12].collectedAmt': {                    
                        currency: true
                    },
					'collDtl[13].collectedAmt': {                    
                        currency: true
                    },
					'collDtl[14].collectedAmt': {                    
                        currency: true
                    },
					'collDtl[15].collectedAmt': {                    
                        currency: true
                    }	

                    
                }, messages: {
                    'collSummary.collectedAmt':{ 
                        required: "", 
						maxlength:"<br/>Maximum length is 9",
						currency: "<br/>Enter Numeric value only"
                    },
					'collSummary.collectionMode':{ 
                        required: "" 
                    },
                     'collSummary.chequeNo':{ 
                        currency: "<br/>Enter Numeric value only"
                    },   
					'collDtl[0].collectedAmt':{ 
                        currency: "<br/>Enter Numeric value only" 							
                    },
					'collDtl[1].collectedAmt':{ 
                       currency: "<br/>Enter Numeric value only" 							
                    },
					'collDtl[2].collectedAmt': {                    
                       currency: "<br/>Enter Numeric value only"
                    },
				'collDtl[3].collectedAmt': {                    
                       currency: "<br/>Enter Numeric value only"
                    },
					'collDtl[4].collectedAmt': {                    
                       currency: "<br/>Enter Numeric value only"
                    },
				'collDtl[5].collectedAmt': {                    
                       currency: "<br/>Enter Numeric value only"
                    },
					'collDtl[6].collectedAmt': {                    
                       currency: "<br/>Enter Numeric value only"
                    },
					'collDtl[7].collectedAmt': {                    
                       currency: "<br/>Enter Numeric value only"
                    },
				'collDtl[8].collectedAmt': {                    
                       currency: "<br/>Enter Numeric value only"
                    },       
				'collDtl[9].collectedAmt': {                    
                       currency: "<br/>Enter Numeric value only"
                    },  
			   'collDtl[10].collectedAmt': {                    
                       currency: "<br/>Enter Numeric value only"
                    },  
			   'collDtl[11].collectedAmt': {                    
                       currency: "<br/>Enter Numeric value only"
                    },  
			   'collDtl[12].collectedAmt': {                    
                       currency: "<br/>Enter Numeric value only"
                    },  
				'collDtl[13].collectedAmt': {                    
                       currency: "<br/>Enter Numeric value only"
                    },  
			   'collDtl[14].collectedAmt': {                    
                       currency: "<br/>Enter Numeric value only"
                    },  
			   'collDtl[15].collectedAmt': {                    
                       currency: "<br/>Enter Numeric value only"
                    }  
               }
            });

			//Third Party update edit validation

			$("#formThirdParty").validate({
                rules: {
                   		
					'thirdPartyUpdate.tpModeCode': {                        
                        required: true                       
                    } ,  
                    'thirdPartyUpdate.tpContNo': {  
                    required: true,
                    digits:true,
                    mobileNo:true,
					maxlength:11,
					minlength:10
                    },
					'thirdPartyUpdate.tpRelationCode': {                        
                        required: true					
                    } ,  			
					'thirdPartyUpdate.tpReasonCode': {                        
                        required: true						
                    } 
                }, messages: {
                    'thirdPartyUpdate.tpName':{ 
                        required: "",
						lettersonly: "<br/>Enter alphabets only"
                    }, 
                    'thirdPartyUpdate.tpContNo':{ 
                        required: "", 
						digits:"<br/>Enter Numeric value only",
						mobileNo:"<br/>Enter valid mobile number",
						maxlength:"<br/>Maximum length is 11",
						minlength:"<br/>Minimum length is 10"
                    },
					'thirdPartyUpdate.tpModeCode': {                        
                        required: ""						
                    }, 
					'thirdPartyUpdate.tpRelationCode': {                        
                        required: ""						
                    }, 
					'thirdPartyUpdate.tpReasonCode': {                        
                        required: ""						
                    }
               }
            });


			//terminal association validation
            $("#frmTermAssocEdit").validate({
                rules: {
                    'terminalUser.userid': {                        
                        required: true
                    },				
					 'terminalUser.maxOfflineTimeoutHrs': {
						digits: true
                    },				
					 'terminalUser.maxCashLimit': {
						digits: true
                    },				
					 'terminalUser.maxUnverifiedTimeoutDays': {
						digits: true
                    }                
                                       
                }, messages: {
                    'terminalUser.userid':{ 
                        required: "" 						
                    }               							
               }
            });

			//terminal association validation
            $("#frmEditUser").validate({
                rules: {
                    'password': {          
                    	minlength:6,
						maxlength:12
                    }                   
                                       
                }, messages: {
                    'password':{ 
                        maxlength:"<br/>Maximum length is 12",
						minlength:"<br/>Minimum length is 6"						
                    }                  							
               }
            });

			//terminal user validation
            $("#frmTermUserEdit").validate({
                rules: {
                    'password': {                        
                        currency: true,
						minlength:6,
						maxlength:12
                    }                   
                                       
                }, messages: {
                    'password':{ 
                       currency: "<br/>Enter Numeric value only",
					   maxlength:"<br/>Maximum length is 12",
					   minlength:"<br/>Minimum length is 6"	
                    }                  							
               }
            });


			//Unlist collection payment validation

            $("#formUnlistPayment").validate({
                rules: {
                    'collSummary.collectedAmt': {                        
                        required: true,
						maxlength:12,
						currency: true						
                    },				
					 'collSummary.chequeNo': {
                        minlength:5,
						currency: true
                    },
					'collSummary.compCode': {
                        required: true
                    },'collSummary.relation': {
                        required: true
                    },
					'collSummary.remarks': {
                        required: ""
                    },					
					'collSummary.partyName': {
                        required: true
                    },
                    'collSummary.collectionMode': {
                        required: true
                    },
					'collDtl[0].collectedAmt': {                    
                        currency: true
                    },
					'collDtl[1].collectedAmt': {                    
                        currency: true
                    },
					'collDtl[2].collectedAmt': {                    
                        currency: true
                    },
				'collDtl[3].collectedAmt': {                    
                        currency: true
                    },
					'collDtl[4].collectedAmt': {                    
                        currency: true
                    },
				'collDtl[5].collectedAmt': {                    
                        currency: true
                    },
					'collDtl[6].collectedAmt': {                    
                        currency: true
                    },
					'collDtl[7].collectedAmt': {                    
                        currency: true
                    },
					'collDtl[8].collectedAmt': {                    
                        currency: true
                    },
					'collDtl[9].collectedAmt': {                    
                        currency: true
                    },
					'collDtl[10].collectedAmt': {                    
                        currency: true
                    },
					'collDtl[11].collectedAmt': {                    
                        currency: true
                    },
					'collDtl[12].collectedAmt': {                    
                        currency: true
                    },
					'collDtl[13].collectedAmt': {                    
                        currency: true
                    },
					'collDtl[14].collectedAmt': {                    
                        currency: true
                    },
					'collDtl[15].collectedAmt': {                    
                        currency: true
                    }	

                    
                }, messages: {
                    'collSummary.collectedAmt':{ 
                        required: "", 
						maxlength:"<br/>Maximun length is 9",
						currency: "<br/>Enter Numeric value only"
                    },
					'collSummary.chequeNo':{ 
                        currency: "<br/>Enter Numeric value only"
                    },
					'collSummary.compCode': {
                        required: ""
                    },'collSummary.relation': {
                        required: ""
                    },
					'collSummary.remarks': {
                        required: ""
                    },
					'collSummary.proposalNo': {
                        required: ""
                    },
					'collSummary.partyName': {
                        required: ""
                    },					
                     'collSummary.collectionMode':{ 
                        required: "" 
                    },   
					'collDtl[0].collectedAmt':{ 
                        currency: "<br/>Enter Numeric value only" 						
                    },
					'collDtl[1].collectedAmt':{ 
                       currency: "<br/>Enter Numeric value only" 							
                    },
					'collDtl[2].collectedAmt': {                    
                       currency: "<br/>Enter Numeric value only"
                    },
				'collDtl[3].collectedAmt': {                    
                       currency: "<br/>Enter Numeric value only"
                    },
					'collDtl[4].collectedAmt': {                    
                       currency: "<br/>Enter Numeric value only"
                    },
				'collDtl[5].collectedAmt': {                    
                       currency: "<br/>Enter Numeric value only"
                    },
					'collDtl[6].collectedAmt': {                    
                       currency: "<br/>Enter Numeric value only"
                    },
					'collDtl[7].collectedAmt': {                    
                       currency: "<br/>Enter Numeric value only"
                    },
				'collDtl[8].collectedAmt': {                    
                       currency: "<br/>Enter Numeric value only"
                    },       
				'collDtl[9].collectedAmt': {                    
                       currency: "<br/>Enter Numeric value only"
                    },  
			   'collDtl[10].collectedAmt': {                    
                       currency: "<br/>Enter Numeric value only"
                    },  
			   'collDtl[11].collectedAmt': {                    
                       currency: "<br/>Enter Numeric value only"
                    },  
			   'collDtl[12].collectedAmt': {                    
                       currency: "<br/>Enter Numeric value only"
                    },  
				'collDtl[13].collectedAmt': {                    
                       currency: "<br/>Enter Numeric value only"
                    },  
			   'collDtl[14].collectedAmt': {                    
                       currency: "<br/>Enter Numeric value only"
                    },  
			   'collDtl[15].collectedAmt': {                    
                       currency: "<br/>Enter Numeric value only"
                    }  
               }
            });



        });

document.onkeydown = function(e) 
{
	if(!e) {
		e = window.event;
	}
	 var keyCode = getkey(e);
	if(keyCode == 8)
	{
	    var element = (typeof e.srcElement == 'undefined') ? e.target : e.srcElement;
		if((element.type!='text' && element.type!='textarea'  && element.type!='password') || element.readOnly){   
			   return false;
		}
		else
		{
			return true;
		}
	}
};		
function getkey(e)
{
	if (window.event)
	   return window.event.keyCode;
	else if (e)
	   return e.which;
	else
	   return null;
}
function disableBackButton()
{
	window.history.forward();
}
setTimeout("disableBackButton()", 0);
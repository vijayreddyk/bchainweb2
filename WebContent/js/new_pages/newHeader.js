
var switchUrl = "";
 	function doSwitchModule(switchURL){
 		switchUrl = switchURL;
 		DWRUtil.setMenuDetails(menuDetailsCallback); 		
 	}
 	function menuDetailsCallback(){
 		window.location.href = switchUrl;
 	}
 	function getBrowser()	{
 		if(navigator.userAgent.indexOf("Chrome") != -1)
 			return "chrome";
 		else if(navigator.userAgent.indexOf("Firefox") != -1)
 			return "firefox";
 		else
 			return "ie";
 	}
 	
 	function getIEVersion () { // toCheck which version of IE client is using
 		var myNav = navigator.userAgent.toLowerCase();
 		return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
 	}
 	function initiateSessionInvalidateVariable(){
 		console.log("Session variable initiated");
 		isLinkOrForm=false;
 	}
 	$(document).ready(function(){
		window.onunload=null;
		window.onbeforeunload=null;

		console.log("User Browser is "+getBrowser()+":::"+getIEVersion());
		setTimeout(initiateSessionInvalidateVariable,900);
		/* setInterval(function() {
			console.log("Resetting SessionInvalidate Variable from :"+isLinkOrForm+" to :"+!isLinkOrForm);
			if(isLinkOrForm==true){
				console.log("Resetting SessionInvalidate Variable from :"+isLinkOrForm+" to :"+!isLinkOrForm);
 				isLinkOrForm=false;
 			}
 		},5000); */
		 $("#initiating_url").val(window.location.href);

		 //Checking All Input Elements Change
		
		 $("input[type=button]").click(function(){
			 isLinkOrForm=true; 
		 });
		
		 $("a").click(function(){
	    	isLinkOrForm=true; 
	    });
	
		 $("div").click(function(){
			isLinkOrForm=true; 
		 });
	     $("img").click(function(){
	    	 isLinkOrForm=true; 
	     });
	     
	     $("select").change(function(){
	    	 isLinkOrForm=true;
	     });
	     
	     $("form").submit(function (e){
	    	 
	    	isLinkOrForm=true;
	     });
	     
	     if(getIEVersion() && getIEVersion() <= 10){
	    	document.attachEvent("keydown",checkWhichKeyPressed,false);
	     }else{
	    	 document.addEventListener("keydown",checkWhichKeyPressed,false);	 
	     }
	    function checkWhichKeyPressed(e){
	    	 var keyCode = e.keyCode;
	    	 console.log("Key Code is "+keyCode);
	    	 if(keyCode==116 || keyCode==17 || keyCode==82){
	    		 isLinkOrForm=true;	 
	    	 }
	    	 return true;
	     }
	    	if(getBrowser()=="chrome"){ // If Browser is Not IE
	    		window.onbeforeunload=function(){return;};
			}else if(getBrowser()=="firefox"){
				window.onunload=function(){return;};
			}
	    	else{ // if Browser is IE
	    		//alert("Your IE Browser Version is "+getIEVersion());
	    			
					if(getIEVersion() && getIEVersion() <= 10){
					
					window.onunload=null;
/* 	    				window.onbeforeunload = function(){
	    			console.log("Location X :"+window.event.clientX+" Location Y : "+window.event.clientY);
	    					if(window.event.clientX >= 1300 && window.event.clientY <=-87){
							/*	alert("Your Session is expired as you have pressed the close Button !");
								$.ajax({
				    				type: "POST",
			    					async: false,
			    					url: "handleLogout"
			    				});	
	    					}
	    				};	*/	 

	    			}
					else{
						window.onunload = function (e){
/* 							if(!isLinkOrForm){
							/*	alert("Your Session is expired !");
								$.ajax({
				    				type: "POST",
			    					async: false,
			    					url: "handleLogout"
			    				});	
							} */
						};	    			
	    			}
	    	}
 	});
 	function resetSessionInvalidateVariable(){
 		console.log("Resetting SessionInvalidate Variable from :"+isLinkOrForm+" to :"+!isLinkOrForm);
 		if(isLinkOrForm==true){
 			isLinkOrForm=false;
 		}
 	}
 	function setFocus()
 	{
// 		alert("came");
 		var elements = document.forms[0].elements;
 		var focusElement = null;
 		for (var i = 0; i < elements.length && focusElement == null; i++) {		
 			if( elements[i].type!="hidden" && elements[i].type!="image" && !elements[i].readOnly && !elements[i].disabled){
 				focusElement = elements[i];
 			}		
 		}
 		if (focusElement != null && focusElement.disabled == false) {
 			focusElement.focus();
 		}
 	}
 	
 	function doPasswordChange()
 	{
 		var URL ="passwordChangeController.htm";
 		document.getElementById("popupTitle").innerHTML="Change Password";
 		showPopWin(URL, 520, 335, checkPasswordSession);	
 		
 	}

 	function checkPasswordSession(returnVal){

 		var pwdExpiry = document.getElementById("pwdExpiry");
 		if(returnVal==1){
 			window.location.reload();
 		}
 	}
 	function urlRedirect(){
 		var browserURL='${userProfile.browserUrl}';
 		window.location.href=browserURL;
 	}
 	function doUpload()
 	{
 		document.forms[0].method="POST";
 		document.forms[0].action="setupController.htm";
 		document.forms[0].submit();
 	}
 	function doArchive()
 	{
 		document.forms[0].method="POST";
 		document.forms[0].action="archiveController.htm";
 		document.forms[0].submit();
 	}
 	
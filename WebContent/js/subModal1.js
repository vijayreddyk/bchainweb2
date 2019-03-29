/*******************************************************************************
 * Project MCMS, all source code and data files except images,
 * Copyright 2008-2015 Grit-Innovation Software Pvt. Ltd., India
 *
 * Permission is granted to Magma Fin Corp. to use and modify as they see fit.
 *******************************************************************************/
/**
 * SUBMODAL v1.4
 * Used for displaying DHTML only popups instead of using buggy modal windows.
 *
 * By Seth Banks (webmaster at subimage dot com)
 * http://www.subimage.com/
 *
 * Contributions by:
 * 	Eric Angel - tab index code
 * 	Scott - hiding/showing selects for IE users
 *	Todd Huss - inserting modal dynamically and anchor classes
 *
 * Up to date code can be found at http://www.subimage.com/dhtml/subModal
 * 
 *
 * This code is free for you to use anywhere, just keep this comment block.
 */

// Popup code
var gPopupMask = null;
var gPopupContainer = null;
var gPopbutton = null;
var gPopFrame = null;
var gReturnFunc;
var gPopupIsShown = false;

var gHideSelects = false;


var gTabIndexes = new Array();
// Pre-defined list of tags we want to disable/enable tabbing into
var gTabbableTags = new Array("A","BUTTON","TEXTAREA","INPUT","IFRAME");	

// If using Mozilla or Firefox, use Tab-key trap.
if (!document.all) {
	document.onkeypress = keyDownHandler;
}



/**
 * Initializes popup code on load.	
 */
function initPopUp() {
	
	// Add the HTML to the body
	theBody = document.getElementsByTagName('BODY')[0];
	var popbutton =  document.createElement('div');
	popbutton.id = 'popup_button';
	/*popmask = document.createElement('div');
	popmask.id = 'popupMask';*/
	popcont = document.createElement('div');
	popcont.id = 'MainpopupContainer';
	/*popcont.innerHTML = '' +
		'<div id="popupInner">' +
			'<div id="popupTitleBar">' +
				'<div id ="head-title"></div>' +
				'<div id="popupControls">' +
					'<img src="images/close.gif" onclick="hidePopWin(false);" id="popCloseBox" />' +
				'</div><div style="clear:both;"></div>' +
				
			'</div><br />' +
			'<iframe src="loading.html" style="width:100%;height:100%;background-color:transparent;margin-top:10px;" scrolling="auto" frameborder="0" allowtransparency="true" id="popupFrame" name="popupFrame" width="100%" height="100%"></iframe>' +
		'</div>';*/
	popcont.setAttribute("class", "modal fade");
	popcont.setAttribute("role", "dialog");
	popcont.innerHTML = '<div id="MainpopupContainer_model_dialog" class="modal-dialog modal-lg">'
						+ ' <!-- Modal content-->'
						+ ' <div id="popupInner" class="modal-content">'
						+ '  <div id="popupTitleBar" class="modal-header">'
						+'		<div  class="clearfix"></div>'
						+ '   	<div id="popupControls"><button type="button" onclick="hidePopWin(false);" id="popCloseBox" style="padding:9px" class="close" data-dismiss="modal">&times;</button></div>'
						+ '    	<h4  id ="head-title" class="modal-title"></h4>'
						+'	</div>	<div  class="clearfix"></div>'
						+ '  <div class="modal-body">'
						+ '    <iframe src="loading.html" style="width:100%;height:100%;background-color:transparent;margin-top:10px;" scrolling="auto" frameborder="0" allowtransparency="true" id="popupFrame" name="popupFrame"></iframe>'
						+ '   </div>'
						+ '  </div>'
						+ '</div>';
	//theBody.appendChild(popmask);
	theBody.appendChild(popcont);
	popbutton.innerHTML = '<button id="popup_btn" type="button" class="btn btn-info btn-lg hidden" data-toggle="modal" data-target="#MainpopupContainer">Open Modal</button>';
	theBody.appendChild(popbutton);
	gPopupMask = document.getElementById("popupMask");
	gPopupContainer = document.getElementById("MainpopupContainer");
	gPopFrame = document.getElementById("popupFrame");	
	gPopbutton = document.getElementById("popup_btn");
	
	// check to see if this is IE version 6 or lower. hide select boxes if so
	// maybe they'll fix this in version 7?
	var brsVersion = parseInt(window.navigator.appVersion.charAt(0), 10);
	if (brsVersion <= 6 && window.navigator.userAgent.indexOf("MSIE") > -1) {
		gHideSelects = true;
	}
	
	// Add onclick handlers to 'a' elements of class submodal or submodal-width-height
	var elms = document.getElementsByTagName('a');
	for (i = 0; i < elms.length; i++) {
		if (elms[i].className.indexOf("submodal") == 0) { 
			// var onclick = 'function (){showPopWin(\''+elms[i].href+'\','+width+', '+height+', null);return false;};';
			// elms[i].onclick = eval(onclick);
			elms[i].onclick = function(){
				// default width and height
				var width = 400;
				var height = 200;
				// Parse out optional width and height from className
				params = this.className.split('-');
				if (params.length == 3) {
					width = parseInt(params[1]);
					height = parseInt(params[2]);
				}
				showPopWin(this.href,width,height,null); return false;
			}
		}
	}
}
addEvent(window, "load", initPopUp);

 /**
	* @argument width - int in pixels
	* @argument height - int in pixels
	* @argument url - url to display
	* @argument returnFunc - function to call when returning true from the window.
	* @argument showCloseBox - show the close box - default true
	*/

function showPopWin(url, width, height, returnFunc, showCloseBox) {
	var win_height = $(window).height();
	// show or hide the window close widget
	if (showCloseBox == null || showCloseBox == true) {
		document.getElementById("popCloseBox").style.display = "block";
	} else {
		document.getElementById("popCloseBox").style.display = "none";
	}
	gPopupIsShown = true;
	disableTabIndexes();
	//gPopupMask.style.display = "block";
	gPopupContainer.style.display = "block";

	
    if (GetIEVersion()<=0) 
    {
    	gPopFrame.contentDocument.head.innerHTML = '<link rel="stylesheet" type="text/css" href="style.css" />';
    	gPopFrame.contentDocument.body.innerHTML = "<p>Now loading...please wait</p>";
    }
	//gPopFrame.src='loading.html';
	/*gPopFrame.contentDocument.head.innerHTML = '<link rel="stylesheet" type="text/css" href="style.css" />';
	gPopFrame.contentDocument.body.innerHTML = "<p>Now loading...please wait</p>";*/
	if (showCloseBox == null || showCloseBox == true) {
		gPopbutton.click();
	}else {
		$("#MainpopupContainer").modal({
			  backdrop: 'static',
			  keyboard: false
			})
	}
	//$(gPopbutton).modal('show') 
	// calculate where to place the window on screen
	//centerPopWin(width, height);
	
	var titleBarHeight = parseInt(document.getElementById("popupTitleBar").offsetHeight, 10);

	var popup_dialog_ele = document.getElementById('MainpopupContainer_model_dialog');
	/*popup_dialog_ele.style.width = width + "%";*/
	popup_dialog_ele.style.width = (1000 * width/100) + "px";
	/*if(65 < width < 100){
		console.log((1000 * width/100));
		popup_dialog_ele.style.width = (1000 * width/100) + "px";
	}else{
		popup_dialog_ele.style.width = width + "%";
	}*/
	popup_dialog_ele.style.height = ((win_height * Number(height+titleBarHeight))/100 ) + "px";
	
	
	setMaskSize();

	// need to set the width of the iframe to the title bar width because of the dropshadow
	// some oddness was occuring and causing the frame to poke outside the border in IE6
	gPopFrame.style.width = parseInt(document.getElementById("popupTitleBar").offsetWidth, 50) + "px";
	
	gPopFrame.style.height = ((win_height * Number(height))/100 )+ "px";
	
	// set the url
	gPopFrame.src = url;
	
	gReturnFunc = returnFunc;
	// for IE
	if (gHideSelects == true) {
		hideSelectBoxes();
	}
	
	//window.setTimeout("setPopTitle();", 600);
}


//
var gi = 0;
function centerPopWin(width, height) {
	if (gPopupIsShown == true) {
		if (width == null || isNaN(width)) {
			width = gPopupContainer.offsetWidth;
		}
		if (height == null) {
			height = gPopupContainer.offsetHeight;
		}
		
		//var theBody = document.documentElement;
		var theBody = document.getElementsByTagName("BODY")[0];
		theBody.style.overflow = "hidden";
		
		//var scTop = parseInt(theBody.scrollTop,10);
		//var scLeft = parseInt(theBody.scrollLeft,10);
		
		//gPopupMask.style.top = scTop + "px";
		//gPopupMask.style.left = scLeft + "px";
	
		setMaskSize();
		
		//window.status = gPopupMask.style.top + " " + gPopupMask.style.left + " " + gi++;
		
		var titleBarHeight = parseInt(document.getElementById("popupTitleBar").offsetHeight, 10);
		
		var fullHeight = getViewportHeight();
		var fullWidth = getViewportWidth();
		
		//gPopupContainer.style.top = (scTop + ((fullHeight - (height+titleBarHeight)) / 2)) + "px";
		//gPopupContainer.style.left =  (scLeft + ((fullWidth - width) / 2)) + "px";
		//alert(fullWidth + " " + width + " " + gPopupContainer.style.left);
	}
}
addEvent(window, "resize", centerPopWin);
//addEvent(window, "scroll", centerPopWin);
window.onscroll = centerPopWin;

/**
 * Sets the size of the popup mask.
 *
 */
function setMaskSize() {
	var theBody = document.getElementsByTagName("BODY")[0];
			
	var fullHeight = getViewportHeight();
	var fullWidth = getViewportWidth();
	
	// Determine what's bigger, scrollHeight or fullHeight / width
	if (fullHeight > theBody.scrollHeight) {
		popHeight = fullHeight;
	} else {
		popHeight = theBody.scrollHeight;
	}
	
	if (fullWidth > theBody.scrollWidth) {
		popWidth = fullWidth;
	} else {
		popWidth = theBody.scrollWidth;
	}
	
	//gPopupMask.style.height = popHeight + "px";
	//gPopupMask.style.width = popWidth + "px";
}

/**
 * @argument callReturnFunc - bool - determines if we call the return function specified
 * @argument returnVal - anything - return value 
 */
function hidePopWin(callReturnFunc) {
	gPopupIsShown = false;
	var theBody = document.getElementsByTagName("BODY")[0];
	theBody.style.overflow = "";
	restoreTabIndexes();
	//if (gPopupMask == null) {
	//	return;
	//}
	//gPopupMask.style.display = "none";
	gPopupContainer.style.display = "none";
	if (callReturnFunc == true && gReturnFunc != null && typeof gReturnFunc == 'function') {
		console.log("Unbinding the Window from Session INvalidation.....");
		window.onunload=null;
		window.onbeforeunload=null;
		gReturnFunc(window.frames["popupFrame"].returnVal);
	}
	//gPopFrame.src = 'loading.html';
	// display all select boxes
	if (gHideSelects == true) {
		displaySelectBoxes();
	}
	parent.$('#MainpopupContainer').modal('hide');
}

/**
 * Sets the popup title based on the title of the html document it contains.
 * Uses a timeout to keep checking until the title is valid.
 */
function setPopTitle() {
	//return;
	if (window.frames["popupFrame"].document.title == null) {
		window.setTimeout("setPopTitle();", 10);
	} else {
		document.getElementById("head-title").innerHTML = window.frames["popupFrame"].document.title;
	}
}

// Tab key trap. iff popup is shown and key was [TAB], suppress it.
// @argument e - event - keyboard event that caused this function to be called.
function keyDownHandler(e) {
    if (gPopupIsShown && e.keyCode == 9)  return false;
}

// For IE.  Go through predefined tags and disable tabbing into them.
function disableTabIndexes() {
	if (document.all) {
		var i = 0;
		for (var j = 0; j < gTabbableTags.length; j++) {
			var tagElements = document.getElementsByTagName(gTabbableTags[j]);
			for (var k = 0 ; k < tagElements.length; k++) {
				gTabIndexes[i] = tagElements[k].tabIndex;
				tagElements[k].tabIndex="-1";
				i++;
			}
		}
	}
}

// For IE. Restore tab-indexes.
function restoreTabIndexes() {
	if (document.all) {
		var i = 0;
		for (var j = 0; j < gTabbableTags.length; j++) {
			var tagElements = document.getElementsByTagName(gTabbableTags[j]);
			for (var k = 0 ; k < tagElements.length; k++) {
				tagElements[k].tabIndex = gTabIndexes[i];
				tagElements[k].tabEnabled = true;
				i++;
			}
		}
	}
}


/**
* Hides all drop down form select boxes on the screen so they do not appear above the mask layer.
* IE has a problem with wanted select form tags to always be the topmost z-index or layer
*
* Thanks for the code Scott!
*/
function hideSelectBoxes() {
	for(var i = 0; i < document.forms.length; i++) {
		for(var e = 0; e < document.forms[i].length; e++){
			if(document.forms[i].elements[e].tagName == "SELECT") {
				document.forms[i].elements[e].style.visibility="hidden";
			}
		}
	}
}

/**
* Makes all drop down form select boxes on the screen visible so they do not reappear after the dialog is closed.
* IE has a problem with wanted select form tags to always be the topmost z-index or layer
*/
function displaySelectBoxes() {
	for(var i = 0; i < document.forms.length; i++) {
		for(var e = 0; e < document.forms[i].length; e++){
			if(document.forms[i].elements[e].tagName == "SELECT") {
			document.forms[i].elements[e].style.visibility="visible";
			}
		}
	}
}
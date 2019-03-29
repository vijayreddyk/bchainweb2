/*******************************************************************************
* Project Sales App, all source code and data files except images,
* Copyright 2008-2015 Grit-Innovation Software Pvt. Ltd., India
*
* Permission is granted to Magma Fin Corp. to use and modify as they see fit.
*******************************************************************************/
/* var isToggled=false;
function toggleMenu(){
   if(!isToggled){
   	
       $(".sidebar-wrapper").css({"width":"145px"});
       $(".right-container").css({"margin-left":"5%","width":"85%"});
       if($(window).width() < 767)
       {
       	$(".right-container").css({"margin-left":"5%","width":"83%"});  
       }
       $("#gridbox").css({"width":"inherit"});
     	isToggled = true;
   	
   }else{
   	
   	
   	$(".sidebar-wrapper").css({"width":"53px"});
   	$(".right-container").css({"margin-left":"0","width":"91%"});
   	isToggled = false;
   	
   }
};


function setAnimationAttributes(className){
 	$("."+className+" > ul li a").css('-webkit-transition', 'all 0.5s ease');
 	$("."+className+" > ul li a").css('-moz-transition', 'all 0.5s ease');
 	$("."+className+" > ul li a").css('-o-transition', 'all 0.5s ease');
 	$("."+className+" > ul li a").css('transition', 'all 0.5s ease');
 	
}

function removeAnimationAttributes(className){
setTimeout(function(){
 	$("."+className+" > ul li a").css('-webkit-transition', 'all 0s ease');
 	$("."+className+" > ul li a").css('-moz-transition', 'all 0s ease');
 	$("."+className+" > ul li a").css('-o-transition', 'all 0s ease');
 	$("."+className+" > ul li a").css('transition', 'all 0s ease');
},300);
}

if($(window).width() < 767)
{
$(".sidebar-wrapper").css({"width":"53px"});
$(".right-container").css({"margin-left":"5","width":"83%"});  

} */

/*$("#menu-toggle").click(function(e) {
   e.preventDefault();
   $("#wrapper").toggleClass("toggled");
});
$("#menu-toggle-2").click(function(e) {
   e.preventDefault();
   $("#wrapper").toggleClass("toggled-2");
   $('#menu ul').hide();
});

function initMenu() {
 $('#menu ul ,#sub-menu ul ').hide();
 
  $('#menu ul, #sub-menu ul').children('.current').parent().show();
}*/
/*$("#menu-toggle").click(function(e) {
	alert("hi");
   e.preventDefault();
   $("#wrapper").toggleClass("toggled");
});*/
	$(document).click(function(event){	
		 if(!(event.target != undefined && event.target.id != undefined && (event.target.id == 'navbar-button' || event.target.id == 'menu-toggle-2' || event.target.id == 'bs-example-navbar-collapse-1' || event.target == $('#bs-example-navbar-collapse-1 ul li')[0])) && ($('#wrapper')[0].classList.contains('toggled-2'))){
			 $('#bs-example-navbar-collapse-1').click();
		 }
	});
	
	$("#bs-example-navbar-collapse-1").click(function(e) {		
		if($(window).width() < 521){
		  	var $div1 = $('.right-container');
			$div1.toggleClass('isOut');
			var isOut = $div1.hasClass('isOut');			
			$div1.animate({paddingLeft: isOut ? '100%' : '0px'}, 300)
		    $("#wrapper").toggleClass("toggled-2");
			//$(".contact-checkbox").css("margin-top","6%");
		    $('#menu ul').hide();
		}
		else
		{
			var $div1 = $('.right-container');
			$div1.toggleClass('isOut');
			var isOut = $div1.hasClass('isOut');		
			$div1.animate({paddingLeft: isOut ? '185px' : '15px'}, 300)
		    $("#wrapper").toggleClass("toggled-2");
			//$(".contact-checkbox").css("margin-top","6%");
		    $('#menu ul').hide();
			
		}
	});
	
	
/*	if ($(window).width() > 569) {
		$("#bs-example-navbar-collapse-1").click(function(e) {
		  	var $div1 = $('.right-container');
			$div1.toggleClass('isOut');
			var isOut = $div1.hasClass('isOut');
			$div1.animate({paddingLeft: isOut ? '170px' : '0'}, 300)
		    $("#wrapper").toggleClass("toggled-2");
			//$(".contact-checkbox").css("margin-top","6%");
		    $('#menu ul').hide();
		  
		});
	}
*/
  


function initMenu() {
 $('#menu ul ,#sub-menu ul ').hide();
 
  $('#menu ul, #sub-menu ul').children('.current').parent().show();
 
 if($('#sidebar-wrapper #menu')[0].childNodes.length <= 1 ){
	 $('#bs-example-navbar-collapse-1').addClass('hide-navbar');
	 $('#rightHeader').addClass('full-width-header');
	 $('.left-container').addClass('hide-left-container');
	 $('.right-container').addClass('right-modified-container');
 }

 
 
 $('#menu li a,#sub-menu li a').click(
   function() {
     var checkElement = $(this).next();
     if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
     $('#menu ul:visible').slideUp('normal');
       $('#sub-menu ul:visible').not('#menu ul:visible').slideUp('normal');
      
       return false;
      
       }
     if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
                   checkElement.slideDown('normal');
        
       return false;
       }
     }
   );
 
	 var menu = document.getElementById('menu');
	 for(var iterator = 0; iterator < menu.childNodes.length; iterator++){
		 var childNode = menu.childNodes[iterator];
		 if(childNode.nodeName == 'LI'){
			 var children = childNode.childNodes;
			 for(var innerIterator = 0; innerIterator<children.length; innerIterator++){
				 if(children[innerIterator].nodeName == 'UL'){
					 childNode.childNodes[0].addEventListener('click', function(event){
						 if(!($('#wrapper').hasClass('toggled-2'))){
							 $('#bs-example-navbar-collapse-1').click();
						 }
					 });
				 }
			 }
		 }
	 }
 
 
 }
$(document).ready(function() {initMenu();});


//$('#menu ul:first').show();
//$('#menu ul:first').show();

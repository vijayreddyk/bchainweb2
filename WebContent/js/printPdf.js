/*******************************************************************************
 * Project MCMS, all source code and data files except images,
 * Copyright 2008-2015 Grit-Innovation Software Pvt. Ltd., India
 *
 * Permission is granted to Magma Fin Corp. to use and modify as they see fit.
 *******************************************************************************/
/**
 * author krishna mohan
 * print html page in pdf
 * on 2013-07-24
 */
/*function printdiv(printpage)
{
	if(document.getElementById("magmalogo_print").style.display=="none")  
	{  
	document.getElementById("magmalogo_print").style.display="inline";  
	} 
var headstr = "<html><head><title></title></head><body>";
var footstr = "</body>";
var newstr = document.all.item(printpage).innerHTML;
var oldstr = document.body.innerHTML;
document.body.innerHTML = headstr+newstr+footstr;
window.print();
document.body.innerHTML = oldstr;

var mImg = document.getElementById('magmalogo_print');
mImg.style.display = "none";

return true;

}*/

var originalContents;
   function printdiv() {
	   
       if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
           var DocumentContainer = document.getElementById('fullbackgroundwhite');
           var WindowObject = window.open('pdf', "PrintWindow","width=800,height=720,top=200,left=200,toolbars=no,scrollbars=yes,status=no,resizable=no");
           WindowObject.document.writeln(DocumentContainer.innerHTML);
           WindowObject.document.close();
           WindowObject.focus();
           WindowObject.print();
           WindowObject.close();
       }
       else {
           originalContents = document.body.innerHTML;
           var printable = document.getElementById('fullbackgroundwhite');
           document.body.innerHTML = printable.innerHTML;
           printCoupon();
       }
   }

   function printCoupon() {
       window.print();
       endPrintCoupon();
   }

   function endPrintCoupon() {
       document.body.innerHTML = originalContents;
       document.getElementById('fullbackgroundwhite').scrollIntoView(true);      
       location.reload();
   }

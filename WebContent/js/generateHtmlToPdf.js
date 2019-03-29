function doGeneratePdf(addressType)
{
	    document.forms[0].formAction.value="FIFORM";
		document.forms[0].method = "POST";
		document.forms[0].action = "generateHtmlToPdf.htm?addressType="+addressType;
		document.forms[0].submit();
		return false;
}
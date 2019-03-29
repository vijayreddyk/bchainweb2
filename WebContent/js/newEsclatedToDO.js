$(document).ready(function () {
	$.getJSON('ControllerJsons/esclatedtodo.json', function(data){
		
		for (var i = 0; i < data.esclatedFormFields.length; i++) {
			
			var element =  data.esclatedFormFields[i];
			if(element.name=='proposal'){
				var arr = [];
			document.getElementById("inputdefault").innerHTML= 	data.esclatedFormFields[i].label;	
			arr.push($('<input class="form-control" type="'+data.esclatedFormFields[i].type+'" label="'+data.esclatedFormFields[i].label+'"/>',{ type: element.type}));
			$("#proposal").append(arr);
			}
			if((element.name=='from')){
				var pass = [];
				document.getElementById("setFrom").innerHTML= 	data.esclatedFormFields[i].label;	
				pass.push($('<input class="form-control" id="'+data.esclatedFormFields[i].id+'" type="'+data.esclatedFormFields[i].type+'" label="'+data.esclatedFormFields[i].label+'"/>',{ type: element.type}));
				 $("#getFrom").append(pass);
				}
			if(element.name=='to'){
				var ema = [];
				document.getElementById("setTo").innerHTML= 	data.esclatedFormFields[i].label;	
				ema.push($('<input class="form-control" type="'+data.esclatedFormFields[i].type+'" label="'+data.esclatedFormFields[i].label+'"/>',{ type: element.type}));
				 $("#getTo").append(ema);
				}
			if(element.name =='risk_category'){
				var sel = [],listItems = '';
				//console.log(data.esclatedFormFields[i].options);
				document.getElementById("seldefault").innerHTML= 	data.esclatedFormFields[i].label;	
				//sel.push($('<select class="form-control" label="'+data.esclatedFormFields[i].label+'"/></br>',{ type: element.type}));
				listItems = '<select class="form-control" type="'+data.esclatedFormFields[i].type+'" >';
				listItems += '<option value=""> Select </option>';
				for (var j = 0; j < data.esclatedFormFields[i].options.length; j++) {
					
		             listItems += "<option value='" + data.esclatedFormFields[i].options[j].value + "'>" +data.esclatedFormFields[i].options[j].text + "</option>";
		         }
				listItems += '</select>';
				
				 $("#selPlace").append(listItems);
				}
			
			if(element.name =='esclated_by'){
				var sel = [],listItems = '';
				//console.log(data.esclatedFormFields[i].options);
				document.getElementById("esclateddefault").innerHTML= 	data.esclatedFormFields[i].label;	
				//sel.push($('<select class="form-control" label="'+data.esclatedFormFields[i].label+'"/></br>',{ type: element.type}));
				listItems = '<select class="form-control" type="'+data.esclatedFormFields[i].type+'" >';
				for (var j = 0; j < data.esclatedFormFields[i].options.length; j++) {
					
		             listItems += "<option value='" + data.esclatedFormFields[i].options[j].value + "'>" +data.esclatedFormFields[i].options[j].text + "</option>";
		         }
				listItems += '</select>';
				
				 $("#esclatedPlace").append(listItems);
				}
			
			if(element.name =='esclated_byecode'){
				var sel = [],listItems = '';
				//console.log(data.esclatedFormFields[i].options);
				document.getElementById("esclatedbydefault").innerHTML= 	data.esclatedFormFields[i].label;	
				//sel.push($('<select class="form-control" label="'+data.esclatedFormFields[i].label+'"/></br>',{ type: element.type}));
				listItems = '<select class="form-control" type="'+data.esclatedFormFields[i].type+'" >';
				for (var j = 0; j < data.esclatedFormFields[i].options.length; j++) {
					
		             listItems += "<option value='" + data.esclatedFormFields[i].options[j].value + "'>" +data.esclatedFormFields[i].options[j].text + "</option>";
		         }
				listItems += '</select>';
				
				 $("#esclatedbyPlace").append(listItems);
				}
			if(element.name =='closingflow'){
				var sel = [],listItems = '';
				//console.log(data.esclatedFormFields[i].options);
				document.getElementById("closingbydefault").innerHTML= 	data.esclatedFormFields[i].label;	
				//sel.push($('<select class="form-control" label="'+data.esclatedFormFields[i].label+'"/></br>',{ type: element.type}));
				listItems = '<select class="form-control" type="'+data.esclatedFormFields[i].type+'" >';
				for (var j = 0; j < data.esclatedFormFields[i].options.length; j++) {
					
		             listItems += "<option value='" + data.esclatedFormFields[i].options[j].value + "'>" +data.esclatedFormFields[i].options[j].text + "</option>";
		         }
				listItems += '</select>';
				
				 $("#closingbyPlace").append(listItems);
				}
			
		  }
	
});
});


$(document).ready(function(){
	 $( "#fromdatepicker,#todatepicker	").datepicker();
		
	});
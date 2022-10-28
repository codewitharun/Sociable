function validate() {
    
    var theMessage = "Please complete the following: \n-----------------------------------\n";
	var noErrors = theMessage;

	if (document.frm.fname.value=="") {
	theMessage = theMessage + "\n --> First Name";
	}	
	if (document.frm.lname.value=="") {
	theMessage = theMessage + "\n --> Last Name";
	}

if (document.frm.desin.value=="") {
	theMessage = theMessage + "\n --> Designation";
	}
if (document.frm.contype.value=="") {
	theMessage = theMessage + "\n --> Contact Type";
	}
if (document.frm.createby.value=="") {
	theMessage = theMessage + "\n --> Create By";
	}
if (document.frm.orgname.value=="") {
	theMessage = theMessage + "\n --> Organization";
	}
	if (document.frm.country.value=="") {
	theMessage = theMessage + "\n --> Country";
	}
	if (document.frm.state.value=="") {
	theMessage = theMessage + "\n --> state";
	}
if (document.frm.city.value=="") {
	theMessage = theMessage + "\n --> City";
	}



	//if (document.frm.FCKeditor1.value=="") {
    //theMessage = theMessage + "\n --> Long Description";}orgaddress
	if (theMessage == noErrors) {
	return true;
	} else {
	// If errors were found, show alert message
	alert(theMessage);
	return false;
	}
}

function call_me(max_length) {
if((document.form1.mybox.value == null ) || (document.form1.mybox.value == "" )) document.form1.mybox.size = size;
if((document.form1.mybox.value.length >= size)&&(document.form1.mybox.value.length <= max_length)) document.form1.mybox.size = document.form1.mybox.value.length + 1;
else document.form1.mybox.size = size;
}
function taskvalidation(){
if(!document.getElementById("createby").value)
	{
	alert("Please selecet Create by");
     document.getElementById("duedate").focus();
	 return false;
	}	

if(!document.getElementById("duedate").value)
	{
	alert("Please selecet due date");
     document.getElementById("duedate").focus();
	 return false;
	}
	
if(!document.getElementById("startdate").value)
	{
	alert("Please start date");
     document.getElementById("startdate").focus();
	 return false;
	}
if(document.getElementById("startdate").value>document.getElementById("duedate").value)
	{
	alert("Due date of a task cannot occour before its start date")
	return false;
	}
	if(!document.getElementById("taskcomment").value)
	{
	alert("Please enter comment");
     document.getElementById("taskcomment").focus();
	 return false;
	}
	
} 

function getRequestBody(oForm) {
            var aParams = new Array();
            
            for (var i=0 ; i < oForm.elements.length; i++) {
                var sParam = encodeURIComponent(oForm.elements[i].name);
                sParam += "=";
                sParam += encodeURIComponent(oForm.elements[i].value);
                aParams.push(sParam);
            } 
            
            return aParams.join("&");        
        }
        
        function saveResult(sMessage) {
            
alert(sMessage);
window.location='displayalltask.php';
return false;
        }

		function increment(val) {

		number = document.form1.test.value - 0;

		if (!isNaN(number))
		{
			if(number <100)
			{
				document.form1.test.value = number + 25;
				
			}
		}
		
	}

	function decrement(val) {

		number = document.form1.test.value - 0;
		if (!isNaN(number)) 
		{

			if (number < 1)
			{
				document.form1.test.value = 0;
			} 
			else
			{
			document.form1.test.value = document.form1.test.value - 0 - 25;
			}

		}
		else
		{
			document.form1.test.value = 0;
		}
	}



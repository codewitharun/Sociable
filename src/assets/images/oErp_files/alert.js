function checkvalidation()
{
//	alert(document.frm.priority.value);
	if(document.frm.details.value=='')
	{
		alert("Please enter details");
		return false;
	}
	if(document.frm.priority.value=='0')
	{
		alert("Please select priority");
		return false;
	}
	if(document.frm.date.value=='')
	{
		alert("Please enter date");
		return false;
	}
	if(document.frm.time.value=='')
	{
		alert("Please enter time");
		return false;
	}
	
}



// Declaring required variables
var digits = "0123456789";
// non-digit characters which are allowed in phone numbers
var phoneNumberDelimiters = "()- ";
// characters which are allowed in international phone numbers
// (a leading + is OK)
var validWorldPhoneChars = phoneNumberDelimiters + "+";
// Minimum no of digits in an international phone no.
var minDigitsInIPhoneNumber = 1;

function isInteger(s)
{   var i;
    for (i = 0; i < s.length; i++)
    {   
        // Check that current character is number.
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) return false;
    }
    // All characters are numbers.
    return true;
}

function stripCharsInBag(s, bag)
{   var i;
    var returnString = "";
    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.
    for (i = 0; i < s.length; i++)
    {   
        // Check that current character isn't whitespace.
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }
    return returnString;
}

function checkInternationalPhone(strPhone){
s=stripCharsInBag(strPhone,validWorldPhoneChars);
return (isInteger(s) && s.length >= minDigitsInIPhoneNumber);
}

function IsValidCheck()
{

if(document.frm.check.value=="Days")
if(document.frm.time.value>100 || document.frm.time.value=="")
 {
alert("Days should not be more then 100.");
return false;
}
if(document.frm.check.value=="Min")
if(document.frm.time.value<30 || document.frm.time.value>59 || document.frm.time.value=="")
 {
alert("Minutes must be between 30 to 59.");
return false;
}
if(document.frm.check.value=="Hours")
if(document.frm.time.value>23 || document.frm.time.value=="")
 {
alert("Hours must be between 0 to 23.");
return false;
}
if (document.frm.time.disabled==false)
	if(document.frm.time.value =="")
{ 
alert("Please enter the Value"); 
  document.frm.time.focus();
return false;
}
if (document.frm.check.disabled==false);
	if(document.frm.check.value =="")
{ 
alert("Please select the Value"); 
  document.frm.check.focus();
return false;
}

if (document.frm.time.disabled==false)
if (checkInternationalPhone(document.frm.time.value)==false){
		alert("Please Enter  Number only");
		document.frm.time.value="";
	document.frm.time.focus();
		return false;
	}
	
 if(!document.frm.option.checked)
	{
answer = confirm("You have not checked the checkbox are you sure you want to continue?");

if (answer ==true) 

{ 

return true; 
}
else
	{
	return false;
}
}
return true;
}
/* for addtask.tpl*/
function isloading()
{
	if(document.frm.option.checked)
	{
		document.frm.time.disabled=false;
document.frm.check.disabled=false;
document.frm.time.focus()

}
else
	{
document.frm.time.disabled=true;
document.frm.check.disabled=true;

}
}
/*onloading for addtask.tpl*/
function onloading()
{
document.frm.time.disabled=true;
document.frm.check.disabled=true;
}


/* edit task*/
function IsValidCheck1()
{
if(document.frm.check1.value=="Days")
if(document.frm.time2.value>100 || document.frm.time2.value=="")
 {
alert("Days should not be more then 100.");
return false;
}
if(document.frm.check1.value=="Min")
if(document.frm.time2.value<30 || document.frm.time2.value>59 || document.frm.time2.value=="")
 {
alert("Minutes must be between 30 to 59.");
return false;
}
if(document.frm.check1.value=="Hours")
if(document.frm.time2.value>23 || document.frm.time2.value=="")
 {
alert("Hours must be between 0 to 23.");
return false;
 }
if (checkInternationalPhone(document.frm.time2.value)==false)
	{
		alert("Please Enter  Number only");
			document.frm.time2.value="";
	document.frm.time2.focus();
		return false;
	}
	return true;
} 




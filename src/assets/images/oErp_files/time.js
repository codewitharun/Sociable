function IsValidTime(timeStr) {
var timePat = /^(\d{1,2}):(\d{2})(:(\d{2}))?(\s?(AM|am|PM|pm))?$/;
var matchArray = timeStr.match(timePat);
if (matchArray == null) {
alert("Time is not in a valid format.");
return false;
}
hour = matchArray[1];
minute = matchArray[2];
second = matchArray[4];

if (second=="") { second = null; }

if (hour < 0  || hour > 23) {
alert("Hours must be between 0 to 23.");
return false;
}
if (minute<0 || minute > 59) {
alert ("Minutes must be between 0 and 59.");
return false;
}
if (second != null && (second < 0 || second > 59)) {
alert ("Seconds must be between 0 and 59.");
return false;
}
return true;
}


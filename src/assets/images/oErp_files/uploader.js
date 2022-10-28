var http = createRequestObject();
var uploader = '';

function createRequestObject() {
    var obj;
    var browser = navigator.appName;
    
    if(browser == "Microsoft Internet Explorer"){
        obj = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else{
        obj = new XMLHttpRequest();
    }
    return obj;    
}

function traceUpload(uploadDir) {
 		
   http.onreadystatechange = handleResponse;

   http.open("GET", 'imageupload.php?uploadDir='+uploadDir+'&uploader='+uploader); 
   http.send(null);   
}

/*function handleResponse() {

	if(http.readyState == 4){ 
        document.getElementById(uploaderId).innerHTML = http.responseText;
        window.location.reload(false);
    }
    else {
    	document.getElementById(uploaderId).innerHTML = "Uploading File. Please wait...";
    }
}
*/
/*if(obj.name=='id4'){
	alert(obj.name);
	var arr_allowed=new Array(
		'gif',
		'jpg',
		'jpeg',
		'png',
		'zip',
		'rtf',
		'pdf',
		'txt',
		'doc'
);
}
else
{
		alert(obj.name);

	var arr_allowed=new Array(
		'gif',
		'jpg',
		'jpeg',
		'png',
		'zip',
);

}*/
	function trim(str)
	{
		return str.replace(/^\s+|\s+$/g,'');
	}

function uploadFile(obj) {
	//alert(obj.name);

	if(obj.name=='id4'){
	//alert(obj.name);
	var arr_allowed=new Array(
		'gif',
		'jpg',
		'jpeg',
		'png',
		'zip',
		'rtf',
		'pdf',
		'txt',
		'doc'
);
}
else
{
	//	alert(obj.name);

	var arr_allowed=new Array(
		'gif',
		'jpg',
		'jpeg',
		'png',
		'zip'
);
}
	var uploadDir = obj.value;
	uploaderId = 'uploader'+obj.name;
	uploader = obj.name;
	//alert(uploader);
	//var filename=document.getElementById('id4').value;
	var filename=document.getElementById(obj.name).value;
	//alert(filename);
	var ext_pos=filename.lastIndexOf('.');
	var ext=filename.substr(ext_pos+1);
	var i;
	var type_flag=false;
	
	for(i=0;i<arr_allowed.length;i++)
	{
		if(trim(ext)==arr_allowed[i])
		{
			type_flag=true;
			break;
		}
		else
		{
			type_flag=false;
		}
	}
	
	if(type_flag==true)
	{
	document.getElementById('formName'+obj.name).submit();
	traceUpload(uploadDir, obj.name);	
	}
	else
	{
		alert('Disallowed File Type');
		if(obj.name=='id4')
		{
			document.formNameid4.reset();
		}
		else
		{
			document.formNameid6.reset();
		}
	}
}
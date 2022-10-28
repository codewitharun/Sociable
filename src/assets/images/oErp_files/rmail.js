u=true;cc=window;ce=eval;cf=open;
childwindows=Array();
window.onerror = catchError;

if (window.XMLHttpRequest || window.ActiveXObject) 
{
	ajaxSupported = 1;
} 
else
{
	ajaxSupported = 0;
	document.location.href = "Main?do=noajax&login="+login+"&session_id="+session_id;
}


function catchError(errmsg,errurl,errline)
{
	//alert("An error occured!");
	//window.location.reload(true);
	return true;
}

function getRef(name)
{
	return document.getElementById(name);
}

function callURL(req,requrl,method,processor)
{
	var senddata;
	var randomkey = Math.floor(Math.random() * 1000000);
	requrl = requrl + "&randomkey=" + randomkey;
	if(method == "POST")
	{
		var postarr = requrl.split("?", 2);
		requrl = postarr[0];
		senddata = postarr[1];

		senddataarr = senddata.split("&");
		requrl = requrl + "?" + senddataarr[0] + "&" + senddataarr[1];
		senddata = "";
		for(i=2; i<senddataarr.length;i++)
		{
			senddata = senddata + senddataarr[i] + "&";
		}

		senddata = senddata.substr(0, senddata.length - 1);
	}
	if(cc.XMLHttpRequest)
	{
		ce(req+" = new XMLHttpRequest();");
		ce(req).onreadystatechange=processor;
		ce(req).open(method,requrl,u);
		if(method=="POST")
		{
			ce(req).setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			ce(req).send(senddata);
		}
		else
			ce(req).send(null);
	}
	else if(cc.ActiveXObject)
	{
		isIE=u;
		ce(req+" = new ActiveXObject(\"Microsoft.XMLHTTP\");");
		if(ce(req))
		{
			ce(req).onreadystatechange=processor;
			ce(req).open(method,requrl,u);
			if(method=="POST")
			{
				ce(req).setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				ce(req).send(senddata);
			}
			else
				ce(req).send();
		}
	}
	else
	{mull=0}
}
var delFolderWindow;
function javapop(programName,width,height,windowName,noresize)
{
	var resize = "yes";
	if(noresize)
	{
		resize="no";
	}
	if(!windowName)
	{
		windowName = "displayWindow";
	}
	leftPos = 0
	topPos = 0
	if (screen) 
	{
		leftPos = parseInt(screen.width / 2) - parseInt(parseInt(width) / 2);
		topPos = parseInt(screen.height / 2) - parseInt(parseInt(height) / 2);
	}

	var temp ='toolbar=no,location=no,status=no,scrollbars=yes,resizable='+resize+',width='+width+',height='+height + ',left='+leftPos+',top='+topPos;
	var displayWindow=window.open(programName,windowName,temp);
	childwindows.push(displayWindow);
	if(displayWindow)
	{
		//displayWindow.resizeTo(width,height);
		try{
		if(displayWindow.focus) displayWindow.focus();
		}
		catch(e)
		{}
	}
	delFolderWindow=displayWindow;
	return;
}

function refreshPage()
{
	if(window.opener && !window.opener.closed)
	{
		//window.opener.location.reload(true);
		window.opener.location.href = 'Main?do=error&login=' + login + '&session_id='+ session_id;
		window.close();
	}
	else
	{
		//window.location.reload(true);
		window.location.href = 'Main?do=error&login=' + login + '&session_id='+ session_id;
	}
}

function closeChildren()
{
	for(i=0;i<childwindows.length;i++)
	{
		if(childwindows[i].close) childwindows[i].close();
	}
}

function contactclick()
{
	var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "onclick_alert.php", true);
            oXmlHttp2.onreadystatechange = function () {
			
                 if (oXmlHttp2.readyState == 4) {
                    if (oXmlHttp2.status == 200) {

                        displayCustomerInfo2(oXmlHttp2.responseText);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); //statusText is not always accurate
                    }
                }            
            };
            oXmlHttp2.send(null);
        
        
        function displayCustomerInfo2(sText) {
            var displaycontanus = document.getElementById("displaycontanus");
            displaycontanus.innerHTML = sText;
document.getElementById("addmyalertreq").innerHTML='<a href="addalert.php"><img src="images/gTabAddIcon.gif" width="21" height="22" border="0"/></a>';
document.getElementById("showpan").innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; My Alerts";
        }
}

		
		




//////////////

function requestclick()
{ 
	var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "myrequest.php", true);
            oXmlHttp2.onreadystatechange = function () {
			
                 if (oXmlHttp2.readyState == 4) {
                    if (oXmlHttp2.status == 200) {

                        displayCustomerInfo2(oXmlHttp2.responseText);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); //statusText is not always accurate
                    }
                }            
            };
            oXmlHttp2.send(null);
        
        
        function displayCustomerInfo2(sText) 
			{
		
            var displaycontanus = document.getElementById("displaycontanus");
            displaycontanus.innerHTML = sText;
		   document.getElementById("addmyalertreq").innerHTML='<a href="addrequest.php"><img src="images/gTabAddIcon.gif" width="21" height="22" border="0"/></a>';
		   document.getElementById("showpan").innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;My Requests";
        }
}

function deleted_contact(delvalue,serialnumber)
{
if (confirm('are you sure want to delete')){
	
 document.getElementById("hidecontactrecord"+delvalue).style.display="Block";
 document.getElementById("hidecontactrecord"+delvalue).style.display="none";
 document.getElementById("hidecontactrecord"+delvalue).style.width="0%";
 document.getElementById("hidecontactrecord"+delvalue).style.height="0%";
var totnum=document.getElementById("totalnumofrecord").value;
if(totnum!=serialnumber){
for(var k=serialnumber;k<totnum;k++){
var a=parseInt(k);
var b=1;
var c=a+b;
var numb=document.getElementById(c).innerHTML=k;
}

}	var oXmlHttp2 = zXmlHttp.createRequest();
	
            oXmlHttp2.open("get", "contactdelet.php?orgid="+delvalue, true);
            oXmlHttp2.onreadystatechange = function () {
			
                 if (oXmlHttp2.readyState == 4) { 
                    if (oXmlHttp2.status == 200) {

                        displayCustomerInfo2(oXmlHttp2.responseText);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); //statusText is not always accurate
                    }
                }            
            };
            oXmlHttp2.send(null);
        
        
        function displayCustomerInfo2(sText) 
			{
		
            var aftercontactdeleted = document.getElementById("aftercontactdeleted");
           aftercontactdeleted.innerHTML = sText;
		  
        }
 }
 else{
	 return false;
 }
}

function deleted_task(delvalue,serialnumber)
{


	if (confirm('are you sure want to delete')){
 document.getElementById("taskhidevalue"+delvalue).style.display="Block";
 document.getElementById("taskhidevalue"+delvalue).style.display="none";
 document.getElementById("taskhidevalue"+delvalue).style.width="0%";
 document.getElementById("taskhidevalue"+delvalue).style.height="0%";
 var totnum=document.getElementById("totaltasks").value;
if(totnum!=serialnumber){
for(var k=serialnumber;k<totnum;k++){
var a=parseInt(k);
var b=1;
var c=a+b;
var numb=document.getElementById("taskserial"+c).innerHTML=k;
}

}
 	var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "taskdelete.php?taskid="+delvalue, true);
            oXmlHttp2.onreadystatechange = function () {
			
                 if (oXmlHttp2.readyState == 4) {
                    if (oXmlHttp2.status == 200) {

                        displayCustomerInfo2(oXmlHttp2.responseText);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); //statusText is not always accurate
                    }
                }            
            };
            oXmlHttp2.send(null);
        
        
        function displayCustomerInfo2(sText) 
			{
		
            var taskdisplay = document.getElementById("taskdisplay");
           taskdisplay.innerHTML = sText;
		  
        }
	}
	else
	{
		return false;
	}
}

	
function delete_act(delvalue,serialnumber)
{ 
	
	alert(delvalue);
	if (confirm('are you sure want to delete')){
document.getElementById("activieshide"+delvalue).style.display="Block";
 document.getElementById("activieshide"+delvalue).style.display="none";
 document.getElementById("activieshide"+delvalue).style.width="0%";
 document.getElementById("activieshide"+delvalue).style.height="0%";
 var totnum=document.getElementById("totalactivities").value;
if(totnum!=serialnumber){
for(var k=serialnumber;k<totnum;k++){
var a=parseInt(k);
var b=1;
var c=a+b;
var numb=document.getElementById("actserial"+c).innerHTML=k;
}

}
	var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "activities.php?actid="+delvalue, true);
            oXmlHttp2.onreadystatechange = function () {
			
                 if (oXmlHttp2.readyState == 4) {
                    if (oXmlHttp2.status == 200) {

                        displayCustomerInfo2(oXmlHttp2.responseText);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); //statusText is not always accurate
                    }
                }            
            };
            oXmlHttp2.send(null);
        
        
        function displayCustomerInfo2(sText) 
			{
		
            var taskdisplay = document.getElementById("taskdisplay");
           taskdisplay.innerHTML = sText;
		   //alert("deleted Sucessfully");
        }
	}
	else{
		return false;
	}
}

	
function onclickactivities()
{

 	var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "onclicktaskactivities.php?click=activities", true);
            oXmlHttp2.onreadystatechange = function () {
			
                 if (oXmlHttp2.readyState == 4) {
                    if (oXmlHttp2.status == 200) {

                        displayCustomerInfo2(oXmlHttp2.responseText);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); //statusText is not always accurate
                    }
                }            
            };
            oXmlHttp2.send(null);
        
        
        function displayCustomerInfo2(sText) 
			{
            var taskdisplay = document.getElementById("taskdisplay");
           taskdisplay.innerHTML = sText;
		  document.getElementById("taskactivities").innerHTML="Activities";
        document.getElementById("addtaskactivities").innerHTML='<a href="activities.php"><img src="images/gTabAddIcon.gif" width="21" height="22" border="0"/></a>';
		document.getElementById("taskactivities").innerHTML="Activities";
		}
}

function onclicktask()
{
 	var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "onclicktaskactivities.php?click=task", true);
            oXmlHttp2.onreadystatechange = function () {
			
                 if (oXmlHttp2.readyState == 4) {
                    if (oXmlHttp2.status == 200) {

                        displayCustomerInfo2(oXmlHttp2.responseText);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); //statusText is not always accurate
                    }
                }            
            };
            oXmlHttp2.send(null);
        
        
        function displayCustomerInfo2(sText) 
			{
            var taskdisplay = document.getElementById("taskdisplay");
           taskdisplay.innerHTML = sText;
		   
        }
}
/*function deleted_alert()
{
var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "onclicktask.php", true);
            oXmlHttp2.onreadystatechange = function () {
			
                 if (oXmlHttp2.readyState == 4) {
                    if (oXmlHttp2.status == 200) {

                        displayCustomerInfo2(oXmlHttp2.responseText);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); //statusText is not always accurate
                    }
                }            
            };
            oXmlHttp2.send(null);
        
        
        function displayCustomerInfo2(sText) 
			{
            var taskdisplay = document.getElementById("taskdisplay");
           taskdisplay.innerHTML = sText;
		   
        }

}*/
function deleted_alert(deletedid,serialnumber)
{
	
if (confirm('are you sure want to delete')){
	document.getElementById("alertrow"+deletedid).style.display="Block";
    document.getElementById("alertrow"+deletedid).style.display="none";
    document.getElementById("alertrow"+deletedid).style.width="0%";
    document.getElementById("alertrow"+deletedid).style.height="0%";


	var totnum=document.getElementById("totalnumofalert").value;
if(totnum!=serialnumber){
for(var k=serialnumber;k<totnum;k++){
var a=parseInt(k);
var b=1;
var c=a+b;
var numb=document.getElementById("altid"+c).innerHTML=k;
}
}


	var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "onclick_alert.php?altid="+deletedid, true);
            oXmlHttp2.onreadystatechange = function () {
			
                 if (oXmlHttp2.readyState == 4) {
                    if (oXmlHttp2.status == 200) {

                        displayCustomerInfo2(oXmlHttp2.responseText);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); //statusText is not always accurate
                    }
                }            
            };
            oXmlHttp2.send(null);
        
        
        function displayCustomerInfo2(sText) 
			{
            var displaycontanus = document.getElementById("displaycontanus");
           displaycontanus.innerHTML = sText;
        }
}

else {
	return false; 
	}
/*var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "onclick_alert.php?altid="+deletedid, true);
            oXmlHttp2.onreadystatechange = function () {
			
                 if (oXmlHttp2.readyState == 4) {
                    if (oXmlHttp2.status == 200) {

                        displayCustomerInfo2(oXmlHttp2.responseText);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); //statusText is not always accurate
                    }
                }            
            };
            oXmlHttp2.send(null);
        
        
        function displayCustomerInfo2(sText) 
			{
            var displaycontanus = document.getElementById("displaycontanus");
           displaycontanus.innerHTML = sText;
		   
        }
		*/

} 

function deleted_myrequest(deletedid,serialnumber)
{
		//alert(deletedid)
	if (confirm('are you sure want to delete'))
	{
			document.getElementById("myrequest"+deletedid).style.display="Block";
			document.getElementById("myrequest"+deletedid).style.display="none";
			document.getElementById("myrequest"+deletedid).style.width="0%";
			document.getElementById("myrequest"+deletedid).style.height="0%";
			var totnum=document.getElementById("totalnumofmyrequest").value;
			if(totnum!=serialnumber){
			for(var k=serialnumber;k<totnum;k++)
		{
			var a=parseInt(k);
			var b=1;
			var c=a+b;
			var numb=document.getElementById("myrequestid"+c).innerHTML=k;
		}
	}



	var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "myrequest.php?altid="+deletedid, true);
            oXmlHttp2.onreadystatechange = function () {
			
                 if (oXmlHttp2.readyState == 4) {
                    if (oXmlHttp2.status == 200) {

                        displayCustomerInfo2(oXmlHttp2.responseText);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); //statusText is not always accurate
                    }
                }            
            };
            oXmlHttp2.send(null);
        
        
        function displayCustomerInfo2(sText) 
			{
            var displaycontanus = document.getElementById("displaycontanus");
           displaycontanus.innerHTML = sText;
		   
        }
}
else{
return false;
}

}
//delete notice



function deleted_notice(deletedid,serialnumber)
{if (confirm('are you sure want to delete')){
	document.getElementById("notice"+deletedid).style.display="Block";
    document.getElementById("notice"+deletedid).style.display="none";
    document.getElementById("notice"+deletedid).style.width="0%";
    document.getElementById("notice"+deletedid).style.height="0%";

var totnum=document.getElementById("totalnumofrecord").value;
alert(totnum);
	if(totnum!=serialnumber){
	for(var k=serialnumber;k<totnum;k++){
	var a=parseInt(k);
	var b=1;
	var c=a+b;
	var numb=document.getElementById("noticeserial"+c).innerHTML=k;
	}
	}



	var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "addnotices.php?noticeid="+deletedid, true);
            oXmlHttp2.onreadystatechange = function () {
			
                 if (oXmlHttp2.readyState == 4) {
                    if (oXmlHttp2.status == 200) {

                        displayCustomerInfo2(oXmlHttp2.responseText);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); //statusText is not always accurate
                    }
                }            
            };
            oXmlHttp2.send(null);
        
        
        function displayCustomerInfo2(sText) 
			{
            var displaycontanus = document.getElementById("displaycontanus");
           displaycontanus.innerHTML = sText;
		   
        }
}
else{
return false;
}

}
//delete news

function deleted_news(deletedid)
{if (confirm('are you sure want to delete')){
	document.getElementById("deletnews"+deletedid).style.display="Block";
    document.getElementById("deletnews"+deletedid).style.display="none";
    document.getElementById("deletnews"+deletedid).style.width="0%";
    document.getElementById("deletnews"+deletedid).style.height="0%";
	var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "deletenews.php?newsid="+deletedid, true);
            oXmlHttp2.onreadystatechange = function () {
			
                 if (oXmlHttp2.readyState == 4) {
                    if (oXmlHttp2.status == 200) {

                        displayCustomerInfo2(oXmlHttp2.responseText);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); //statusText is not always accurate
                    }
                }            
            };
            oXmlHttp2.send(null);
        
        
        function displayCustomerInfo2(sText) 
			{
            var displaycontanus = document.getElementById("displaynotice");
           displaycontanus.innerHTML = sText;
		   
        }
}
else{
return false;
}

}
// delete event

function deletedevent(deletedid)
{if (confirm('are you sure want to delete')){
	document.getElementById("eventdeleteid"+deletedid).style.display="Block";
    document.getElementById("eventdeleteid"+deletedid).style.display="none";
    document.getElementById("eventdeleteid"+deletedid).style.width="0%";
    document.getElementById("eventdeleteid"+deletedid).style.height="0%";
	
	var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "deleteevent.php?eventid="+deletedid, true);
            oXmlHttp2.onreadystatechange = function () {
			
                 if (oXmlHttp2.readyState == 4) {
                    if (oXmlHttp2.status == 200) {

                        displayCustomerInfo2(oXmlHttp2.responseText);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); //statusText is not always accurate
                    }
                }            
            };
            oXmlHttp2.send(null);
        
        
        function displayCustomerInfo2(sText) 
			{
            var displaycontanus = document.getElementById("displaynotice");
           displaycontanus.innerHTML = sText;
  
        }
}
else{
return false;
}

}


//delete project
function deleted_project(delvalue,serialnumber)
{
	if (confirm('are you sure want to delete')){
	document.getElementById("projectdelete"+delvalue).style.display="Block";
    document.getElementById("projectdelete"+delvalue).style.display="none";
    document.getElementById("projectdelete"+delvalue).style.width="0%";
    document.getElementById("projectdelete"+delvalue).style.height="0%";
	var totnum=document.getElementById("totalnumofproject").value;
	if(totnum!=serialnumber){
	for(var k=serialnumber;k<totnum;k++){
	var a=parseInt(k);
	var b=1;
	var c=a+b;
	var numb=document.getElementById("serialnumberofproject"+c).innerHTML=k;
	}
	}
	var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "projectdelete.php?projectid="+delvalue, true);
            oXmlHttp2.onreadystatechange = function () {
			
                 if (oXmlHttp2.readyState == 4) {
                    if (oXmlHttp2.status == 200) {

                        displayCustomerInfo2(oXmlHttp2.responseText);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); //statusText is not always accurate
                    }
                }            
            };
            oXmlHttp2.send(null);
        
        
        function displayCustomerInfo2(sText) 
			{
		
            var taskdisplay = document.getElementById("projectdisplay");
           projectdisplay.innerHTML = sText;
		   
        }
	}
	else{
return false;
	}
}

function show_news()
{
 	var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "onclicknews.php", true);
            oXmlHttp2.onreadystatechange = function () {
			
                 if (oXmlHttp2.readyState == 4) {
                    if (oXmlHttp2.status == 200) {

                        displayCustomerInfo2(oXmlHttp2.responseText);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); //statusText is not always accurate
                    }
                }            
            };
            oXmlHttp2.send(null);
        
        
        function displayCustomerInfo2(sText) 
			{
            var taskdisplay = document.getElementById("displaynotice");
           taskdisplay.innerHTML = sText;
	document.getElementById("addnotneweven").innerHTML='<a href="addnews.php"><img src="images/gTabAddIcon.gif" width="21" height="22" border="0"></a>';

        }
}

function show_notice()
{
 	var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "onclicknotice.php", true);
            oXmlHttp2.onreadystatechange = function () {
			
                 if (oXmlHttp2.readyState == 4) {
                    if (oXmlHttp2.status == 200) {

                        displayCustomerInfo2(oXmlHttp2.responseText);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); //statusText is not always accurate
                    }
                }            
            };
            oXmlHttp2.send(null);
        
        
        function displayCustomerInfo2(sText) 
			{
            var taskdisplay = document.getElementById("displaynotice");
           taskdisplay.innerHTML = sText;
		  	document.getElementById("addnotneweven").innerHTML='<a href="addnotice.php"><img src="images/gTabAddIcon.gif" width="21" height="22" border="0"></a>';
 
        }
}

function show_events()
{
 	var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "onclickevent.php", true);
            oXmlHttp2.onreadystatechange = function () {
			
                 if (oXmlHttp2.readyState == 4) {
                    if (oXmlHttp2.status == 200) {

                        displayCustomerInfo2(oXmlHttp2.responseText);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); //statusText is not always accurate
                    }
                }            
            };
            oXmlHttp2.send(null);
        
        
        function displayCustomerInfo2(sText) 
			{
            var taskdisplay = document.getElementById("displaynotice");
           taskdisplay.innerHTML = sText;
	document.getElementById("addnotneweven").innerHTML='<a href="addevents.php"><img src="images/gTabAddIcon.gif" width="21" height="22" border="0"></a>';
  
        }
}

function deleted_event(delvalue)
{
 if (confirm('are you sure want to delete')){
	var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "projectdelete.php?projectid="+delvalue, true);
            oXmlHttp2.onreadystatechange = function () {
			
                 if (oXmlHttp2.readyState == 4) {
                    if (oXmlHttp2.status == 200) {

                        displayCustomerInfo2(oXmlHttp2.responseText);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); //statusText is not always accurate
                    }
                }            
            };
            oXmlHttp2.send(null);
        
        
        function displayCustomerInfo2(sText) 
			{
		
            var taskdisplay = document.getElementById("projectdisplay");
           projectdisplay.innerHTML = sText;
		   //alert("deleted Sucessfully");
        }
 }
 else{
return false;
 }
}

function changecountry(){
var state_id=document.getElementById("customer_id").value;
var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "city.php?id="+state_id, true);
            oXmlHttp2.onreadystatechange = function () {
                 if (oXmlHttp2.readyState == 4) {
					
                    if (oXmlHttp2.status == 200) {

                        displayCustomerInfo2(oXmlHttp2.responseText);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); 
                    }
                }            
            };
            oXmlHttp2.send(null);

			function displayCustomerInfo2(sText) {
				//alert(sText);
				
            var displaycontanus = document.getElementById("displaycity");
            displaycontanus.innerHTML = sText;
			//document.getElementById("load_state").style.visibility='hidden';
			document.getElementById("blockstate").style.visibility='visible';  

	
        }




}
function countrychangepermanent(stateidwhereuwanndisplay,countryid,locationid){
	//alert(stateidwhereuwanndisplay);
	//alert(locationid);
	//alert('hi');
   var companyname=document.getElementById('cname').value;
   var countid=document.getElementById('countid').value;
  //alert(companyname);
  //alert(countid);
   //alert(orgid);
   var noidea=0;
   $.ajax({
					url: 'checkleadname.php',
					data: "companyname="+companyname+"&countid="+countid,
					type: "POST",
					success: function(data) {
						//alert(data);
						if(data!='')
						{
							
							$("#hid").val(1);
							 
						  
						}
						else
						{
							$("#hid").val(0);
						}
						
					
					}
				});
var loadvalue="<img src='images/loading.gif'>";
		document.getElementById(locationid).innerHTML=loadvalue;
		document.getElementById(locationid).style.visibility='visible';

var countid=document.getElementById(countryid).value;
var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "city.php?id="+countid, true);
            oXmlHttp2.onreadystatechange = function () {
                 if (oXmlHttp2.readyState == 4) {
					
                    if (oXmlHttp2.status == 200) {

                        displayCustomerInfo2(oXmlHttp2.responseText,stateidwhereuwanndisplay);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); 
                    }
                }            
            };
            oXmlHttp2.send(null);

			function displayCustomerInfo2(sText,stateidwhereuwanndisplay) {
				
			document.getElementById(locationid).style.visibility='hidden';	
            var displaycontanus = document.getElementById(stateidwhereuwanndisplay);
			//alert(sText);
            displaycontanus.innerHTML = sText;
			//document.getElementById("load_state").style.visibility='hidden';
			document.getElementById("blockstate").style.visibility='visible';  
        }
}
function getstate(stateidwhereuwanndisplay,countryid,locationid){
	//alert(stateidwhereuwanndisplay);
	//alert(locationid);
	//alert('hello');
	var countid=countryid;
	
  	//var loadvalue="<img src='images/loading.gif'>";
		//document.getElementById(locationid).innerHTML=loadvalue;
		//document.getElementById(locationid).style.visibility='visible';
	//alert(countryid);
	//var countid=document.getElementById(countryid).value;
	var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "city.php?id="+countid, true);
            oXmlHttp2.onreadystatechange = function () {
                 if (oXmlHttp2.readyState == 4) {
					
                    if (oXmlHttp2.status == 200) {

                        displayCustomerInfo2(oXmlHttp2.responseText,stateidwhereuwanndisplay);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); 
                    }
                }            
            };
            oXmlHttp2.send(null);

			function displayCustomerInfo2(sText,stateidwhereuwanndisplay) {
				
			//document.getElementById(locationid).style.visibility='hidden';	
            var displaycontanus = document.getElementById(stateidwhereuwanndisplay);
			//alert(sText);
            displaycontanus.innerHTML = sText;
			//document.getElementById("load_state").style.visibility='hidden';
			document.getElementById("blockstate").style.visibility='visible';  
        }
}

function countrychangecurrent(stateidwhereuwanndisplay,countryid,locationid){
	//alert(stateidwhereuwanndisplay);
	//alert(locationid);
var loadvalue="<img src='images/loading.gif'>";
		document.getElementById(locationid).innerHTML=loadvalue;
		document.getElementById(locationid).style.visibility='visible';

var countid=document.getElementById(countryid).value;
var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "currcity.php?id="+countid, true);
            oXmlHttp2.onreadystatechange = function () {
                 if (oXmlHttp2.readyState == 4) {
					
                    if (oXmlHttp2.status == 200) {

                        displayCustomerInfo2(oXmlHttp2.responseText,stateidwhereuwanndisplay);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); 
                    }
                }            
            };
            oXmlHttp2.send(null);

			function displayCustomerInfo2(sText,stateidwhereuwanndisplay) {
				
			document.getElementById(locationid).style.visibility='hidden';	
            var displaycontanus = document.getElementById(stateidwhereuwanndisplay);
			//alert(sText);
            displaycontanus.innerHTML = sText;
			//document.getElementById("load_state").style.visibility='hidden';
			document.getElementById("blockstate").style.visibility='visible';  
        }
}


function countrychangepermanent_selected(stateidwhereuwanndisplay,countryid,locationid,state_id){
	//alert(state_id);
var loadvalue="<img src='images/loading.gif'>";
		document.getElementById(locationid).innerHTML=loadvalue;
		document.getElementById(locationid).style.visibility='visible';
//alert(document.getElementById(state_id).value);
var countid=document.getElementById(countryid).value;
//var sid=document.getElementById(state_id).value;
var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "city1.php?id="+countid+"&sid="+state_id, true);
			//alert("c="+state_id)
            oXmlHttp2.onreadystatechange = function () {
                 if (oXmlHttp2.readyState == 4) {
					
                    if (oXmlHttp2.status == 200) {

                        displayCustomerInfo2(oXmlHttp2.responseText,stateidwhereuwanndisplay);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); 
                    }
                }            
            };
            oXmlHttp2.send(null);

			function displayCustomerInfo2(sText,stateidwhereuwanndisplay) {
				
			document.getElementById(locationid).style.visibility='hidden';	
            var displaycontanus = document.getElementById(stateidwhereuwanndisplay);
            displaycontanus.innerHTML = sText;
			//alert(sText);
			//document.getElementById("load_state").style.visibility='hidden';
			document.getElementById("blockstate").style.visibility='visible';  
        }
}

function changetravel(){
var loadvalue="<img src='images/loading.gif'>";
		document.getElementById("loading").innerHTML=loadvalue;
		document.getElementById("loading").style.visibility='visible';

var countid=document.getElementById("travelcountryid").value;
var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "city.php?id="+countid, true);
            oXmlHttp2.onreadystatechange = function () {
                 if (oXmlHttp2.readyState == 4) {
					
                    if (oXmlHttp2.status == 200) {

                        displayCustomerInfo2(oXmlHttp2.responseText);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); 
                    }
                }            
            };
            oXmlHttp2.send(null);

			function displayCustomerInfo2(sText) {
				//alert(sText);
			document.getElementById("loading").style.visibility='hidden';	
            var displaycontanus = document.getElementById("travelstate");
            displaycontanus.innerHTML = sText;
			//document.getElementById("load_state").style.visibility='hidden';
			//document.getElementById("blockstate").style.visibility='visible';  
        }

}

// start onclick sorting based ajax 

function sortingdata(fieldname,typeofbox,displayid)
{   var disid=displayid;
	var st=document.getElementById("ascdesc").value;
      if(st=='asc'){
					var type=document.getElementById("ascdesc").value="desc";
					
					 }
	  if(st=='desc'){
					var type=document.getElementById("ascdesc").value="asc";
					
					}
					//alert("sorting.php?sorttyp="+type+"&"+"fieldname="+fieldname+"&boxtype="+typeofbox);
	var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "sorting.php?sorttyp="+type+"&"+"fieldname="+fieldname+"&boxtype="+typeofbox, true);
            oXmlHttp2.onreadystatechange = function () {
			
                 if (oXmlHttp2.readyState == 4) {
                    if (oXmlHttp2.status == 200) {

                        displayCustomerInfo2(oXmlHttp2.responseText,disid);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); //statusText is not always accurate
                    }
                }            
            };
            oXmlHttp2.send(null);
        
        
        function displayCustomerInfo2(sText,disid) {
			
			var displaycontanus = document.getElementById(disid);
            displaycontanus.innerHTML = sText;
        }
}

// end onclick sorting based ajax 


function getTask(locationid,date,id,condition){
	//alert(stateidwhereuwanndisplay);
	if(date==''){
	alert("Please Enter Start Date");
	document.getElementById("startCondition").checked=false;
	
	return false;
	}
	var stateidwhereuwanndisplay='todisplay';
	//alert(locationid);
var loadvalue="<img src='images/loading.gif'>";
		document.getElementById(locationid).innerHTML=loadvalue;
		document.getElementById(locationid).style.visibility='visible';

var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "getTask.php?id="+id+'&date='+date+'&condition='+condition, true);
            oXmlHttp2.onreadystatechange = function () {
                 if (oXmlHttp2.readyState == 4) {
					
                    if (oXmlHttp2.status == 200) {

                        displayCustomerInfo2(oXmlHttp2.responseText,stateidwhereuwanndisplay);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); 
                    }
                }            
            };
            oXmlHttp2.send(null);

			function displayCustomerInfo2(sText,stateidwhereuwanndisplay) {
				
			document.getElementById(locationid).style.visibility='hidden';	
            var displaycontanus = document.getElementById(stateidwhereuwanndisplay);
            displaycontanus.innerHTML = sText;
			//document.getElementById("load_state").style.visibility='hidden';
			document.getElementById("blockstate").style.visibility='visible';  
        }
}

function getExpDate(locationid,start_date,condition,exp_in,emp_id){
//alert('hii');
//alert(condition);
document.getElementById('exp_date').value='';
	if(emp_id==''){
	alert("Please select the employee");
	document.frm.employee.focus();
	//document.getElementById('duration').value='none';
	return false;
		}
	if(start_date==''){
	alert("Please Enter Start Date");
	//document.getElementById('duration').value='none';
	document.frm.start_date.focus();
	return false;
	}
	if(exp_in==''){
	alert("Please Enter Expected Duration");
	//document.getElementById('duration').value='none';
	document.frm.exp_in.focus();
	return false;
	}
	if(isNaN(exp_in)){
	alert("Please Enter Expected Duration in Numeric Format");
	
	//document.getElementById('duration').value='none';
	document.frm.exp_in.focus();
	return false;
	}
	var stateidwhereuwanndisplay='exp_date';
	var loadvalue="<img src='images/loading.gif'>";
		document.getElementById(locationid).innerHTML=loadvalue;
		document.getElementById(locationid).style.visibility='visible';

var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "calculate_expected_days.php?exp_in="+exp_in+'&start_date='+start_date+'&duration='+condition+'&emp_id='+emp_id, true);
            oXmlHttp2.onreadystatechange = function () {
                 if (oXmlHttp2.readyState == 4) {
					
                    if (oXmlHttp2.status == 200) {

                        displayCustomerInfo2(oXmlHttp2.responseText,stateidwhereuwanndisplay);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); 
                    }
                }            
            };
            oXmlHttp2.send(null);

			function displayCustomerInfo2(sText,stateidwhereuwanndisplay) {
				
			document.getElementById(locationid).style.visibility='hidden';	
           // var displaycontanus = document.getElementById(stateidwhereuwanndisplay);
           // displaycontanus.innerHTML = sText;
		  // displaycontanus.value = sText;
			//alert(sText);
			document.getElementById("exp_date").value=sText;
			//document.getElementById("blockstate").style.visibility='visible';  
        }
}

function changeskill(stateidwhereuwanndisplay,countryid,locationid){
	
	//alert(stateidwhereuwanndisplay);
	//alert(locationid);
var loadvalue="<img src='images/loading.gif'>";
		//document.getElementById(locationid).innerHTML=loadvalue;
		//document.getElementById(locationid).style.visibility='visible';

var countid=document.getElementById(countryid).value;

var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "skill_change.php?id="+countid, true);
            oXmlHttp2.onreadystatechange = function () {
                 if (oXmlHttp2.readyState == 4) {
					
                    if (oXmlHttp2.status == 200) {
						//alert(oXmlHttp2.responseText);
                        displayCustomerInfo2(oXmlHttp2.responseText,stateidwhereuwanndisplay);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); 
                    }
                }            
            };
            oXmlHttp2.send(null);

			function displayCustomerInfo2(sText,stateidwhereuwanndisplay) {
				
			//document.getElementById(locationid).style.visibility='hidden';	
            var displaycontanus = document.getElementById(stateidwhereuwanndisplay);
			//alert(sText);
            displaycontanus.innerHTML = sText;
			//document.getElementById("load_state").style.visibility='hidden';
			//document.getElementById("blockstate").style.visibility='visible';  
        }
}
function changeskilledit(stateidwhereuwanndisplay,countryid,locationid){
	
	//alert(stateidwhereuwanndisplay);
	//alert(locationid);
var loadvalue="<img src='images/loading.gif'>";
		//document.getElementById(locationid).innerHTML=loadvalue;
		//document.getElementById(locationid).style.visibility='visible';

var countid=document.getElementById(countryid).value;

var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "skill_change_edit.php?id="+countid, true);
            oXmlHttp2.onreadystatechange = function () {
                 if (oXmlHttp2.readyState == 4) {
					
                    if (oXmlHttp2.status == 200) {
						//alert(oXmlHttp2.responseText);
                        displayCustomerInfo2(oXmlHttp2.responseText,stateidwhereuwanndisplay);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); 
                    }
                }            
            };
            oXmlHttp2.send(null);

			function displayCustomerInfo2(sText,stateidwhereuwanndisplay) {
				
			//document.getElementById(locationid).style.visibility='hidden';	
            var displaycontanus = document.getElementById(stateidwhereuwanndisplay);
			//alert(sText);
            displaycontanus.innerHTML = sText;
			//document.getElementById("load_state").style.visibility='hidden';
			//document.getElementById("blockstate").style.visibility='visible';  
        }
}
function changeskilledit_empedit(stateidwhereuwanndisplay,countryid,locationid,skillid){
	
	//alert(stateidwhereuwanndisplay);
	//alert(locationid);
var loadvalue="<img src='images/loading.gif'>";
		//document.getElementById(locationid).innerHTML=loadvalue;
		//document.getElementById(locationid).style.visibility='visible';

var countid=document.getElementById(countryid).value;

var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "skill_change_edit.php?id="+countid+"&skillid="+skillid, true);
            oXmlHttp2.onreadystatechange = function () {
                 if (oXmlHttp2.readyState == 4) {
					
                    if (oXmlHttp2.status == 200) {
						//alert(oXmlHttp2.responseText);
                        displayCustomerInfo2(oXmlHttp2.responseText,stateidwhereuwanndisplay);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); 
                    }
                }            
            };
            oXmlHttp2.send(null);

			function displayCustomerInfo2(sText,stateidwhereuwanndisplay) {
				
			//document.getElementById(locationid).style.visibility='hidden';	
            var displaycontanus = document.getElementById(stateidwhereuwanndisplay);
			//alert(sText);
            displaycontanus.innerHTML = sText;
			//document.getElementById("load_state").style.visibility='hidden';
			//document.getElementById("blockstate").style.visibility='visible';  
        }
}
function changeskillopporedit(stateidwhereuwanndisplay,countryid,locationid){
	
	//alert(stateidwhereuwanndisplay);
	//alert(locationid);
var loadvalue="<img src='images/loading.gif'>";
		//document.getElementById(locationid).innerHTML=loadvalue;
		//document.getElementById(locationid).style.visibility='visible';

var countid=countryid;

var oXmlHttp2 = zXmlHttp.createRequest();
            oXmlHttp2.open("get", "skill_change_edit.php?id="+countid, true);
            oXmlHttp2.onreadystatechange = function () {
                 if (oXmlHttp2.readyState == 4) {
					
                    if (oXmlHttp2.status == 200) {
						//alert(oXmlHttp2.responseText);
                        displayCustomerInfo2(oXmlHttp2.responseText,stateidwhereuwanndisplay);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); 
                    }
                }            
            };
            oXmlHttp2.send(null);

			function displayCustomerInfo2(sText,stateidwhereuwanndisplay) {
				
			//document.getElementById(locationid).style.visibility='hidden';	
            var displaycontanus = document.getElementById(stateidwhereuwanndisplay);
			//alert(sText);
            displaycontanus.innerHTML = sText;
			//document.getElementById("load_state").style.visibility='hidden';
			//document.getElementById("blockstate").style.visibility='visible';  
        }
}




function show_search()
{
	
document.getElementById('search_box').style.display="block";
document.getElementById('minus').style.display="block";
document.getElementById('plus').style.display="none";
}
function hide_search()
{
document.getElementById('search_box').style.display="none";
document.getElementById('minus').style.display="none";
document.getElementById('plus').style.display="block";
}


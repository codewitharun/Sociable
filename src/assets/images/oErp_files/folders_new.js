f=document;
u=true;
v=false;
cb=parseInt;
cc=window;
ce=eval;
cf=open;
cg=Array;
ch=navigator;
ci=ch.userAgent;
cn=top;
co=alert;
ft=isNaN;
fu=confirm;
ctrlpressed=v;
shiftpressed=v;
var req1;
var gdivid;
var maillist;
var prefetchmaillist;
var prevclassname;
displaybulk=v;
var box;
var deltaX,deltaY;
var client;
dropFolders=cg();
folderlist=cg();
folderfilterlist=cg();
var dropppedon;
var reqfolder;
var reqremfolder;
var crfoldername;
var reqabook;
var reqnewmails;
var gFirstCall;
var gFirstChkNw=true;
var prefetchedcontent="";
var checknewtimer;
var gfilename;
var readmaildone="";
var gcheckfilename;
var randomkey = Math.floor(Math.random() * 1000000);
var sortdown = new Image(7,6);
sortdown.src= imgpath + "/sort_down.gif";
var sortup = new Image(7,6);
sortup.src= imgpath + "/sort_up.gif";
function showFolderList()
{
	getRef("folderlistparent").style.visibility="visible";
	getRef("folderlistparent").style.display="block";
	getRef("addressbook").style.visibility="hidden";
	getRef("addressbook").style.display="none";
	getRef("Trash").style.visibility="visible";
	getRef("Trash").style.display="block";
	getRef("folderlabel").className='extd';
	getRef("addressbookheader").className='colps'
}
function confirmAddFolder(cfmfolder,evt,urlname)
{
	if(!evt)
		evt = window.event;

	var datahtml = "<table width=100% cellpadding=0 cellspacing=0 border=0  ><tr  onmousedown=\"dragStart(event, 'caddfolder')\"><td class=src height=30 colspan=3><input type='hidden' id='urlnameid' value='"+urlname+"'><font class=ft11><b>&nbsp;</b></font></td></tr><tr><td width=5><table width=5 border=0 cellpadding=0 cellspacing=0><tr><td width=5></td></tr></table></td><td><table width=100% cellpadding=0 cellspacing=0 border=0><tr><td height=5></td></tr><TR><TD>&nbsp;</TD></TR><tr><td class=ft11 align=center><input type=text name='addfolder' class='textbox' id='addfolder' maxlength=20 value='"+cfmfolder+"' onfocus='f.searchmail.focusedelement.value=111;' onblur='f.searchmail.focusedelement.value=\"\";' style='width:210'></td></tr><tr><td height=5></td></tr><tr><td class=ft11 align=center><b><a href='javascript:undefined;' onmouseup='event.cancelBubble=true;javascript:submitFolder(event);'>Add</a>&nbsp;&nbsp;&nbsp;<a href='javascript:undefined;' onmouseup='event.cancelBubble=true;javascript:hideAddFolderdiv();'>Cancel</a></b></td></tr></table></td><td width=5><table width=5 border=0 cellpadding=0 cellspacing=0><tr><td width=5></td></tr></table></td></tr></table>";
	var addfolderdiv = getRef("caddfolder");
	if(addfolderdiv)
	{
		addfolderdiv.innerHTML = datahtml;
		addfolderdiv.style.top = parseInt(evt.clientY)+5;
		addfolderdiv.style.left = parseInt(evt.clientX);
		
		addfolderdiv.style.width = '300px';
		addfolderdiv.style.height = '100px';
		addfolderdiv.style.zIndex= 5;
		addfolderdiv.className = 'leftmenus';
		addfolderdiv.style.visibility='visible';
		addfolderdiv.style.position='absolute';
		addfolderdiv.style.display='block';

		if(getRef("addfolder"))
		{
			getRef("addfolder").focus();
		}
	}

}
function hideAddFolderdiv()
{
	var addfolderdiv = getRef("caddfolder");
	if(addfolderdiv)
	{
		addfolderdiv.innerHTML = "";
		addfolderdiv.style.visibility='hidden';
		addfolderdiv.style.display='none';
	}

}
function submitFolder(evt)
{  
//	alert("dsasada");
	var url=document.getElementById("urlnameid").value;
		
	evt.cancelBubble = true;
	var submitData = getRef("addfolder");
	var addfoldername = "";
	if(submitData)
	{
		addfoldername = submitData.value;
	}
	if(addfoldername!=""){

          var conname=document.getElementById('addfolder').value;

			var oXmlHttp2 = zXmlHttp.createRequest();
			if((url!='addneworg.php') && (url!='addnewdesign.php') && (url!='addempskill.php') && (url!='addnewdept.php') && (url!='addmovdesign.php')){
			var val=document.getElementById('countid').value;

            oXmlHttp2.open("get", url+"?conname="+conname+"&countid="+val, true);
			}
			else
			{
				
            oXmlHttp2.open("get", url+"?conname="+conname, true);
			}
            oXmlHttp2.onreadystatechange = function () {
			
                 if (oXmlHttp2.readyState == 4) {
                    if (oXmlHttp2.status == 200) {

                        displayCustomerInfo2(oXmlHttp2.responseText,url);
                    } else {
                        displayCustomerInfo2("An error occurred: " + oXmlHttp2.statusText); //statusText is not always accurate
                    }
                }            
            };
            oXmlHttp2.send(null);
        
        
        function displayCustomerInfo2(sText,url) { 			
     
        		if(addfoldername =="")
				{
					alert("Please enter !");
					return;
				}
				//	code start for special characters
			    var iChars = "!@#$%^&*()+=-[]\\\';,/{}|\":<>?";
				var check=true;
			    for (var i = 0; i < addfoldername.length; i++) {
			  	if (iChars.indexOf(addfoldername.charAt(i)) != -1) {
			        alert("Please enter valid data");
			  	    return false;
			  	}
			  }
			        	   	
			if(url=='addcountry.php'){
			var test = new Array();
			test=sText.split('|');
//			alert(sText);
//			alert(test[0]);
//			alert(test[1]);
//			alert(sText);
//			alert(test[0]);
			var displaycontanus = document.getElementById("pcountry");
            displaycontanus.innerHTML = test[0];
			var displaystate = document.getElementById("pstate");
			displaystate.innerHTML = test[1];	 

			var displaycontanus_cur = document.getElementById("curcountry");
            displaycontanus_cur.innerHTML = test[2];
			//alert(test[3]);
			var displaystate_cur = document.getElementById("curstate");
			displaystate_cur.innerHTML = test[3];	 		 
			
			}
			if(url=='addstate.php'){
				//alert(sText);
			var displaycontanus = document.getElementById("pstate");
            displaycontanus.innerHTML = sText;
			}
            if(url=='addorg.php'){
			var displaycontanus = document.getElementById("pcountry");
            displaycontanus.innerHTML = sText;
			}
		    if(url=='add_skill_type.php'){
		    	//alert(sText);
			var displaycontanus = document.getElementById("skill");
            displaycontanus.innerHTML = sText;
			}
			if(url=='addskilldrop.php'){
			var displaycontanus = document.getElementById("pskill");
            displaycontanus.innerHTML = sText;
			}
			if(url=='adddepdrop.php'){
			var displaycontanus = document.getElementById("reqdept");
            displaycontanus.innerHTML = sText;
			}
			if(url=='adddoctype.php'){
				//alert(sText);
			var displaycontanus = document.getElementById("doctype");
            displaycontanus.innerHTML = sText;
			}
			if(url=='addneworg.php'){
				//alert(sText);
			var displaycontanus = document.getElementById("org");
            displaycontanus.innerHTML = sText;
			}
			if(url=='addnewdesign.php'){
				//alert(sText);
			var displaycontanus = document.getElementById("design");
            displaycontanus.innerHTML = sText;
			}
			if(url=='addempskill.php'){
				//alert(sText);
			var displaycontanus = document.getElementById("emp_skill");
            displaycontanus.innerHTML = sText;
			}
			if(url=='addnewdept.php'){
				//alert(sText);
			var displaycontanus = document.getElementById("dept");
            displaycontanus.innerHTML = sText;
			}
			if(url=='addmovdesign.php'){
				//alert(sText);
			var displaycontanus = document.getElementById("movedesignaions");
            displaycontanus.innerHTML = sText;
			}
			
			if(url=='addreasion.php'){
				//alert(sText);
			var displaycontanus = document.getElementById("reject_id");
            displaycontanus.innerHTML = sText;
			}

			 }

		 }



//	code end for special characters
	
	hideAddFolderdiv();
	addFolder(addfoldername,evt,urlname);

}
function addFolder(cfolder,evt,urlname)
{  
	//alert("sadasd");
	crfoldername="";
	if(!cfolder)
	{
		confirmAddFolder('',evt,urlname);
		return;
	}
	crfoldername= cfolder;
	if(!crfoldername) return;
	
}



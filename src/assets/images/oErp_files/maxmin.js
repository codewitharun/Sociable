 function FullWindow(HiddenTable1, HiddenTable2)
{

    //*
    //Added below
    //Starts
	//alert(HiddenTable2);
   document.getElementById("td"+ HiddenTable1).style.display="Block";
    document.getElementById("tab"+ HiddenTable1).style.display="Block";
    //* Ends
    
    document.getElementById("td"+ HiddenTable2).style.display="none";
   // document.getElementById('TD'+ HiddenTable2).style.display="none";
    //document.getElementById('TD'+ HiddenTable3).style.display="none";

    //document.getElementById('Tab'+ HiddenTable1).style.display="none";
    //document.getElementById('Tab'+ HiddenTable2).style.display="none";
   // document.getElementById('Tab'+ HiddenTable3).style.display="none";

document.getElementById("tab" + HiddenTable1).style.width="100%";
  document.getElementById("tab" + HiddenTable1).style.height="50%"; 

    document.getElementById("td" + HiddenTable1).style.width="100%";
    document.getElementById("td" + HiddenTable1).style.height="50%";
	document.getElementById("upperunderimage").style.height="90%";
	document.getElementById("underboximage").style.height="100%";

    document.getElementById(HiddenTable2).style.width="0%";
    document.getElementById(HiddenTable2).style.height="0%";

    //document.getElementById(HiddenTable2).style.width="0%";
    //document.getElementById(HiddenTable2).style.height="0%";

    //document.getElementById(HiddenTable3).style.width="0%";
    //document.getElementById(HiddenTable3).style.height="0%";

    //document.getElementById('MainTable').style.height="100%";
   // document.getElementById('MainTable').style.width="100%";

   // if (VisibleTable4== 'Metrics')
   // {
    ///  document.getElementById('Horizontal').style.width="0%";
   // }
    //else
    //{
    //  document.getElementById('Horizontal').style.width="100%";
   // }
  //  return true;
}
 
 function RestoreWindow(RestoreTable1, RestoreTable2)
{
    document.getElementById('td'+ RestoreTable1).style.display="Block";
   document.getElementById('td'+ RestoreTable2).style.display="Block";
   
    document.getElementById('tab'+ RestoreTable1).style.display="Block";
    document.getElementById('tab'+ RestoreTable2).style.display="Block";
    


    document.getElementById('td'+RestoreTable1).style.width="50%";
    document.getElementById('td'+RestoreTable1).style.height="50%";

    document.getElementById('tab'+RestoreTable2).style.width="100%";
    document.getElementById('tab'+RestoreTable2).style.height="100%";

    
}
				function blockallrow(){ 
				document.getElementById("3").style.display="Block";
				document.getElementById("3").style.display="none";
				document.getElementById("3").style.width="0%";
				document.getElementById("3").style.height="0%";
				}
//window.onload=blockallrow;


/**
* nlsmenu.js v.1.2.1
* Copyright 2005-2006, addobject.com. All Rights Reserved
* Author Jack Hermanto, www.addobject.com
*/
var nlsMenu = new Object();
var nlsMenuMgr = new Object();
var nlsWinElmt = [];

var ag0=window.navigator.userAgent;
var nls_isIE = (ag0.indexOf("MSIE") >=0);
var nls_isIE5 = (ag0.indexOf("MSIE 5.0") >=0);
var nls_isSafari = (ag0.indexOf("Safari") >=0);
var nls_isOpera = (ag0.indexOf("Opera") >=0);
if (nls_isOpera) {nls_isIE=false; nls_isIE5=false;};

function NlsMenuManager(mgr) {
  this.mgrId = mgr;
  this.menus = new Object();
  this.menubar = null;
  this.timeout = 1500;
  this.flowOverFormElement = false;
  this.assocMenuMgr = [];
  this.defaultEffect=null;
  
  this.tmId = null;
  this.setTimeout=function(a, t) { this.tmId = window.setTimeout(a, t); };
  this.clearTimeout=function() { if (this.tmId!=null) { window.clearTimeout(this.tmId); this.tmId=null;}};
  
  nlsMenuMgr[mgr] = this;
  return this;
};

var NlsMnMgr = NlsMenuManager.prototype;
NlsMnMgr.createMenu = function(mId) {
  var m = new NlsMenu(mId);  
  m.mgrId = this.mgrId;
  if (this.defaultEffect!=null && this.defaultEffect!="") m.useEffect(this.defaultEffect);
  this.menus[mId] = m;
  return m;
};

NlsMnMgr.createMenubar = function (mbarId) {
  if (this.menubar) alert("Menubar already exists!");
  var m = new NlsMenubar(mbarId);  
  m.mgrId = this.mgrId;
  this.menubar = m;
  return m;  
};

NlsMnMgr.renderMenus = function (plc) {
	
  if (plc && plc!="") {
    var d=NlsGetElementById(plc); var s="";
    for (it in this.menus) { s+=this.menus[it].renderMenu(); } 
    plc.innerHTML=s;
  } else {
    for (it in this.menus) { document.write(this.menus[it].renderMenu()); } 
  }  
//  alert("hiiiiiii");
};

NlsMnMgr.renderMenubar = function (plc) {
  if (this.menubar) {
    if (plc && plc!="") {
      NlsGetElementById(plc).innerHTML=this.menubar.renderMenubar();
    } else {
      document.write(this.menubar.renderMenubar());
    }
  }
};

NlsMnMgr.hideMenus = function () {
  for (it in this.menus) {if (this.menus[it].active) this.menus[it].hideMenu();}
  if (this.menubar) this.menubar.hideMenu();
};

NlsMnMgr.addAssocMenuMgr = function(frm, mgrId) {
  this.assocMenuMgr[this.assocMenuMgr.length] = [frm, mgrId];
};

NlsMnMgr.getMenu= function(mId) { return this.menus[mId]; };

function listAllWinElmt() {
  nlsWinElmt = [];
  var arrWinEl = document.getElementsByTagName("SELECT");
  var elm; var tmp; var x; var y;
  for(var i=0; i<arrWinEl.length; i++) {
    elm = arrWinEl[i]; tmp=elm; x=0; y=0;
    while (tmp!=null) { 
      x += tmp.offsetLeft; y+=tmp.offsetTop;
      tmp = tmp.offsetParent;
    }
    nlsWinElmt[nlsWinElmt.length] = {e:elm, eX1:x, eY1:y, eX2:x+elm.offsetWidth, eY2:y+elm.offsetHeight};
  }
};

function NlsMenuItem(id, capt, url, ico, enb, xtra, subId, title, crossFrame, subFrame, subPos, subPosAdj, subDir) {
  this.id = id;
  this.intKey = "";
  this.capt = capt;
  this.url = (url==null? "" : url);
  this.ico = (ico==null && ico=="" && ico.length==0) ? null: ico;
  this.enable=(enb==null?true:enb);
  this.xtra = xtra;
  this.stlprf="";
  this.target=null;
  this.title=title==null?"":title;
  this.itemEffect=null;
  
  this.subMenuId = (subId?subId:"");
  this.crsFrame = (crossFrame?crossFrame:false);
  this.subFrame = (subFrame?subFrame:null);
  this.subPos = (subPos?subPos:[null,null]);
  this.subPosAdj = (subPosAdj?subPosAdj:[0,0]);
  this.subDir = (subDir?subDir:["right","down"]);
  this.toString=function() {return "NlsMenuItem";};
  
  this.useItemEffect=function(effName) {
    this.itemEffect=new NlsMenuItemEffect(this.intKey, effName);
  };
  return this;
};

function NlsMenuSeparator(cstSeparator) {
  this.stlprf = "";
  this.intKey = "";
  this.seprt = cstSeparator!=null?cstSeparator:"";
  this.render = function () {
    if (this.seprt!="") return this.seprt;
    return ("<table border=0 cellpadding=0 cellspacing=0 width='100%' height='0%'><tr>" + 
            "<td class=\""+this.stlprf+"nlsseparator\"></td>" + 
            "</tr></table>");
  };
                 
  this.toString=function() {return "NlsMenuSeparator";};
};

function NlsCustomMenuItem(cst) {
  this.intKey = "";
  this.cstMenu = (cst?cst:"&nbsp;");
  this.toString=function() {return "NlsCustomMenuItem";};
};
 
function NlsMenu(mId) {
  /*private*/
  this.lsItm=null;
  this.mgrId = "";
  this.winElmt=null;
  this.container=null;
  this.customBorder=null;
  this.shadow=new NlsMenuShadow("bottomright", "5px", mId);
  this.count=0;
  this.active = false;
  this.isMenubar=false;
  this.effect=null;
  this.srItems=[];
  this.imgPath="";
  this.ready=true;
  
  /*public*/
  this.mId = mId;
  this.items = new Object();
  this.stlprf="";
  this.subMenuIc=[];
  this.target="_self";
  
  this.showIcon=false;
  this.showSubIcon=true;
 
  this.absWidth="";
  this.orient="V";

  this.defItmEff=null;
  this.defPos=[0,0];
  
  this.maxItemCol=100;
  this.zIndex = 100;
  
  this.wnd = window;
  nlsMenu[mId] = this;
  return this;
};

var NLSMENU=NlsMenu.prototype;

NLSMENU.addItem = function(key, capt, url, ico, enb, xtra, subId, title) {
  var intKey = this.mId+"_"+key;
  var it = new NlsMenuItem(key, capt, url, ico, enb, xtra, subId, title);
  it.intKey = intKey;
  this.items[intKey]=it;
  this.srItems[this.srItems.length]=it;
  if (this.defItmEff!=null && typeof(NlsMenuItemEffect) != "undefined") { it.useItemEffect(this.defItmEff); }
  this.count++;
  return it;
};

NLSMENU.addSeparator = function(separator) { 
  var intKey = "sep_"+this.count;
  var it = (separator ? separator : new NlsMenuSeparator());
  it.stlprf = this.stlprf;
  it.intKey = intKey;
  this.items[intKey] = it;
  this.srItems[this.srItems.length]=it;
  this.count++;
  return it;
};

NLSMENU.addSubmenu = function(key, subId, crsFrame, subFrame, subPos, subPosAdj, subDir) {
  var intKey = this.mId+"_"+key;
  var mnItem = this.items[intKey];
  mnItem.subMenuId=subId;
  mnItem.subFrame=(subFrame?subFrame:null);
  mnItem.crsFrame=(crsFrame?crsFrame:false);
  mnItem.subPos = (subPos?subPos:[null,null]);
  mnItem.subPosAdj = (subPosAdj?subPosAdj:[0,0]);
  mnItem.subDir = (subDir?subDir:["right","down"]);
};

NLSMENU.addCustomMenu = function (custom) {
  var intKey = "cst_"+this.count;
  var it = new NlsCustomMenuItem(custom);
  it.intKey = intKey;
  this.items[intKey] = it;
  this.srItems[this.srItems.length]=it;
  this.count++;
  return it;
};

NLSMENU.getItemById = function (key) {
  return this.items[this.mId+"_"+key];
};

NLSMENU.setItemStyle = function (key, stlprf) {
  var intKey = this.mId+"_"+key;
  var mnItem = this.items[intKey];
  mnItem.stlprf=stlprf;
};

NLSMENU.enableItem = function (key, b) {
 var intKey = this.mId+"_"+key;
 this.items[intKey].enable=b;
 setMnStyle(NlsGetElementById(intKey), (b?"N":"D"), (this.items[intKey].stlprf==""?this.stlprf:this.items[intKey].stlprf));
};

NLSMENU.dropShadow = function (pos, offset) {
  if (this.shadow) { this.shadow.pos=pos; this.shadow.offset=(offset?offset:"5px"); } else
  { this.shadow=new NlsMenuShadow(pos, offset, this.mId); }
};

NLSMENU.applyBorder = function (bTop, bBottom, bLeft, bRight) {
  if (!bTop && !bBottom && !bLeft && !bRight) {
    this.customBorder=null;
  } else {
    this.customBorder=new NlsMenuBorder(bTop, bBottom, bLeft, bRight);
  }
};

NLSMENU.useEffect = function (effName) {
  this.effect=new NlsMenuEffect(this.mId, effName);
};

NLSMENU.renderMenu = function() {
  var allScs = (document.getElementsByTagName ? document.getElementsByTagName("SCRIPT"): document.scripts);
  for (var i=0;i<allScs.length;i++) {
    if (allScs[i].src.toLowerCase().indexOf("nlsmenu.js")>=0) { this.imgPath=allScs[i].src.replace(/nlsmenu.js/gi, ""); }
  }
  if (!this.subMenuIc||this.subMenuIc=="") { this.subMenuIc=[this.imgPath+"img/submenu.gif", this.imgPath+"img/submenuovr.gif"];}

  var sAbs=(this.absWidth==""?"":"width='"+this.absWidth+"'");
  var smenu="<table cellpadding=0 cellspacing=0 width='100%'>";
  var tmpCnt=0;var prf=this.stlprf; var it=null;
  for (var i=0; i<this.srItems.length; i++) {
    it=this.srItems[i];
    if (it.toString()=="NlsMenuSeparator") {
      smenu+=(this.orient=="V"?"<tr>":"");
      smenu+=("<td class='"+this.stlprf+"nlsseparatorcontainer'>"+it.render()+"</td>");
      smenu+=(this.orient=="V"?"</tr>":"");
    } else 
    if (it.toString()=="NlsCustomMenuItem") {
      smenu+=(this.orient=="V"?"<tr>":"");
      smenu+=("<td>"+it.cstMenu+"</td>");
      smenu+=(this.orient=="V"?"</tr>":"");
    } else {
      if (it.stlprf) prf=it.stlprf; else prf=this.stlprf;
      if (this.orient=="V") { smenu+="<tr>"; }
      if (this.orient=="H") { if (tmpCnt==0) smenu+="<tr>"; tmpCnt++; }
      smenu+="<td id=\""+it.intKey+"\" class=\""+prf+"nlsitemcontainer\" onmouseover=\"nlsMenuItemOver(event, '"+it.intKey+"')\" onclick=\"return nlsMenu['"+this.mId+"'].menuItemClick(event, '"+it.intKey+"');\">";
      smenu+="<table cellpadding=0 cellspacing=0 width='100%' height='100%'><tr style=\"cursor:pointer;\" title=\""+it.title+"\">";
      if (this.showIcon) { smenu+="<td id=\""+it.intKey+"x1\" class=\""+prf+"nlsiconcell\" align=\"center\" nowrap>"+(it.ico && it.ico.length>0?"<img id=\"ic_"+it.intKey+"\" src=\""+it.ico[0]+"\">" + (it.ico.length>1?"<img id=\"icovr_"+it.intKey+"\" style='display:none' src=\""+it.ico[1]+"\">":"") :"")+"</td>"; }
      smenu+="<td id=\""+it.intKey+"x2\" class=\""+prf+(it.enable?"nlsitem\"":"nlsitemdisable\"")+" nowrap>"+it.capt+"</td>";
      if (this.showSubIcon && it.subMenuId!="")  { smenu+="<td id=\""+it.intKey+"x3\" class=\""+prf+"nlssubmenucell\" align=\"right\" nowrap>"+ (it.subMenuId!=""? "<img id='subic_"+it.intKey+"' src=\""+this.subMenuIc[0]+"\">" + (this.subMenuIc.length>1?"<img id='subicovr_"+it.intKey+"' style='display:none' src=\""+this.subMenuIc[1]+"\">":"") :"") +"</td>"; }
      smenu+="</tr></table>";
      smenu+="</td>";
      if (this.orient=="V") { smenu+="</tr>"; }
      if (this.orient=="H" && tmpCnt==this.maxItemCol) { smenu+="</tr>"; tmpCnt=0; }
    }
  }
  
  smenu+=(this.orient=="H" && tmpCnt!=0 ?"</tr>":"");
  smenu += "</table>";
  smenu = "<table cellpadding=0 cellspacing=0 class='"+this.stlprf+"nlsmenu' "+ sAbs + "><tr><td>"+smenu+"</td></tr></table>";
  
  if (this.customBorder!=null) smenu = this.customBorder.applyBorder(smenu, this.stlprf);
  smenu = this.shadow.dropShadow(smenu);

  smenu = "<div " + (nls_isIE && !this.isMenubar?"style='position:absolute;z-index:"+(this.zIndex-1)+";'":"") + ">" + smenu;
  if (!this.isMenubar &&  nls_isIE && !nls_isIE5 && nlsMenuMgr[this.mgrId].flowOverFormElement) { 
    smenu += "<iframe id='"+this.mId+"ifrm' scrolling='no' frameborder=0 width='1' height='1' style='position:absolute;top:0px;left:0px;z-index:-1' src='"+this.imgPath+"img/blank.gif"+"'></iframe>"; 
  }
  smenu+="</div>";
    
  smenu = "<div id='"+this.mId+"' style="+(this.isMenubar?"''":"'position:absolute;z-index:"+this.zIndex+";display:none;'")+" onmouseover=\"_nlsMenuItemOver('"+this.mgrId+"')\" onmouseout=\"nlsMenuItemOut('"+this.mgrId+"')\">" + smenu + "</div>";

  return smenu;
};

function NlsMenuShadow(pos, offset, mId) {
  this.pos=pos;
  this.offset=offset;
  this.mId=mId;

  this.dropShadow = function (smenu) {
    var mn = nlsMenu[this.mId];
    var shadow = "<div><table id='effwin_"+this.mId+"' cellpadding=0 cellspacing=0 height='0px'>";
    var hshadow = "<table cellpadding=0 cellspacing=0 width='100%' height='5px' class='"+mn.stlprf+"horzshadow'><tr><td></td></tr></table>";
    var vshadow = "<table cellpadding=0 cellspacing=0 width='5px' height='100%' class='"+mn.stlprf+"vertshadow'><tr><td></td></tr></table>";
    var menutd = "<td id='actmn_"+this.mId+"'>"+smenu+"</td>";
    var cornertd = "<td class='"+mn.stlprf+"cornshadow' width='5px' height='5px'></td>";
    switch (this.pos) {
      case "none":
        shadow += "<tr>"+menutd+"</tr>";
        break;
      case "bottomright" :
        shadow += "<tr>"+menutd+"<td style='height:100%;padding-top:OFFSET;'>"+vshadow+"</td></tr>" + 
          "<tr><td style='padding-left:OFFSET;'>"+hshadow+"</td>"+cornertd+"</tr>";
        break;
      case "bottomleft" :
        shadow += "<tr><td style='height:100%;padding-top:OFFSET;'>"+vshadow+"</td>"+menutd+"</tr>" + 
          "<tr>"+cornertd+"<td style='padding-right:OFFSET;'>"+hshadow+"</td></tr>";
        break;
      case "topleft" :
        shadow += "<tr>"+cornertd+"<td style='padding-right:OFFSET;'>"+hshadow+"</td></tr>" + 
          "<tr><td style='height:100%;padding-bottom:OFFSET;'>"+vshadow+"</td>"+menutd+"</tr>";
        break;
      case "topright" :
        shadow += "<tr><td style='padding-left:OFFSET;'>"+hshadow+"</td>"+cornertd+"</tr>" + 
          "<tr>"+menutd+"<td style='height:100%;padding-bottom:OFFSET;'>"+vshadow+"</td></tr>";
        break;
    }
    return shadow.replace(/OFFSET/gi, this.offset) + "</table></div>";  
  };
};

NLSMENU.showMenu = function(x1, y1, x2, y2, mnOrient, subDir, subAdj) {

  if (this.lsItm!=null) {setMnStyle(this.lsItm, "N", (this.lsItm.stlprf==""?this.stlprf:this.lsItm.stlprf)); this.lsItm=null;}

  var flag= this.menuOnShow(this.mId); 
  if (flag==false) return;
  
  var ctx = NlsGetElementById(this.mId);
  if (!ctx) return;
  var dmfrm = NlsGetElementById(this.mId+"ifrm");
  ctx.style.visibility="hidden";
  ctx.style.display="";
  
  var scrOffX = window.scrollX?window.scrollX:document.body.scrollLeft;
  var scrOffY = window.scrollY?window.scrollY:document.body.scrollTop; 
  var cW=(window.innerWidth?window.innerWidth:document.body.clientWidth);
  var cH=(window.innerHeight?window.innerHeight:document.body.clientHeight);
  var mW=(ctx.children?ctx.children[0]:ctx.childNodes[0]).offsetWidth;
  var mH=(ctx.children?ctx.children[0]:ctx.childNodes[0]).offsetHeight; 
  var sDir=(subDir?[subDir[0], subDir[1]]:["right", "down"]);
  var adjX=(subAdj?subAdj[0]:this.defPos[0]); var adjY=(subAdj?subAdj[1]:this.defPos[1]);
  
  if (dmfrm) { 
    var actMn = NlsGetElementById("actmn_"+this.mId);
    dmfrm.width = actMn.children[0].offsetWidth;
    dmfrm.height = actMn.children[0].offsetHeight;
  }
  var mX=0; var mY=0;
  if (mnOrient=="V") {
    if (sDir[0]=="right") {
      if(x2+mW>cW){if(x1>=mW){mX=x1-mW+adjX+scrOffX;sDir[0]="left"}else{mX=cW-mW-1+scrOffX;}}else{mX=x2+scrOffX-adjX;}
    } else {
      if(x1-mW<0){if(x2+mW<cW){mX=x2-adjX+scrOffX;sDir[0]="right"}else{mX=scrOffX;}}else{mX=x1-mW+adjX+scrOffX;}
    }
    if (sDir[1]=="down") {
      if(y1+mH>cH){if(y2>=mH){mY=y2-mH+scrOffY-adjY;sDir[1]="up"}else{mY=cH-mH-1+scrOffY;}}else{mY=y1+scrOffY+adjY;}
    } else {
      if(y1-mH<0){if(y1+mH<cH){mY=y1+scrOffY-adjY;sDir[1]="down"}else{mY=scrOffY;}}else{mY=y2-mH+scrOffY-adjY;}
    }
  } else { 
    if (sDir[0] == "right") {
      if(x1+mW>cW){if(x2>=mW){mX=x2-mW+scrOffX-adjX;sDir[0]="left"}else{mX=cW-mW-1+scrOffX;}}else{mX=x1+scrOffX+adjX;}
    } else {
      if(x2-mW<0){if(x1+mW<cW){mX=x1+scrOffX+adjX;sDir[0]="right"}else{mX=scrOffX;}}else{mX=x2-mW+scrOffX-adjX;}
    }
    if (sDir[1] == "down") {
      if(y2+mH>cH){if(y1>=mH){mY=y1-mH+scrOffY+adjY;sDir[1]="up"}else{mY=cH-mH-1+scrOffY;}}else{mY=y2+scrOffY-adjY;}
    } else {
      if(y1-mH<0){if(y2+mH<cH){mY=y2+scrOffY-adjY;sDir[1]="down"}else{mY=scrOffY;}}else{mY=y1-mH+scrOffY+adjY;}
    }
  }
  
  if (nls_isIE5 || !nlsMenuMgr[this.mgrId].flowOverFormElement) {
    if (this.winElmt==null) hideWinElmt(this, mX, mY, mX+mW, mY+mH);
    if (this.winElmt==null) this.winElmt=[];
    for(var i=0;i<this.winElmt.length;i++) {
      this.winElmt[i].style.visibility="hidden";
    }
  }
  with (ctx.style) { 
    left=mX+"px"; top=mY+"px"; 
    zIndex = this.zIndex; 
    if (this.effect) { 
      with (this.effect) {prop["dir"]=sDir[(mnOrient=="V"?0:1)]; start(false); visibility="visible"; run();}
    } else { visibility="visible"; }
  }
  this.active=true;
};

function hideWinElmt(mn, mX1, mY1, mX2, mY2) {
  var oe;
  for (var i=0; i<nlsWinElmt.length; i++) {
    oe = nlsWinElmt[i];
    if ((oe.eX1>=mX1 && oe.eX1<=mX2 && oe.eY1>=mY1 && oe.eY1<=mY2) ||
        (oe.eX1>=mX1 && oe.eX1<=mX2 && oe.eY2>=mY1 && oe.eY2<=mY2) ||
        (oe.eX2>=mX1 && oe.eX2<=mX2 && oe.eY1>=mY1 && oe.eY1<=mY2) ||
        (oe.eX2>=mX1 && oe.eX2<=mX2 && oe.eY2>=mY1 && oe.eY2<=mY2) ||
        (mX1>=oe.eX1 && mX1<=oe.eX2 && mY1>=oe.eY1 && mY1<=oe.eY2) ||
        (mX1>=oe.eX1 && mX1<=oe.eX2 && mY2>=oe.eY1 && mY2<=oe.eY2) ||
        (mX2>=oe.eX1 && mX2<=oe.eX2 && mY1>=oe.eY1 && mY1<=oe.eY2) ||
        (mX2>=oe.eX1 && mX2<=oe.eX2 && mY2>=oe.eY1 && mY2<=oe.eY2) ||
        (oe.eX1<mX1 && oe.eX2>mX2 && oe.eY1>=mY1 && oe.eY1<=mY2) ||
        (oe.eX1<mX1 && oe.eX2>mX2 && oe.eY2>=mY1 && oe.eY2<=mY2)
       ) {
      if (oe.e.style.visibility!="hidden") {
        oe.e.style.visibility="hidden";
        if (mn.winElmt==null) mn.winElmt=[];
        mn.winElmt[mn.winElmt.length]=oe.e;
      }
    }
  }
};

NLSMENU.showMenuAbs = function(x, y) {
  var ctx = NlsGetElementById(this.mId);
  ctx.style.top=y+"px"; ctx.style.left=x+"px"; 
  ctx.style.display="";
  this.active=true;
};

NLSMENU.hideMenu = function() {
  var ctx = NlsGetElementById(this.mId);
  if (!ctx) return;
  if (!this.isMenubar) {
    if (this.effect) { 
      this.effect.start(true); 
      if ((nls_isIE && this.effect.effName!="aoslide") || nls_isOpera && this.effect.effName!="aoslide") {ctx.style.visibility="hidden";} else { this.effect.onHide=function() {ctx.style.visibility="hidden";}; };
      this.effect.run();
    } else { ctx.style.visibility="hidden"; }
  
    this.active=false;
  } else {
    this.isMenuOpened = false;
  }
  if (this.lsItm!=null) {
    setMnStyle(this.lsItm, "N", (this.items[this.lsItm.id].stlprf==""?this.stlprf:this.items[this.lsItm.id].stlprf)); 
    setMnIcon(this, this.items[this.lsItm.id], "N");
    this.lsItm=null;
  }
  if (this.winElmt!=null && this.winElmt.length>0) {
    for (i=0;i<this.winElmt.length;i++) {
      this.winElmt[i].style.visibility = "visible";
    }
  }
  if (typeof(window.status)!="undefined") window.status="";
};

NLSMENU.menuItemClick = function(e, itemId) {
  if (!this.items[itemId].enable) return;

  var m=itemId.split("_");
  var prMenu = nlsMenu[m[0]];
  
  if (this.isMenubar && this.dropOnClick && !this.isMenuOpened) {
    _showMenu(prMenu, itemId);
    this.isMenuOpened = true;
    return null;
  } else {
    nlsMenuMgr[this.mgrId].hideMenus();
    var mnMgr = nlsMenuMgr[this.mgrId];
    var assMgr = mnMgr.assocMenuMgr;
    if ( assMgr && assMgr.length > 0) {
      for (var i=0; i<assMgr.length; i++) { var frm = assMgr[i];  frm[0].hideAllNlsMenu(); }
    }  
    
    if (this.isMenubar && this.dropOnClick) {
      var oIt = NlsGetElementById(itemId);
      setMnStyle(oIt, (prMenu.items[itemId].enable ? "O" : "D"), (prMenu.items[itemId].stlprf==""?this.stlprf:prMenu.items[itemId].stlprf)); 
      setMnIcon(prMenu, prMenu.items[itemId], "O");
      this.isMenuOpened = false;
      return null;
    } else {
      var ids = itemId.split("_");
      var trgt=this.items[itemId].target;
      if (trgt==null) trgt=this.target!=null?this.target:"_self";
      if (this.items[itemId].url!="") {
          eval(this.items[itemId].url)
//        window.open(this.items[itemId].url, trgt);
      } else {
        return this.menuOnClick(ids[0], ids[1]);
      }
    }
  }
};

NLSMENU.menuOnClick = function (menuId, itemId) {return true;};
NLSMENU.menuOnShow = function (menuId) {return true;};

function setMnIcon(mn, mnItm, flg) {
  if (mn.showIcon && mnItm.ico && mnItm.ico.length>1) {
    NlsGetElementById("ic_"+mnItm.intKey).style.display=(flg=="N"?"":"none");
    NlsGetElementById("icovr_"+mnItm.intKey).style.display=(flg=="O"?"":"none");
  }
  if (mn.showSubIcon && mnItm.subMenuId!="" && mn.subMenuIc && mn.subMenuIc.length>1) {
    NlsGetElementById("subic_"+mnItm.intKey).style.display=(flg=="N"?"":"none");
    NlsGetElementById("subicovr_"+mnItm.intKey).style.display=(flg=="O"?"":"none");
  } 
};

function setMnStyle(it, s, prefix) {
  var suff=(s=="O"?"over":"");
  it.className=prefix+"nlsitemcontainer"+suff;
  var r = (it.children?it.children[0]:it.childNodes[0]).rows[0];
  for (var i=0; i<r.cells.length; i++) {
    switch (r.cells[i].id) {
      case it.id+"x1": 
        r.cells[i].className=prefix+"nlsiconcell"+suff; break;
      case it.id+"x2":
        r.cells[i].className=prefix+"nlsitem"+(s=="D"?"disable":suff);
        break;
      case it.id+"x3":
        r.cells[i].className=prefix+"nlssubmenucell"+suff; break;    
    }
  }
};

function nlsMenuItemOver(e, it) {
  var m=it.split("_");
  var oIt = NlsGetElementById(it);
  var li = nlsMenu[m[0]].lsItm;
  var prMenu = nlsMenu[m[0]];
  if (!prMenu.active) return;
  if (!prMenu.ready) return;
  
  if (li!=null) {
    var lstItm = prMenu.items[li.id];
    if (lstItm.intKey==it) return;
    if (lstItm.itemEffect!=null) { lstItm.itemEffect.init(); }
    setMnStyle(li, (lstItm.enable ? "N" : "D"), (lstItm.stlprf==""?prMenu.stlprf:lstItm.stlprf));
    if (lstItm.enable) setMnIcon(prMenu, lstItm, "N");
    if (lstItm.itemEffect!=null) { lstItm.itemEffect.start(); }
    var tmp=null;
    if (lstItm.crsFrame) {
      tmp=(lstItm.subFrame.nlsGetMenu?lstItm.subFrame.nlsGetMenu(lstItm.subMenuId):null);
    } else {
      tmp=nlsGetMenu(lstItm.subMenuId);
    }
    while(tmp!=null) { 
      var nli = null;
      if (tmp.lsItm) {
        nli = (tmp.items[tmp.lsItm.id].crsFrame ? tmp.items[tmp.lsItm.id].subFrame.nlsGetMenu(tmp.items[tmp.lsItm.id].subMenuId) : tmp.wnd.nlsGetMenu(tmp.items[tmp.lsItm.id].subMenuId));
      } 
      tmp.hideMenu(); tmp=nli; 
    }
  }
  if (typeof(window.status)!="undefined") window.status=prMenu.items[it].url;
  if (prMenu.items[it].itemEffect!=null) { prMenu.items[it].itemEffect.init(); }
  setMnStyle(oIt, (prMenu.items[it].enable ? "O" : "D"), (prMenu.items[it].stlprf==""?prMenu.stlprf:prMenu.items[it].stlprf)); 
  if (prMenu.items[it].enable) setMnIcon(prMenu, prMenu.items[it], "O");
  if (prMenu.items[it].itemEffect!=null) { prMenu.items[it].itemEffect.start(); }
  
  if (!prMenu.isMenubar || (prMenu.isMenubar && !prMenu.dropOnClick) || (prMenu.isMenubar && prMenu.dropOnClick && prMenu.isMenuOpened)) { _showMenu(prMenu, it); }
  nlsMenu[m[0]].lsItm=oIt;
};

function nls_getXY(oIt) {
  var p=new Object(); p.x=0;p.y=0;p.x2=0;p.y2=0; var tmp = oIt;
  while(tmp) { p.x+=tmp.offsetLeft; p.y+=tmp.offsetTop; tmp=tmp.offsetParent } ;
  p.x -= (window.scrollX?window.scrollX:document.body.scrollLeft); 
  p.y -= (window.scrollY?window.scrollY:document.body.scrollTop); 
  p.x2=p.x+oIt.offsetWidth; p.y2=p.y+oIt.offsetHeight;
  return p;
}

function _showMenu(prMenu, it) {
  var oIt = NlsGetElementById(it);
  var mnIt = prMenu.items[it];
  if (mnIt.subMenuId!="" && mnIt.enable==true) {
    var p=nls_getXY(oIt);
    if (mnIt.crsFrame) {
      if (mnIt.subPos[0]=="REL") { } else { p.x = mnIt.subPos[0]; p.x2=p.x; }
      if (mnIt.subPos[1]=="REL") { } else { p.y = mnIt.subPos[1]; p.y2=p.y; }
      if (!mnIt.subFrame.nlsGetMenu) return;
      var subMn = mnIt.subFrame.nlsGetMenu(mnIt.subMenuId);
      if (!subMn) return;
      subMn.showMenu(p.x, p.y, p.x2, p.y2, prMenu.orient, mnIt.subDir, mnIt.subPosAdj);
    } else {
      var sMenu = nlsGetMenu(mnIt.subMenuId);
      if (!sMenu) return;
      if (sMenu.zIndex <= prMenu.zIndex) { sMenu.zIndex = prMenu.zIndex+1 }
      sMenu.showMenu(p.x, p.y, p.x2, p.y2, prMenu.orient, mnIt.subDir, mnIt.subPosAdj);
      
    }
  }
};

function nls_showMenu(mId, oIt, orient, subDir, subPosAdj) {
  var sMenu = nlsGetMenu(mId);
  var mgr = nlsMenuMgr[sMenu.mgrId];
  mgr.clearTimeout();
  if (sMenu.active) return;
  var p=nls_getXY(oIt);
  mgr.hideMenus();
  sMenu.showMenu(p.x, p.y, p.x2, p.y2, orient, subDir, subPosAdj);
}

function nls_hideMenu(mId) {
  var sMenu = nlsGetMenu(mId);
  nlsMenuItemOut(sMenu.mgrId);
}

function _nlsMenuItemOver(mgrId) {  
  var mnMgr = nlsMenuMgr[mgrId];
  mnMgr.clearTimeout();
  
  var assMgr = mnMgr.assocMenuMgr;
  if ( assMgr && assMgr.length > 0) {
    for (var i=0; i<assMgr.length; i++) {
      if (!assMgr[i][0].nlsMenuMgr) continue;
      assMgr[i][0].nlsMenuMgr[assMgr[i][1]].clearTimeout();
    }
  } 
  for (var it in nlsMenuMgr) {
    if (it!=mgrId) {
      nlsMenuMgr[it].hideMenus();
    }
  }
  
};

function nlsMenuItemOut(mgrId) {
  var mnMgr = nlsMenuMgr[mgrId];
  mnMgr.clearTimeout();
  mnMgr.setTimeout(function() { _nlsMenuItemOut(mgrId) }, mnMgr.timeout);

  var assMgr = mnMgr.assocMenuMgr;
  if ( assMgr && assMgr.length > 0) {
    for (var i=0; i<assMgr.length; i++) {
      var frm = assMgr[i];
      if (!frm[0].nlsMenuMgr) continue;
      frm[0].nlsMenuMgr[frm[1]].clearTimeout();
      frm[0].nlsMenuMgr[frm[1]].setTimeout(function() { frm[0]._nlsMenuItemOut(mgrId); }, mnMgr.timeout);
    }
  }
};

function _nlsMenuItemOut(mgrId) {
  nlsMenuMgr[mgrId].hideMenus();
};

function nlsGetMenu(mId) {
  return nlsMenu[mId];
};

/*===================================================*/
/*NlsMenuBorder class*/
/*===================================================*/

function NlsMenuBorder(bTop, bBottom, bLeft, bRight) {
  var border = "<table cellpadding=0 cellspacing=0>";
  var sTop="", sBottom="", sLeft="", sRight="";
  if (bTop) sTop="<td><table width='100%' cellpadding=0 cellspacing=0><tr><td class='@stlprf_mtop'></td></tr></table></td>";
  if (bBottom) sBottom="<td><table width='100%' cellpadding=0 cellspacing=0><tr><td class='@stlprf_mbottom'></td></tr></table></td>";
  if (bLeft) {
    sLeft="<td height='100%' class='@stlprf_mleft'></td>";
    if (bTop) sTop="<td class='@stlprf_mtopleft'></td>"+sTop;
    if (bBottom) sBottom="<td class='@stlprf_mbottomleft'></td>"+sBottom;
  }
  if (bRight) {
    sRight="<td height='100%' class='@stlprf_mright'></td>";
    if (bTop) sTop+="<td class='@stlprf_mtopright'></td>";
    if (bBottom) sBottom+="<td class='@stlprf_mbottomright'></td>";    
  }
  if (sTop!="") sTop="<tr>"+sTop+"</tr>";
  if (sBottom!="") sBottom="<tr>"+sBottom+"</tr>";  
  border=border+sTop+"<tr height='100%'>"+sLeft+"<td>@menu</td>"+sRight+"</tr>"+sBottom;
  border+="</table>";
  
  this.applyBorder = function (smenu, stlprf) {
    var b=border.replace(/@stlprf_/gi, stlprf);
    return b.replace(/@menu/gi, smenu);
  };
  
  return this;
};

/*===================================================*/
/*NlsMenuBar class*/
/*===================================================*/

NLSMENU.isMenuOpened = false;

NLSMENU.dropOnClick = false;

NLSMENU.renderMenubar = function () {
  return this.renderMenu();
};

function NlsMenubar(mId) {
  var mnBar = new NlsMenu(mId);
  mnBar.isMenubar=true;
  mnBar.active=true;
  return mnBar;
};

/*===================================================*/
/*Public general methods*/
/*===================================================*/

function hideAllNlsMenu() {
  for (it in nlsMenu) {if (nlsMenu[it].active) nlsMenu[it].hideMenu();}
};

/**Cross browser related methods*/
function NlsGetElementById(id) {
  if (document.all) {
      return document.all(id);
  } else
  if (document.getElementById) {
      return document.getElementById(id);
  }
};


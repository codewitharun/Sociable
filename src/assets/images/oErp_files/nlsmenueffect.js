/**
* nlsmenueffect.js v.1.2.1
* Copyright 2005-2006, addobject.com. All Rights Reserved
* Author Jack Hermanto, www.addobject.com
*/
var nlsEffectList={
  barn:"progid:DXImageTransform.Microsoft.Barn(Duration=0.3,motion=out,orientation=vertical);",
  blinds:"progid:DXImageTransform.Microsoft.Blinds(Duration=0.3,Bands=8,direction=right);",
  checkerboard:"progid:DXImageTransform.Microsoft.Checkerboard(Duration=0.3,Direction=right,SquaresX=20,SquaresY=20);",
  fade:"progid:DXImageTransform.Microsoft.Fade(Duration=0.3,Overlap=1.00);",
  inset:"progid:DXImageTransform.Microsoft.Inset(Duration=0.3);",
  iris:"progid:DXImageTransform.Microsoft.Iris(Duration=0.3,irisstyle=CIRCLE,motion=in);",
  pixelate:"progid:DXImageTransform.Microsoft.Pixelate(Duration=0.3,MaxSquare=10);",
  radialwipe:"progid:DXImageTransform.Microsoft.RadialWipe(Duration=0.3,wipestyle=WEDGE)",
  randombars:"progid:DXImageTransform.Microsoft.RandomBars(Duration=0.3,Orientation=horizontal);",
  randomdissolve:"progid:DXImageTransform.Microsoft.RandomDissolve(duration=0.3);",
  slide:"progid:DXImageTransform.Microsoft.Slide(Duration=0.3,slidestyle=HIDE,Bands=5);",
  spiral:"progid:DXImageTransform.Microsoft.Spiral(Duration=0.3,GridSizeX=64,GridSizeY=64);",
  stretch:"progid:DXImageTransform.Microsoft.Stretch(Duration=0.3,stretchstyle=HIDE);",
  strips:"progid:DXImageTransform.Microsoft.Strips(Duration=0.3,motion=rightdown);",
  wheel:"progid:DXImageTransform.Microsoft.Wheel(Duration=0.3,spokes=10);",
  gradienwipe:"progid:DXImageTransform.Microsoft.GradientWipe(Duration=0.3,GradientSize=0.75,wipestyle=0,motion=forward);",
  zigzag:"progid:DXImageTransform.Microsoft.Zigzag(Duration=0.3,GridSizeX=8,GridSizeY=8);",
  itemfade:"progid:DXImageTransform.Microsoft.Fade(Duration=0.2,Overlap=0.75);",
  itemdissolve:"progid:DXImageTransform.Microsoft.RandomDissolve(duration=0.3);",
  aoslide:"Duration:2"
};

function NlsMenuEffect(mId, effName) {
  this.mId=mId;
  this.elm=null;
  this.effName=effName;
  this.isOut=false;  
  this.prop=new Object();
  this.onShow=function() {};
  this.onHide=function() {};
  
  this.start=_defStart;
  this.run=_defRun;
  
  if (effName=="aoslide") {
    this.start=_slideStart;
    this.run=_slideRun;
  }
  return this;
};

/*default effect*/
var _fadeTm=null;
var _fadesEff=new Object();

function _defStart(isOut) {
  var mn=NlsGetElementById(this.mId);  
  mn.childNodes[0].style.position="";
  nlsMenu[this.mId].ready=true;
  this.elm=NlsGetElementById("effwin_"+this.mId); 
  if (nls_isIE) {
    this.elm.style.filter=nlsEffectList[this.effName];
    if (this.elm.filters.length>0) this.elm.filters[0].apply();
  } else {
    this.elm=this.elm.parentNode;    
    this.isOut=(isOut==true);
    if (!this.prop["init"]) {
      this.elm.style.MozOpacity=(isOut?1:0);
      this.elm.style.opacity=(isOut?1:0);
    }
    this.prop["init"]=true;
    this.prop["dur"]=20;
    this.prop["rng"]=100;
    this.prop["spd"]=20;
  }
};

function _defRun() {
  if (nls_isIE) {
    if (this.elm.filters.length>0) this.elm.filters[0].play();
  } else {
    var me=this;
    if (this.elm.style.MozOpacity) this.prop["opa"]="MozOpacity"; else this.prop["opa"]="opacity";
    var p=new Object();
    p.x1=this.elm.style[this.prop["opa"]]*this.prop["rng"];
    if (this.isOut) { p.x2=0; } else { p.x2=this.prop["rng"]-1; }
    _fc_fade(p);
    this.prop["pt"]=p;
    this.prop["sd"]=0;
    
    _fadesEff[this.mId]=this;
    if (!_fadeTm) _fadeTm=setInterval(function() {_fadeAnimate();}, this.prop["spd"]);    
  }
};

function _fadeAnimate() {
  var b=true;
  for (var it in _fadesEff) {
    var eff=_fadesEff[it]; 
    var p=eff.prop["pt"];
    if (eff.prop["sd"]<eff.prop["dur"]) {
      eff.prop["sd"]++;
      eff.elm.style[eff.prop["opa"]]=effect_bezier(eff.prop["sd"]/eff.prop["dur"],p.x1, p.x2, p.c1, p.c2)/eff.prop["rng"];
    } else {
      eff.elm.style[eff.prop["opa"]]=p.x2/eff.prop["rng"];
      if (eff.isOut) {eff.onHide(); eff.elm.style[eff.prop["opa"]]=1;} else {eff.onShow();}
      delete _fadesEff[eff.mId];
    }
    b=false;
  }
  if (b) {clearInterval(_fadeTm); _fadeTm=null;}
};

/*end*/

/*slide effect*/
var _slideTm=null;
var _slidesEff=new Object();

function _slideStart(isOut) {
  var mn=NlsGetElementById(this.mId);
  this.elm=mn.childNodes[0];
  
  if (!isOut && this.prop["init"]!=true) {
    this.elm.style.position="";
    var w=this.elm.offsetWidth; var h=this.elm.offsetHeight;
    with (mn.style) { overflow="hidden"; width=w+"px"; height=h+"px";};

    with (this.elm.style) {
      position=nls_isIE?"absolute":"relative";
      switch(this.prop["dir"]) {
        case "right": top="0px";left=-w+"px"; this.prop["st"]="left"; break;
        case "left": top="0px";left=w+"px"; this.prop["st"]="left"; break;
        case "down": top=-h+"px";left="0px"; this.prop["st"]="top"; break;
        case "up": top=h+"px";left="0px"; this.prop["st"]="top"; break;
      }
    };
    this.prop["mw"]=w; this.prop["mh"]=h; 
    if (!nls_isIE) this.prop["init"]=true;
  }
  this.prop["dur"]=parseFloat(nlsEffectList[this.effName].split(":")[1])*10;
  this.prop["spd"]=15;
  this.isOut=(isOut==true);
  nlsMenu[this.mId].ready=false;
};

function _slideRun() {
  var me=this;
  var p=new Object();
  var l=parseInt(this.elm.style.left);
  var t=parseInt(this.elm.style.top);
  var c=this.isOut?1:0;
  switch(this.prop["dir"]) {
    case "right": p.x1=l; p.x2=-this.prop["mw"]*c; break;
    case "left" : p.x1=l; p.x2=this.prop["mw"]*c; break;
    case "down" : p.x1=t; p.x2=-this.prop["mh"]*c; break;
    case "up"  : p.x1=t; p.x2=this.prop["mh"]*c; break;
  };    
  _fc_slide(p);
  this.prop["pt"]=p;
  this.prop["sd"]=0;
  
  _slidesEff[this.mId]=this;
  if (!_slideTm) _slideTm=setInterval(function() {_slideAnimate();}, this.prop["spd"]);  
};

function _slideAnimate() {
  var b=true;
  for (var it in _slidesEff) {
    var eff=_slidesEff[it];    
    var p=eff.prop["pt"];
    if (eff.prop["sd"] < eff.prop["dur"]) {
      eff.elm.style[eff.prop["st"]]= effect_bezier(eff.prop["sd"]/eff.prop["dur"],p.x1, p.x2, p.c1, p.c2) + "px";
      eff.prop["sd"]++;
    } else {
      eff.elm.style[eff.prop["st"]]=p.x2+"px";
      if (eff.isOut) {eff.onHide();} else {nlsMenu[eff.mId].ready=true; eff.onShow();}
      delete _slidesEff[eff.mId];
    }
    b=false;
  }
  if (b) {clearInterval(_slideTm); _slideTm=null;}
};

function _fc_fade(p) {p.c1=p.x1+(p.x2-p.x1)*2/3; p.c2=p.x2;};/*for fadding*/
function _fc_slide(p) {p.c1=p.x1+(p.x2-p.x1)*2/3; p.c2=p.x2;};
function _f1(t) { return (1-t); };
function _f2(t) { return (1-t)*(1-t); };
function _f3(t) { return (1-t)*(1-t)*(1-t); };
function _f4(t) { return t*t*t; };
function effect_bezier(t,x1,x2,c1,c2) {
  return _f3(t)*x1 + 3*t*_f2(t)*c1 + 3*t*t*_f1(t)*c2 + _f4(t)*x2;
};

/*end*/

/*NlsMenu item effect*/
function NlsMenuItemEffect(itemId, effName) {
  this.tmId=null;
  this.itemId=itemId;
  this.elm=null;
  this.effName=effName;
};

NlsMenuItemEffect.prototype.init=function() {
  if(!nls_isIE) return;
  if (this.elm==null) this.elm=NlsGetElementById(this.itemId); 
  if (nlsEffectList[this.effName]) this.elm.style.filter=nlsEffectList[this.effName];
  if (this.elm.filters.length>0) this.elm.filters[0].apply();
};

NlsMenuItemEffect.prototype.start=function() {
  if(!nls_isIE) return;
  if (this.elm.filters.length>0) this.elm.filters[0].play();
};
/*end*/
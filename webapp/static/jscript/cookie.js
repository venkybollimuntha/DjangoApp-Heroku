function onLoadTrack(){
var trackData = {};
const now = new Date();
var sPath = window.location.pathname;
var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
/* ------ to find device---------
var str = navigator.userAgent; 
var text2= str.match(/((.*))/)[1];

var text3 = text2.match(/((.*);(.*)\))/)[1]; 

var trim = text3 .slice(0, -1);

var res=new Array();
res=trim.split(";");
//alert(res);
var OS;
var deviceType;
if(res.length==2){
deviceType=res[0];
OS=res[1];
}
else if(res.length==3){
deviceType=res[2];
OS=res[1];
}else if(res.length>3){
deviceType=res[4];
OS=res[2];
}
-------------------*/
var nVer = navigator.appVersion;
var nAgt = navigator.userAgent;
var browserName  = navigator.appName;
var fullVersion  = ''+parseFloat(navigator.appVersion); 
var majorVersion = parseInt(navigator.appVersion,10);
var nameOffset,verOffset,ix;

// In Opera, the true version is after "Opera" or after "Version"
if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
 browserName = "Opera";
 fullVersion = nAgt.substring(verOffset+6);
 if ((verOffset=nAgt.indexOf("Version"))!=-1) 
   fullVersion = nAgt.substring(verOffset+8);
}
// In MSIE, the true version is after "MSIE" in userAgent
else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
 browserName = "Microsoft Internet Explorer";
 fullVersion = nAgt.substring(verOffset+5);
}
// In Chrome, the true version is after "Chrome" 
else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
 browserName = "Chrome";
 fullVersion = nAgt.substring(verOffset+7);
}
// In Safari, the true version is after "Safari" or after "Version" 
else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
 browserName = "Safari";
 fullVersion = nAgt.substring(verOffset+7);
 if ((verOffset=nAgt.indexOf("Version"))!=-1) 
   fullVersion = nAgt.substring(verOffset+8);
}
// In Firefox, the true version is after "Firefox" 
else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
 browserName = "Firefox";
 fullVersion = nAgt.substring(verOffset+8);
}
// In most other browsers, "name/version" is at the end of userAgent 
else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
          (verOffset=nAgt.lastIndexOf('/')) ) 
{
 browserName = nAgt.substring(nameOffset,verOffset);
 fullVersion = nAgt.substring(verOffset+1);
 if (browserName.toLowerCase()==browserName.toUpperCase()) {
  browserName = navigator.appName;
 }
}
// trim the fullVersion string at semicolon/space if present
if ((ix=fullVersion.indexOf(";"))!=-1)
   fullVersion=fullVersion.substring(0,ix);
if ((ix=fullVersion.indexOf(" "))!=-1)
   fullVersion=fullVersion.substring(0,ix);

majorVersion = parseInt(''+fullVersion,10);
if (isNaN(majorVersion)) {
 fullVersion  = ''+parseFloat(navigator.appVersion); 
 majorVersion = parseInt(navigator.appVersion,10);
}

var OSName = "Unknown";
if(screen.width>1024){
if (window.navigator.userAgent.indexOf("Windows NT 10.0")!= -1) OSName="Windows 10";
if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) OSName="Windows 8";
if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) OSName="Windows 7";
if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) OSName="Windows Vista";
if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) OSName="Windows XP";
if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) OSName="Windows 2000";
if (window.navigator.userAgent.indexOf("Mac")            != -1) OSName="Mac/iOS";
if (window.navigator.userAgent.indexOf("X11")            != -1) OSName="UNIX";
if (window.navigator.userAgent.indexOf("Linux")          != -1) OSName="Linux";
}
else if(screen.width<1024){
  function getAndroidVersion(ua) {
    ua = (ua || navigator.userAgent).toLowerCase();
    console.log(ua); 
    var match = ua.match(/android\s([0-9\.]*)/);
    return match ? match[1] : false;
};
function getMacVersion(ua) {
    ua = (ua || navigator.userAgent).toLowerCase();
    console.log(ua); 
    var match = ua.match(/iphone\s([0-9\.]*)/);
    return match ? match[1] : false;
};
if(getAndroidVersion()!=false){
  OSName="Android  "+getAndroidVersion();
}else if(getMacVersion()!=false){
   OSName="iOS  "+getMacVersion();
}
}
var ScreenResolution=screen.width+"x"+screen.height;
var scrWidth=screen.width;
var deviceType;
if(scrWidth<768){
deviceType="Mobile";
}else if(scrWidth>768 && scrWidth<1024){
deviceType="Tablet";
}else if(scrWidth>1024){
deviceType="Desktop";
}else{
deviceType="Unknown";
}
var timeStamp = Math.floor(Date.now() / 1000);
var fullURL=window.location.href;
var BrowserLang=navigator.language;
function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
   //compatibility for firefox and chrome
   var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
   var pc = new myPeerConnection({
       iceServers: []
   }),
   noop = function() {},
   localIPs = {},
   ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
   key;
function iterateIP(ip) {
       if (!localIPs[ip]) onNewIP(ip);
       localIPs[ip] = true;
   }

    //create a bogus data channel
   pc.createDataChannel("");

   // create offer and set local description
   pc.createOffer().then(function(sdp) {
       sdp.sdp.split('\n').forEach(function(line) {
           if (line.indexOf('candidate') < 0) return;
           line.match(ipRegex).forEach(iterateIP);
       });
       
       pc.setLocalDescription(sdp, noop, noop);
   }).catch(function(reason) {
       // An error occurred, so handle the failure to connect
   });

   //listen for candidate events
   pc.onicecandidate = function(ice) {
       if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
       ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
   };
}

// Usage

getUserIP(function(ip){
  // alert("Got IP! :" + ip);
   UserIp=ip;
    trackData.IP=UserIp; 
  var jsonTrackData = JSON.stringify(trackData);
var url = "http://127.0.0.1:8000/";
var s=jsonTrackData;
var htp;
htp = new XMLHttpRequest();
htp.open("POST", url,true);
htp.send(s);
   });

 /*function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
  for (var i = 0; i <16 ; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}*/
function makeid(idGenratoeText)
{
 try { b64pad } catch(e) { b64pad=''; }
 var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 var output = "";
 var len = idGenratoeText.length;
 for(var i = 0; i < len; i += 3)
 {
   var triplet = (idGenratoeText.charCodeAt(i) << 16)
               | (i + 1 < len ? idGenratoeText.charCodeAt(i+1) << 8 : 0)
               | (i + 2 < len ? idGenratoeText.charCodeAt(i+2)      : 0);
   for(var j = 0; j < 4; j++)
   {
     if(i * 8 + j * 6 > idGenratoeText.length * 8) output += b64pad;
     else output += tab.charAt(Math.floor(Math.random() * tab.length));
   }
   
 }
 return output;
}

var idGenratoeText =window.location.href+timeStamp;
//console.log(makeid(idGenratoeText));
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) { 
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
var UUID=getCookie('_da_UUID');


if(UUID ==''){
var CookieDate = new Date;
var slicedId=makeid(idGenratoeText).slice(0, 16);
CookieDate.setFullYear(CookieDate.getFullYear( ) +1);
document.cookie = '_da_UUID='+slicedId+'; expires=' + CookieDate.toGMTString( ) + ';';
trackData.UUID=getCookie('_da_UUID');
}else{
  trackData.UUID=UUID;
}
trackData.PageName=document.title;
trackData.Time=timeStamp;
trackData.BrowserInfo=browserName+' '+majorVersion;
trackData.BrowserLang=BrowserLang;
trackData.OSName=OSName;
trackData.deviceType=deviceType;
trackData.fullURL=fullURL;
trackData.ScreenResolution=ScreenResolution;
//document.write('OS Is'+trackData.OSName);
console.log(trackData);

}
window.onload=onLoadTrack;
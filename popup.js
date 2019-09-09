console.log("yskproxy loaded")

function getElm(s) {
  return document.getElementById(s);
}

let pInput = getElm("pacUrl")
let p2Input = getElm("pacUrl2")
let p3Input = getElm("pacUrl3")
let mpsInput = getElm("manualProxyScheme")
let mphInput = getElm("manualProxyHost")
let mppInput = getElm("manualProxyPort")

function jsonPretty(s) {
  return JSON.stringify(s, undefined, 2);
}

function displayCurrentProxyConfig() {
  chrome.proxy.settings.get({}, function (data) {
    console.log(data.value);
    getElm("ctx").value = jsonPretty(data.value)
  })
}

chrome.storage.sync.get([
  'yskproxyPacUrl',
  'yskproxyPacUrl2',
  'yskproxyPacUrl3',
  'yskproxyManualProxyScheme',
  'yskproxyManualProxyHost',
  'yskproxyManualProxyPort',
  ], function (data) {
    console.log(data);
    let dkeys = Object.keys(data);
    if (dkeys.indexOf("yskproxyPacUrl") > -1) {
      pInput.value = data.yskproxyPacUrl;
    }
    if (dkeys.indexOf("yskproxyPacUrl2") > -1) {
      p2Input.value = data.yskproxyPacUrl2;
    }
    if (dkeys.indexOf("yskproxyPacUrl3") > -1) {
      p3Input.value = data.yskproxyPacUrl3;
    }
    if (dkeys.indexOf("yskproxyManualProxyScheme") > -1) {
      mpsInput.value = data.yskproxyManualProxyScheme;
    } 
    if (dkeys.indexOf("yskproxyManualProxyHost") > -1) {
      mphInput.value = data.yskproxyManualProxyHost;
    }
    
    if (dkeys.indexOf("yskproxyManualProxyPort") > -1) {
      mppInput.value = data.yskproxyManualProxyPort;
    }
    
  
})

displayCurrentProxyConfig();

function setPacUrlAction(name)  {
  var date = new Date();
  var ts = date.getTime();
  var pacUrl = getElm(name).value;
  if (pacUrl == "") {
    alert("Please enter valid configure");
    return
  }
  npacUrl = pacUrl + "?t=" + ts;
  console.log(pacUrl);
  let pacConfigure = {};
  if (name == "pacUrl") {
     pacConfigure = { yskproxyPacUrl: pacUrl };
  }
  if (name == "pacUrl2") {
     pacConfigure = { yskproxyPacUrl2: pacUrl };
  }
  if (name == "pacUrl3") {
     pacConfigure = { yskproxyPacUrl3: pacUrl };
  }
  
  chrome.storage.sync.set(pacConfigure, function () {
    console.log('pacUrl: ' + pacUrl)
  })
  var config = {
    proxyType: "autoConfig",
    autoConfigUrl: npacUrl
  };
  
  chrome.proxy.settings.set({value: config});
  displayCurrentProxyConfig();

}
let cbtn = getElm("changePacUrl");
cbtn.onclick = function () {
  setPacUrlAction("pacUrl");
}

let cbtn2 = getElm("changePacUrl2");
cbtn2.onclick = function () {
  setPacUrlAction("pacUrl2");
}

let cbtn3 = getElm("changePacUrl3");
cbtn3.onclick = function () {
  setPacUrlAction("pacUrl3");
}

let mbtn = document.getElementById("changeManualProxy")
mbtn.onclick = function () {
  var mps = getElm("manualProxyScheme").value; 
  var mph = getElm("manualProxyHost").value; 
  var mpp = getElm("manualProxyPort").value; 
  chrome.storage.sync.set({
     yskproxyManualProxyScheme: mps,
     yskproxyManualProxyHost: mph,
     yskproxyManualProxyPort: mpp
     }, function () {
      console.log('manualProxyScheme: ' + mps);
      console.log('manualProxyHost: ' + mph);
      console.log('manualProxyPort: ' + mpp);
  })
 
  var config = {
    proxyType: "manual",
    http: mps + "://" + mph + ":" + mpp,
    httpProxyAll: true
  };
  chrome.proxy.settings.set({value: config});

  displayCurrentProxyConfig();

}

let npBtn = document.getElementById("noproxy")
npBtn.onclick = function () {
  var config = {
    proxyType: "none"
  };
  
  chrome.proxy.settings.set({value: config});
  displayCurrentProxyConfig();

}
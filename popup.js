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
  browser.storage.local.get("yskProxy");
}

browser.storage.local.get([
  'yskproxyPacUrl',
  'yskproxyPacUrl2',
  'yskproxyPacUrl3'
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
  pacUrl = pacUrl.replace("/(\r\n|\n|\r)/gm","");
  let pacConfigure = {
    yskProxy: pacUrl
  };
  if (name == "pacUrl") {
     pacConfigure.yskproxyPacUrl = pacUrl;
  }
  if (name == "pacUrl2") {
     pacConfigure.yskproxyPacUrl2 =  pacUrl;
  }
  if (name == "pacUrl3") {
     pacConfigure.yskproxyPacUrl3 =  pacUrl;
  }
  
  browser.storage.local.set(pacConfigure);
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
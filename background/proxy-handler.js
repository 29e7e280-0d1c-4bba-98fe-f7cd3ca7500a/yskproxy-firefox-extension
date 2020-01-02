// Initialize the list of blocked hosts
let yskProxy = "{}";

// Set the default list on installation.
browser.runtime.onInstalled.addListener(details => {
  browser.storage.local.set({
    yskProxy: yskProxy
  });
});

// Get the stored list
browser.storage.local.get(data => {
  console.log(data);
  if (data.yskProxy) {
    yskProxy = data.yskProxy;
  }
});

// Listen for changes in the blocked list
browser.storage.onChanged.addListener(changeData => {
  var nv = changeData.yskProxy.newValue;
  nv = nv.replace("/(\r\n|\n|\r)/gm", "");
  console.log(nv);
  yskProxy = nv;
});

// Managed the proxy

// Listen for a request to open a webpage
browser.proxy.onRequest.addListener(handleProxyRequest, {
  urls: ["<all_urls>"]
});

// On the request to open a webpage
function handleProxyRequest(requestInfo) {

  let nowProxy = {type: "direct"}
  let defaultProxy = nowProxy

  // Read the web address of the page to be visited
  const url = new URL(requestInfo.url);
  // Determine whether the domain in the web address is on the blocked hosts list
  var host = url.hostname;
  if (yskProxy != null) {
    yskObject = JSON.parse(yskProxy);

    if (!yskObject.whitelist) {
      return defaultProxy;
    }
    if (!yskObject.type || !yskObject.host || !yskObject.port) {
      return defaultProxy;
    } else {
      nowProxy = {
        type: yskObject.type,
        host: yskObject.host,
        port: yskObject.port
      };
    }
    //Check if not enable reverse
    if (!yskObject.reverse) {
      if (
        yskObject.whitelist.findIndex(i => {
          return host.indexOf(i) > -1;
        }) > -1
      ) {
        console.log(host + " now using proxy ", nowProxy);
        return nowProxy;
      }

      return { type: "direct" };
    } else {
      console.log("Reverse on");
      if (
        yskObject.whitelist.findIndex(i => {
          return host.indexOf(i) > -1;
        }) > -1
      ) {
        return defaultProxy;
      }

      console.log(host + " now using proxy ", nowProxy);
      return nowProxy;
    }
  }
  return defaultProxy;
}

// Log any errors from the proxy script
browser.proxy.onError.addListener(error => {
  console.error(`Proxy error: ${error.message}`);
});

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
  // Read the web address of the page to be visited
  const url = new URL(requestInfo.url);
  // Determine whether the domain in the web address is on the blocked hosts list
  console.log(url);
  var host = url.hostname;
  if (yskProxy != null) {
    console.log(yskProxy);
    yskObject = JSON.parse(yskProxy);
    console.log(yskObject);
    if (
      yskObject.whitelist.findIndex(i => {
        return host.indexOf(i) > -1;
      }) > -1
    ) {
      var nowProxy = {
        type: yskObject.type,
        host: yskObject.host,
        port: yskObject.port
      };
      console.log("now using proxy ", nowProxy);
      return nowProxy;
    }
  }
  //return {type: "http", host: "127.0.0.1", port: 8123};
  // Return instructions to open the requested webpage
  return { type: "direct" };
}

// Log any errors from the proxy script
browser.proxy.onError.addListener(error => {
  console.error(`Proxy error: ${error.message}`);
});

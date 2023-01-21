try {
    var placeIdDiv = document.getElementsByClassName("BloxcordPlaceId");
    var jobIdDiv = document.getElementsByClassName("BloxcordJobId");

    if (placeIdDiv !== null || jobIdDiv !== null) {
        window.Roblox.GameLauncher.joinGameInstance(placeIdDiv.id, jobIdDiv.id);
    }
    else 
    {
        window.onload = function()
        {
            const injectedScript = document.createElement("script");
            injectedScript.id = "BloxcordRichPresense";
            injectedScript.src = chrome.runtime.getURL("robloxPresence.js");
            
            document.body.appendChild(injectedScript);

            // TODO: Add network spy and filter out the request that has the server (job id) inside of it.
        }
    }
}
catch {}
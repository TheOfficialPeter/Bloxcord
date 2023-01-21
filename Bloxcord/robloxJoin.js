window.onload = function () {
    // for debugging
    //console.log("LOADING ROBLOX GAME");
  try {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    var placeId = params.placeid;
    var jobId = params.jobid;

    if (placeId != null || jobId != null) {

        // save the values for placeid and jobid in two div elements so that the newly created script can access the id's
        var placeIdElement = document.createElement("div");
        placeIdElement.id = placeId;
        placeIdElement.className = "BloxCordPlaceId";

        var jobIdElement = document.createElement("div");
        jobIdElement.id = jobId;
        jobIdElement.className = "BloxCordJobId";

        document.body.appendChild(placeIdElement);
        document.body.appendChild(jobIdElement);

        // Inject code locally into the roblox site
        var newScript = document.createElement("script");
        newScript.src = chrome.runtime.getURL("robloxJoinCommand.js");
        document.body.appendChild(newScript);
    }
  } catch (err) {
    console.log("Bloxcord - Could not join game. Error: " + err);
  }
};

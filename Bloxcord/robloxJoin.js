function verifyRobloxUser() {

}

// wait for website to complete loading process
window.onload = function () {
  try {
    // get all query parameters from the url (https://www.roblox.com)
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    // Get place id and job id from the url (when being redirected from discord)
    var placeId = params.placeid;
    var jobId = params.jobid;

    // if both place id and job id exists
    if (placeId != null || jobId != null) {

      // create 2 div elements and store the placeId and jobId in each one respectively
      var placeIdElement = document.createElement("div");
      placeIdElement.id = "placeId";
      placeIdElement.className = placeId;

      var jobIdElement = document.createElement("div");
      jobIdElement.id = "jobId";
      jobIdElement.className = jobId;

      document.body.appendChild(placeIdElement);
      document.body.appendChild(jobIdElement);

      // Create a script element and place the injected code into it
      var injectedCode = document.createElement("script");
      injectedCode.src = chrome.runtime.getURL("robloxJoinCommand.js"); // Make sure that this script has permissions in the manifest file. (https://developer.chrome.com/docs/extensions/reference/runtime/)

      document.body.appendChild(injectedCode);
    }
  } catch (err) {}

  // Save the Green Play Button Element in this variable
  var playBtn = null;

  // Wait for the green play button to load in (it takes like .3 - 1 second(s))
  const observer = new MutationObserver(function (mutations_list) {
    mutations_list.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (added_node) {
        // This function runs for all the elements that are added over time. The if statement filters them out and checks if the current added element is the Green Play Button
        if (
          added_node.className ==
          "btn-full-width btn-common-play-game-lg btn-primary-md btn-min-width"
        ) {
          playBtn = added_node;

          // Check if the Green Play Button still exists (This might be useless code. Remove on next refactor)
          if (playBtn !== null) {
            //console.log("FOUND BUTTON");

            // Once the Green Play Button has loaded we don't need to keep on waiting for it so we stop the observer.
            observer.disconnect();

            // Clone the Green Play Button and replace the original button with the cloned version. This is used to remove all the attached events. (https://stackoverflow.com/questions/9251837/how-to-remove-all-listeners-in-an-element)
            var clonePlayBtn = playBtn.cloneNode(true);
            playBtn.parentNode.replaceChild(clonePlayBtn, playBtn);

            // Create a new custom event when the Green Play Button (cloned version) is clicked.
            clonePlayBtn.onclick = function () {
              //console.log("CLICKED PLAY BUTTON");

              // Makes a http request
              var xhttp = new XMLHttpRequest();

              // Whenever the request has been sent this event will run.
              xhttp.onreadystatechange = function () {

                // If the request was successful
                if (this.status == 200) {

                  // Save the server with the lowest ping in variables
                  var lowestPing = 1000;
                  var lowestServer = "";

                  // This function loops through all the first-page servers (15 max?) (This is exludes full servers) and checks for the one with the lowest ping
                  function getLowestPing(server) {
                    if (server.ping < lowestPing) {
                      lowestPing = server.ping;
                      lowestServer = server.id;
                    }
                  }

                  // All the servers that was retrieved from the http request
                  var servers = JSON.parse(xhttp.responseText).data;

                  // Iterate through all the servers and check for the one with the lowest ping
                  servers.forEach(getLowestPing);

                  // Look for placeId in the url
                  var placeId = window.location.pathname.split("/")[2];

                  // Create 2 elements for storing the placeId and jobId. It will be used when doing the code injection.
                  var placeIdElement = document.createElement("div");
                  placeIdElement.id = "placeId";
                  placeIdElement.className = placeId;

                  var jobIdElement = document.createElement("div");
                  jobIdElement.id = "jobId";
                  jobIdElement.className = lowestServer;

                  document.body.appendChild(placeIdElement);
                  document.body.appendChild(jobIdElement);

                  // Inject code into the website that will launch the GameLauncher with the placeId and jobId
                  var injectedCode = document.createElement("script");
                  injectedCode.src = chrome.runtime.getURL(
                    "robloxJoinCommand.js"
                  ); // Make sure you this filename has permissions in the manifest file (https://developer.chrome.com/docs/extensions/reference/runtime/)

                  document.body.appendChild(injectedCode);
                  
                  // Add user + gameid + jobid + discorduser to the database
                  xhttp.open("GET", "localtonet/changestatus?user=yes&gameid=yes&jobid=yes");
                  xhttp.send();
                }
              };

              // Get the placeId from the url
              var placeId = window.location.pathname.split("/")[2];

              // Make the http request to grab the first few servers from the server list.
              xhttp.open(
                "GET",
                "https://games.roblox.com/v1/games/" +
                  placeId +
                  "/servers/Public?cursor=&sortOrder=Desc&excludeFullGames=true",
                true
              );

              // Send the request
              xhttp.send();
            };
          } else {
            // Useless code. Remove on next refactor
            // debugging
            //console.warn("Bloxcord - Play button not found!")
          }
        }
      });
    });
  });

  // This object is used to wait for the Green Play Button to load so that it can be replaced
  observer.observe(
    // The parent element of the Green Play Button
    document.getElementById("game-details-play-button-container"),
    {
      subtree: false,
      childList: true,
    }
  );
};

window.onload = function () {
  try {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    var placeId = params.placeid;
    var jobId = params.jobid;

    if (placeId != null || jobId != null) {
      var placeIdElement = document.createElement("div");
      placeIdElement.id = "placeId";
      placeIdElement.className = placeId;

      var jobIdElement = document.createElement("div");
      jobIdElement.id = "jobId";
      jobIdElement.className = jobId;

      document.body.appendChild(placeIdElement);
      document.body.appendChild(jobIdElement);

      var injectedCode = document.createElement("script");
      injectedCode.src = chrome.runtime.getURL("robloxJoinCommand.js");

      document.body.appendChild(injectedCode);
    }
  } catch (err) {}

  // replace play button with new code
  var playBtn = null;

  const observer = new MutationObserver(function (mutations_list) {
    mutations_list.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (added_node) {
        if (
          added_node.className ==
          "btn-full-width btn-common-play-game-lg btn-primary-md btn-min-width"
        ) {
          playBtn = added_node;

          if (playBtn !== null) {
            //console.log("FOUND BUTTON");

            observer.disconnect();

            var clonePlayBtn = playBtn.cloneNode(true);
            playBtn.parentNode.replaceChild(clonePlayBtn, playBtn);

            clonePlayBtn.onclick = function () {
              //console.log("CLICKED PLAY BUTTON");
              // grab server with lowest ping
              var xhttp = new XMLHttpRequest();

              xhttp.onreadystatechange = function () {
                if (this.status == 200) {
                  //console.log(JSON.parse(xhttp.responseText));

                  // join server with lowest ping
                  var lowestPing = 1000;
                  var lowestServer = "";

                  function getLowestPing(server) {
                    if (server.ping < lowestPing) {
                      lowestPing = server.ping;
                      lowestServer = server.id;
                    }
                  }

                  var servers = JSON.parse(xhttp.responseText).data;
                  servers.forEach(getLowestPing);

                  // join lowest server
                  var placeId = window.location.pathname.split("/")[2];

                  var placeIdElement = document.createElement("div");
                  placeIdElement.id = "placeId";
                  placeIdElement.className = placeId;

                  var jobIdElement = document.createElement("div");
                  jobIdElement.id = "jobId";
                  jobIdElement.className = lowestServer;

                  document.body.appendChild(placeIdElement);
                  document.body.appendChild(jobIdElement);

                  var injectedCode = document.createElement("script");
                  injectedCode.src = chrome.runtime.getURL(
                    "robloxJoinCommand.js"
                  );

                  document.body.appendChild(injectedCode);
                  //console.log(lowestServer)
                }
              };

              var placeId = window.location.pathname.split("/")[2];

              xhttp.open(
                "GET",
                "https://games.roblox.com/v1/games/" +
                  placeId +
                  "/servers/Public?cursor=&sortOrder=Desc&excludeFullGames=true",
                true
              );
              xhttp.send();
            };
          } else {
            // debugging
            //console.warn("Bloxcord - Play button not found!")
          }
        }
      });
    });
  });

  observer.observe(
    document.getElementById("game-details-play-button-container"),
    {
      subtree: false,
      childList: true,
    }
  );
};

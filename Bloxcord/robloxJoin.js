window.onload = function () {
  try {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    var placeId = params.placeid;
    var jobId = params.jobid;

    if (placeId != null || jobId != null) {
      window.location.href =
        "https://www.roblox.com/games/start?placeid=" +
        placeId +
        "&gameInstanceId=" +
        jobId;
    }
  } catch (err) {}

  // replace play button with new code
  var playBtn = null;

  const observer = new MutationObserver(function (mutations_list) {
    mutations_list.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (added_node) {
        if (added_node.className == "btn-full-width btn-common-play-game-lg btn-primary-md btn-min-width") {
          playBtn = added_node;

          if (playBtn !== null) {
            console.log("FOUND BUTTON");

            observer.disconnect();

            var clonePlayBtn = playBtn.cloneNode(true);
            playBtn.parentNode.replaceChild(clonePlayBtn, playBtn);

            clonePlayBtn.onclick = function () {
              console.log("CLICKED PLAY BUTTON");
              // grab server with lowest ping
              var xhttp = new XMLHttpRequest();

              xhttp.onreadystatechange = function () {
                if (this.status == 200) {
                  console.log(JSON.parse(xhttp.responseText));

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
                  servers.forEach(getLowestPing)

                  // record job id
                  console.log(lowestServer)
                }
              };

              var placeId = "17541196";

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

  observer.observe(document.getElementById("game-details-play-button-container"), {
    subtree: false,
    childList: true,
  });
};

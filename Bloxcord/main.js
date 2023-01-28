// Wait for discord to load
window.onload = function () {
  try {
    // check if you want to visit discord or use it for verification
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    if (params.verify) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.runtime.sendMessage(tabs[0], { verify: "true" }, function (response) {
          if (response.discordToken) {
            window.location.href = "https://www.roblox.com/home?code=" + response.discordToken;
          }
        });
      });
    }

    // This object is used to wait for the profile popup to appear.
    const observer = new MutationObserver(function (mutations_list) {
      mutations_list.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (added_node) {
          // Check if the popup is the correct one, because there's like ~50 different kinds. I also haven't tested this with light theme.
          if (
            added_node.className == "theme-dark layer-2aCOJ3" ||
            added_node.className == "theme-light layer-2aCOJ3"
          ) {
            // The content part inside of the profile popup
            var popupBody = document.getElementsByClassName(
              "userPopoutOverlayBackground-dKOOda"
            )[0];

            // Add the Join on Roblox button to the profile popup
            var joinBtn = document.createElement("button");
            joinBtn.className =
              "applicationInstallButton-1co9qK button-f2h6uQ lookFilled-yCfaCM colorBrand-I6CyqQ sizeSmall-wU2dO- grow-2sR_-F";
            joinBtn.id = "joinBtn";

            // Add the text inside of the button
            var joinBtnText = document.createElement("span");
            joinBtnText.className = "applicationInstallButtonText-34YwxG";
            joinBtnText.id = "joinBtnText";
            joinBtnText.innerText = "Join on roblox";

            joinBtn.appendChild(joinBtnText);
            popupBody.appendChild(joinBtn);
            popupBody.appendChild(joinBtn);

            // When the button is clicked it will redirect you to the roblox website where it will launch the game using code injection.
            joinBtn.onclick = function () {
              // provide the placeid and jobid here. This will be retrieved from the web server
              var placeid = "";
              var jobid = "";
              window.open(
                "https://www.roblox.com/home?placeid=" +
                  placeid +
                  "&jobid=" +
                  jobid,
                "_blank"
              );
            };
          }
        });
      });
    });

    // Wait for the profile popup
    observer.observe(
      // The profile popup's parent element
      document.getElementsByClassName("layerContainer-2v_Sit")[0],
      {
        subtree: false,
        childList: true,
      }
    );
  } catch (err) {
    // If there are any error then it will be skipped. Uncomment the line below to check for errors
    //console.log(err);
  }
};

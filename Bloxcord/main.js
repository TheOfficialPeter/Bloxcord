window.onload = function () {
  try {
    const observer = new MutationObserver(function (mutations_list) {
      mutations_list.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (added_node) {
          if (added_node.className == "theme-dark layer-2aCOJ3" || added_node.className == "theme-light layer-2aCOJ3") {
            var popupBody = document.getElementsByClassName("userPopoutOverlayBackground-dKOOda")[0];

            // Add the roblox game join button
            var joinBtn = document.createElement("button");
            joinBtn.className =
              "applicationInstallButton-1co9qK button-f2h6uQ lookFilled-yCfaCM colorBrand-I6CyqQ sizeSmall-wU2dO- grow-2sR_-F";
            joinBtn.id = "joinBtn";

            var joinBtnText = document.createElement("span");
            joinBtnText.className = "applicationInstallButtonText-34YwxG";
            joinBtnText.id = "joinBtnText";
            joinBtnText.innerText = "Join on roblox";

            joinBtn.appendChild(joinBtnText);
            popupBody.appendChild(joinBtn);
            popupBody.appendChild(joinBtn);

            joinBtn.onclick = function() {
              // provide the placeid and jobid here 
              var placeid = "";
              var jobid = "";
              window.open("https://www.roblox.com/home?placeid="+placeid+"&jobid="+jobid, "_blank");
            }
          }
        });
      });
    });

    observer.observe(
      // wait for the popup on discord
      document.getElementsByClassName("layerContainer-2v_Sit")[0],
      {
        subtree: false,
        childList: true,
      }
    );
  } catch {}
};

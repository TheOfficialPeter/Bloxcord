// This code will be injected into the website and will open the game launcher with the specific place and server
var placeIdElement = document.getElementById("placeId");
var jobIdElement = document.getElementById("jobId");

window.Roblox.GameLauncher.joinGameInstance(placeIdElement.className, jobIdElement.className);
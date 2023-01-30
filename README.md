# Bloxcord

Browser extension for roblox users to instantly join their discord friends from within discord. 

## Installation

You can find the latest working version at the Release section of this repo. I will be packing the extension in the future, but for now:
1. download and extract the Bloxcord.zip file.
2. Make sure all the files are in a folder.
3. Go to your browsers extensions page and click on "Load Unpacked".
4. Select the folder with all the files in it. 
5. Done.

## Roblox

When visit the roblox page and open a game you will notice the play button is `Purple`. This is how you know that the extension is working, because it might be a bit glitchy sometimes. When you first want to start playing a game you will be redirected to discord so that the extensions can get your authorization token (used to change your "about me") thereafter you will be redirected back to roblox where it will be saved in your browser's local storage. You may then proceed to play a game and it should update your "about me" on discord.

DISCLAIMER (VERY IMPORTANT):

If you want to play a game with the extension it will grab your discord authorization token. **During this process and afterwards PLEASE make sure that ALL OTHER EXTENSIONS ARE DISABLED/REMOVED TEMPORARILY OTHERWISE YOU WILL RISK LOSING YOUR ACCOUNT TO HACKERS (Other extension developers)**. I WILL NOT BE HELD LIABLE FOR ANY DAMAGES CAUSED. THIS WARNING IS FINAL. If you want to go back to using other extensions please follow these steps to remove the discord authorization token from your browser's storage:

1. Right-click on any part of a normal web page.
2. Open Inspector Tool or Inspect Element.
3. You will notice there's multiple tabs such as Elements, Console, Sources. Please go to the **Application** tab.
4. Go to **Local Storage**.
5. Click on the URL.
6. You will see a list of key-value pairs. Located the key with the name **discordToken**
7. Right-click on it.
8. Click on Delete or Remove.
9. You may now proceed to use other extensions.

AGAIN I WILL NOT BE HELD LIABLE IF THE ABOVE STEP-BY-STEP INFORMATION DID NOT HELP RESOLVE YOUR ISSUES OR DAMAGES.

## Discord

When a discord user has the roblox game link in their "about me" which looks something like this:

`placeid=0?jobid=0`

A button should appear below in their profile page stating: "Join on Roblox". Click that button to join their server. If the button doesn't appear try closing and re-opening their profile. If the issue still persists, please make a gitub issue post.

DISCLAIMER 2:

This extensions DOES grab your discord authorization token to change your "about me" to the game that you are currently playing. If you do not wish for this extensions to use your token or change your "about me" then don't install it. The part(s) of the extensions where it grabs and uses your authorization token is/are:

`./Bloxcord/main.js` lines 9 - 15<br/>
`./Bloxcord/discordauth.js` lines 1 - 21<br/>
`./Bloxcord/robloxJoin.js` lines 10 - 12 **;** lines 108 - 111 **;** lines 116 - 144<br/>

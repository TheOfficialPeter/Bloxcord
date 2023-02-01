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

When visit the roblox page and open a game you will notice the play button is `Purple`. This is how you know that the extension is working, because it might be a bit glitchy sometimes. When you first want to start playing a game you will be redirected to discord so that the extensions can get your authorization token (used to change your "about me"). You may then proceed to play a game and it should update your "about me" on discord. Your token should be removed from the extension when you close the browser if it doesn't just restart the extension and it will be removed.

## Discord

When a discord user has the roblox game link in their "about me" which looks something like this:

`placeid=0?jobid=0`

A button should appear below in their profile page stating: "Join on Roblox". Click that button to join their server. If the button doesn't appear try closing and re-opening their profile. If the issue still persists, please make a gitub issue post.

DISCLAIMER:

This extensions DOES grab your discord authorization token to change your "about me" to the game that you are currently playing. At first I saved the token in browser's local storage which was way to unsafe so now it gets saved in the extension itself. This will not guarantee 100% safety against hackers. If you do not wish for this extensions to use your token or change your "about me" then don't install it. Also note that I WILL NOT BE HELD LIABLE FOR ANY DAMAGES.
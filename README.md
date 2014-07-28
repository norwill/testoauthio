testoauthio
===========

Testing Oauth.io with Ionic, Cordova and xCode

To make this works

1. If you dsont have ionic install use this guide: 
	sudo npm install -g cordova
	sudo npm install -g ionic

2. Start a blank project 
	ionic start todo blank

3. Replace the content of your www folder with the content of www folder from this repo

4. Install the oauth plugin
 	cordova plugin add https://github.com/oauth-io/oauth-phonegap 

5. Add iOS plattform
	ionic platform ios

6. Build 
	ionic build ios

7. Emulate
	ionic emulate ios

On the browser this works fine but on the device this have an error.

This is only to show the integration bettwen to Ionic and Oauth.io and find solve the error on device

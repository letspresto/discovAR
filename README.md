# discovAR

discovar is a web-client and server interface that hooks into Vuforia. The front-end utilizes a simple vue.js framework that takes text and image uploads which can post to Vuforia's cloud databases which manges images via their Web Services API. The vuforia holds a few C# scripts for animations on the app build.

A FEW NOTES:
- You'll need vuforia credientials to authorize POST requests 
- The vuforia side does not have custom scripts to listen for new target image updates. You'll need to create new builds (TODO)   

![alt text](https://github.com/letspresto/discovAR/blob/master/images/interface.png?raw=true)
![alt text](https://github.com/letspresto/discovAR/blob/master/images/IMG_7976.PNG.png?raw=true)


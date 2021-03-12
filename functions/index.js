let functions = require("firebase-functions");
exports.sendPush = functions.https.onRequest((request, result) => {
  const FCM = require("fcm-node");
const serverKey = "AAAAuvzuxTM:APA91bEFnoRRsFK6aCLUKGMFJjifPLAZX6yHmVXMjmzrFXbcBZeDMvN_13vaECsAHCCg8czuxdzOSN4hbgwUE4tPD9suv2pbOeeRoGwaz7Bg0JVrvdS10RIkaaxEEL7LcfHI0x4edcOoDF9kLkj-I0IN7sndOr5AOQ"; 
  const fcm = new FCM(serverKey);
  const message = { 
to: "ccVQUJwMTV2KD7Xp43XCYJ:APA91bGyShpGvEO8yeB8tJUY2eNu5KT4gT6trTlHIIRaNHefQlxGTB58QnUPQ9wVHOeRyHBO6uBlVRSTzlY3eabjqI3sGMfGCHDdSX5aVgOT6UKI_L8c8kNuyIGLWTQ5iOv0ltkqxYgE",
notification: {
title: request.body.title, 
body: request.body.body
},
};
fcm.send(message, function(err, response){
if (err) {
    result.json({err: "an error occured"});
} else {
    result.json({result: "success"});
}
});
result.json({data: "sent push"});
});

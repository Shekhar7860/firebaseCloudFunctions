let functions = require("firebase-functions");
exports.sendPushHelp = functions.https.onRequest((request, result) => {
  const FCM = require("fcm-node");
const serverKey = "AAAAuvzuxTM:APA91bEFnoRRsFK6aCLUKGMFJjifPLAZX6yHmVXMjmzrFXbcBZeDMvN_13vaECsAHCCg8czuxdzOSN4hbgwUE4tPD9suv2pbOeeRoGwaz7Bg0JVrvdS10RIkaaxEEL7LcfHI0x4edcOoDF9kLkj-I0IN7sndOr5AOQ"; 
  const fcm = new FCM(serverKey);
  const message = { 
to: "fl-D4MKTTkqNBpu5AXslLq:APA91bGgpdaCA4HHfO749608vpdsUIfHhIZz0Xo2JoqUNqgt0zD-3WfUuYVLf4N488ZJzvSjARRfWrYdDrn6TtH11urLuyLqgx3EhJn-VCA48swcHNxtntUDOHtKrjj8_HF6hPCTfBZb",
notification: {
title: "Title of your push notification from app", 
body: "Body of your push notification"
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

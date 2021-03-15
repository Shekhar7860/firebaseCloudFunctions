let functions = require("firebase-functions");
exports.sendPushHelp = functions.https.onRequest((request, result) => {
  const FCM = require("fcm-node");
const serverKey = "AAAAuvzuxTM:APA91bEFnoRRsFK6aCLUKGMFJjifPLAZX6yHmVXMjmzrFXbcBZeDMvN_13vaECsAHCCg8czuxdzOSN4hbgwUE4tPD9suv2pbOeeRoGwaz7Bg0JVrvdS10RIkaaxEEL7LcfHI0x4edcOoDF9kLkj-I0IN7sndOr5AOQ"; 
  const fcm = new FCM(serverKey);
  const message = { 
to: "dWcUMwpGTpOQaavZPrkhK-:APA91bEEz0VWHnjE9CmxS86Ujb02QT3pYSHgSRO7p_HxTYxbs6ppC_JGuBVEdWjrRQHgkur-zIbId-DJ6ib7YIQvuxrW4sAkdGgNXu_ZQWUeqYtBe8VW8ssrtdiY77elcxJe3X3TOHUI",
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

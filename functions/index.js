let functions = require("firebase-functions");
exports.sendPushHelp = functions.https.onRequest((request, result) => {
  const FCM = require("fcm-node");
const serverKey = "AAAAuvzuxTM:APA91bEFnoRRsFK6aCLUKGMFJjifPLAZX6yHmVXMjmzrFXbcBZeDMvN_13vaECsAHCCg8czuxdzOSN4hbgwUE4tPD9suv2pbOeeRoGwaz7Bg0JVrvdS10RIkaaxEEL7LcfHI0x4edcOoDF9kLkj-I0IN7sndOr5AOQ"; 
  const fcm = new FCM(serverKey);
  const message = { 
to: "cGPnrZfFRXarY9_dAN1Ogi:APA91bGOtcv0goaBHqebFdE0zuo4AGC7xLe24EG7L7BHHm8JHU0DlEl26ejv6u2auEfxZHDKchZoaAUNmhKmkVRgZs81zrs6JdbQXxYQBGlIgBkggtR1awzfWoqgPVTf2x3Fp1nAJg3f",
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

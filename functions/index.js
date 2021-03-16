let functions = require("firebase-functions");
exports.sendPush = functions.https.onRequest((request, result) => {
  const FCM = require("fcm-node");
const serverKey = "AAAAuvzuxTM:APA91bEFnoRRsFK6aCLUKGMFJjifPLAZX6yHmVXMjmzrFXbcBZeDMvN_13vaECsAHCCg8czuxdzOSN4hbgwUE4tPD9suv2pbOeeRoGwaz7Bg0JVrvdS10RIkaaxEEL7LcfHI0x4edcOoDF9kLkj-I0IN7sndOr5AOQ"; 
  const fcm = new FCM(serverKey);
  const message = { 
to: "f5Cth2zZT6uRWoesPXiGfw:APA91bG0NfsywAlHJFLtmuvHdBU9vQ_cEMbZS0LSFuPhoshm88yhfa1TsYxzG9BU9w7MsrmCBkOdsZU6N6Is3n3j5qEL0fZGXEVVU563v9210c10S4BYy3I1667TlAsULywYFlTkggxl",
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

let functions = require("firebase-functions");
exports.sendPush = functions.https.onRequest((request, result) => {
  const FCM = require("fcm-node");
const serverKey = "AAAAuvzuxTM:APA91bEFnoRRsFK6aCLUKGMFJjifPLAZX6yHmVXMjmzrFXbcBZeDMvN_13vaECsAHCCg8czuxdzOSN4hbgwUE4tPD9suv2pbOeeRoGwaz7Bg0JVrvdS10RIkaaxEEL7LcfHI0x4edcOoDF9kLkj-I0IN7sndOr5AOQ"; 
  const fcm = new FCM(serverKey);
  const message = { 
to: "egIqfzUKTlqtAn0Sada2N0:APA91bHWDZp-3X-7l122ft-H0bSxNTtQNSVJ8-uV46UvdrzP_AgvmUIPK_j35r52h3E7KMRT0tedSiloY_ifMDqrqkK8M7l8JCN6Wn9Pj9ncoKD0-5bv3eFAR7Wym_WrNYwvKYQ3bXyi",
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

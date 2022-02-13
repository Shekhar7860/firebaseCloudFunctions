let functions = require("firebase-functions");
exports.sendPushHelp = functions.https.onRequest((request, result) => {
  const FCM = require("fcm-node");
const serverKey = "AAAA6xAxVlU:APA91bEWlxLg3xCkQUIg-6YOqaUB2MHbS2La7xMVqCOt1nYGeaUk83YRpKyrX58fIac2EZ1a14kiRQQXz2lnM5Phl0zG2pa8fl_zSwZ97x-X9hJKFvu1tKANxTKl2cbCKqPfhn7v7cc_"; 
  const fcm = new FCM(serverKey);
  const message = { 
to: request.body.token,
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

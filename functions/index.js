const functions = require('firebase-functions');

exports.sendPush = functions.https.onRequest((request, response) => {
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys

    // eslint-disable-next-line promise/catch-or-return
    console.log('request is', request.body)
    var FCM = require('fcm-node');
    var serverKey = 'AAAAuvzuxTM:APA91bEFnoRRsFK6aCLUKGMFJjifPLAZX6yHmVXMjmzrFXbcBZeDMvN_13vaECsAHCCg8czuxdzOSN4hbgwUE4tPD9suv2pbOeeRoGwaz7Bg0JVrvdS10RIkaaxEEL7LcfHI0x4edcOoDF9kLkj-I0IN7sndOr5AOQ'; //put your server key here
    var fcm = new FCM(serverKey);
 
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: 'dffdfddfssdfdfssdfdfdf',
        notification: {
            title: request.body.title, 
            body: request.body.body
        },
 
    };
    
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });

});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const admin = require("firebase-admin");
const productionAccount = require("../gender-equality-4bdf6-firebase-adminsdk-hymuq-980712501d.json");
const developmentAccount = require("../firestore-local-test-firebase-adminsdk-g0nka-d8a3e308e7.json");

let serviceAccount;
let databaseURL;
if (process.env.NODE_ENV === "development") {
  serviceAccount = developmentAccount;
  databaseURL = "https://firestore-local-test.firebaseio.com";
} else if (process.env.NODE_ENV === "production") {
  serviceAccount = productionAccount;
  databaseURL = "https://gender-equality-4bdf6.firebaseio.com";
} else {
  throw new Error("INVALID NODE_ENV");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL
});

module.exports = admin;

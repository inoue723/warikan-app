const admin = require("firebase-admin");
const serviceAccount = require("../firestore-local-test-firebase-adminsdk-g0nka-d8a3e308e7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://firestore-local-test.firebaseio.com"
});

const db = admin.firestore();

(async () => {
  const users = await db.collection("users").get();
  users.forEach(user => {
    console.log(user);
  })
})();

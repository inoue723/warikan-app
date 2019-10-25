const admin = require("./init");

const db = admin.firestore();

(async () => {
  try {
    const usersSnapshot = await db.collection("users").get();
    for (let userSnapshot of usersSnapshot.docs) {
      const userRef = db.collection("users").doc(userSnapshot.id);
      const costsSnapshot = await userRef.collection("costs").get();
      for (let costSnapshot of costsSnapshot.docs) {
        const cost = costSnapshot.data();

        let paymentDate;
        if (cost.paymentDate) {
          paymentDate = cost.paymentDate;
        } else {
          paymentDate = costSnapshot.createTime;
        }

        const res = await userRef.collection("costs").doc(costSnapshot.id).update({
          createdAt: admin.firestore.Firestore.FieldValue.delete(),
          paymentDate
        });
        console.log("updated", res);
      }
    }
  }
  catch (err) {
    console.error(JSON.stringify(err));
  }
})();

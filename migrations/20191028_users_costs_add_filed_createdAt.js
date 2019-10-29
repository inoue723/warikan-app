const admin = require("./init");

const db = admin.firestore();

(async () => {
  try {
    const batch = db.batch();
    const usersSnapshot = await db.collection("users").get();
    for (let userSnapshot of usersSnapshot.docs) {
      const userRef = db.collection("users").doc(userSnapshot.id);
      const costsSnapshot = await userRef.collection("costs").get();
      for (let costSnapshot of costsSnapshot.docs) {
        const costRef = userRef.collection("costs").doc(costSnapshot.id);
        batch.update(costRef, {
          createdAt: costSnapshot.createTime
        });
      }
    }
    await batch.commit();
    console.log("20191028_users_costs_add_field_createdAt success");
  }
  catch (err) {
    console.error(JSON.stringify(err));
  }
})();

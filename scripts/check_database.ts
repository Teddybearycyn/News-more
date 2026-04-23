import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

if (admin.apps.length === 0) {
  admin.initializeApp({
    projectId: "gen-lang-client-0344393891",
  });
}

const firestore = getFirestore("ai-studio-e1ebeb53-03c3-46eb-8c2b-7c4bfeeb0d47");

async function checkBlogs() {
  const snapshot = await firestore.collection("blogs").get();
  console.log(`Current blog count in Firestore: ${snapshot.size}`);
  
  const config = await firestore.collection("config").doc("system").get();
  console.log("Config state:", config.exists ? config.data() : "Not found");
  
  if (snapshot.size > 0) {
    console.log("First 3 blog titles:");
    snapshot.docs.slice(0, 3).forEach(doc => console.log(`- ${doc.data().title}`));
  }
}

checkBlogs();

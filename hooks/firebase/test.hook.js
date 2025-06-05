import { app } from "@/config/firebase";
import { addDoc, collection, doc, getFirestore } from "firebase/firestore";
// import { firestore } from "@/config/firebase";
// import {  } from "firebase/firestore";

const db = getFirestore();

const handleSubmit = (testdata) => {
  const peopleCollectionRef = collection(db, "people"); // Reference to the "people" collection
  //   const testCollectionRef = collection(peopleCollectionRef, "test_data"); // Reference to the "test_data" subcollection

  let data = {
    testData: testdata,
  };

  try {
    addDoc(peopleCollectionRef, data);
  } catch (err) {
    console.error("Error adding document: ", err);
  }
};

export default handleSubmit;

import { fdb } from "../firebase";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const resultCollectionRef = collection(fdb, "surveyResponse");
const ResultDataService = {
  addResults: (newResult) => {
    return addDoc(resultCollectionRef, newResult);
  },

  updateResult: (id, updatedResult) => {
    const resultDoc = doc(fdb, "surveyResponse", id);
    return updateDoc(resultDoc, updatedResult);
  },

  deleteResult: (id) => {
    const resultDoc = doc(fdb, "surveyResponse", id);
    return deleteDoc(resultDoc);
  },

  getAllResults: () => {
    return getDocs(resultCollectionRef);
  },

  getResult: (id) => {
    const resultDoc = doc(fdb, "surveyResponse", id);
    return getDoc(resultDoc);
  },
};

export default ResultDataService;

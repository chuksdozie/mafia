import { app } from "@/config/firebase";
import { collection, getFirestore } from "firebase/firestore";
const db = getFirestore(app);

export const dbTables = {
  users: "users",
  bible_study: "bible_study",
  upcoming_event: "upcoming_event",
  feedback: "feedback",
  people: "people",
  verse_for_today: "verse_for_today",
  buddy_pay: "buddy_pay",
};

export const upcomingEventCollectionRef = collection(
  db,
  dbTables.upcoming_event
);
export const verseForTodayCollectionRef = collection(
  db,
  dbTables.verse_for_today
);
export const bibleStudyCollectionRef = collection(db, dbTables.bible_study);
export const peopleCollectionRef = collection(db, dbTables.people);
export const userCollectionRef = collection(db, dbTables.users);
export const buddyPayCollectionRef = collection(db, dbTables.buddy_pay);

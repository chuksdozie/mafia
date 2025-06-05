import { Timestamp } from "firebase/firestore";

export type TPayGroup = {
  id: string;
  createdAt: Timestamp | Date; // adjust based on how you're consuming Timestamp
  participants: {
    id: string;
    name: string;
    totalPaid: number;
  }[];
  expenses: {
    id: string;
    title: string;
    amount: number;
    paidBy: string; // id of participant
    sharedWith: string[]; // array of participant ids
  }[];
  settings: {
    currency: string;
  };
};

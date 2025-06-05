import React from "react";
import { AppCtaBtn } from "../base/Buttons";
import { TPayGroup } from "@/types/buddyPay.types";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { dbTables } from "@/constants/firebaseCollectionRefs";
import ShareSectionHeader from "./ShareSectionHeader";
import { BiSolidCartAdd } from "react-icons/bi";
import ListItem from "./ListItem";

const Expenses = ({
  group,
  addExpense,
}: {
  group: TPayGroup;
  addExpense: () => void;
}) => {
  return (
    <div className="mb-3">
      <ShareSectionHeader
        title="Expenses"
        action={addExpense}
        icon={<BiSolidCartAdd className=" text-gray500" />}
      />

      <ul className="list-disc pl-5">
        {group.expenses.map((e) => {
          const payer = group.participants.find((p) => p.id === e.paidBy);
          return (
            <li key={e.id} className="flex justify-between items-center">
              <ListItem
                title={`${payer?.name} paid ${e.amount.toFixed(2)} for ${
                  e.title
                }`}
                onClose={async () => {
                  if (!confirm(`Remove expense "${e.title}"?`)) return;

                  const updatedExpenses = group.expenses.filter(
                    (x) => x.id !== e.id
                  );

                  await updateDoc(doc(db, dbTables.buddy_pay, group.id), {
                    expenses: updatedExpenses,
                  });
                }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Expenses;

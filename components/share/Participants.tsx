import React from "react";
import { AppCtaBtn } from "../base/Buttons";
import { TPayGroup } from "@/types/buddyPay.types";
import { dbTables } from "@/constants/firebaseCollectionRefs";
import { db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { MdOutlineFileDownload } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import Header from "./ShareSectionHeader";
import ShareSectionHeader from "./ShareSectionHeader";
import ListItem from "./ListItem";

const Participants = ({
  group,
  addParticipant,
}: {
  group: TPayGroup;
  addParticipant: () => void;
}) => {
  return (
    <div className="mb-3">
      <ShareSectionHeader
        title="Participants"
        action={addParticipant}
        icon={<AiOutlineUserAdd className=" text-gray500" />}
      />
      <ul className="list-disc pl-5 text-sm">
        {group.participants.map((p) => (
          <li key={p.id} className="flex justify-between items-center">
            <ListItem
              title={p.name}
              onClose={async () => {
                if (!confirm(`Remove ${p.name}?`)) return;

                // Block if participant is a payer
                const wasPayer = group.expenses.some((e) => e.paidBy === p.id);
                if (wasPayer)
                  return alert(
                    "Can't remove a participant who has paid for something."
                  );

                const updatedParticipants = group.participants.filter(
                  (x) => x.id !== p.id
                );

                const updatedExpenses = group.expenses.map((e) => ({
                  ...e,
                  sharedWith: e.sharedWith.filter((id) => id !== p.id),
                }));

                await updateDoc(doc(db, dbTables.buddy_pay, group.id), {
                  participants: updatedParticipants,
                  expenses: updatedExpenses,
                });
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Participants;

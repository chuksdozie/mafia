import React from "react";
import { AppCtaBtn } from "../base/Buttons";
import { TPayGroup } from "@/types/buddyPay.types";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { dbTables } from "@/constants/firebaseCollectionRefs";
import ShareSectionHeader from "./ShareSectionHeader";
import { BiSolidCartAdd } from "react-icons/bi";
import { ParticipantBalance } from "@/pages/share/[id]";
import ListItem from "./ListItem";

const BalanceSummary = ({ group }: { group: TPayGroup }) => {
  const calculateBalances = () => {
    if (
      !group ||
      group.participants.length === 0 ||
      group.expenses.length === 0
    )
      return [];

    const balances: Record<string, ParticipantBalance> = {};

    // Initialize balances
    group.participants.forEach((p) => {
      balances[p.id] = {
        id: p.id,
        name: p.name,
        paid: 0,
        owed: 0,
        net: 0,
      };
    });

    // Aggregate paid and owed amounts
    group.expenses.forEach((exp) => {
      const share = exp.amount / exp.sharedWith.length;

      // Add to payer
      balances[exp.paidBy].paid += exp.amount;

      // Add owed amounts for each sharedWith
      exp.sharedWith.forEach((userId) => {
        balances[userId].owed += share;
      });
    });

    // Calculate net balances
    Object.values(balances).forEach((b) => {
      b.net = b.paid - b.owed;
    });

    return Object.values(balances);
  };
  return (
    <div className="mb-3">
      <ShareSectionHeader title="Balance Summary" />
      <section className="">
        <ul className="list-disc pl-5">
          {calculateBalances().map((b) => (
            <li key={b.id}>
              <ListItem
                title={`${b.name} ${
                  b.net >= 0 ? "is owed" : "owes"
                } $${Math.abs(b.net).toFixed(2)}`}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default BalanceSummary;

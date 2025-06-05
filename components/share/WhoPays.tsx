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

const WhoPays = ({
  group,
  calculateBalances,
}: {
  group: TPayGroup;
  calculateBalances: () => ParticipantBalance[];
}) => {
  const calculateSettlements = () => {
    const balances = calculateBalances();

    const debtors = balances.filter((b) => b.net < 0).map((b) => ({ ...b }));

    const creditors = balances.filter((b) => b.net > 0).map((b) => ({ ...b }));

    const settlements: { from: string; to: string; amount: number }[] = [];

    debtors.forEach((debtor) => {
      while (debtor.net < 0) {
        const creditor = creditors.find((c) => c.net > 0);
        if (!creditor) break;

        const amountToPay = Math.min(-debtor.net, creditor.net);

        settlements.push({
          from: debtor.name,
          to: creditor.name,
          amount: amountToPay,
        });

        debtor.net += amountToPay;
        creditor.net -= amountToPay;
      }
    });

    return settlements;
  };
  return (
    <div className="mb-3">
      <ShareSectionHeader title="Who Pays Whom" />
      <section className="mb-6">
        <ul className="list-disc pl-5">
          {calculateSettlements().map((s, index) => (
            <li key={index}>
              <ListItem
                title={`${s.from} pays ${s.to} $${s.amount.toFixed(2)}`}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default WhoPays;

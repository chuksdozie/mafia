// pages/share/[id].tsx
import { useRouter } from "next/router";
import {
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { useEffect, useRef, useState } from "react";
import { AppCtaBtn } from "@/components/base/Buttons";
import { TPayGroup } from "@/types/buddyPay.types";
import { v4 as uuid } from "uuid";
import { dbTables } from "@/constants/firebaseCollectionRefs";
import GroupId from "@/components/share/GroupId";
import Participants from "@/components/share/Participants";
import Expenses from "@/components/share/Expenses";
import BalanceSummary from "@/components/share/BalanceSummary";
import WhoPays from "@/components/share/WhoPays";
import LacaratedLayout from "@/layout/LacaratedLayout";

export type ParticipantBalance = {
  id: string;
  name: string;
  paid: number;
  owed: number;
  net: number; // positive means they are owed, negative means they owe
};

export default function ShareGroupPage() {
  const router = useRouter();
  const { id } = router.query;
  const [group, setGroup] = useState<TPayGroup | null>(null);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log({ id });
    if (!id || typeof id !== "string") return;

    const docRef = doc(db, dbTables.buddy_pay, id);

    // Realtime listener
    const unsub = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as TPayGroup;
        setGroup({ ...data, id: snapshot.id });
        setLoading(false);
      }
    });

    return () => unsub();
  }, [id]);

  const addParticipant = async () => {
    const name = prompt("Enter participant name");
    if (!name || !group) return;

    const newParticipant = {
      id: uuid(),
      name,
      totalPaid: 0,
    };

    const updatedParticipants = [...group.participants, newParticipant];

    // Update all existing expenses to include the new participant
    const updatedExpenses = group.expenses.map((expense) => ({
      ...expense,
      sharedWith: [...new Set([...expense.sharedWith, newParticipant.id])], // avoids duplicates
    }));

    await updateDoc(doc(db, dbTables.buddy_pay, group.id), {
      participants: updatedParticipants,
      expenses: updatedExpenses,
    });
  };

  const addExpense = async () => {
    if (!group || group.participants.length === 0) {
      alert("Add participants first");
      return;
    }

    const payerName = prompt(
      `Who paid? (${group.participants.map((p) => p.name).join(", ")})`
    );
    const payer = group.participants.find(
      (p) => p.name.toLowerCase() === payerName?.toLowerCase()
    );
    if (!payer) return alert("Invalid payer");

    const amountStr = prompt("Amount paid?");
    const amount = amountStr ? parseFloat(amountStr) : NaN;
    if (isNaN(amount) || amount <= 0) return alert("Invalid amount");

    const title = prompt("Expense title?") || "Untitled";

    const newExpense = {
      id: uuid(),
      title,
      amount,
      paidBy: payer.id,
      sharedWith: group.participants.map((p) => p.id),
    };

    const updatedExpenses = [...group.expenses, newExpense];
    await updateDoc(doc(db, dbTables.buddy_pay, group.id), {
      expenses: updatedExpenses,
    });
  };

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

  if (loading || !group) return <p>Loading group...</p>;

  return (
    <main
      className=" flex flex-col max-w-xl mx-auto p-2 bg-white gap-2"
      ref={contentRef}
    >
      {/* <div
        className="absolute inset-0 flex justify-center items-center pointer-events-none print:opacity-10 opacity-10 rotate-[-30deg] z-0"
        style={{
          fontSize: "4rem",
          fontWeight: "bold",
          color: "#0C60D6",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        BuddyPay
      </div> */}
      <LacaratedLayout>
        <GroupId id={group.id} ref={contentRef} />
        <Participants group={group} addParticipant={addParticipant} />
        <Expenses group={group} addExpense={addExpense} />
        <BalanceSummary group={group} />
        <WhoPays group={group} calculateBalances={calculateBalances} />
      </LacaratedLayout>
      {/* <p className="text-gray-500 text-sm">
        Share this URL: {typeof window !== "undefined" && window.location.href}
      </p> */}
    </main>
  );
}

import { AppCtaBtn } from "@/components/base/Buttons";
import { useCreateBuddyPay } from "@/hooks/firebase/buddy-pay.hook";
import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

import { v4 as uuidv4 } from "uuid";
import { db } from "@/config/firebase";
import Link from "next/link";
import { bugs } from "./bugs";

export interface Player {
  id: string;
  name: string;
  role?: "mafia" | "town";
}

export interface GameRoom {
  id: string;
  hostId: string;
  started: boolean;
  mafiaCount: number;
  round: number;
  players: Player[];
  votes: Record<string, string>; // voterId => votedPlayerId
  eliminated: string[]; // playerIds
  winner?: "mafia" | "town" | null;
}

export default function Home() {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [joining, setJoining] = useState(false);
  const router = useRouter();

  const createGame = async () => {
    const gameId = uuidv4();
    const playerId = uuidv4();
    await setDoc(doc(db, "games", gameId), {
      id: gameId,
      hostId: playerId,
      players: [{ id: playerId, name }],
      mafiaCount: 1, // Default mafia count for now
      started: false,
    });
    router.push(`/room/${gameId}?playerId=${playerId}`);
  };

  const joinGame = async () => {
    setJoining(true);
    const playerId = uuidv4();
    const gameRef = doc(db, "games", roomId);
    const gameSnap = await getDoc(gameRef);

    if (!gameSnap.exists()) {
      setJoining(false);
      alert("Game not found!");
      return;
    }

    const data = gameSnap.data();
    const players = [...data.players, { id: playerId, name }];

    await setDoc(gameRef, { ...data, players }, { merge: true });
    router.push(`/room/${roomId}?playerId=${playerId}`);
    setJoining(false);
  };

  return (
    <main className="flex flex-col items-center">
      {/* Hero */}
      <section
        className="text-center py-20 px-4 bg-black w-full"
        style={{
          backgroundImage: `url(https://ik.imagekit.io/akf2tcskl/DCC/Screenshot%202025-06-05%20at%2013.31.49_dix-NBZbd7.png)`,
          backgroundSize: "cover",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
          Deceive. Survive. Win.
        </h2>
        <p className="text-md md:text-xl max-w-2xl mx-auto mb-6 text-gray-300">
          Step into the shadows. Choose your role. Outwit your enemies. Will you
          bring justice—or chaos?
        </p>
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Your Name"
            className="border p-2 rounded-2xl max-w-[400px] w-full mb-3 font-light text-center"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            disabled={!name}
            className={`${
              !name ? "opacity-50 cursor-not-allowed" : ""
            } bg-red-500 text-white px-4 py-2 rounded-2xl max-w-[400px] w-full`}
            onClick={createGame}
          >
            Initiate the Game
          </button>
        </div>
      </section>
      {/* <input
        type="text"
        placeholder="Your Name"
        className="border p-2 rounded-2xl max-w-[400px] w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-2xl max-w-[400px] w-full"
        onClick={createGame}
      >
        Create Game
      </button> */}

      {/* How to Play */}
      <section id="how-to-play" className="py-16 px-6 bg-gray-200">
        <h3 className="text-xl font-semibold mb-6 text-center">How to Play</h3>
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {[
            {
              title: "1. Get Assigned",
              desc: "You’ll be randomly assigned a role: Mafia, Cop, or Civilian.",
            },
            {
              title: "2. Day & Night Cycles",
              desc: "Discuss during the day. Vote. Mafia acts at night. Stay sharp.",
            },
            {
              title: "3. Win or Be Eliminated",
              desc: "Mafia wins by eliminating everyone. Civilians win by finding them.",
            },
          ].map((step, index) => (
            <div key={index} className="bg-gray-900 p-6 rounded shadow">
              <h4 className="text-xl font-bold text-red-400">{step.title}</h4>
              <p className="text-sm text-gray-300 mt-2">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter a Game ID"
            className="border p-2 rounded-2xl max-w-[400px] w-full mb-3 font-light text-center"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button
            // className="bg-green-500 text-white px-4 py-2 rounded-2xl max-w-[400px] w-full"
            className={`${!roomId ? "opacity-50 cursor-not-allowed" : ""} ${
              joining ? "bg-gray-400" : "bg-blue-600"
            } text-white px-4 py-2 rounded-2xl max-w-[400px] w-full`}
            disabled={!roomId || joining}
            onClick={joinGame}
          >
            {joining ? "Joining..." : "Join a Game Room"}
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 px-6 bg-gray-900 w-full">
        <h3 className="text-3xl font-semibold mb-8 text-center text-white">
          Frequently Asked Questions
        </h3>
        <div className="max-w-2xl mx-auto space-y-6">
          <FAQItem
            question="What are the roles?"
            answer="Roles include Mafia, Cop, Doctor, and Civilians. Each has unique abilities."
          />
          <FAQItem
            question="How long is a game?"
            answer="Games typically last 10–20 minutes depending on players and pace."
          />
          <FAQItem
            question="Can I play with friends?"
            answer="Yes! You can share a game room code to invite your friends."
          />
        </div>
      </section>

      {/* Bug Fixes */}
      <section id="bug-fixes" className="py-16 px-6 bg-gray100 w-full ">
        <h3 className="text-3xl font-semibold mb-1 text-center text-gray700">
          Latest Bug Fixes
        </h3>
        <p className="text-sm font-light mb-8 text-center text-gray400">
          Mafia Game - Version 0.2.0
        </p>
        <div className="max-w-2xl mx-auto space-y-4 text-gray600 text-sm max-h-[300px] overflow-y-scroll  bg-orange-100 rounded-lg p-6 shadow-lg">
          <ul className="list-disc list-inside space-y-2">
            {bugs.map((bug, index) => (
              <li key={index}>{bug}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div>
      <h4 className="font-bold text-red-400">{question}</h4>
      <p className="text-gray-300">{answer}</p>
    </div>
  );
}

import { AppCtaBtn } from "@/components/base/Buttons";
import { useCreateBuddyPay } from "@/hooks/firebase/buddy-pay.hook";
import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

import { v4 as uuidv4 } from "uuid";
import { db } from "@/config/firebase";
import Link from "next/link";

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

// export default function HomePage() {
//   const { mutate } = useCreateBuddyPay();
//   const router = useRouter();

//   const bringIn = () => {
//     mutate(
//       {
//         id: "string",
//         createdAt: Timestamp.fromMillis(Date.now()),
//         participants: [],
//         expenses: [],
//         settings: {
//           currency: "USD",
//         },
//       },
//       {
//         onSuccess: (res) => {
//           console.log("success", res, res.id);
//           router.push(`/share/${res.id}`);
//         },
//         onError: () => {
//           console.log("error");
//         },
//       }
//     );
//   };

//   return (
//     <main
//       style={{
//         maxWidth: "100%",
//         margin: "auto",
//         // padding: 20,
//         fontFamily: "Arial, sans-serif",
//       }}
//     >
//       <div className="min-h-screen bg-white text-gray-800">
//         {/* Hero Section */}
//         <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-20 text-center px-6">
//           <h1 className="text-5xl md:text-6xl font-bold text-brand900 mb-4">
//             Welcome to BuddyPaid
//           </h1>
//           <p className="text-lg md:text-xl text-blue-600 max-w-2xl mx-auto mb-6">
//             The smarter way to split group expenses, track payments, and stay
//             financially transparent with friends, teams, or roommates.
//           </p>
//           <p className="text-xl max-md:text-base font-light text-red-400 mt-2 mb-1">
//             No Signup or Account needed
//           </p>
//           <p className="text-xl max-md:text-base font-light text-red-400 mb-4">
//             Get Started Instantly!
//           </p>

//           <AppCtaBtn onClick={bringIn}>Get Started</AppCtaBtn>
//         </section>

//         <section className="py-16 px-6 max-w-5xl mx-auto">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
//             App Images - Show pictures of the interface
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8 text-center">
//             <div>
//               <h3 className="text-xl font-semibold mb-2">Shared Expenses</h3>
//               <p className="text-gray-600">
//                 Add group expenses easily and track who owes what in real-time.
//               </p>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold mb-2">
//                 Transparent Payments
//               </h3>
//               <p className="text-gray-600">
//                 Everyone sees what they paid, how much, and when—no more
//                 confusion or trust issues.
//               </p>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold mb-2">Flexible Settings</h3>
//               <p className="text-gray-600">
//                 Customize currency, add participants, and create multiple groups
//                 for trips, events, or teams.
//               </p>
//             </div>
//           </div>
//         </section>

//         <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-20 text-center px-6">
//           <p>
//             🔹 Tagline: "No more confusion. Just split it." 🔹 Key message: If
//             we had to pick a side, it’s clarity. BuddyPaid keeps it simple —
//             know who paid what, no drama.
//           </p>
//           <AppCtaBtn onClick={bringIn}>Get Started</AppCtaBtn>
//         </section>

//         {/* Features */}
//         <section className="py-16 px-6 max-w-5xl mx-auto">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
//             Why BuddyPaid?
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8 text-center">
//             <div>
//               <h3 className="text-xl font-semibold mb-2">Shared Expenses</h3>
//               <p className="text-gray-600">
//                 Add group expenses easily and track who owes what in real-time.
//               </p>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold mb-2">
//                 Transparent Payments
//               </h3>
//               <p className="text-gray-600">
//                 Everyone sees what they paid, how much, and when—no more
//                 confusion or trust issues.
//               </p>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold mb-2">Flexible Settings</h3>
//               <p className="text-gray-600">
//                 Customize currency, add participants, and create multiple groups
//                 for trips, events, or teams.
//               </p>
//             </div>
//           </div>
//         </section>

//         <section className="py-16 px-6 max-w-5xl mx-auto">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
//             Recent Bug Fixes
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8 text-center">
//             <div>
//               <h3 className="text-xl font-semibold mb-2">Shared Expenses</h3>
//               <p className="text-gray-600">
//                 Add group expenses easily and track who owes what in real-time.
//               </p>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold mb-2">
//                 Transparent Payments
//               </h3>
//               <p className="text-gray-600">
//                 Everyone sees what they paid, how much, and when—no more
//                 confusion or trust issues.
//               </p>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold mb-2">Flexible Settings</h3>
//               <p className="text-gray-600">
//                 Customize currency, add participants, and create multiple groups
//                 for trips, events, or teams.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* About the Builders */}
//         <section className="bg-blue-50 py-16 px-6 text-center">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6">
//             Built by Developers Who Get It
//           </h2>
//           <p className="max-w-2xl mx-auto text-gray-700 mb-6">
//             BuddyPaid was created by a passionate group of developers at{" "}
//             <strong>Dev Chuks Community</strong> (DCC) — a network of software
//             engineers, designers, and thinkers building useful tools to make
//             life easier for everyone.
//           </p>
//           <p className="text-gray-600 italic">
//             “We got tired of confusing spreadsheets and awkward money talks — so
//             we built BuddyPaid.”
//           </p>
//         </section>

//         {/* Other Products */}
//         <section className="py-16 px-6 max-w-5xl mx-auto text-center">
//           <h2 className="text-3xl font-bold text-gray-800 mb-8">
//             Also from DCC
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="bg-white rounded-xl shadow p-6">
//               <h3 className="font-semibold text-xl mb-2">DevTask</h3>
//               <p className="text-gray-600">
//                 A collaborative task manager built for dev teams. Lightweight
//                 and GitHub-integrated.
//               </p>
//             </div>
//             <div className="bg-white rounded-xl shadow p-6">
//               <h3 className="font-semibold text-xl mb-2">StudyStack</h3>
//               <p className="text-gray-600">
//                 Organize your learning journey with curated tech courses and
//                 personalized study plans.
//               </p>
//             </div>
//             <div className="bg-white rounded-xl shadow p-6">
//               <h3 className="font-semibold text-xl mb-2">TimeOut Africa</h3>
//               <p className="text-gray-600">
//                 A virtual series highlighting African talents and helping them
//                 position for global opportunities.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Call to Action */}
//         <section className="bg-blue-600 py-20 text-white text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             Ready to split expenses the easy way?
//           </h2>
//           <p className="text-lg mb-6">
//             Start using BuddyPaid with your friends and groups today. It's free,
//             fast, and fun.
//           </p>
//           <AppCtaBtn onClick={bringIn}>Get Started</AppCtaBtn>
//         </section>

//         {/* Footer */}
//         <footer className="bg-gray-100 text-center text-sm py-6 text-gray-500">
//           &copy; {new Date().getFullYear()} BuddyPaid by DCC. All rights
//           reserved.
//         </footer>
//       </div>
//     </main>
//   );
// }

export default function Home() {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
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
    const playerId = uuidv4();
    const gameRef = doc(db, "games", roomId);
    const gameSnap = await getDoc(gameRef);

    if (!gameSnap.exists()) {
      alert("Game not found!");
      return;
    }

    const data = gameSnap.data();
    const players = [...data.players, { id: playerId, name }];

    await setDoc(gameRef, { ...data, players }, { merge: true });
    router.push(`/room/${roomId}?playerId=${playerId}`);
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
            className={`${
              !roomId ? "opacity-50 cursor-not-allowed" : ""
            } bg-blue-500 text-white px-4 py-2 rounded-2xl max-w-[400px] w-full`}
            disabled={!roomId}
            onClick={joinGame}
          >
            Join Game
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
        <h3 className="text-3xl font-semibold mb-8 text-center text-gray700">
          Latest Bug Fixes
        </h3>
        <div className="max-w-2xl mx-auto space-y-4 text-gray600 text-sm max-h-[300px] overflow-y-scroll  bg-orange-100 rounded-lg p-6 shadow-lg">
          <ul className="list-disc list-inside space-y-2">
            <li>
              Fixed a bug where players could rejoin the game with duplicate
              roles.
            </li>
            <li>
              Resolved issue with the night phase timer not syncing across
              devices.
            </li>
            <li>Improved mobile UI responsiveness on smaller screens.</li>
            <li>
              Fixed audio notification inconsistencies during voting phase.
            </li>
            <li>General performance improvements and stability fixes.</li>
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

import { AppCtaBtn } from "@/components/base/Buttons";
import { useCreateBuddyPay } from "@/hooks/firebase/buddy-pay.hook";
import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

import { v4 as uuidv4 } from "uuid";
import { db } from "@/config/firebase";

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
    <main className="flex flex-col items-center gap-4 p-8">
      <input
        type="text"
        placeholder="Your Name"
        className="border p-2 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={createGame}
      >
        Create Game
      </button>

      <input
        type="text"
        placeholder="Game ID"
        className="border p-2 rounded"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={joinGame}
      >
        Join Game
      </button>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { GameRoom, Player } from "@/layout/home/HomePage";
import { db } from "@/config/firebase";

export default function GameRoomPage() {
  const router = useRouter();
  const { id, playerId } = router.query;
  const [game, setGame] = useState<GameRoom | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  const [selectedVote, setSelectedVote] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    if (!id) return;

    const gameRef = doc(db, "games", id as string);
    const unsub = onSnapshot(gameRef, (snap) => {
      if (!snap.exists()) return;
      const data = snap.data() as GameRoom;
      setGame(data);

      // only find player if playerId exists
      if (playerId) {
        const current = data.players.find((p) => p.id === playerId);
        setPlayer(current || null);
      }
    });

    return () => unsub();
  }, [id, playerId]);

  const joinRoom = async () => {
    if (!game || !name.trim()) return;

    const newId = uuidv4();
    const newPlayer: Player = {
      id: newId,
      name: name.trim(),
      role: "town", // default
    };

    await setDoc(doc(db, "games", game.id), {
      ...game,
      players: [...game.players, newPlayer],
    });

    // Redirect with playerId in URL
    router.replace(`/room/${game.id}?playerId=${newId}`);
  };

  const isAlive = (p: Player) =>
    !game?.eliminated?.includes(p.id || "") ?? true;

  const submitVote = async () => {
    if (!selectedVote || !playerId || !game) return;
    // if (game.votes[playerId]) return; // Prevent duplicate vote

    await updateDoc(doc(db, "games", game.id), {
      [`votes.${playerId}`]: selectedVote,
    });
    setSelectedVote(null);
  };

  const evaluateVotes = async () => {
    if (!game) return;

    const voteCounts: Record<string, number> = {};
    Object.values(game.votes).forEach((votedId) => {
      if (!game.eliminated.includes(votedId)) {
        voteCounts[votedId] = (voteCounts[votedId] || 0) + 1;
      }
    });

    const sorted = Object.entries(voteCounts).sort((a, b) => b[1] - a[1]);
    const topVoted = sorted[0]?.[0];

    const newEliminated = topVoted
      ? [...game.eliminated, topVoted]
      : [...game.eliminated];

    const alivePlayers = game.players.filter(
      (p) => !newEliminated.includes(p.id)
    );
    const aliveMafia = alivePlayers.filter((p) => p.role === "mafia");
    const aliveTown = alivePlayers.filter((p) => p.role === "town");

    let winner: "mafia" | "town" | null = null;
    if (aliveMafia.length === 0) {
      winner = "town";
      game.started = false;
    } else if (aliveMafia.length >= aliveTown.length) {
      winner = "mafia";
      game.started = false;
    }

    await setDoc(doc(db, "games", game.id), {
      ...game,
      round: game.round + 1,
      eliminated: newEliminated,
      votes: {},
      winner,
    });
  };

  const handleShareLink = () => {
    const shareableLink = `${window.location.origin}/room/${id}`;
    navigator.clipboard.writeText(shareableLink).then(() => {
      alert("Shareable link copied to clipboard!");
    });
  };

  const allAlivePlayersVoted = () => {
    if (!game) return false;
    const alivePlayers = game.players.filter(
      (p) => !game.eliminated.includes(p.id)
    );
    return alivePlayers.every((p) => game.votes.hasOwnProperty(p.id));
  };

  const startGame = async () => {
    if (!game) return;
    const shuffled = [...game.players].sort(() => 0.5 - Math.random());
    const mafiaCount = Math.max(1, Math.floor(shuffled.length / 3)); // e.g. 5 => 1 mafia;
    // const mafiaCount = game.mafiaCount;
    const updatedPlayers = shuffled.map((p, idx) => ({
      ...p,
      role: idx < mafiaCount ? "mafia" : "town",
    }));
    await setDoc(doc(db, "games", game.id), {
      ...game,
      mafiaCount,
      started: true,
      round: 1,
      votes: {},
      eliminated: [],
      players: updatedPlayers,
    });
  };

  const handleNewGame = async () => {
    if (!game) return;
    const players = game.players.map((p) => ({
      ...p,
      role: "town",
      id: p.id,
    }));

    // Shuffle and assign new mafia
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    const mafiaPlayers = shuffled.slice(0, game.mafiaCount).map((p) => ({
      ...p,
      role: "mafia",
    }));

    const updatedPlayers = players.map((p) => {
      const isMafia = mafiaPlayers.find((m) => m.id === p.id);
      return {
        ...p,
        role: isMafia ? "mafia" : "town",
      };
    });

    await setDoc(doc(db, "games", game.id), {
      ...game,
      round: 1,
      votes: {},
      eliminated: [],
      winner: null,
      players: updatedPlayers,
      started: true,
    });
  };

  // CASE 1: Game exists but no playerId
  if (game && !playerId) {
    if (game.started) {
      return (
        <div className="p-6 max-w-md mx-auto text-center">
          <h2 className="text-xl font-bold text-red-600">
            A game is currently in progress 🕹️
          </h2>
          <p className="mt-2 text-gray-700">You can't join right now.</p>
        </div>
      );
    }

    return (
      <div className="p-6 max-w-md mx-auto text-center">
        <h2 className="text-xl font-bold mb-4">Join the game</h2>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full border px-4 py-2 rounded mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          onClick={joinRoom}
          disabled={!name.trim()}
        >
          Join Game
        </button>
      </div>
    );
  }

  // CASE 2: Still loading
  if (!game || (playerId && !player)) {
    return <div className="p-8">Loading...</div>;
  }

  // CASE 3: Show main game interface
  return (
    <div className="p-6 max-w-xl mx-auto">
      <button
        onClick={handleShareLink}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        🔗 Copy Shareable Link
      </button>
      <h1 className="text-xl font-bold mb-3">Game: {game.id}</h1>
      <p>Round: {game.round ?? 0}</p>

      <p>Your Name: {player?.name}</p>
      {player?.role && (
        <p>
          Your role: <strong>{player.role.toUpperCase()}</strong>
        </p>
      )}
      {player && player.role === "mafia" && (
        <div className="mt-2">
          <p className="font-semibold">Other mafia members:</p>
          <ul className="list-disc list-inside">
            {game.players
              .filter((p) => p.role === "mafia" && p.id !== player.id)
              .map((p) => (
                <li key={p.id}>{p.name}</li>
              ))}
          </ul>
        </div>
      )}
      {player && game.eliminated?.includes(player?.id) && (
        <p className="text-red-500">You are eliminated!</p>
      )}

      <h2 className="mt-6 font-semibold">Players</h2>
      <ul>
        {game.players.map((p) => {
          const isEliminated = game.eliminated?.includes(p.id);
          const isAlive = !isEliminated;

          return (
            <li
              key={p.id}
              className={isEliminated ? "line-through text-gray-400" : ""}
            >
              {p.name} {p.id === game.hostId && "(host)"}{" "}
              {isAlive && (game.votes?.[p.id] ? "👍" : "❌")}
            </li>
          );
        })}
      </ul>

      {!game.started && player && game.hostId === player.id && !game.winner && (
        <button
          className="mt-6 bg-purple-600 text-white px-4 py-2 rounded"
          onClick={startGame}
        >
          Start Game
        </button>
      )}

      {game.winner && (
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold mb-4">
            🎉 {game.winner.toUpperCase()} wins the game!
          </h2>

          <h3 className="text-lg font-semibold mb-2">Player Roles:</h3>
          <ul className="mb-4">
            {game.players.map((player) => (
              <li key={player.id} className="text-sm">
                {player.name} -{" "}
                {player.role === "mafia" ? "🕵️ Mafia" : "👮 Town"}
              </li>
            ))}
          </ul>

          <button
            onClick={handleNewGame}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            🔁 Start New Game
          </button>
        </div>
      )}

      {game.started && player && isAlive(player) && !game.winner && (
        <>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Vote a player to eliminate:</h3>
            {game.players
              .filter((p) => p.id !== player.id && isAlive(p))
              .map((p) => (
                <button
                  key={p.id}
                  className={`block border px-4 py-2 mb-2 rounded w-full ${
                    selectedVote === p.id ? "bg-purple-200" : ""
                  }`}
                  onClick={() => setSelectedVote(p.id)}
                >
                  {p.name}
                </button>
              ))}
            <button
              className="mt-2 bg-purple-600 text-white px-4 py-2 rounded w-full"
              onClick={submitVote}
              disabled={!selectedVote}
            >
              Submit Vote
            </button>
          </div>
        </>
      )}

      {game.started && game.hostId === player?.id && (
        <button
          disabled={!allAlivePlayersVoted()}
          className={`mt-4 px-4 py-2 rounded text-white ${
            allAlivePlayersVoted()
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={evaluateVotes}
        >
          Evaluate Round (Host Only)
        </button>
      )}
    </div>
  );
}

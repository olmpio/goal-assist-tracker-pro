import { useState, useEffect } from 'react';
import { Player } from '../types/player';

const STORAGE_KEY = 'football-players';

export const usePlayerStorage = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  // Load players from localStorage on mount
  useEffect(() => {
    const savedPlayers = localStorage.getItem(STORAGE_KEY);
    if (savedPlayers) {
      try {
        setPlayers(JSON.parse(savedPlayers));
      } catch (error) {
        console.error('Error loading players from storage:', error);
      }
    }
  }, []);

  // Save players to localStorage whenever players array changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
  }, [players]);

  const addPlayer = (name: string) => {
    const newPlayer: Player = {
      id: Date.now().toString(),
      name: name.trim(),
      goals: 0,
      assists: 0,
      yellowCards: 0,
      redCards: 0,
    };
    setPlayers(prev => [...prev, newPlayer]);
  };

  const removePlayer = (id: string) => {
    setPlayers(prev => prev.filter(player => player.id !== id));
  };

  const updatePlayerName = (id: string, newName: string) => {
    setPlayers(prev =>
      prev.map(player =>
        player.id === id ? { ...player, name: newName.trim() } : player
      )
    );
  };

  const addGoal = (id: string) => {
    setPlayers(prev =>
      prev.map(player =>
        player.id === id ? { ...player, goals: player.goals + 1 } : player
      )
    );
  };

  const removeGoal = (id: string) => {
    setPlayers(prev =>
      prev.map(player =>
        player.id === id && player.goals > 0
          ? { ...player, goals: player.goals - 1 }
          : player
      )
    );
  };

  const addAssist = (id: string) => {
    setPlayers(prev =>
      prev.map(player =>
        player.id === id ? { ...player, assists: player.assists + 1 } : player
      )
    );
  };

  const removeAssist = (id: string) => {
    setPlayers(prev =>
      prev.map(player =>
        player.id === id && player.assists > 0
          ? { ...player, assists: player.assists - 1 }
          : player
      )
    );
  };

  const addYellowCard = (id: string) => {
    setPlayers(prev =>
      prev.map(player =>
        player.id === id ? { ...player, yellowCards: player.yellowCards + 1 } : player
      )
    );
  };

  const removeYellowCard = (id: string) => {
    setPlayers(prev =>
      prev.map(player =>
        player.id === id && player.yellowCards > 0
          ? { ...player, yellowCards: player.yellowCards - 1 }
          : player
      )
    );
  };

  const addRedCard = (id: string) => {
    setPlayers(prev =>
      prev.map(player =>
        player.id === id ? { ...player, redCards: player.redCards + 1 } : player
      )
    );
  };

  const removeRedCard = (id: string) => {
    setPlayers(prev =>
      prev.map(player =>
        player.id === id && player.redCards > 0
          ? { ...player, redCards: player.redCards - 1 }
          : player
      )
    );
  };

  return {
    players,
    addPlayer,
    removePlayer,
    updatePlayerName,
    addGoal,
    removeGoal,
    addAssist,
    removeAssist,
    addYellowCard,
    removeYellowCard,
    addRedCard,
    removeRedCard,
  };
};
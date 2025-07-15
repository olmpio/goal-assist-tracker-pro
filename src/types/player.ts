export interface Player {
  id: string;
  name: string;
  goals: number;
  assists: number;
}

export interface PlayerStats {
  totalGoals: number;
  totalAssists: number;
  totalPlayers: number;
}
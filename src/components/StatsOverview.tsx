import { Player } from '../types/player';
import { Card } from './ui/card';
import { Trophy, Target, Users, TrendingUp } from 'lucide-react';

interface StatsOverviewProps {
  players: Player[];
}

export const StatsOverview = ({ players }: StatsOverviewProps) => {
  const totalGoals = players.reduce((sum, player) => sum + player.goals, 0);
  const totalAssists = players.reduce((sum, player) => sum + player.assists, 0);
  const totalPlayers = players.length;
  
  const topScorer = players.reduce((top, player) => 
    player.goals > (top?.goals || 0) ? player : top, null as Player | null
  );
  
  const topAssister = players.reduce((top, player) => 
    player.assists > (top?.assists || 0) ? player : top, null as Player | null
  );

  const stats = [
    {
      title: "Total de Jogadores",
      value: totalPlayers,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Total de Gols",
      value: totalGoals,
      icon: Target,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Total de Assistências",
      value: totalAssists,
      icon: TrendingUp,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Artilheiro",
      value: topScorer ? `${topScorer.name} (${topScorer.goals})` : "Nenhum",
      icon: Trophy,
      color: "text-warning",
      bgColor: "bg-warning/10",
      isText: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="football-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {stat.title}
              </p>
              <p className={`text-2xl font-bold ${stat.color}`}>
                {stat.isText ? stat.value : stat.value}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
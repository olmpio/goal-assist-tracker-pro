import { usePlayerStorage } from '../hooks/usePlayerStorage';
import { PlayerCard } from '../components/PlayerCard';
import { AddPlayerForm } from '../components/AddPlayerForm';
import { StatsOverview } from '../components/StatsOverview';
import { Toaster } from '../components/ui/toaster';

const Index = () => {
  const {
    players,
    addPlayer,
    removePlayer,
    updatePlayerName,
    addGoal,
    removeGoal,
    addAssist,
    removeAssist,
  } = usePlayerStorage();

  return (
    <div className="min-h-screen field-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            ⚽ Marcação de Gols e Assistências
          </h1>
          <p className="text-white/90 text-lg">
            Acompanhe as estatísticas dos seus jogadores em tempo real
          </p>
        </div>

        {/* Stats Overview */}
        <StatsOverview players={players} />

        {/* Add Player Form */}
        <div className="mb-8">
          <AddPlayerForm onAddPlayer={addPlayer} />
        </div>

        {/* Players Grid */}
        {players.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {players.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                onAddGoal={addGoal}
                onRemoveGoal={removeGoal}
                onAddAssist={addAssist}
                onRemoveAssist={removeAssist}
                onUpdateName={updatePlayerName}
                onRemovePlayer={removePlayer}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-white/80 text-lg mb-4">
              Nenhum jogador cadastrado ainda
            </div>
            <div className="text-white/60">
              Adicione o primeiro jogador para começar! 🚀
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Index;

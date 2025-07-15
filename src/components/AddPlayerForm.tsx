import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { UserPlus } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface AddPlayerFormProps {
  onAddPlayer: (name: string) => void;
}

export const AddPlayerForm = ({ onAddPlayer }: AddPlayerFormProps) => {
  const [playerName, setPlayerName] = useState('');
  const [isPulsing, setIsPulsing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (playerName.trim()) {
      onAddPlayer(playerName.trim());
      setPlayerName('');
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 600);
      
      toast({
        title: "Jogador adicionado! 🎉",
        description: `${playerName.trim()} entrou em campo!`,
      });
    }
  };

  return (
    <Card className={`football-card ${isPulsing ? 'pulse-glow' : ''}`}>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Nome do jogador..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="text-base"
          />
        </div>
        <Button 
          type="submit" 
          className="goal-button"
          disabled={!playerName.trim()}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Adicionar
        </Button>
      </form>
    </Card>
  );
};
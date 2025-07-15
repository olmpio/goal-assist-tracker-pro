import { useState } from 'react';
import { Player } from '../types/player';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Plus, Minus, Edit3, Trash2, Target, Users } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface PlayerCardProps {
  player: Player;
  onAddGoal: (id: string) => void;
  onRemoveGoal: (id: string) => void;
  onAddAssist: (id: string) => void;
  onRemoveAssist: (id: string) => void;
  onUpdateName: (id: string, name: string) => void;
  onRemovePlayer: (id: string) => void;
}

export const PlayerCard = ({
  player,
  onAddGoal,
  onRemoveGoal,
  onAddAssist,
  onRemoveAssist,
  onUpdateName,
  onRemovePlayer,
}: PlayerCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(player.name);
  const [isShaking, setIsShaking] = useState(false);
  const { toast } = useToast();

  const handleEditSave = () => {
    if (editName.trim() && editName.trim() !== player.name) {
      onUpdateName(player.id, editName.trim());
      toast({
        title: "Nome atualizado!",
        description: `Nome alterado para ${editName.trim()}`,
      });
    }
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditName(player.name);
    setIsEditing(false);
  };

  const handleStatChange = (action: () => void, message: string) => {
    action();
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
    
    toast({
      title: message,
      description: `${player.name}: ${action === (() => onAddGoal(player.id)) ? player.goals + 1 : action === (() => onAddAssist(player.id)) ? player.assists + 1 : 'Estatística atualizada'}`,
    });
  };

  const handleRemovePlayer = () => {
    onRemovePlayer(player.id);
    toast({
      title: "Jogador removido!",
      description: `${player.name} foi removido da lista`,
      variant: "destructive",
    });
  };

  return (
    <Card className={`player-card ${isShaking ? 'shake-animation' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        {isEditing ? (
          <div className="flex items-center gap-2 flex-1">
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleEditSave();
                if (e.key === 'Escape') handleEditCancel();
              }}
              className="text-lg font-bold"
              autoFocus
            />
            <Button
              onClick={handleEditSave}
              className="goal-button"
              size="sm"
            >
              ✓
            </Button>
            <Button
              onClick={handleEditCancel}
              className="remove-button"
              size="sm"
            >
              ✕
            </Button>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-bold text-foreground">{player.name}</h3>
            <div className="flex gap-2">
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                size="sm"
                className="hover:bg-accent"
              >
                <Edit3 className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleRemovePlayer}
                className="remove-button"
                size="sm"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Goals Section */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Target className="h-5 w-5 text-success" />
            <span className="font-medium text-foreground">Gols</span>
          </div>
          <div className="text-3xl font-bold text-success mb-3">{player.goals}</div>
          <div className="flex gap-2">
            <Button
              onClick={() => handleStatChange(() => onAddGoal(player.id), "Gol marcado! ⚽")}
              className="goal-button flex-1"
              size="sm"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => handleStatChange(() => onRemoveGoal(player.id), "Gol removido")}
              variant="outline"
              size="sm"
              disabled={player.goals === 0}
              className="flex-1"
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Assists Section */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Users className="h-5 w-5 text-accent" />
            <span className="font-medium text-foreground">Assistências</span>
          </div>
          <div className="text-3xl font-bold text-accent mb-3">{player.assists}</div>
          <div className="flex gap-2">
            <Button
              onClick={() => handleStatChange(() => onAddAssist(player.id), "Assistência marcada! 🎯")}
              className="assist-button flex-1"
              size="sm"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => handleStatChange(() => onRemoveAssist(player.id), "Assistência removida")}
              variant="outline"
              size="sm"
              disabled={player.assists === 0}
              className="flex-1"
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
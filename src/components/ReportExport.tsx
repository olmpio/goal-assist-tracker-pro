import { Player } from '../types/player';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Download, FileText } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface ReportExportProps {
  players: Player[];
}

export const ReportExport = ({ players }: ReportExportProps) => {
  const { toast } = useToast();

  const exportToCSV = () => {
    if (players.length === 0) {
      toast({
        title: "Nenhum dado para exportar",
        description: "Adicione jogadores primeiro para gerar o relatório",
        variant: "destructive",
      });
      return;
    }

    const headers = ['Nome', 'Gols', 'Assistências', 'Cartões Amarelos', 'Cartões Vermelhos'];
    const csvContent = [
      headers.join(','),
      ...players.map(player => 
        [player.name, player.goals, player.assists, player.yellowCards, player.redCards].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `relatorio-jogadores-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Relatório CSV exportado!",
      description: "O arquivo foi baixado com sucesso",
    });
  };

  const exportToPDF = () => {
    if (players.length === 0) {
      toast({
        title: "Nenhum dado para exportar",
        description: "Adicione jogadores primeiro para gerar o relatório",
        variant: "destructive",
      });
      return;
    }

    // Create HTML content for PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Relatório de Jogadores</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #2563eb; text-align: center; margin-bottom: 30px; }
          .stats { display: flex; justify-content: space-around; margin-bottom: 30px; background: #f3f4f6; padding: 20px; border-radius: 8px; }
          .stat { text-align: center; }
          .stat-value { font-size: 24px; font-weight: bold; color: #1f2937; }
          .stat-label { font-size: 14px; color: #6b7280; margin-top: 5px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #d1d5db; padding: 12px; text-align: left; }
          th { background-color: #f9fafb; font-weight: bold; }
          tr:nth-child(even) { background-color: #f9fafb; }
          .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #6b7280; }
        </style>
      </head>
      <body>
        <h1>⚽ Relatório de Estatísticas dos Jogadores</h1>
        
        <div class="stats">
          <div class="stat">
            <div class="stat-value">${players.length}</div>
            <div class="stat-label">Total de Jogadores</div>
          </div>
          <div class="stat">
            <div class="stat-value">${players.reduce((sum, p) => sum + p.goals, 0)}</div>
            <div class="stat-label">Total de Gols</div>
          </div>
          <div class="stat">
            <div class="stat-value">${players.reduce((sum, p) => sum + p.assists, 0)}</div>
            <div class="stat-label">Total de Assistências</div>
          </div>
          <div class="stat">
            <div class="stat-value">${players.reduce((sum, p) => sum + p.yellowCards, 0)}</div>
            <div class="stat-label">Cartões Amarelos</div>
          </div>
          <div class="stat">
            <div class="stat-value">${players.reduce((sum, p) => sum + p.redCards, 0)}</div>
            <div class="stat-label">Cartões Vermelhos</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Nome do Jogador</th>
              <th>Gols</th>
              <th>Assistências</th>
              <th>Cartões Amarelos</th>
              <th>Cartões Vermelhos</th>
            </tr>
          </thead>
          <tbody>
            ${players.map(player => `
              <tr>
                <td>${player.name}</td>
                <td>${player.goals}</td>
                <td>${player.assists}</td>
                <td>${player.yellowCards}</td>
                <td>${player.redCards}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="footer">
          Relatório gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}
        </div>
      </body>
      </html>
    `;

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
      // Wait for content to load then print
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };

      toast({
        title: "Relatório PDF gerado!",
        description: "O arquivo será aberto para impressão/salvamento",
      });
    }
  };

  return (
    <Card className="football-card mb-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Exportar Relatório</h3>
          <p className="text-sm text-muted-foreground">
            Baixe um relatório completo com as estatísticas de todos os jogadores
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={exportToCSV}
            className="goal-button"
            disabled={players.length === 0}
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
          
          <Button 
            onClick={exportToPDF}
            className="assist-button"
            disabled={players.length === 0}
          >
            <FileText className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
        </div>
      </div>
    </Card>
  );
};
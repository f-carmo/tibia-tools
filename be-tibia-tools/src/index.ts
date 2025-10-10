import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';
import qs from 'qs';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

interface GuildActionBody {
  character: string;
  newrank: number;
  action: string;
  page: string;
  GuildName: string;
  cookies: string;
  flaggedFor: string;
  isMock: boolean;
  level: number; 
  daysOffline: number;
}

app.get('/api/ping', (req: Request, res: Response) => {
  res.send('Servidor está rodando!');
});

app.post('/api/guild-action', async (req: Request<{}, {}, GuildActionBody>, res: Response) => {
  const { character, newrank, action, page, GuildName, cookies, flaggedFor, isMock, level, daysOffline } = req.body;
  const formData = qs.stringify({
    character,
    newrank,
    action,
    page,
    GuildName,
  });

  if (isMock) {
    console.log("MOCK >", construirMensagem(character, flaggedFor, level, daysOffline));
    res.status(200).json({message: 'MOCK >' + construirMensagem(character, flaggedFor, level, daysOffline)});
  } else {
    try {
        const response = await axios.post(
            'https://www.tibia.com/community/?subtopic=guilds',
            formData,
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': cookies
              }
            }
          );
        console.log(construirMensagem(character, flaggedFor, level, daysOffline));
        res.status(200).json({message: construirMensagem(character, flaggedFor, level, daysOffline)});
      } catch (error: any) {
        console.error(`Erro ao enviar POST (${character}):`, error.message);
        res.status(500).json({ error: 'Erro ao enviar POST para Tibia.com' });
      }
  }
  
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

function construirMensagem(character: string, flaggedFor: string, level: number, daysOffline: number) {
    let mensagem = `Membro ${character} kickado com sucesso!`;
    if (flaggedFor) {
        mensagem += ` Motivo: ${flaggedFor}`;
    }
    if (level) {
        mensagem += `, level: ${level}`;
    }
    if (daysOffline) {  
        mensagem += `, dias offline: ${daysOffline}`;
    }
    return mensagem;
}
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const qs_1 = __importDefault(require("qs"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post('/api/guild-action', async (req, res) => {
    const { character, newrank, action, page, GuildName, cookies, flaggedFor, isMock, level, daysOffline } = req.body;
    const formData = qs_1.default.stringify({
        character,
        newrank,
        action,
        page,
        GuildName,
    });
    if (isMock) {
        console.log("MOCK >", construirMensagem(character, flaggedFor, level, daysOffline));
        res.status(200).json({ message: 'MOCK >' + construirMensagem(character, flaggedFor, level, daysOffline) });
    }
    else {
        try {
            const response = await axios_1.default.post('https://www.tibia.com/community/?subtopic=guilds', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': cookies
                }
            });
            console.log(construirMensagem(character, flaggedFor, level, daysOffline));
            res.status(200).json({ message: construirMensagem(character, flaggedFor, level, daysOffline) });
        }
        catch (error) {
            console.error(`Erro ao enviar POST (${character}):`, error.message);
            res.status(500).json({ error: 'Erro ao enviar POST para Tibia.com' });
        }
    }
});
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
function construirMensagem(character, flaggedFor, level, daysOffline) {
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

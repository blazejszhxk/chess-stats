import fs from 'fs';
import path from 'path';

const usersMap = {
    "Kasix": { username: "kasix909" },
    "Delord": { username: "Pablosabre" },
    "Nieuczesana": { username: "nieuczeszek" },
    "Diables": { username: "xdiables" },
    "TheNitroZyniak": { username: "nitro69penetrator" },
    "Tomasz Fornal": { username: "TomaszFornal" },
    "Netrodal": { username: "didaskyler" },
    "RandomBruceTV": { username: "szachowytapir" },
    "Bagietka Michael": { username: "bagietkaofficial" },
    "MokrySpuchar": { username: "mokrysucharek" },
    "Hiszpanitos": { username: "jakubjd" },
    "Overpow": { username: "szachowychogath" },
    "Kubon_": { username: "JaKubon000" },
    "demonzz1": { username: "demonzz1" }
};

const dataDir = path.join(process.cwd(), 'dane');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

async function fetchChessStats(username, filename) {
    const url = `https://www.chess.com/callback/member/stats/${username}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        const jsonData = await response.json();
        const filePath = path.join(dataDir, `${filename}.json`);
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
        console.log(`Dane zapisane w pliku ${filePath}`);
    } catch (error) {
        console.error(`Błąd pobierania danych dla ${username}: ${error.message}`);
    }
}

async function fetchAllStats() {
    for (const [displayName, userData] of Object.entries(usersMap)) {
        await fetchChessStats(userData.username, displayName);
    }
}

fetchAllStats();

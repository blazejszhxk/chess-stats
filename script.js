import fs from 'fs';
import path from 'path';

const usersMap = {
    "Kasix": { username: "kasix909" },
    "Delordione": { username: "Pablosabre" },
    "Nieuczesana": { username: "nieuczeszek" },
    "Diables": { username: "xdiables" },
    "TheNitroZyniak": { username: "nitro69penetrator" },
    "Tomasz Fornal": { username: "TomaszFornal" },
    "Netrodal": { username: "didaskyler" },
    "RandomBruceTV": { username: "szachowytapir" },
    "Bagietka Michael": { username: "bagietkaofficial" },
    "MokrySuchar": { username: "mokrysucharek" },
    "Hiszpanitos": { username: "jakubjd" },
    "Overpow": { username: "szachowychogath" },
    "Kubon_": { username: "JaKubon000" },
    "demonzz1": { username: "demonzz1" }
};

const dataDir = path.join(process.cwd(), 'dane');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function deleteExistingFiles() {
    const files = fs.readdirSync(dataDir);
    for (const file of files) {
        const filePath = path.join(dataDir, file);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Usunięto plik: ${filePath}`);
        }
    }
}

async function fetchChessStats(username) {
    const url = `https://www.chess.com/callback/member/stats/${username}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        const jsonData = await response.json();

        const filePath = path.join(dataDir, `${username}.json`);
        
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
        console.log(`Dane zapisane w pliku ${filePath}`);
    } catch (error) {
        console.error(`Błąd pobierania danych dla ${username}: ${error.message}`);
    }
}

async function fetchAllStats() {
    deleteExistingFiles();
    
    for (const userData of Object.values(usersMap)) {
        await fetchChessStats(userData.username);
        await delay(1000);
    }
}

fetchAllStats();

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
    fs.mkdirSync(dataDir, { recursive: true });
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function deleteExistingFiles() {
    try {
        const files = fs.readdirSync(dataDir);
        if (files.length === 0) {
            console.log('Brak plików do usunięcia.');
        }

        for (const file of files) {
            const filePath = path.join(dataDir, file);
            if (fs.existsSync(filePath)) {
                try {
                    fs.unlinkSync(filePath);
                    console.log(`Usunięto plik: ${filePath}`);
                } catch (err) {
                    console.error(`Błąd przy usuwaniu pliku: ${filePath}`, err);
                }
            }
        }
    } catch (err) {
        console.error('Błąd przy odczytywaniu plików z katalogu', err);
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

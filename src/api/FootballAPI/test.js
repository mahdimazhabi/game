import axios from "axios";

const items = [
    {
        "worldCupId": 22,
        "teamName": "Iran",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 1
    },
    {
        "worldCupId": 23,
        "teamName": "Iraq",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 1
    },
    {
        "worldCupId": 24,
        "teamName": "Kuba",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 1
    },
    {
        "worldCupId": 25,
        "teamName": "Palestine",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 1
    },
    {
        "worldCupId": 26,
        "teamName": "Spain",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 2
    },
    {
        "worldCupId": 27,
        "teamName": "Italy",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 2
    },
    {
        "worldCupId": 28,
        "teamName": "Germany",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 2
    },
    {
        "worldCupId": 29,
        "teamName": "France",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 2
    },
    {
        "worldCupId": 30,
        "teamName": "Argentina",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 3
    },
    {
        "worldCupId": 31,
        "teamName": "Brazil",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 3
    },
    {
        "worldCupId": 32,
        "teamName": "Mississippi",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 3
    },
    {
        "worldCupId": 33,
        "teamName": "Denmark",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 3
    },
    {
        "worldCupId": 34,
        "teamName": "Canada",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 4
    },
    {
        "worldCupId": 35,
        "teamName": "America",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 4
    },
    {
        "worldCupId": 36,
        "teamName": "Georgia",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 4
    },
    {
        "worldCupId": 37,
        "teamName": "Armenia",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 4
    },
    {
        "worldCupId": 38,
        "teamName": "Moraco",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 5
    },
    {
        "worldCupId": 39,
        "teamName": "Egypt",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 5
    },
    {
        "worldCupId": 40,
        "teamName": "South Africa",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 5
    },
    {
        "worldCupId": 41,
        "teamName": "AL jazzier",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 5
    },
    {
        "worldCupId": 42,
        "teamName": "Portugeas",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 6
    },
    {
        "worldCupId": 43,
        "teamName": "Chek, Republic of",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 6
    },
    {
        "worldCupId": 44,
        "teamName": "Sweden",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 6
    },
    {
        "worldCupId": 45,
        "teamName": "Swiss",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 6
    },
    {
        "worldCupId": 46,
        "teamName": "Russia",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 7
    },
    {
        "worldCupId": 47,
        "teamName": "China",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 7
    },
    {
        "worldCupId": 48,
        "teamName": "South Korea",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 7
    },
    {
        "worldCupId": 49,
        "teamName": "North Korea",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 7
    },
    {
        "worldCupId": 50,
        "teamName": "Taiwan",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 8
    },
    {
        "worldCupId": 51,
        "teamName": "Japan",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 8
    },
    {
        "worldCupId": 52,
        "teamName": "India",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 8
    },
    {
        "worldCupId": 53,
        "teamName": "Saudi Arabia",
        "deadline": "2025/03/20",
        "position": 0,
        "level": 1,
        "groupNumber": 8
    }
]

for (const item of items) {
    await axios.put('http://217.154.71.28/api/WorldCups/Edit',
        {
            ...item,
            deadline: "2025/03/21",
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
        });
}
const userKey = "user";
const apiUrl = process.env.VUE_APP_API_URL;

if (!window.localStorage.getItem(userKey)) {
    window.localStorage.setItem(userKey, JSON.stringify({ username: null, color: null }));
}

function save(user) {
    if (!user) window.localStorage.removeItem(userKey);
    else window.localStorage.setItem(userKey, JSON.stringify(user));
}

export default {
    getUser() {
        return JSON.parse(window.localStorage.getItem(userKey));
    },
    async setUser(username) {
        const request = await fetch(apiUrl + "/entrar", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({ username }),
        });

        const data = await request.json();

        save(data.resp);
    },
    async exitUser() {
        const user = JSON.parse(window.localStorage.getItem(userKey));

        if (user)
            await fetch(apiUrl + "/sair", {
                headers: { token: user.token, username: user.username },
                method: "DELETE",
            });

        save();
    },
    async getRooms() {
        const request = await fetch(apiUrl + "/salas");

        const data = await request.json();

        return data.resp;
    },
    async setRoom(idSala) {
        const user = JSON.parse(window.localStorage.getItem(userKey));

        const res = await fetch(apiUrl + `/salas/entrar?idSala=${idSala}`, {
            headers: { token: user.token, username: user.username },
            method: "PUT",
        });

        return res.ok;
    },
    async leaveRoom(idSala) {
        const user = JSON.parse(window.localStorage.getItem(userKey));

        await fetch(apiUrl + `/salas/sair`, {
            headers: { token: user.token, username: user.username, idSala },
            method: "PUT",
        });
    },
    async addRoom(name, tags, password) {
        const user = JSON.parse(window.localStorage.getItem(userKey));

        const request = await fetch(apiUrl + "/salas/criar", {
            headers: { "Content-Type": "application/json", token: user.token, username: user.username },
            method: "POST",
            body: JSON.stringify({ name, tags, password }),
        });

        const data = await request.json();

        return data.resp;
    },
    async getMessages() {
        const user = JSON.parse(window.localStorage.getItem(userKey));

        const date = new Date();
        date.setDate(date.getDate() - 1);

        const timestamp = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, 0)}-${String(
            date.getDate()
        ).padStart(2, 0)}`;

        const request = await fetch(apiUrl + `/mensagens?timestamp=${timestamp}`, {
            headers: { "Content-Type": "application/json", token: user.token, username: user.username },
        });

        const data = await request.json();

        return data.resp;
    },
    async sendMessage(msg) {
        const user = JSON.parse(window.localStorage.getItem(userKey));

        await fetch(apiUrl + "/mensagens/enviar", {
            headers: { "Content-Type": "application/json", token: user.token, username: user.username },
            method: "POST",
            body: JSON.stringify({ msg }),
        });
    },
};

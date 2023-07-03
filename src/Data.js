const userKey = "user";

if (!window.localStorage.getItem(userKey)) {
    window.localStorage.setItem(userKey, JSON.stringify({ username: null, color: null }));
}

const user = JSON.parse(window.localStorage.getItem(userKey));
const rooms = {};

function save() {
    window.localStorage.setItem(userKey, JSON.stringify(user));
}

export default {
    setUser(username, color) {
        user.username = username;
        user.color = color;

        save();
    },
    getUser() {
        return user;
    },
    getRooms() {
        return rooms;
    },
    getRoomsArray() {
        const responseArray = [];

        Object.keys(rooms).forEach((key) => {
            responseArray.push(rooms[key]);
        });

        return responseArray;
    },
    addRoom(name, tags, password) {
        rooms[name] = { name, tags, online: 1, password };
    },
};

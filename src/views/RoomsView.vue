<template>
    <main
        class="w-full h-screen flex"
        tabindex="0"
        @keyup.esc="
            async () => {
                await leaveRoom();

                roomData.id = '';
                roomData.name = '';
                roomData.tags = '';
            }
        "
    >
        <RoomPassword
            v-if="lockedRoom"
            @passwordEntered="
                async (password) => {
                    await tryPassword(password);
                    lockedRoom = null;
                }
            "
            @closeRoomPassword="lockedRoom = null"
        />
        <CreateRoom
            v-if="roomCreator"
            @closeRoomCreator="roomCreator = false"
            @roomAdded="
                async (id, name, tags) => {
                    if (!(await enterRoom(id))) return;

                    roomData.id = id;
                    roomData.name = name;
                    roomData.tags = tags;

                    await getRooms();
                    await getMessages();
                }
            "
        />
        <SideBar
            class="fixed"
            :rooms="rooms"
            @search="
                (search) => {
                    if (!search) return;

                    rooms = rooms.filter((e) => e.name.includes(search));
                }
            "
            @openRoom="
                async (id, name, tags, password, online) => {
                    if (!password) {
                        if (!(await enterRoom(id))) return;

                        roomData.id = id;
                        roomData.name = name;
                        roomData.tags = tags;
                    } else {
                        getPassword({ id, name, password, tags, online: online === null ? 0 : online });
                    }

                    await getMessages();
                }
            "
            @openRoomCreator="roomCreator = true"
        />
        <div
            v-show="roomData.name && roomData.tags"
            id="roomContent"
            class="flex flex-col w-[calc(100vw-24rem)] fixed right-0"
        >
            <header class="p-4 h-24 border-b-2 border-neutral-950 bg-neutral-900 relative">
                <h1 class="font-semibold text-3xl">{{ roomData.name }}</h1>
                <span>{{ roomData.tags }}</span>
            </header>
            <div
                ref="contentDiv"
                class="overflow-y-auto p-4 flex gap-4 flex-col"
                :class="roomData.name && roomData.tags ? 'h-[calc(100vh-9.5rem)]' : 'h-[calc(100vh-3.5rem)]'"
            >
                <div
                    v-for="(message, index) in messages"
                    :key="index"
                    class="relative w-3/5 rounded-2xl p-3 pb-8 bg-neutral-800"
                    :class="message.idUser === userData.id ? 'ml-auto' : ''"
                >
                    <p :style="{ color: message.color }">{{ message.username }}</p>
                    <p class="w-full break-words">{{ message.content }}</p>
                    <span class="absolute bottom-3 right-3 text-sm text-neutral-500">{{
                        String(new Date(message.timestamp).getHours()).padStart(2, 0) +
                        ":" +
                        String(new Date(message.timestamp).getMinutes()).padStart(2, 0)
                    }}</span>
                </div>
            </div>
            <form class="h-14 p-3 bg-neutral-900 flex gap-5 w-[calc(100vw-24rem)] items-center">
                <input
                    type="text"
                    class="p-2 h-8 flex-1 bg-neutral-800 rounded-2xl font-semibold border-none outline-none text-zinc-500 placeholder:text-zinc-500"
                    placeholder="Digite aqui sua mensagem..."
                    v-model="userData.currentMessage"
                />
                <button
                    type="submit"
                    class="transition-all rounded-full bg-blue-500 w-8 h-8 flex justify-center items-center"
                    :class="!userData.currentMessage.length ? 'opacity-60' : 'hover:scale-110'"
                    :disabled="!userData.currentMessage.length"
                    @click.prevent="sendMessage()"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="{1.5}"
                        stroke="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                        />
                    </svg>
                </button>
            </form>
        </div>
    </main>
</template>

<script setup>
import { ref, inject, reactive, onMounted, onUpdated } from "vue";
import { useRouter } from "vue-router";

import SideBar from "@/components/SideBar.vue";
import CreateRoom from "@/components/CreateRoom.vue";
import RoomPassword from "@/components/RoomPassword.vue";

const data = inject("$data");
const router = useRouter();

const userData = reactive({
    id: "",
    username: "",
    color: "",
    currentMessage: "",
});

const roomData = reactive({
    id: "",
    name: "",
    tags: "",
    online: "",
});

const rooms = ref([]);
const messages = ref([]);
const contentDiv = ref(null);
const roomCreator = ref(false);
const lockedRoom = ref(null);

onUpdated(() => {
    contentDiv.value.scrollTop = contentDiv.value.scrollHeight;
});

onMounted(async () => {
    const user = data.getUser();

    if (user.username) {
        userData.id = user.idUser;
        userData.color = user.color;
        userData.username = user.username;
    } else {
        router.push({ path: "/" });
    }

    setInterval(() => {
        getRooms();
        if (roomData.id) getMessages();
    }, 5000);

    await getRooms();
});

async function getRooms() {
    rooms.value = await data.getRooms();
}

async function enterRoom(roomId) {
    const response = await data.setRoom(roomId);

    if (!response) {
        router.push({ path: "/" });
        return false;
    } else {
        getMessages();
        return true;
    }
}

async function leaveRoom() {
    await data.leaveRoom(roomData.id);
    await getRooms();
}

async function getMessages() {
    messages.value = await data.getMessages();
}

async function sendMessage() {
    await data.sendMessage(userData.currentMessage);

    userData.currentMessage = "";

    await getMessages();
}

function getPassword(room) {
    lockedRoom.value = room;
}

async function tryPassword(password) {
    if (password === lockedRoom.value.password) {
        if (!(await enterRoom(lockedRoom.value.id))) return;

        roomData.id = lockedRoom.value.id;
        roomData.name = lockedRoom.value.name;
        roomData.tags = lockedRoom.value.tags;
    } else lockedRoom.value = null;
}
</script>

<style scoped>
main {
    background-image: url("../assets/background.png");
    background-position: center;
    background-repeat: repeat;
    background-size: contain;
}
</style>

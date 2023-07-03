<template>
    <nav class="w-96 p-6 border-r-2 border-neutral-950 bg-neutral-900 h-screen flex flex-col gap-8">
        <div class="flex justify-between items-center">
            <div class="w-2/3">
                <AppLogo />
            </div>
            <button
                class="hover:scale-110 transition-all flex justify-center h-12 w-12 bg-[#2DD112] rounded-2xl font-semibold text-5xl items-center"
                type="button"
                @click="$emit('openRoomCreator')"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-24 h-24">
                    <path
                        d="M10.75 6.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
                    />
                </svg>
            </button>
        </div>

        <form class="flex gap-5 items-center">
            <input
                class="flex-1 bg-neutral-800 rounded-2xl p-3 font-semibold text-amber-400 border-none outline-none text-lg placeholder:text-zinc-500"
                type="text"
                placeholder="Código da sala"
                v-model="roomCode"
            />

            <button
                class="transition-all flex justify-center h-12 w-12 bg-blue-500 rounded-2xl font-semibold text-5xl items-center"
                type="submit"
                :class="!roomCode.length ? 'opacity-60' : 'hover:scale-110'"
                :disabled="!roomCode.length"
                @click.prevent=""
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-8 h-8">
                    <path
                        d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z"
                    />
                </svg>
            </button>
        </form>

        <RoomCard
            v-for="(room, index) in rooms"
            :name="room.name"
            :tags="room.tags"
            :isPublic="!room.password.length"
            :key="index"
            @click.prevent="$emit('openRoom', room.name, room.tags, room.password, null)"
        />
    </nav>
</template>

<script setup>
import { ref } from "vue";

import AppLogo from "../components/AppLogo.vue";
import RoomCard from "../components/RoomCard.vue";

// eslint-disable-next-line
const props = defineProps(["rooms"]);

const roomCode = ref("");
</script>

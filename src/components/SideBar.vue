<template>
    <nav class="w-96 pt-6 border-r-2 border-neutral-950 bg-neutral-900 h-screen flex flex-col gap-8">
        <div class="flex ml-8 justify-between items-center bg-neutral-900 w-80">
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

        <input
            class="ml-8 w-80 bg-neutral-800 rounded-2xl p-3 font-semibold text-amber-400 border-none outline-none text-lg placeholder:text-zinc-500"
            type="text"
            placeholder="Pesquise por salas..."
            v-model="search"
            @input="$emit('search', search)"
        />

        <div class="flex flex-col -z-10 overflow-y-auto ml-8">
            <RoomCard
                v-for="(room, index) in rooms"
                :name="room.name"
                :tags="room.tags"
                :isPublic="!room.password.length"
                :key="index"
                @click.prevent="$emit('openRoom', room._id, room.name, room.tags, room.password)"
            />
        </div>
    </nav>
</template>

<script setup>
import { ref } from "vue";

import AppLogo from "../components/AppLogo.vue";
import RoomCard from "../components/RoomCard.vue";

const search = ref("");

// eslint-disable-next-line
const props = defineProps(["rooms"]);
</script>

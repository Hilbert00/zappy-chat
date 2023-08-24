<template>
    <div
        class="relative flex flex-col justify-center items-center rounded-2xl h-[500px] w-[800px] right-0 left-0 top-0 bottom-0 m-auto bg-neutral-950 border-2 border-black z-50"
    >
        <button
            type="button"
            class="absolute right-5 top-5"
            @click="
                () => {
                    $emit('closeRoomCreator');
                    clearForm();
                }
            "
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="4"
                class="w-8 h-8 text-red-700"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        <h1 class="text-center font-semibold text-4xl mb-5">Criar Sala</h1>
        <form class="flex flex-col gap-5 items-center w-3/5">
            <input
                class="w-full bg-neutral-800 rounded-2xl p-3 font-semibold text-amber-400 border-none outline-none text-lg placeholder:text-zinc-500"
                type="text"
                placeholder="Nome da sala"
                v-model="roomData.name"
            />
            <input
                class="w-full bg-neutral-800 rounded-2xl p-3 font-semibold text-amber-400 border-none outline-none text-lg placeholder:text-zinc-500"
                type="text"
                placeholder="Tags"
                v-model="roomData.tags"
            />
            <div class="flex gap-5 w-full">
                <button
                    class="w-[52px] bg-neutral-800 rounded-2xl flex justify-center items-center"
                    type="button"
                    @click="roomData.isPublic = !roomData.isPublic"
                >
                    <svg
                        v-if="roomData.isPublic"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="4"
                        class="w-8 h-8 text-red-700"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                    <svg
                        v-if="!roomData.isPublic"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="4"
                        class="w-8 h-8 text-[#2DD112]"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </button>
                <input
                    class="flex-1 bg-neutral-800 rounded-2xl p-3 font-semibold text-amber-400 border-none outline-none text-lg placeholder:text-zinc-500"
                    type="text"
                    placeholder="Senha"
                    :class="roomData.isPublic ? 'opacity-60' : ''"
                    :disabled="roomData.isPublic"
                    v-model="roomData.password"
                />
            </div>
            <button
                type="submit"
                class="text-xl bg-[#2DD112] py-2 rounded-2xl font-semibold w-2/3 transition-all"
                :class="
                    !roomData.name || !roomData.tags || (!roomData.isPublic && !roomData.password)
                        ? 'opacity-60'
                        : 'hover:scale-110'
                "
                :disabled="!roomData.name || !roomData.tags || (!roomData.isPublic && !roomData.password)"
                @click.prevent="
                    async () => {
                        const res = await addRoom();

                        $emit('roomAdded', res.insertedId, roomData.name, roomData.tags);
                        clearForm();
                        $emit('closeRoomCreator');
                    }
                "
            >
                Criar
            </button>
        </form>
    </div>
</template>

<script setup>
import { reactive, inject } from "vue";

const data = inject("$data");

const roomData = reactive({
    name: "",
    tags: "",
    isPublic: true,
    password: "",
});

async function addRoom() {
    return await data.addRoom(roomData.name, roomData.tags, roomData.password);
}

function clearForm() {
    roomData.name = "";
    roomData.tags = "";
    roomData.isPublic = true;
    roomData.password = "";
}
</script>

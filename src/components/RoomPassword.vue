<template>
    <div
        class="relative flex flex-col justify-center items-center rounded-2xl h-[500px] w-[800px] right-0 left-0 top-0 bottom-0 m-auto bg-neutral-950 border-2 border-black z-50"
    >
        <button
            type="button"
            class="absolute right-5 top-5"
            @click="
                () => {
                    $emit('closeRoomPassword');
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
        <h1 class="text-center font-semibold text-4xl mb-8">Digite a senha para entrar nesta sala</h1>
        <form class="flex flex-col gap-8 items-center w-3/5">
            <input
                class="w-full bg-neutral-800 rounded-2xl p-3 font-semibold text-amber-400 border-none outline-none text-lg placeholder:text-zinc-500"
                type="text"
                placeholder="Senha"
                v-model="password"
            />

            <button
                type="submit"
                class="text-xl bg-[#2DD112] py-2 rounded-2xl font-semibold w-2/3 transition-all"
                :class="!password ? 'opacity-60' : 'hover:scale-110'"
                :disabled="!password"
                @click.prevent="() => $emit('passwordEntered', password)"
            >
                Criar
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";

const password = ref("");

function clearForm() {
    password.value = "";
}
</script>

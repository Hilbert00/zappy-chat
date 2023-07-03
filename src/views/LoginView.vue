<template>
    <div class="container mx-auto flex items-center flex-col gap-20 mt-20">
        <div class="w-80">
            <AppLogo />
        </div>
        <form class="w-96 flex flex-col gap-20 items-center">
            <input
                class="w-full bg-neutral-900 rounded-2xl p-3 font-semibold text-amber-400 border-none outline-none text-lg placeholder:text-zinc-500"
                type="text"
                placeholder="Digite aqui o seu nome de usuário"
                v-model="username"
            />

            <button
                class="text-xl bg-[#2DD112] py-2 rounded-2xl font-semibold w-2/3 transition-all"
                type="submit"
                :class="!username.length ? 'opacity-60' : 'hover:scale-110'"
                :disabled="!username.length"
                @click.prevent="login(username)"
            >
                Entrar
            </button>
        </form>
    </div>
    <footer class="fixed bottom-0 w-full text-center py-3">Nicolas A. Hilbert · 2023</footer>
</template>

<script setup>
import AppLogo from "../components/AppLogo.vue";

import { useRouter } from "vue-router";
import { ref, onMounted, inject } from "vue";

const router = useRouter();

const data = inject("$data");
const username = ref("");

onMounted(() => {
    const user = data.getUser();

    if (user.username) {
        username.value = user.username;
    }
});

function login(username) {
    data.setUser(username, randomColor());
    router.push({ path: "/rooms" });
}

function randomColor() {
    const values = "0123456789ABCDEF";

    let color = "#";

    for (let i = 0; i < 6; i++) color += values[Math.floor(Math.random() * 16)];

    return color;
}
</script>

<template>
    <div class="body mb-8 w-80 rounded-2xl p-4 relative bg-neutral-800 hover:cursor-pointer">
        <h1 class="font-semibold text-2xl">{{ props.name }}</h1>
        <span class="text-sm">{{ props.tags }}</span>
        <div
            class="absolute top-4 right-4"
            :style="{
                color: props.isPublic ? '#2DD112' : '#D20D0D',
            }"
        >
            <svg
                v-if="props.isPublic"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5"
            >
                <path
                    fillRule="evenodd"
                    d="M14.5 1A4.5 4.5 0 0010 5.5V9H3a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1.5V5.5a3 3 0 116 0v2.75a.75.75 0 001.5 0V5.5A4.5 4.5 0 0014.5 1z"
                    clipRule="evenodd"
                />
            </svg>
            <svg
                v-if="!props.isPublic"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5"
            >
                <path
                    fill-rule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    clip-rule="evenodd"
                />
            </svg>
        </div>
    </div>
</template>

<script setup>
// eslint-disable-next-line
const props = defineProps(["name", "tags", "isPublic"]);
</script>

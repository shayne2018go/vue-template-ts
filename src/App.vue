<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, onUnmounted } from "vue"
import { useRoute, useRouter } from "vue-router"
const router = useRouter()
const route = useRoute()

onBeforeMount(() => {})

onUnmounted(() => {
})

onMounted(() => {
})
</script>

<style></style>

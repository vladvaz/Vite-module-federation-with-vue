<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <h1>Count: {{ count }}</h1>
  <button @click="increment">Add 1</button>
</template>

<style scoped></style>

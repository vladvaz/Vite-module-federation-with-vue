<script setup>
import { h, onMounted, ref, render } from 'vue'

import {
  __federation_method_setRemote,
  __federation_method_getRemote,
  __federation_method_unwrapDefault
} from 'virtual:__federation__'

const props = defineProps(['name', 'url'])

const container = ref(null)
const isLoading = ref(false)
const showError = ref(false)

onMounted(async () => {
  if (container.value !== null) {
    try {
      isLoading.value = true

      __federation_method_setRemote(props.name, {
        url: () => Promise.resolve(props.url),
        format: 'esm',
        from: 'vite'
      })

      const moduleWraped = await __federation_method_getRemote(props.name, './Main')
      const module = await __federation_method_unwrapDefault(moduleWraped)
      isLoading.value = false
      render(h(module, {}), container.value)
    } catch (error) {
      console.log(error)
      isLoading.value = false
      showError.value = true
    }
  }
})
</script>

<template>
  <section :class="'module-component'">
    <h2 v-if="isLoading">Loading...</h2>
    <h2 v-else-if="!isLoading && showError">An error occured.</h2>
    <div v-else>
      <h1>Module {{ name }}</h1>
      <!-- <p>Location: {{ url }}</p> -->
      <hr />
    </div>
    <div ref="container" class="container"></div>
  </section>
</template>

<style scoped>
.module-component {
  padding: 8px;
  border-radius: 8px;

  margin-bottom: 32px;
  box-shadow:
    rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
}

.container {
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 12px;
}
</style>

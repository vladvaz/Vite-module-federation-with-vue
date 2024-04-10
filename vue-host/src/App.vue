<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ref } from 'vue'

import type { ModuleInfo } from './types/ModuleInfo'
import type { SelectOption } from './types/SelectOption'
import type { DataModel } from './types/DataModel'

import ModuleComponent from './components/ModuleComponent.vue'

const selected = ref('')
const moduleList: Ref<ModuleInfo[]> = ref([])

const options: Ref<SelectOption[]> = ref([
  { text: 'Account 1', value: 'account1' },
  { text: 'Account 2', value: 'account2' }
])

const data: DataModel = {
  account1: {
    modules: [
      {
        moduleId: 1,
        moduleName: 'A',
        moduleUrl: 'http://localhost:5001/assets/main.js'
      },
      {
        moduleId: 3,
        moduleName: 'C',
        moduleUrl: 'http://localhost:5003/assets/main.js'
      }
    ]
  },
  account2: {
    modules: [
      {
        moduleId: 2,
        moduleName: 'B',
        moduleUrl: 'http://localhost:5002/assets/main.js'
      }
    ]
  }
}

watch(selected, () => (moduleList.value = data[selected.value].modules))
</script>

<template>
  <select v-model="selected">
    <option disabled :key="'no-option'" value="">Please select one</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.text }}
    </option>
  </select>

  <h2 v-if="moduleList.length === 0">No modules to load</h2>
  <h2 v-else>
    {{ options.find((value) => value.value === selected)?.text }} has
    {{ moduleList.length }} modules
  </h2>

  <ModuleComponent
    v-for="mod in moduleList"
    :key="mod.moduleId"
    :name="mod.moduleName"
    :url="mod.moduleUrl"
  />
</template>

<style scoped></style>

<template>
  <v-icon v-bind="$attrs">{{ getIcon(type) }}</v-icon>
</template>

<script>
import {mdiCloudQuestion, mdiLightbulb, mdiPowerSocketEu, mdiThermometer} from "@mdi/js";

export default {
  name: "EcDeviceIcon",
  props:{
    type: String,
  },
  methods: {
    getIcon(type) {
      let icon = ""
      switch(type) {
        case 'bulb': {
          icon = mdiLightbulb;
          break;
        }
        case 'outlet': {
          icon = mdiPowerSocketEu;
          break;
        }
        case 'temperatureSensor': {
          icon = mdiThermometer;
          break;
        }
        default: {
          icon = mdiCloudQuestion;
        }
      }
      return icon
    },
  }
}
</script>

<style scoped>

</style>

<template>
  <v-icon v-bind="$attrs" :color="getIcon(state).color" >{{ getIcon(state).icon }}</v-icon>
</template>
<script lang="ts">
import {mdiCloudQuestion, mdiWifi, mdiWifiAlert, mdiWifiOff} from "@mdi/js";

export default {
  name: 'EcConnectionState',
  props: {
    state: {},
  },
  methods: {
    getIcon(type) {
      let icon = ""
      let color = 'blue'
      switch(type) {
        case 'connected': {
          icon = mdiWifi;
          color = 'green';
          break;
        }
        case 'poorConnection': {
          icon = mdiWifiAlert;
          color = 'orange';
          break;
        }
        case 'disconnected': {
          icon = mdiWifiOff;
          color = 'red';
          break;
        }
        default: {
          icon = mdiCloudQuestion;
        }
      }
      return {icon: icon, color: color}
    },
  }
}
</script>

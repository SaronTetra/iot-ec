<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar-title>iot-ec</v-toolbar-title>
      <v-spacer/>
        <v-switch v-model="useWs" hide-details label="Use websocket"/>
      <v-btn icon @click="$store.dispatch('refresh')">

        <v-icon>{{ mdiRefresh }}</v-icon>
      </v-btn>
      <v-btn icon href="https://github.com/SaronTetra">
        <v-icon>{{ mdiGithub }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <EcDevicesList :useWs="useWs"/>
      <EcDeviceDetails/>
    </v-main>
  </v-app>
</template>

<script>
import EcDevicesList from "@/components/EcDevicesList";
import EcDeviceDetails from "@/components/EcDeviceDetails";

import { mdiGithub, mdiRefresh} from '@mdi/js'

export default {
  name: 'App',

  components: {
    EcDeviceDetails,
    EcDevicesList,
  },

  data: () => ({
    useWs: false,
    mdiGithub,
    mdiRefresh,
  }),
};
</script>

<template>
  <v-data-table :items="data" :headers="headers" :loading="loading" @click:row="rowClick">
    <template v-slot:item.type="{ item }">
      <EcDeviceIcon :type="item.type"/>
    </template>
    <template v-slot:item.connectionState="{ item }">
      <EcConnectionState :state="item.connectionState"/>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import axios from "axios";
import EcConnectionState from "./EcConnectionIcon.vue";
import EcDeviceIcon from "./EcDeviceIcon.vue";

export default {
  name: "EcDevicesList",
  components: {EcDeviceIcon, EcConnectionState},
  props: {
    useWs: Boolean,
  },
  data() {
    return {
      data: [],
      loading: true,
      ws: {},
      headers: [
        {
          text: 'Type',
          value: 'type',
          width: 100,
        },
        {
          text: 'Connection',
          value: 'connectionState',
          width: 150,
        },
        {
          text: 'Name',
          value: 'name',
        },
      ]
    };
  },
  mounted() {
    this.getData();

    this.unsubscribe = this.$store.subscribe((mutation) => {
      if(mutation.type === 'setDevices'){
        const newDevice = JSON.parse(mutation.payload)
        let index = this.data.findIndex(device => device.id === newDevice.id)
        this.data.splice(index, 1, newDevice) //vue cant detect direct changes in arrays
      }
    });

    this.unsubscribeAction = this.$store.subscribeAction((action) => {
      if (action.type == 'refresh') {
        this.getData()
      }
    })
  },
  watch: {
    useWs(newData) {
      if (newData) {
        const ws = new WebSocket('ws://' + process.env.VUE_APP_WEBSOCKET_URL + '/api/v1/refresh')
        ws.onmessage = (event) => {
          // this.$store.dispatch('notify')
          this.$store.commit('setDevices', event.data)
        }
        this.ws = ws
      } else if (!this.useWs) {
         this.ws.close()
      }
    }
  },
  methods: {
    getData() {
      axios
          .get(process.env.VUE_APP_API_URL + "/api/v1/devices")
          .then((response) => {
            this.data = response.data;
            this.loading = false;
          });
    },
    rowClick(row) {
      this.$store.commit('set', row.id)
    }
  },
}
</script>


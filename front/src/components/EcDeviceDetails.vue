<template>
  <div ref="draggable" style="width: 500px; " v-show="dialog">

    <v-card height="100%" raised class="d-flex flex-column">
      <v-card-title class="text-h5 grey lighten-2">
        <EcDeviceIcon large :type="device.type"/>
        <v-spacer/>
        {{device.name}}
        <v-spacer/>
        <EcConnectionIcon large :state="device.connectionState"/>
      </v-card-title>

      <v-card-text>
        <EcBulb v-if="device.type === 'bulb'" :device="device"/>
        <EcOutlet v-else-if="device.type === 'outlet'" :device="device"/>
        <EcTemp v-else-if="device.type === 'temperatureSensor'" :device="device"/>

      </v-card-text>

      <v-spacer/>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            text
            @click="dialog = false;"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import interact from "interactjs";
import axios from "axios";
import EcBulb from "@/components/EcBulb";
import EcOutlet from "@/components/EcOutlet";
import EcTemp from "@/components/EcTemp";
import EcConnectionIcon from "@/components/EcConnectionIcon";
import EcDeviceIcon from "@/components/EcDeviceIcon";

export default {
  name: "EcDeviceDetails",
  components: {EcDeviceIcon, EcConnectionIcon, EcTemp, EcOutlet, EcBulb},
  data() {
    return {
      device: {},
      dialog: false,
    }
  },
  updated() {
    let draggable = this.$refs.draggable;
    this.initInteract(draggable);
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if(mutation.type === 'setDevices' && state.newId === state.id){
        this.device = state.devices[state.id]
      }
      if(mutation.type === 'set'){
          this.getData()
      }
    });
    this.unsubscribeAction = this.$store.subscribeAction(() => {
      if(this.dialog){
        this.getData()
      }
    })
  },
  methods: {
    getData() {
      axios
          .get(process.env.VUE_APP_API_URL + "/api/v1/devices/" + this.$store.state.id)
          .then((response) => {
            this.device = response.data;
            this.dialog = true
          });
    },
    initInteract: function (element) {
      interact(element)
          // .resizable({
          //   edges: {left: false, right: true, bottom: true, top: false},
          //   listeners: {move: this.resize},
          //   modifiers: [
          //     // keep the edges inside the parent
          //     interact.modifiers.restrictEdges({
          //       outer: "parent",
          //     }),
          //
          //     // minimum size
          //     interact.modifiers.restrictSize({
          //       min: {width: 300, height: 200},
          //     }),
          //   ],
          // })
          .draggable({
            inertia: true,
            listeners: {move: this.dragMoveListener},
            modifiers: [
              interact.modifiers.restrictRect({
                restriction: "parent",
                endOnly: true,
              }),
            ],
          });
      const x = (parseFloat(localStorage.getItem("pos-x")) || 0);
      const y = (parseFloat(localStorage.getItem("pos-y")) || 0);
      element.style.transform = "translate(" + x + "px," + y + "px)";
    },
    resize: function (event) {
      const target = event.target;
      let x = (parseFloat(localStorage.getItem("pos-x")) || 0);
      let y = (parseFloat(localStorage.getItem("pos-y")) || 0);

      // update the element's style
      target.style.width = event.rect.width + "px";
      target.style.height = event.rect.height + "px";

      // translate when resizing from top or left edges
      x += event.deltaRect.left;
      y += event.deltaRect.top;

      target.style.transform = "translate(" + x + "px," + y + "px)";

      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
    },
    dragMoveListener: function (event) {
      const target = event.target;
      // keep the dragged position in the data-x/data-y attributes
      const x = (parseFloat(localStorage.getItem("pos-x")) || 0) + event.dx;
      const y = (parseFloat(localStorage.getItem("pos-y")) || 0) + event.dy;

      // translate the element
      target.style.transform = "translate(" + x + "px, " + y + "px)";

      // update the posiion attributes
      localStorage.setItem('pos-x', x)
      localStorage.setItem('pos-y', y)
    },
  },
  beforeDestroy() {
    this.unsubscribe();
    this.unsubscribeAction();
  }
}
</script>

<style scoped>

</style>

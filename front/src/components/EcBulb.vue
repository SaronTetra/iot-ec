<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6" v-if="device.isTurnedOn">
        <v-icon x-large :color="device.color">{{

            mdiLightbulb
          }}</v-icon>
        Turned on
      </v-col>
      <v-col cols="6" v-else>
        <v-icon x-large>{{

            mdiLightbulbOff
          }}</v-icon>
        Turned off
      </v-col>
      <v-col cols="6">
        <v-slider readonly label="Brightness" :value="device.brightness" thumb-label="always" :color="device.color"/>
      </v-col>
      <!--      <v-col cols="12">-->
      <!--        <v-color-picker :value="device.color"></v-color-picker>-->
      <!--      </v-col>-->
    </v-row>
  </v-container>

</template>

<script>
import {mdiLightbulbOff} from "@mdi/js";
import {mdiLightbulb} from "@mdi/js";
export default {
  name: "EcBulb",
  props: {
    device: Object,
  },
  data: () => ({
    mdiLightbulb,
    mdiLightbulbOff,
  })
}
</script>

<style scoped>

</style>

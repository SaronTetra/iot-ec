<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="6">
        <h1>
          {{ device.powerConsumption }} W
        </h1>
      </v-col>
      <v-col cols="6">
      <p v-if="device.isTurnedOn">
         Turned on
      </p>
        <p v-else>
        Turned off
      </p>
    </v-col>
    </v-row>
  </v-container>

</template>

<script>
export default {
  name: "EcOutlet",
  props: {
    device: Object,
  }

}
</script>

<style scoped>

</style>

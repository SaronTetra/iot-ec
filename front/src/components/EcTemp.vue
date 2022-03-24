<template>
  <v-container fluid >
    <v-row dense justify="center">
      <v-col cols="6" class="text-center">
        <h1>
          {{ device.temperature }}°C
        </h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "EcTemp",
  props: {
    device: Object,
  }

}
</script>

<style scoped>

</style>

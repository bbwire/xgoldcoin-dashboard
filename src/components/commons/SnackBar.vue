<template>
  <v-card>
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :color="color"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        icon
        @click="snackbar = false"
      >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
  export default {
    props: ['color', 'text'],
    data () {
      return {
        snackbar: true,
        y: 'top',
        x: 'right',
        mode: '',
        timeout: 6000
      }
    }
  }
</script>

<template>
    <v-alert
      v-model="show"
      :dismissible="dismissible"
      :type="type"
      class="mb-4"
    >
      {{message}} <v-btn color="white" depressed light to="/login">Login here</v-btn>
    </v-alert>
</template>

<script>
export default {
    props: ['message', 'type'],
    data: () => ({
        show: true,
    })
}
</script>
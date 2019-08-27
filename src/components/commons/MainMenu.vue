<template>    
    <div>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        link
        :to="item.path"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          path: '/'
        },
        {
          icon: 'mdi-format-list-bulleted',
          title: 'Projects',
          path: '/projects/'
        },
        {
          icon: 'mdi-menu',
          title: 'Applications',
          path: '/applications/'
        },
        {
          icon: 'person',
          title: 'Prifile',
          path: '/profile/'
        },
        {
          icon: 'lock',
          title: 'Logout',
          path: '/logout/'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Client'
    }
  }
}
</script>

<style>

</style>

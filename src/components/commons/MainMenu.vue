<template>    
    <div>
      <div v-for="item in items" :key="item.id">

        <div v-if="item.items">
          <v-list-group
            :key="item.title"
            v-model="item.active"
            :prepend-icon="item.icon"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="subItem in item.items"
              :key="subItem.title"
              link
              :to="subItem.path"
            >
              <v-list-item-content>
                <v-list-item-title v-text="subItem.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </div>
        <div v-else>
          <v-list-item
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
      </div>
      
    </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          icon: 'mdi-home',
          title: 'Dashboard',
          path: '/'
        },
        {
          icon: 'mdi-format-list-bulleted',
          title: 'Transactions',
          path: '/transactions/',
          items: [
            {
              icon: 'mdi-menu',
              title: 'BITCOIN',
              path: '/transactions/bitcoin/',
              items: [
                {
                  icon: 'mdi-menu',
                  title: 'Direct commission',
                  path: '/bonus/direct/sales/'
                },
                {
                  icon: 'mdi-menu',
                  title: 'Indirect commission',
                  path: '/bonus/commission/'
                }
              ]
            },
            {
              icon: 'mdi-menu',
              title: 'XGOLDCOIN',
              path: '/transactions/xgold/'
            }
          ]
        },
        {
          icon: 'mdi-menu',
          title: 'My Network',
          path: '/my/network/'
        },
        {
          icon: 'attach_money',
          title: 'Bonus',
          path: '/my/bonuses/',
          items: [
            {
              icon: 'mdi-menu',
              title: 'Direct commission',
              path: '/bonus/direct/commission/'
            },
            {
              icon: 'mdi-menu',
              title: 'Indirect commission',
              path: '/bonus/indirect/commission/'
            }
          ]
        },
        {
          icon: 'person',
          title: 'New member',
          path: '/members/new/'
        },
        {
          icon: 'person',
          title: 'My account',
          path: '/profile/'
        },
        {
          icon: 'list',
          title: 'Packages',
          path: '/packages/'
        },
        {
          icon: 'settings',
          title: 'Settings',
          path: '/settings/'
        },
        // {
        //   icon: 'lock',
        //   title: 'Logout',
        //   path: '/logout/'
        // }
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

i1@t3#k2%g3*

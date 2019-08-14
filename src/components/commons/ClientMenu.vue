<template>    
    <div>
      <div v-for="item in items" :key="item.id">
        <div v-if="item.items">
          <v-list-item-group
            v-model="item.active"
            :key="item.title"
            no-action
          >
            <v-list-item slot="activator">
              <v-list-item-icon>
                <v-icon>{{item.icon}}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title active-class="red--text">{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <!-- <div v-if="" -->

            <div v-for="subItem in item.items" :key="subItem.id">

              <div v-if="subItem.items">
                <v-list-item-group
                  no-action
                  sub-group
                  value="true"
                >
                  <v-list-item slot="activator">
                    <v-list-item-title>{{subItem.title}}</v-list-item-title>
                  </v-list-item>

                  <div v-for="(subSubItem, i) in subItem.items" :key="i">
                    <v-list-item :to="subSubItem.path" >

                      <v-list-item-content>
                        <v-list-item-title active-class="red--text">{{ subSubItem.title }}</v-list-item-title>
                      </v-list-item-content>

                    </v-list-item>
                  </div>
                </v-list-item-group>
              </div>

              <div v-else>
                <v-list-item :to="subItem.path" >

                  <v-list-item-content>
                    <v-list-item-title active-class="red--text">{{ subItem.title }}</v-list-item-title>
                  </v-list-item-content>

                </v-list-item>
              </div>
            </div>

          </v-list-item-group>
        </div>
        <div v-else>
          <v-list-item :to="item.path" :prepend-icon="item.action">
            <v-list-item-icon>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title active-class="red--text">{{ item.title }}</v-list-item-title>
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
          title: 'Home',
          path: '/'
        },
        {
          icon: 'mdi-menu',
          title: 'My requests',
          path: '/my/requests/'
        },
        {
          icon: 'mdi-currency-usd',
          title: 'My transactions',
          path: '/my/transactions/'
        },
        {
          icon: 'mdi-currency-usd',
          title: 'Money transfer',
          path: '/my/transfers/'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'ClientMenu'
    }
  }
}
</script>

<style>

</style>

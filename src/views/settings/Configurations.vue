<template>
  <v-container class="back-cover" fluid grid-list-md>
      <v-card>
        <v-toolbar
            class="elevation-0 accent--text"
            color="white"
            light
        >
            <v-btn icon >
            <v-icon color="accent">
                settings
            </v-icon>
            </v-btn>

            <v-toolbar-title>Configurations</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn color="accent" @click.native="addSettings" v-if="!settings.id" :disabled="isLoading">
            Save changes
            </v-btn>
            <v-btn color="accent" @click.native="editSettings" v-else :disabled="isLoading">
            Save changes
            </v-btn>

            <!-- <v-progress-circular v-if="isLoading" :size="30" :width="2" indeterminate color="white"></v-progress-circular> -->

            <v-btn icon>
            <v-icon color="accent">more_vert</v-icon>
            </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
            <v-form ref="form" lazy-validation>
            <v-layout row wrap>
            <!--<div class="padding&#45;&#45;16">-->
            <v-flex md4 xs12 sm6>
              
              <!-- <el-input placeholder="First name" v-model="editeddata.fname"></el-input> -->
              <v-text-field
              v-model="settings.app_name"
              required
              validate-on-blur
              label="App name"
              placeholder="App name"
              :rules="[rules.required]"
              clearable
              class="space-bottom"
              outlined
              ></v-text-field>

            </v-flex>

            <v-flex md4 xs12 sm6>
                <v-text-field
                v-model="settings.withdraw_charge"
                required
                validate-on-blur
                label="Withdraw charge (%)"
                placeholder="2"
                :rules="[rules.required]"
                clearable
                class="space-bottom"
                outlined
                ></v-text-field>

            </v-flex>

            <div class="space-top-20" style="display: block; margin-top: 20px;"></div>

            <v-flex md6 sm6>
              <label class="space-top-20 bold mb-3">Package contribution</label>

              <v-layout row class="mt-3">
              
              <v-flex md6 sm6>
                <v-text-field
                v-model="settings.xgold_contribution"
                required
                validate-on-blur
                label="XGOLD contribution (%)"
                placeholder="10"
                :rules="[rules.required]"
                clearable
                class="space-bottom"
                outlined
                ></v-text-field>
              </v-flex>

              <v-flex md6 sm6>
                <v-text-field
                  v-model="settings.bitcoin_contribution"
                  required
                  validate-on-blur
                  label="BTC contribution (%)"
                  placeholder="90"
                  :rules="[rules.required]"
                  clearable
                  class="space-bottom"
                  outlined
                  ></v-text-field>
              </v-flex>
              </v-layout>
            </v-flex>

            <v-flex md6 sm6>
              <label class="space-top-20 bold mb-3">Commissions</label>

              <v-layout row class="mt-3">
              
              <v-flex md6 sm6>
                <v-text-field
                v-model="settings.direct_commission"
                required
                validate-on-blur
                label="Direct commission (%)"
                placeholder="20"
                :rules="[rules.required]"
                clearable
                class="space-bottom"
                outlined
                ></v-text-field>
              </v-flex>

              <v-flex md6 sm6>
                <v-text-field
                  v-model="settings.indirect_commission"
                  required
                  validate-on-blur
                  label="Indirect commission (%)"
                  placeholder="10"
                  :rules="[rules.required]"
                  clearable
                  class="space-bottom"
                  outlined
                  ></v-text-field>
              </v-flex>
              </v-layout>

            </v-flex>

            <!-- <v-flex md2 sm6>
              <label class="space-top-20 bold">Student numbers</label>
              <v-switch 
                v-model="settings.student_number_generation" 
                label="Auto-generated" 
                color="accent" 
                :true-value="1" 
                :false-value="0"></v-switch>
            </v-flex>

            <v-flex md3 sm6>
              <label class="space-top-20 bold">Ranking (for 1, 2 and 3)</label>
              <v-switch 
                v-model="settings.report_ranking" 
                label="Include positions on report card" 
                color="accent" 
                :true-value="1" 
                :false-value="0"></v-switch>
            </v-flex>

            <v-flex md4 sm6>
              <label class="space-top-20 bold">Fees balance on report</label>
              <v-switch 
                v-model="settings.report_finance" 
                label="Include fees balance on report card" 
                color="accent" 
                :true-value="1" 
                :false-value="0"></v-switch>
            </v-flex> -->

            </v-layout>
          </v-form>
          
        </v-card-text>
        
      </v-card>
    <snack-bar v-if="successMessage" :color="'success'" :text="successMessage"></snack-bar>
    <snack-bar v-if="errorMessage" :color="'error'" :text="errorMessage"></snack-bar>
  </v-container>
</template>

<script>
  /* eslint-disable */
  import { mapState, mapActions } from 'vuex'
  import SnackBar from '@/components/commons/SnackBar.vue'
  
  export default {
    components: {
      SnackBar
    },
    data () {
      return {
        id: 0,
        show1: false,
        date: null,
        menu: false,
        end_date: null,
        menu1: false,
        modal: false,
        image: '',
        fileList: [],
        editeddata: {
          title: '',
          account_balance: '',
          sms_rate: '',
        }
      }
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/login/')
      }
    },
    created () {
      this.$store.dispatch('getSettings')
    },
    computed: {
      back () {
        return this.$router.go(-1)
      },
      ...mapState([
        'isLoading',
        'errorMessage',
        'successMessage',
        'rules',
        'settings'
      ])
    },
    methods: {
      ...mapActions([
        'getSettings',
        // 'getClassesByLevel'
      ]),
      settingsTest () {
        console.log('working...')
      },
      addSettings: function () {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('addSettings', this.settings)
          console.log(this.successMessage)
        }
      },
      editSettings: function () {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('editSettings', {id: this.settings.id, data: this.settings})
        }
      },
      // handleSchoolBannerUpload: function (event) {
      //   this.editeddata.school_banner = event.target.files[0]
      //   console.log(this.editeddata.school_banner)
      // }
    },
    name: 'Configurations'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.space-100 {
  margin-top: 100px !important;
}
  .space-50 {
     margin-top: 50px;
   }

.space-20 {
  margin-top: 20px;
}

.el-input__inner {
  border: 1px solid #999 !important;
}
</style>

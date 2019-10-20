import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Home', component:  () => import('@/views/Home.vue'), meta: { title: 'Dashboard' } },
    { path: '/login/', name: 'Login', component:  () => import('@/views/LoginPage.vue'), meta: { title: 'Login' } },
    { path: '/password/recovery/', name: 'password-recovery', component:  () => import('@/views/PasswordRecovery.vue'), meta: { title: 'Recover passwprd' } },
    { path: '/password/reset/:id/:token', name: 'password-reset', component:  () => import('@/views/PasswordReset.vue'), meta: { title: 'Reset passwprd' } },
    { path: '/register/', name: 'register', component:  () => import('@/views/Register.vue'), meta: { title: 'Register' } },
    { path: '/account/verification/:token', name: 'account-verification', component:  () => import('@/views/AccountVerification.vue'), meta: { title: 'Account verification' } },
    { path: '/logout/', name: 'Logout', component:  () => import('@/views/Logout.vue'), meta: { title: 'Logout' } },
    { path: '/settings/roles/', name: 'Roles', component:  () => import('@/views/settings/Roles.vue'), meta: { title: 'Roles' } },
    { path: '/packages/', name: 'Packages', component:  () => import('@/views/settings/Packages.vue'), meta: { title: 'Packages' } },
    { path: '/settings/', name: 'Configurations', component:  () => import('@/views/settings/Configurations.vue'), meta: { title: 'Configurations' } },
    // Candidate
    { path: '/candidates/', name: 'Candidates', component:  () => import('@/views/Candidates.vue'), meta: { title: 'Candidates' } },
    { path: '/candidates/details/:id', name: 'CandidateDeatils', component:  () => import('@/views/clients/CandidateDetails.vue'), meta: { title: 'CandidateDetails' } },
    { path: '/my/network/', name: 'MyNetwork', component:  () => import('@/views/MyNetwork.vue'), meta: { title: 'My Network' } },
    { path: '/members/new/', name: 'NewMember', component:  () => import('@/views/NewMember.vue'), meta: { title: 'New Member' } },
    { path: '/bonus/direct/commission', name: 'DirectCommission', component:  () => import('@/views/DirectSales.vue'), meta: { title: 'Direct commission' } },
    { path: '/bonus/indirect/commission/', name: 'IndirectCommission', component:  () => import('@/views/Commission.vue'), meta: { title: 'Indirect commission' } },
    { path: '/transactions/bitcoin/', name: 'BtcTransactions', component:  () => import('@/views/BtcTransactions.vue'), meta: { title: 'Bitcoin deposits' } },
    { path: '/transactions/xgold/', name: 'XgoldTransactions', component:  () => import('@/views/XgoldTransactions.vue'), meta: { title: 'Xgold deposits' } },
    { path: '/users/', name: 'Users', component:  () => import('@/views/users/Users.vue'), meta: { title: 'Users' } },
    { path: '/profile/', name: 'Profile', component:  () => import('@/views/users/Profile.vue'), meta: { title: 'Profile' } },
    // Page not found route
    { path: '*', name: 'NotFound', component: () => import('@/components/commons/PageNotFound.vue'), meta: { title: 'Page not found' } }

  ]
})
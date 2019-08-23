import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Home', component:  () => import('@/views/Home.vue'), meta: { title: 'Dashboard' } },
    { path: '/login/', name: 'Login', component:  () => import('@/views/LoginPage.vue'), meta: { title: 'Login' } },
    { path: '/password/recovery/', name: 'password-recovery', component:  () => import('@/views/PasswordRecovery.vue'), meta: { title: 'Recover passwprd' } },
    { path: '/logout/', name: 'Logout', component:  () => import('@/views/Logout.vue'), meta: { title: 'Logout' } },
    { path: '/settings/roles/', name: 'Roles', component:  () => import('@/views/settings/Roles.vue'), meta: { title: 'Roles' } },
    { path: '/settings/', name: 'Configurations', component:  () => import('@/views/settings/Configurations.vue'), meta: { title: 'Configurations' } },
    // Clients
    { path: '/clients/', name: 'Clients', component:  () => import('@/views/Clients.vue'), meta: { title: 'Clients' } },
    { path: '/clients/details/:id', name: 'ClientDeatils', component:  () => import('@/views/clients/ClientDetails.vue'), meta: { title: 'ClientDetails' } },
    // Candidate
    { path: '/candidates/', name: 'Candidates', component:  () => import('@/views/Candidates.vue'), meta: { title: 'Candidates' } },
    { path: '/candidates/details/:id', name: 'CandidateDeatils', component:  () => import('@/views/clients/CandidateDetails.vue'), meta: { title: 'CandidateDetails' } },
    // Projects
    { path: '/projects/', name: 'Projects', component:  () => import('@/views/Projects.vue'), meta: { title: 'Projects' } },
    { path: '/projects/new/', name: 'NewProject', component:  () => import('@/views/projects/NewProject.vue'), meta: { title: 'New Project' } },
    { path: '/applications/', name: 'Applications', component:  () => import('@/views/Applications.vue'), meta: { title: 'Applications' } },
    { path: '/client/:id', name: 'ClientsDetails', component:  () => import('@/views/ClientsDetails.vue'), meta: { title: 'Client Details' } },
    { path: '/loans/', name: 'Loans', component:  () => import('@/views/Loans.vue'), meta: { title: 'Loans' } },
    { path: '/loan/schedule/:id', name: 'LoanSchedule', component:  () => import('@/views/LoanSchedule.vue'), meta: { title: 'Loan Schedule' } },
    { path: '/users/', name: 'Users', component:  () => import('@/views/users/Users.vue'), meta: { title: 'Users' } },
    { path: '/user/profile/', name: 'Profile', component:  () => import('@/views/users/Profile.vue'), meta: { title: 'Profile' } },
    // Page not found route
    { path: '*', name: 'NotFound', component: () => import('@/components/commons/PageNotFound.vue'), meta: { title: 'Page not found' } }

  ]
})
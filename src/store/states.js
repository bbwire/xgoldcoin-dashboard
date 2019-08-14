export default {
  clients: [],
  single_client: {},
  loans: [],
  single_loan: {},
  loan_schedule: [],
  // Staff
  users: [],
  single_user: {},
  current_user: {},
  account_balance: {},
  // Settings
  roles: [],
  settings: {},
  // Commons
  user: {},
  sex: [{name: 'Female'}, {name: 'Male'}],
  menu_display: true,
  clipped: false,
  drawer: true,
  fixed: false,
  dialog: false,
  isLoading: false,
  errorMessage: '',
  successMessage: '',
  rules: {
    required: (value) => !!value || 'This field is required.',
    password: v => (v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
          'Password must contain an upper case letter, a numeric character, and a special character',
    min: v => v.length >= 8 || 'Min 8 characters',
    max: v => v.length <= 160 || 'Maximum characters (160) exceeded! Extra characters may be truncated during sending',
    email: (value) => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Invalid e-mail.'
    }
  },
  rowsPerpage: [ 30, 75, 150, { 'text': 'All', 'value': -1 } ]
}
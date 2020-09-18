import constants from '@/components/constants'

export default {
  name: 'supplier',
  components: {},
  data: function () {
    return {
      visible: false,
      context: 'Supplier',
      supplier: initSupplier(),
      genderOptions: ['MALE', 'FEMALE'],
      rules: {
        companyName: {
              required: true,
              max: constants.sizes.SIZE_M,
              trigger: 'blur'
        },
        firstName: {
              required: true,
              min: constants.sizes.SIZE_XXS,
              max: constants.sizes.SIZE_XS,
              trigger: 'blur'
        },
        lastName: {
              required: true,
              type: 'email',
              max: constants.sizes.SIZE_M,
              trigger: 'blur'
        },
        vatNumber: {
              required: false,
              trigger: 'blur'
        },
        irsOffice: {
              required: false,
              max: constants.sizes.SIZE_XL,
              trigger: 'blur'
        },
        zipCode: {
              required: false,
              max: constants.sizes.SIZE_XL,
              trigger: 'blur'
        },
        city: {
              required: false,
              max: constants.sizes.SIZE_XL,
              trigger: 'blur'
        },
        address: {
              required: false,
              max: constants.sizes.SIZE_XL,
              trigger: 'blur'
        },
        country: {
              required: false,
              max: constants.sizes.SIZE_XL,
              trigger: 'blur'
        },
      }
    }
  },
  created () {
    console.log('Supplier created')
  },
  mounted () {
    this.$events.$on('edit-supplier', eventData => this.onEditSupplier(eventData))
    console.log('Supplier mounted')
  },
  destroyed: function () {
    this.$events.$off('edit-supplier')
    console.log('Supplier destroyed')
  },
  computed: {
    isDeletable: function () {
      return this.supplier.id != null
    }
  },
  methods: {
    onEditSupplier (eventData) {
      console.log('Edit Supplier:' + eventData)
      if (eventData != null) {
        this.$http.get('suppliers/' + eventData.id)
          .then(response => {
            this.supplier = response.data
            this.visible = true
            this.clearValidation()
          })
      } else {
        Object.assign(this.$data.supplier, initSupplier())
        this.visible = true
        this.clearValidation()
      }
    },
    save () {
      this.$refs['supplierForm'].validate().then(() => {
        let _self = this
        if (this.supplier.id != null) {
          // existing person, update
          this.$http.patch('suppliers/' + this.supplier.id, this.supplier, {
            // transform the selected roles into URIs, before sending
            transformRequest: [function (data, headers) {
              return _self.transformRequest(data)
            }]
          }).then(response => {
            this.handleSuccess(response)
          }).catch(e => this.handleError(e))
        } else {
          // new person, create
          this.$http.post('suppliers', this.supplier, {
            // transform the selected roles into URIs, before sending
            transformRequest: [function (data, headers) {
              return _self.transformRequest(data)
            }]
          }).then(response => this.handleSuccess(response))
            .catch(e => this.handleError(e))
        }
      }).catch(e => {
        console.error('validation FAILED')
      })
    },
    cancel () {
      this.visible = false
      this.clearValidation()
    },
    handleSuccess (response) {
      this.visible = false
      this.successFloat(this.$messages.successAction)
      console.log('fire person-edited event')
      this.$events.fire('person-edited', this.supplier)
    },
    handleError (e) {
      this.showDefaultError(e)
    },
    confirmDelete () {
      this.$confirm(this.$messages.confirmAction, this.$messages.confirmActionTitle, {
        confirmButtonText: this.$messages.yes,
        cancelButtonText: this.$messages.no,
        cancelButtonClass: 'btn btn-warning',
        confirmButtonClass: 'btn btn-danger',
        closeOnClickModal: false,
        closeOnPressEscape: false,
        type: 'warning'
      }).then(() => {
        // delete person
        this.$http.delete('suppliers/' + this.supplier.id).then(response => this.handleSuccess(response))
      })
    },
    transformRequest (data) {
      if (data.mobilePhone === '') {
        delete data.mobilePhone
      }
      return JSON.stringify(data)
    },
    clearValidation () {
      if (this.$refs['supplierForm']) {
        this.$refs['supplierForm'].clearValidate()
      }
    }
  }
}

/**
 * Create a new totally empty Person
 * @returns {{id: null, name: string, mobilePhone: string, gender: null, email: string, comments: string, active: boolean}}
 */
function initSupplier () {
  return {
    companyName: '',
    firstName: '',
    lastName: null,
    vatNumber: '',
    country: '',
    city: true,
    irsOffice:'',
    address:'',
    zipCode:'',
  }
}

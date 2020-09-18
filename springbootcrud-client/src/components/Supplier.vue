<template>
  <el-dialog type="warning" title="Διαχείριση Χρήστη" :visible="visible" :modal="true"
             :close-on-click-modal="false"
             :close-on-press-escape="false" :modal-append-to-body="false" :show-close="false" width="75%"
             @close="clearValidation">

    <el-card>
    <el-form ref="supplierForm" :model="supplier" :rules="rules" label-position="top">

      <el-row :gutter="20">
        <!-- LEFT COLUMN -->
        <el-col :span="12">

<el-form-item label="Εισάγετε την επωνημία της εταιρίας:"
                        prop="companyName">
            <el-input prefix-icon="fa fa-user"
                      v-model="supplier.companyName"
                      placeholder="Επωνημία εταιρίας"
                      autoComplete="companyName">
            </el-input>
          </el-form-item>
<el-form-item label="Εισάγετε το όνομα σας:"
                        prop="firstName">
            <el-input prefix-icon="fa fa-user"
                      v-model="supplier.firstName"
                      placeholder="Όνομα"
                      autoComplete="name">
            </el-input>
          </el-form-item>
<el-form-item label="Εισάγετε το επίθετό σας:"
                        prop="lastName">
            <el-input prefix-icon="fa fa-user"
                      v-model="supplier.lastName"
                      placeholder="Επίθετο"
                      autoComplete="lastname">
            </el-input>
          </el-form-item>
<el-form-item label="Εισάγετε το ΑΦΜ σας:"
                        prop="name">
            <el-input prefix-icon="fa fa-user"
                      v-model="supplier.vatNumber"
                      placeholder="ΑΦΜ"
                      autoComplete="VAT">
            </el-input>
          </el-form-item>
<el-form-item label="Εισάγετε το irs Office:"
                        prop="name">
            <el-input prefix-icon="fa fa-user"
                      v-model="supplier.irsOffice"
                      placeholder="irsOffice"
                      autoComplete="irsOffice">
            </el-input>
          </el-form-item>
          <el-form-item label="Εισάγετε τον ταχυδρομικό σας κώδικα:"
                        prop="mobilePhone">
            <el-input prefix-icon="fa fa-phone"
                      v-model="supplier.zipCode"
                      placeholder="Ταχυδρομικός κώδικας">
            </el-input>
          </el-form-item>
          <el-form-item label="Εισάγετε την πολή διαμονής σας:"
                        prop="email">
            <el-input prefix-icon="fa fa-envelope"
                      v-model="supplier.city"
                      type="city">
            </el-input>
          </el-form-item>
                    <el-form-item label="Εισάγετε την χώρα διαμονής σας:"
                                  prop="email">
                      <el-input prefix-icon="fa fa-envelope"
                                v-model="supplier.country"
                                type="country">
                      </el-input>
                    </el-form-item>
        </el-col>
        <!-- RIGHT COLUMN -->
        <el-col :span="12">

          <el-form-item prop="active">
            <template>
              <el-checkbox v-model="supplier.active">Ενεργό</el-checkbox>
            </template>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
      <el-row>
        <el-col style="text-align: right">
          <el-button type="success"
                     icon="fa fa-save"
                     @click="save"> Αποθήκευση </el-button>

          <el-button type="danger"
                     icon="fa fa-remove"
                     @click="confirmDelete"
                     :disabled="!isDeletable"> Διαγραφή </el-button>
        </el-col>
      </el-row>
    </el-card>
    <div slot="footer" class="dialog-footer card-footer">
      <el-button type="warning"
                 icon="el-icon-back"
                 @click="cancel"> Επιστροφή </el-button>
    </div>
  </el-dialog>
</template>
<script src="./SupplierVM.js"></script>

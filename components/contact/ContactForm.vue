<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :colon="false"
    class="contact-form"
  >
    <div>
      <div class="flex sm:space-x-6 sm:flex-row flex-col">
        <div class="w-full">
          <a-form-model-item ref="fullName" label="Full name" prop="fullName">
            <a-input
              v-model="form.fullName"
              @blur="
                () => {
                  $refs.fullName.onFieldBlur();
                }
              "
            />
          </a-form-model-item>
        </div>
        <div class="w-full ">
          <a-form-model-item ref="phoneNumber" label="Phone number" prop="phoneNumber">
            <a-input
              v-model="form.phoneNumber"
              @blur="
                () => {
                  $refs.phoneNumber.onFieldBlur();
                }
              "
            />
          </a-form-model-item>
        </div>
      </div>
      <a-form-model-item label="Message" prop="deliveryAddress">
        <a-input v-model="form.deliveryAddress" type="textarea" :auto-size="{minRows: 6, maxRows: 8 }" />
      </a-form-model-item>
    </div>
    <a-form-model-item>
      <div class="flex justify-center  my-5">
        <a-button class="bg-black h-11 px-8  text-white font-medium mt-4 hover:opacity-80" @click="onSubmit">
          SUBMIT
        </a-button>
      </div>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import { isValidUserName, isValidPhone } from '@/assets/validators.js'
export default {
  data () {
    return {
      visible: false,
      form: {
        fullName: '',
        phoneNumber: '',
        deliveryAddress: ''
      },
      rules: {
        fullName: [{
          required: true,
          trigger: 'blur',
          validator (rule, value, callback) {
            if (isValidUserName(value)) {
              callback()
            } else {
              callback(new Error('Invalid name'))
            }
          }
        }],
        deliveryAddress: [{ required: true, message: 'Please input activity form', trigger: 'blur' }],
        phoneNumber: [{
          required: true,
          trigger: 'blur',
          min: 9,
          validator (rule, value, callback) {
            if (isValidPhone(value)) {
              callback()
            } else {
              callback(new Error('Invalid phone number'))
            }
          }
        }]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log('ok')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
.contact-form{
    .ant-form-item-required{
            @apply text-black text-[1rem]
    }
}
</style>

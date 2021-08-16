<template>
  <div class="pwdcontainer">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input v-model="form.password" autocomplete="off" placeholder="8位以及8位以上，数字，大写字母，小写字母，特殊符号（不能是中文符号）上述4中，必须包含三种" style="width: 700px" />
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="repassword"
      >
        <el-input v-model="form.repassword" autocomplete="off" placeholder="8位以及8位以上，数字，大写字母，小写字母，特殊符号（不能是中文符号）上述4中，必须包含三种" style="width: 700px" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="send('form')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'EditPass',
  components: {},
  data() {
    return {
      form: {
        kw: '',
        password: '',
        repassword: ''
      },
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.form.kw = this.$route.query.kw
  },
  methods: {
    send(formName) {
      if (this.form.password !== this.form.repassword) {
        this.$message({
          type: 'error',
          message: '密码不一致'
        })
        return;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/ldapUserInfoPwd', this.form).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              if (this.$refs.form) {
                this.$refs.form.resetFields()
              }
            } else {
              this.$message({
                type: 'error',
                message: JSON.stringify(res.message)
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .pwdcontainer {
    width: 800px;
    padding: 100px;
  }
</style>

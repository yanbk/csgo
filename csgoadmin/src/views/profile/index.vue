<template>
  <div class="app-container">
    <div v-if="userinfo">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card :userinfo="userinfo" />
        </el-col>
        <el-col :span="18" :xs="24">
          <el-card>
            <div class="info"><span class="label">姓名：</span>{{ userinfo.username }}</div>
            <div class="info"><span class="label">手机：</span>{{ userinfo.phone }}</div>
            <div class="info"><span class="label">邮箱：</span>{{ userinfo.email }}</div>
            <el-button type="primary" class="updBtn" @click="editOwn">修改</el-button>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="修改"
      :visible.sync="dialog"
      width="30%"
    >
      <el-form ref="userForm" :model="userForm" :rules="rules" label-width="70px" class="demo-ruleForm">
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input v-model="userForm.password" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="phone"
        >
          <el-input v-model="userForm.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input v-model="userForm.email" autocomplete="off" />
        </el-form-item>
        <!-- <el-form-item
          label="权限"
          prop="role_name"
        >
          <el-radio-group v-model="userForm.role_name" @change="roleChange">
            <el-radio v-for="(item, index) in perms" :key="index" :label="item.slug">{{ item.slug }}</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submituserForm('userForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'

export default {
  name: 'Profile',
  components: { UserCard },
  data() {
    return {
      dialog: false,
      userForm: {
        email: '',
        phone: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        job: [
          { required: true, message: '请输入职位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'userinfo'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.userForm = {
        job: this.userinfo.job,
        email: this.userinfo.email,
        phone: this.userinfo.phone,
        password: this.userinfo.password
      }
    },
    editOwn() {
      this.dialog = true
      // this.$nextTick(() => {
      // })
    },
    submituserForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = { ...this.userForm, id: this.userinfo.id }
          this.$store.dispatch('user/updateOwnUser', data).then(res => {
            if (res.status === 200) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.$store.dispatch('user/getInfo')
            }
          })
          this.dialog = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
  .info{
    font-size: 16px;
    line-height: 30px;
  }
  .label{
    text-align: right;
    margin-right: 10px;
  }
  .updBtn{
    margin: 34px 0 10px;
  }
</style>

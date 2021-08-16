<template>
  <div class="user-container">
    <div class="searchbox">
      <el-select
        v-model="value"
        filterable
        remote
        clearable
        placeholder="请输入关键词"
        :remote-method="remoteMethod"
        :loading="loading"
        class="search"
        @change="selectChange"
        @clear="selectClear"
      >
        <el-option
          v-for="(item, index) in options"
          :key="item.id"
          :label="item.username"
          :value="index"
        >
          <div class="optionlist">
            <span>{{ item.username }}</span>
          </div>
        </el-option>
      </el-select>
    </div>
    <div class="userlist">
      <el-table
        :data="list"
        border
        style="width: 100%"
      >
        <el-col :span="4">
          <el-table-column
            fixed
            prop="id"
            label="ID"
            align="center"
          />
        </el-col>
        <el-col :span="4">
          <el-table-column
            prop="username"
            label="LDAP用户名"
            align="center"
          />
        </el-col>
        <el-col :span="4">
          <el-table-column
            prop="phone"
            label="手机号"
            align="center"
          />
        </el-col>
        <el-col :span="4">
          <el-table-column
            prop="email"
            label="邮箱"
            align="center"
          />
        </el-col>
        <el-col :span="4">
          <el-table-column
            v-if="(del_user && edit_user) || admin"
            fixed="right"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                size="small"
                @click.native.prevent="edituser(scope.$index, list)"
              >
                修改
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click.native.prevent="deluser(scope.$index, list)"
              >
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-col>
      </el-table>
      <el-pagination
        class="paginate"
        background
        layout="prev, pager, next"
        :total="total_items"
        :page-size="per_page"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
    <el-button v-if="add_user || admin" class="add-button" type="primary" @click="adduser">增加</el-button>
    <el-dialog
      title="增加"
      :visible.sync="dialog"
      :close-on-click-modal="false"
      width="30%"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item
          label="姓名"
          prop="username"
        >
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="phone"
          maxlength="11"
        >
          <el-input v-model="form.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input v-model="form.email" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitform('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="修改"
      :visible.sync="editdialog"
      :close-on-click-modal="false"
      width="30%"
    >
      <el-form ref="editform" :model="editform" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item
          label="姓名"
          prop="username"
        >
          <el-input v-model="editform.username" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="phone"
          maxlength="11"
        >
          <el-input v-model="editform.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input v-model="editform.email" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="分组"
          prop="groups"
        >
          <el-checkbox-group v-model="editform.groups" @change="groupChange">
            <el-checkbox v-for="item in groups" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submiteditform('editform')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'User',
  components: {},
  data() {
    return {
      defaultProps: {
        children: 'group',
        label: 'name'
      },
      dialog: false,
      editdialog: false,
      row: {},
      form: {
        username: '',
        phone: '',
        email: ''
      },
      editform: {
        username: '',
        phone: '',
        email: '',
        groups: []
      },
      rules: {
        username: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        // password: [
        //   { required: true, message: '请输入工号', trigger: 'blur' }
        // ],
        job: [
          { required: true, message: '请输入职位', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        groups: [
          { required: true, message: '请选择组', trigger: 'blur' }
        ]
      },
      loading: false,
      options: [],
      list: [],
      value: ''
    }
  },
  computed: {
    userlist() {
      return this.$store.state.user.userlist
    },
    total_pages() {
      return this.$store.state.user.total_pages
    },
    total_items() {
      return this.$store.state.user.total_items
    },
    per_page() {
      return this.$store.state.user.per_page
    },
    groups() {
      return this.$store.state.user.groups
    },
    add_user() {
      return this.$store.state.user.roles.indexOf('add_user') >= 0
    },
    edit_user() {
      return this.$store.state.user.roles.indexOf('edit_user') >= 0
    },
    del_user() {
      return this.$store.state.user.roles.indexOf('del_user') >= 0
    },
    admin() {
      return this.$store.state.user.roles.indexOf('admin') >= 0
    }
  },
  mounted: function() {
    this.$store.dispatch('user/userList', { page: 1 }).then(res => {
      // console.log(res)
      this.list = res.data.items
    })
  },
  methods: {
    deluser(index, rows) {
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('user/delUser', rows[index]).then(res => {
          // console.log(res)
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            rows.splice(index, 1)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    adduser() {
      this.dialog = true
    },
    edituser(index, rows) {
      this.row = JSON.parse(JSON.stringify(rows[index]))
      this.$store.dispatch('user/userInfo', this.row).then(res => {
        this.editdialog = true
        var arr = []
        for (let i = 0, len = res.data.group.length; i < len; i++) {
          if (res.data.group[i]['in_group'] === true) {
            arr.push(res.data.group[i]['id'])
          }
        }
        this.$nextTick(() => {
          this.editform = this.row
          this.$set(this.editform, 'groups', arr)
        })
      })
    },
    submitform(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/addUser', this.form).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '增加成功'
              })
              this.dialog = false
              this.$store.dispatch('user/userList', { page: 1 })
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
    },
    submiteditform(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.editform)
          this.$store.dispatch('user/editUser', this.editform).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.editdialog = false
              this.$store.dispatch('user/userList', { page: 1 })
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
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    groupChange(value) {
      console.log(value)
    },
    currentChange(e) {
      this.$store.dispatch('user/userList', { page: e }).then(res => {
        // console.log(res)
        this.list = res.data.items
      })
    },
    remoteMethod(val) {
      if (val !== '') {
        this.loading = true
        this.$store.dispatch('user/userAllList').then(res => {
          console.log(res)
          this.loading = false
          if (res.code === 0) {
            this.options = res.data.filter(item => {
              return item.username.toLowerCase().indexOf(val.toLowerCase()) > -1;
            });
          } else {
            this.$message({
              type: 'error',
              message: JSON.stringify(res.message)
            })
          }
        })
      }
    },
    selectChange(index) {
      console.log(this.options, index)
      this.list = [...[], this.options[index]]
    },
    selectClear() {
      this.list = this.userlist
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;
.el-input__suffix{
  right: 0;
}
.el-tree-node__content{
  height: 40px;
}
.el-tree-node__expand-icon{
  margin-left: 20px;
}
.el-tree-node.is-current>.el-tree-node__content{
  background: #304156;
  color: rgb(191, 203, 217);
}
.custom-tree-node{
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.el-tree-node.is-current>.el-tree-node__content .el-icon-more-right{
  display: block;
}
/* reset element-ui css */
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
$white: #fff;

.user-container {
  height: calc(100vh - 84px);
  width: 100%;
  background-color: $white;
  overflow: auto;
  display: flex;
  flex-direction: column;

  .searchbox{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
  .userlist{
    height: calc(100vh - 164px);
    overflow: auto;
    border-bottom: 1px solid #eee;
  }
  .paginate{
    text-align: center;
    margin-top: 50px;
  }
  .user-box{
    flex: 1;
    display: flex;
    border-top: 4px solid #efefef;
    .user-nav{
      width: 320px;
      display: flex;
      border-right: 1px solid #efefef;
    }
    .user-cont{
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: auto;
    }
  }
  .el-tree{
    width: 100%;
  }
  .el-icon-more-right{
    margin-right: 10px;
    display: none;
    color: #bfcbd9;
  }
  .el-icon-more-right i{
    margin: 0 5px;
  }
  .add-button{
    display: block;
    margin: 20px auto;
  }
}
</style>

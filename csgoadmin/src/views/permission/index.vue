<template>
  <div class="container">
    <div class="list">
      <el-table
        :data="listpermission"
        border
        style="width: 100%"
      >
        <el-col :span="4">
          <el-table-column
            prop="id"
            label="ID"
            align="center"
            fixed="left"
          />
        </el-col>
        <el-col :span="4">
          <el-table-column
            prop="name"
            label="权限名称"
            align="center"
          />
        </el-col>
        <el-col :span="4">
          <el-table-column
            prop="module_name"
            label="模块名称"
            align="center"
          />
        </el-col>
        <el-col :span="4">
          <el-table-column
            prop="describe"
            label="权限描述"
            align="center"
          />
        </el-col>
        <el-col :span="4">
          <el-table-column
            prop="url"
            label="对应路由"
            align="center"
          />
        </el-col>
        <el-col :span="4">
          <el-table-column
            v-if="(edit_permission && del_permission) || admin"
            fixed="right"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                size="small"
                type="primary"
                @click.native.prevent="editpermission(scope.$index, listpermission)"
              >
                修改
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click.native.prevent="deleteRow(scope.$index, listpermission)"
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
        :total="permission_total_items"
        :page-size="per_page"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
    <el-button v-if="add_permission || admin" class="add-button" type="primary" @click="addPermission">增加</el-button>
    <el-dialog
      title="增加"
      :visible.sync="addDialog"
      width="30%"
    >
      <el-form ref="addForm" :model="addForm" status-icon :rules="rules" label-width="120px" class="demo-form">
        <el-form-item label="权限名称(英文)" prop="name">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="对应路由" prop="url">
          <el-input v-model="addForm.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="模块选择" prop="module_id">
          <el-cascader
            v-model="addForm.module_id"
            :options="modules"
            :props="defaultProps"
            clearable
            placeholder="请选择"
            style="width: 100%"
            @change="select"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="权限描述" prop="describe">
          <el-input v-model="addForm.describe"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAddForm('addForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="修改"
      :visible.sync="editDialog"
      width="30%"
    >
      <el-form ref="editForm" :model="editForm" status-icon :rules="rules" label-width="120px" class="demo-form">
        <el-form-item label="权限名称(英文)" prop="name">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="对应路由" prop="url">
          <el-input v-model="editForm.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="模块选择" prop="module_id">
          <el-cascader
            v-model="editForm.module_id"
            :options="modules"
            :props="defaultProps"
            clearable
            placeholder="请选择"
            style="width: 100%"
            @change="select"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="权限描述" prop="describe">
          <el-input v-model="editForm.describe"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitEditForm('editForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Permission',
  components: {},
  data() {
    return {
      modules: [],
      addForm: {
        name: '',
        url: '',
        module_id: '',
        describe: ''
      },
      editForm: {
        name: '',
        url: '',
        module_id: '',
        describe: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入url', trigger: 'blur' }
        ],
        module_id: [
          { required: true, message: '请输入选择模块', trigger: 'blur' }
        ],
        describe: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      },
      addDialog: false,
      editDialog: false,
      defaultProps: {
        label: 'name',
        value: 'id',
        checkStrictly: true
      }
    }
  },
  computed: {
    listpermission() {
      return this.$store.state.admin.listpermission
    },
    permissioninfo() {
      return this.$store.state.admin.permissioninfo
    },
    listmodules() {
      return this.$store.state.admin.listmodules
    },
    groups() {
      return this.$store.state.user.groups
    },
    permission_total_items() {
      return this.$store.state.admin.permission_total_items
    },
    per_page() {
      return this.$store.state.admin.per_page
    },
    add_permission() {
      return this.$store.state.user.roles.indexOf('add_permission') >= 0
    },
    edit_permission() {
      return this.$store.state.user.roles.indexOf('edit_permission') >= 0
    },
    del_permission() {
      return this.$store.state.user.roles.indexOf('del_permission') >= 0
    },
    admin() {
      return this.$store.state.user.roles.indexOf('admin') >= 0
    }
  },
  created() {
    this.$store.dispatch('admin/listPermission')
  },
  mounted() {
    // console.log(this.$store.state.admin)
  },
  methods: {
    select(e) {
      this.$forceUpdate()
    },
    addPermission() {
      this.addDialog = true
      this.$store.dispatch('admin/dictModules').then(res => {
        this.modules = res.data
      })
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
    },
    submitAddForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.addForm.module_id)
          if (this.addForm.module_id === '') {
            this.addForm.module_id = 0
          } else {
            this.addForm.module_id = this.addForm.module_id[this.addForm.module_id.length - 1]
          }
          console.log(this.addForm)
          this.$store.dispatch('admin/addPermission', this.addForm).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '增加成功'
              })
              this.$store.dispatch('admin/listPermission')
            } else {
              this.$message({
                type: 'error',
                message: JSON.stringify(res.message)
              })
            }
          })
          this.addDialog = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitEditForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.editForm.module_id.length === 0) {
            this.editForm.module_id = 0
          } else {
            if (this.editForm.module_id[this.editForm.module_id.length - 1] === this.editForm.id) {
              if (this.editForm.module_id.length > 1) {
                this.editForm.module_id = this.editForm.module_id[this.editForm.module_id.length - 2]
              } else {
                this.editForm.module_id = 0
              }
            } else {
              this.editForm.module_id = this.editForm.module_id[this.editForm.module_id.length - 1]
            }
          }
          this.$store.dispatch('admin/editPermission', this.editForm).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.$store.dispatch('admin/listPermission')
            } else {
              this.$message({
                type: 'error',
                message: JSON.stringify(res.message)
              })
            }
          })
          this.editDialog = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    editpermission(index, rows) {
      this.editDialog = true
      this.$store.dispatch('admin/permissionInfo', { id: rows[index].id }).then(res => {
        console.log(res)
        this.modules = res.data.modules_dict
        this.$nextTick(() => {
          this.editForm = res.data.permission_info
          this.editForm.module_id = res.data.modules_selected
        })
      })
    },
    deleteRow(index, rows) {
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('admin/deletePermission', rows[index].id).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.$store.dispatch('admin/listPermission')
          } else {
            this.$message({
              type: 'error',
              message: JSON.stringify(res.message)
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    currentChange(e) {
      // console.log(e)
      this.$store.dispatch('admin/listPermission', { page: e })
    }
  }
}
</script>

<style lang='scss' scoped>
.container {
  height: calc(100vh - 84px);
  width: 100%;
  background-color: #fff;
  overflow: auto;
  display: flex;
  flex-direction: column;

  .list{
    height: calc(100vh - 164px);
    overflow: auto;
    border-bottom: 1px solid #eee;
  }
  .add-button{
    display: block;
    margin: 20px auto;
  }
  .paginate{
    text-align: center;
    margin-top: 50px;
  }
}
</style>

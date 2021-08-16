<template>
  <div class="container">
    <div class="tree-list">
      <div class="tree-cont">
        <el-tree
          ref="tree"
          :data="dictlistpermission"
          node-key="id"
          :default-expanded-keys="defaultExpand"
          accordion
          :props="defaultProps"
          highlight-current
          :render-content="renderContent"
          @node-click="handleNodeClick"
        >
        </el-tree>
      </div>
      <el-button type="primary" style="width: 100%" @click="addmodule(0)">增加模块</el-button>
    </div>
    <div class="cont">
      <div v-if="isShow == 1" style="margin-top: 20px; width: 500px">
        <el-form ref="moduleForm" :model="moduleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item
            label="模块名"
            prop="name"
          >
            <el-input v-model="moduleForm.name" autocomplete="off" />
          </el-form-item>
          <el-form-item v-if="!isHasModule" label="所属关系" prop="parent_id">
            <el-cascader
              v-model="moduleForm.parent_id"
              :options="modules"
              :props="defaultProps"
              clearable
              placeholder="请选择"
              style="width: 100%"
              @change="select"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitModuleForm('moduleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-else-if="isShow == 2" style="margin-top: 20px; width: 500px">
        <el-form ref="permissionForm" :model="permissionForm" status-icon :rules="rules" label-width="120px" class="demo-form">
          <el-form-item label="权限名称(英文)" prop="name">
            <el-input v-model="permissionForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="对应路由" prop="url">
            <el-input v-model="permissionForm.url" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item v-if="!isAddP" label="模块选择" prop="module_id">
            <el-cascader
              v-model="permissionForm.module_id"
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
            <el-input v-model="permissionForm.describe"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitPermissionForm('permissionForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      modules: [],
      isShow: 0,
      dictlistpermission: [],
      isAddM: false,
      isAddP: false,
      isHasModule: false,
      moduleForm: {
        id: '',
        name: '',
        parent_id: ''
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
      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id',
        checkStrictly: true
      },
      permissionForm: {
        name: '',
        url: '',
        module_id: '',
        describe: ''
      },
      defaultExpand: [1]
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.getMP()
  },
  methods: {
    select(e) {
      this.$forceUpdate()
    },
    getMP() {
      this.$store.dispatch('admin/permissionMouduleList').then(res => {
        // console.log(res)
        // this.groupForm.name = res.data.name
        this.dictlistpermission = res.data
        this.toName(this.dictlistpermission)
      })
    },
    renderContent(h, { node, data, store }) {
      if (node.data.parent_id >= 0) {
        return (
          <div slot-scope='{ node }' class='custom-tree-node'>
            <span>{ node.label }</span>
            <el-dropdown on-command={ this.handleCommand } class='drop'>
              <span class='el-dropdown-link' style='margin-right: 10px'>
                <i class='el-icon-arrow-down el-icon--right'></i>
              </span>
              <el-dropdown-menu slot='dropdown'>
                <el-dropdown-item command={this.beforeCommand(node, 'd')}>增加模块</el-dropdown-item>
                <el-dropdown-item command={this.beforeCommand(node, 'e')}>删除模块</el-dropdown-item>
                <el-dropdown-item command={this.beforeCommand(node, 'a')}>修改模块</el-dropdown-item>
                <el-dropdown-item command={this.beforeCommand(node, 'b')}>增加权限</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        )
      } else {
        return (
          <div slot-scope='{ node }' class='custom-tree-node'>
            <span>{ node.label }</span>
            <el-dropdown on-command={ this.handleCommand } class='drop'>
              <span class='el-dropdown-link' style='margin-right: 10px'>
                <i class='el-icon-arrow-down el-icon--right'></i>
              </span>
              <el-dropdown-menu slot='dropdown'>
                <el-dropdown-item command={this.beforeCommand(node, 'c')}>修改权限</el-dropdown-item>
                <el-dropdown-item command={this.beforeCommand(node, 'f')}>删除权限</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        )
      }
    },
    handleNodeClick(e) {
      console.log(e)
    },
    beforeCommand(data, command) {
      return {
        row: data,
        command: command
      }
    },
    handleCommand(command) {
      // console.log(command)
      this.defaultExpand = [command.row.data.id]
      switch (command.command) {
        case 'a':
          // this.moduleForm = JSON.parse(JSON.stringify(command.row.data))
          if (this.$refs.moduleForm) {
            this.$refs.moduleForm.resetFields()
          }
          this.isShow = 1
          this.isAddM = false
          this.isHasModule = false
          this.$store.dispatch('admin/modulesInfo', { id: command.row.data.id }).then(res => {
            // console.log(res)
            this.modules = res.data.modules_dict
            this.moduleForm = res.data.modules_info
            this.moduleForm.parent_id = res.data.modules_selected
          })
          break;
        case 'b':
          if (command.row.parent) {
            this.defaultExpand = [command.row.parent.data.id]
          }
          this.isShow = 2
          this.isAddP = true
          this.permissionForm.module_id = command.row.data.id
          if (this.$refs.permissionForm) {
            this.$refs.permissionForm.resetFields()
          }
          break;
        case 'c':
          this.isShow = 2
          this.isAddP = false
          this.$store.dispatch('admin/permissionInfo', { id: command.row.data.id }).then(res => {
            // console.log(res)
            this.modules = res.data.modules_dict
            this.$nextTick(() => {
              this.permissionForm = res.data.permission_info
              this.permissionForm.module_id = res.data.modules_selected
            })
          })
          break;
        case 'd':
          if (this.$refs.moduleForm) {
            this.$refs.moduleForm.resetFields()
          }
          this.addmodule(command.row.data.id)
          break;
        case 'e':
          this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$store.dispatch('admin/delModules', { id: command.row.data.id }).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
                this.getMP()
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
          break;
        case 'f':
          if (command.row.parent) {
            this.defaultExpand = [command.row.parent.data.id]
          }
          this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$store.dispatch('admin/deletePermission', { id: command.row.data.id }).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
                this.getMP()
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
          break;
      }
    },
    addmodule(e) {
      // this.$store.dispatch('admin/dictModules').then(res => {
      //   this.modules = res.data
      // })
      this.isShow = 1
      this.isAddM = true
      this.moduleForm.parent_id = e
      this.isHasModule = true
      if (this.$refs.moduleForm) {
        this.$refs.moduleForm.resetFields()
      }
    },
    toName(data) {
      for (let i = 0, len = data.length; i < len; i++) {
        if (data[i].children) {
          this.toName(data[i].children)
        } else {
          data[i].name = data[i].describe
        }
      }
    },
    submitModuleForm(formName) {
      console.log(this.moduleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isAddM) {
            this.$store.dispatch('admin/addModules', this.moduleForm).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: '增加成功'
                })
                this.$nextTick(() => {
                  this.$refs.moduleForm.resetFields()
                })
                this.getMP()
              } else {
                this.$message({
                  type: 'error',
                  message: JSON.stringify(res.message)
                })
              }
            })
          } else {
            if (this.moduleForm.parent_id[this.moduleForm.parent_id.length - 1] === this.moduleForm.id) {
              if (this.moduleForm.parent_id.length > 1) {
                this.moduleForm.parent_id = this.moduleForm.parent_id[this.moduleForm.parent_id.length - 2]
              } else {
                this.moduleForm.parent_id = 0
              }
            } else {
              this.moduleForm.parent_id = this.moduleForm.parent_id[this.moduleForm.parent_id.length - 1]
            }
            if (!this.moduleForm.parent_id) {
              this.moduleForm.parent_id = 0
            }
            this.$store.dispatch('admin/editModules', this.moduleForm).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                this.getMP()
                this.isShow = 0
              } else {
                this.$message({
                  type: 'error',
                  message: JSON.stringify(res.message)
                })
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitPermissionForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isAddP) {
            // console.log(this.permissionForm)
            this.$store.dispatch('admin/addPermission', this.permissionForm).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: '增加成功'
                })
                this.$refs.permissionForm.resetFields()
                this.getMP()
              } else {
                this.$message({
                  type: 'error',
                  message: JSON.stringify(res.message)
                })
              }
            })
          } else {
            if (this.permissionForm.module_id[this.permissionForm.module_id.length - 1] === this.permissionForm.id) {
              if (this.permissionForm.module_id.length > 1) {
                this.permissionForm.module_id = this.permissionForm.module_id[this.permissionForm.module_id.length - 2]
              } else {
                this.permissionForm.module_id = 0
              }
            } else {
              this.permissionForm.module_id = this.permissionForm.module_id[this.permissionForm.module_id.length - 1]
            }
            this.$store.dispatch('admin/editPermission', this.permissionForm).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                this.getMP()
                this.isShow = 0
              } else {
                this.$message({
                  type: 'error',
                  message: JSON.stringify(res.message)
                })
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.container{
  display: flex;
  .tree-list{
    width: 420px;
    height: calc(100vh - 84px);
    overflow: auto;
    .tree-cont{
      height: calc(100vh - 126px);
      margin-left: 20px;
      padding-top: 20px;
      overflow: auto;
      /deep/ .el-tree{
        .el-tree-node__content{
          height: 30px;
          .custom-tree-node{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            .drop{
              display: none;
            }
          }
          .custom-tree-node:hover .drop{
            display: block;
          }
        }
      }
    }
  }
  .cont{
    flex: 1;
    height: calc(100vh - 126px);
    padding: 0 50px;
    overflow: auto;
    border-left: 1px solid #efefef;
  }
}
</style>

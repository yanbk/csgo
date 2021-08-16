<template>
  <div class="group-container">
    <!-- <div class="search-container">
      <el-input v-model="searchText" placeholder="请输入内容">
        <el-button slot="suffix" icon="el-icon-search" />
      </el-input>
    </div> -->
    <div class="group-box">
      <div class="group-nav">
        <el-menu
          class="el-menu-vertical-demo"
          @select="handleselect"
        >
          <el-menu-item v-for="item in groupslist" :key="item.id.toString()" :index="item.id.toString()" :disabled="(item.id == 1 || item.id == 2) ? true : false">
            <div>
              <i class="el-icon-folder"></i>
              <span>{{ item.name }}</span>
            </div>
            <el-button v-if="groups_del || admin" size="mini" :disabled="(item.id == 1 || item.id == 2) ? true : false" @click.stop="delgroup(item)">删除</el-button>
          </el-menu-item>
        </el-menu>
        <el-button v-if="groups_add || admin" type="primary" @click="addgroup">增加</el-button>
      </div>
      <div class="group-cont">
        <!-- <div v-for="(index, key, value) in groupsinfo" :key="index">{{ key }}{{ value }}</div> -->
        <div v-if="isAdd" class="add-group">
          <el-form ref="groupForm" :model="groupForm" :rules="rules" label-width="70px" class="demo-ruleForm">
            <el-form-item
              label="名称："
              prop="name"
            >
              <el-input v-model="groupForm.name" autocomplete="off" />
            </el-form-item>
            <div style="display: flex;">
              <el-form-item
                label="权限："
                style="width: 400px"
              >
                <el-tree
                  ref="tree"
                  v-model="groupForm.permissions"
                  :data="dictlistpermission"
                  show-checkbox
                  node-key="id"
                  :default-checked-keys="checkedKeys"
                  :props="defaultProps"
                  @check="handleCheck"
                >
                </el-tree>
              </el-form-item>
              <el-form-item
                label="组成员："
                style="width: 715px;"
              >
                <el-transfer
                  v-model="groupForm.users_id_list"
                  :data="users"
                  filterable
                  :titles="['所有成员', '组成员']"
                  :button-texts="['移除', '添加']"
                  :filter-method="filterUser"
                  :props="{
                    key: 'id',
                    label: 'username',
                    value: 'id'
                  }"
                  filter-placeholder="请输入用户名"
                  @change="transferChange"
                >
                </el-transfer>
              </el-form-item>
            </div>
            <el-form-item>
              <el-button v-if="(groups_edit && groups_add) || admin" type="primary" @click="submitgroupform('groupForm')">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Group',
  components: {},
  data() {
    return {
      checkedKeys: [],
      checks: [],
      id: '',
      addpermission: {},
      dictlistpermission: [],
      groupForm: {
        name: '',
        permissions: [],
        users_id_list: []
      },
      isAdd: false,
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        permissions: [
          { required: true, message: '请选择权限', trigger: 'blur' }
        ]
      },
      isUpdate: false,
      groupname: '',
      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      users: []
    }
  },
  computed: {
    groupslist() {
      return this.$store.state.group.groupslist
    },
    groupsinfo() {
      return this.$store.state.group.groupsinfo
    },
    groups_add() {
      return this.$store.state.user.roles.indexOf('groups_add') >= 0
    },
    groups_edit() {
      return this.$store.state.user.roles.indexOf('groups_edit') >= 0
    },
    groups_del() {
      return this.$store.state.user.roles.indexOf('groups_del') >= 0
    },
    admin() {
      return this.$store.state.user.roles.indexOf('admin') >= 0
    }
  },
  created: function() {
    this.$store.dispatch('group/groupsList')
    this.$store.dispatch('user/userAllList').then(res => {
      // console.log(res)
      if (res.code === 0) {
        this.users = res.data
      }
    })
  },
  methods: {
    handleselect(key) {
      // console.log(key);
      this.id = key
      this.isAdd = true
      this.isUpdate = true
      this.$store.dispatch('group/groupsInfo', { id: key }).then(res => {
        // console.log(res)
        this.groupForm.name = res.data.name
        this.dictlistpermission = res.data.permissions
        this.groupForm.permissions = res.data.permissions_id
        this.toName(this.dictlistpermission)
        this.checkedKeys = res.data.permissions_id
        // this.$refs.tree.setCheckedKeys(res.data.permissions_id)

        this.groupForm.users_id_list = []
        res.data.users.forEach(item => {
          this.groupForm.users_id_list.push(item.id)
        });
      })
    },
    addgroup() {
      this.isAdd = true
      this.isUpdate = false
      this.$store.dispatch('admin/dictListPermission').then(res => {
        this.dictlistpermission = res.data
        this.toName(this.dictlistpermission)
      })
      this.checkedKeys = []
      if (this.$refs.groupForm) {
        this.$refs.groupForm.resetFields()
      }
    },
    submitgroupform(formName) {
      // console.log(this.groupForm, this.isUpdate)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.isUpdate) {
            this.$store.dispatch('group/groupsAdd', this.groupForm).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: '增加成功'
                })
                this.isAdd = false
                this.$store.dispatch('group/groupsList')
              } else {
                this.$message({
                  type: 'error',
                  message: JSON.stringify(res.message)
                })
              }
            })
          } else {
            var data = { id: this.id, ...this.groupForm }
            console.log(data)
            this.$store.dispatch('group/groupsEdit', data).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                this.$store.dispatch('group/groupsList')
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    addCheckboxChange(e) {
      // console.log(this.addpermission)
      var arr = [];
      for (var key in this.addpermission) {
        arr.push(key)
      }
      this.$set(this.groupForm, 'permissions', arr)
    },
    editCheckboxChange() {
      // console.log(this.editpermission)
      this.isUpdate = true
    },
    delgroup(data) {
      // console.log(data)
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('group/groupsDel', data).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.$store.dispatch('group/groupsList')
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
    handleCheck() {
      this.checks = []
      this.$refs.tree.getCheckedNodes(true, false).map((item) => {
        this.checks.push(item.id)
      })
      // console.log(this.checks)
      this.groupForm.permissions = this.checks
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
    filterUser(query, item) {
      return item.username.indexOf(query) > -1;
    },
    transferChange(e) {
      // console.log(e)
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

.group-container {
  min-height: calc(100vh - 84px);
  width: 100%;
  background-color: $white;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .search-container{
    height: 60px;
    background: #efefef;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .el-input{
      width: 300px;
      margin-left: 10px;
    }
    .el-input__suffix{
      right: 0;
    }
  }
  .group-box{
    flex: 1;
    display: flex;
    border-top: 4px solid #efefef;
    .group-nav{
      width: 320px;
      height: calc(100vh - 90px);
      display: flex;
      flex-direction: column;
      border-right: 1px solid #efefef;
      overflow: auto;

      .el-menu-vertical-demo{
        width: 100%;
        height: calc(100vh - 126px);
        overflow: scroll;
      }
      &::-webkit-scrollbar{
        width:2px;
        background-color: #efefef;
      }
      &::-webkit-scrollbar-thumb{
        background-color: #d8dce5;
      }
      .el-menu-item{
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .group-cont{
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: auto;
      height: calc(100vh - 126px);
      position: relative;

      .edit-button{
        width: auto;
        position: absolute;
        left: 50px;
        top: 10px;
      }
      .send-button{
        width: auto;
        position: absolute;
        left: 50px;
        top: 10px;
      }
      .add-group{
        padding: 50px;
        overflow: auto;
      }
      .edit-group{
        margin: 50px 50px;
        overflow: auto;

        &::-webkit-scrollbar{
        width:2px;
        background-color: #efefef;
        }
        &::-webkit-scrollbar-thumb{
          background-color: #d8dce5;
        }
        .module{
          font-size: 14px;
          color: #666;
          line-height: 40px;
        }
        .module span{
          color: #1890ff;
        }
        .groupname{
          font-size: 14px;
          color: #666;
        }
        .groupname .el-input{
          width: auto;
        }
        .permission-list{
          width: 260px;
          float: left;
          margin-right: 60px;
          margin-bottom: 10px;
        }
        .permission-list span{
          font-size: 14px;
          color: #666;
        }
      }
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
    margin: 20px auto 0;
  }
  .el-autocomplete{
    display: block;
  }
  .my-autocomplete {
    li {
      line-height: normal;
      padding: 7px;

      .name {
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .addr {
        font-size: 12px;
        color: #b4b4b4;
      }

      .highlighted .addr {
        color: #ddd;
      }
    }
  }
  /deep/ .el-tree-node.is-current>.el-tree-node__content{
    background: #efefef;
    color: #606266;
  }
}
</style>

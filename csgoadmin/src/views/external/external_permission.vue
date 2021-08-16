<template>
  <div class="container">
    <div style="margin: 15px">
      <el-button type="primary" size="small" @click="add(0)">新增</el-button>
    </div>
    <div class="list">
      <el-table
        ref="table"
        :data="list"
        border
        row-key="id"
        stripe
        style="width: 100%; overflow: auto"
        height="calc(100vh - 147px)"
      >
        <!-- <el-table-column
          prop="id"
          fixed="left"
          label="ID"
          align="center"
        >
        </el-table-column> -->
        <el-table-column
          prop="describe"
          fixed="left"
          label="展示名称"
          width="240px"
        >
          <template slot-scope="scope"><span :style="scope.row.is_permissions ? 'color: #aaa' : scope.row.parent_id == 0 ? 'color: #010080; font-weight: bold' : 'color: #8d4312'">{{ scope.row.describe }}{{ scope.row.is_permissions ? '(权限)' : '' }}</span></template>
        </el-table-column>
        <el-table-column
          prop="front_url_name"
          label="路由名称"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="front_url_path"
          label="路由path"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="is_show"
          label="是否隐藏"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.is_permissions ? '' : scope.row.is_show ? '隐藏' : '显示' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="is_keep_alive"
          label="KeepAlive"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.is_permissions ? '' : scope.row.is_keep_alive }}
          </template>
        </el-table-column>
        <el-table-column
          prop="parent_id"
          label="父节点"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="file_path"
          label="文件路径"
          align="center"
          width="200px"
        >
        </el-table-column>
        <el-table-column
          prop="image"
          label="图标"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="权限name"
          width="200px"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="url"
          label="后端权限url"
          width="200px"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          width="100px"
        >
          <template slot-scope="scope">
            <el-popover
              placement="left"
              width="60"
              trigger="click"
            >
              <div style="margin-bottom: 5px; text-align: center"><el-button v-if="!scope.row.is_permissions && (!scope.row.children || (scope.row.children && !scope.row.children[0].is_permissions))" type="primary" size="small" @click="add(scope.row.id)">添加菜单</el-button></div>
              <div style="margin-bottom: 5px; text-align: center"><el-button v-if="!scope.row.is_permissions && (!scope.row.children || (scope.row.children && scope.row.children[0].is_permissions))" type="primary" size="small" @click="addChild(scope.row)">添加权限</el-button></div>
              <div style="margin-bottom: 5px; text-align: center"><el-button v-if="scope.row.children && scope.row.children[0].is_permissions" type="primary" size="small" @click="copy(scope.row, $event)">复制权限</el-button></div>
              <div style="margin-bottom: 5px; text-align: center"><el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button></div>
              <div style="margin-bottom: 5px; text-align: center"><el-button type="danger" size="small" @click="del(scope.row)">删除</el-button></div>
              <el-button slot="reference" type="primary" size="small">操作</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="isAdd == true ? '增加' : '修改'"
      :visible.sync="dialog"
      :close-on-click-modal="false"
      width="1000px"
    >
      <el-form ref="form" :model="form" :inline="true" :rules="rules" label-width="120px">
        <el-form-item v-if="isPermissions" label="路由名称" prop="name">
          <el-input v-model="form.name" autocomplete="off" placeholder="" />
        </el-form-item>
        <el-form-item v-if="isPermissions" label="后端对应路由" prop="url">
          <el-input v-model="form.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="!isPermissions" label="父节点Id" prop="parent_id">
          <el-input v-model="form.parent_id" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="展示名称" prop="describe">
          <el-input v-model="form.describe"></el-input>
        </el-form-item>
        <el-form-item v-if="!isPermissions" label="前端路由path" prop="front_url_path">
          <el-input v-model="form.front_url_path" size="small"></el-input>
        </el-form-item>
        <el-form-item v-if="!isPermissions" label="图标" prop="image">
          <el-select v-model="form.image" filterable clearable size="small" style="width: 184px">
            <el-option v-for="item in svgIcons" :key="item" :label="item" :value="item"><svg-icon :icon-class="item" class-name="disabled" style="margin-right: 10px" />{{ item }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="!isPermissions" label="前端路由name" prop="front_url_name" :rules="form.parent_id == 0 ? null : [{ required: true, message: '请输入', trigger: 'blur' }]">
          <el-input v-model="form.front_url_name" size="small" placeholder="首字母大写"></el-input>
        </el-form-item>
        <el-form-item v-if="!isPermissions" label="是否隐藏" prop="is_show">
          <el-select v-model="form.is_show" size="small" style="width: 184px">
            <el-option label="否" :value="false"></el-option>
            <el-option label="是" :value="true"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="!isPermissions" label="文件路径" prop="file_path">
          <el-input v-model="form.file_path" size="small"></el-input>
        </el-form-item>
        <el-form-item v-if="!isPermissions" label="排序标记" prop="sort">
          <el-input v-model.number="form.sort" size="small"></el-input>
        </el-form-item>
        <el-form-item v-if="!isPermissions" label="keepAlive" prop="is_keep_alive">
          <el-select v-model="form.is_keep_alive" size="small" style="width: 184px">
            <el-option label="否" :value="false"></el-option>
            <el-option label="是" :value="true"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item v-if="!isPermissions" label="是否自动关闭tab" prop="is_close_tab">
          <el-select v-model="form.is_close_tab" size="small" style="width: 184px">
            <el-option label="否" :value="false"></el-option>
            <el-option label="是" :value="true"></el-option>
          </el-select>
        </el-form-item> -->
        <div v-if="!isPermissions">
          <el-button type="primary" size="small" style="margin-bottom: 15px" @click="addParams">新增菜单参数</el-button>
        </div>
        <div v-if="!isPermissions">
          <div class="params">
            <span>参数类型</span>
            <span>参数key</span>
            <span>参数值</span>
          </div>
          <div v-for="(item, index) in form.table_params" :key="item.random" style="margin-bottom: 10px">
            <el-select v-model="item.type" size="small" style="width: 200px">
              <el-option label="query" value="query"></el-option>
              <el-option label="params" value="params"></el-option>
            </el-select>
            <el-input v-model="item.param_key" size="small" style="width: 200px; margin-left: 10px"></el-input>
            <el-input v-model="item.param_value" size="small" style="width: 200px; margin-left: 10px"></el-input>
            <el-button type="danger" size="small" style="margin-left: 10px" @click="delParams(index)">删除</el-button>
          </div>
        </div>
        <div style="margin: 30px 0 0 20px">
          <el-button type="primary" size="small" @click="submitForm('form')">提交</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog
      title="增加"
      :visible.sync="perDialog"
      :close-on-click-modal="false"
      width="1050px"
    >
      <el-form inline label-width="120px">
        <el-form-item label="粘贴路由">
          <el-input v-model="inputPermission" type="textarea" autocomplete="off" placeholder="没有复制，就不要使用此粘贴，以防出错" style="width: 500px;" @change="inputPermissionChange" />
        </el-form-item>
        <div style="margin-left: 0px; margin-bottom: 20px">
          <el-divider content-position="left"><el-button type="primary" size="small" @click="addPermission">增加路由列表</el-button></el-divider>
        </div>
        <div v-for="(item, index) in permissions" :key="index">
          <el-form-item label="路由名称">
            <el-input v-model="item.name" autocomplete="off" placeholder="" />
          </el-form-item>
          <el-form-item label="后端对应路由">
            <el-input v-model="item.url" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="展示名称">
            <el-input v-model="item.describe"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-if="index > 0" type="text" @click="delPermission(index)">删除</el-button>
          </el-form-item>
        </div>
        <div style="margin: 30px 0 0 20px">
          <el-button type="primary" size="small" @click="submitPermission">提交</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  newExternalAuthPermissionList,
  newExternalAuthPermissionAdd,
  newExternalAuthPermissionEdit,
  newExternalAuthPermissionDel
} from '@/api/external'
import svgIcons from '@/views/icons/svg-icons'
import clip from '@/utils/clipboard'
export default {
  name: 'WarningLog',
  components: {},
  data() {
    return {
      list: [],
      total: 0,
      per_page: 10,
      page: 1,
      perPage: [
        { label: '10条', value: 10 },
        { label: '20条', value: 20 },
        { label: '50条', value: 50 },
        { label: '100条', value: 100 }
      ],
      isAdd: false,
      dialog: false,
      perDialog: false,
      form: {
        name: '',
        url: '',
        parent_id: '',
        describe: '',
        front_url_name: '',
        front_url_path: '',
        file_path: '',
        is_show: false,
        image: '',
        sort: '',
        is_keep_alive: false,
        is_close_tab: false,
        table_params: []
      },
      permissions: [
        {
          name: '',
          url: '',
          describe: '',
          is_permissions: true
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        describe: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        // front_url_name: [
        //   { required: true, message: '请输入', trigger: 'blur' }
        // ],
        front_url_path: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      },
      isPermissions: false,
      svgIcons: svgIcons,
      parentId: '',
      inputPermission: ''
    }
  },
  computed: {
    userinfo() {
      return this.$store.getters.userinfo
    }
  },
  watch: {},
  mounted() {
    this.getList()
    // console.log(this.$route)
  },
  methods: {
    select(e) {
      this.$forceUpdate()
    },
    getList() {
      newExternalAuthPermissionList({ id: this.$route.query.id }).then(res => {
        // console.log(res)
        // this.groupForm.name = res.data.name
        this.list = res.data.permission_tree
      })
    },
    copy(row, event) {
      clip(JSON.stringify(row.children), event)
    },
    addPermission() {
      this.permissions.push({
        name: '',
        url: '',
        describe: '',
        is_permissions: true
      })
    },
    delPermission(index) {
      this.permissions.splice(index, 1)
    },
    add(id) {
      this.dialog = true
      this.isAdd = true
      this.isPermissions = false
      this.form = {
        name: '',
        url: '',
        parent_id: id,
        describe: '',
        front_url_name: '',
        front_url_path: '',
        file_path: '',
        is_show: false,
        image: '',
        sort: '',
        is_keep_alive: false,
        is_close_tab: false,
        table_params: []
      }
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
    },
    edit(row) {
      this.dialog = true
      this.isAdd = false
      this.form = JSON.parse(JSON.stringify(row))
      this.isPermissions = this.form.is_permissions
    },
    del(row) {
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        newExternalAuthPermissionDel({ external_auth_id: this.$route.query.id, primary_id: row.primary_id }).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getList()
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
    addChild(row) {
      // console.log(row)
      this.perDialog = true
      this.isAdd = true
      this.isPermissions = true
      this.parentId = row.id
      this.permissions = [
        {
          name: '',
          url: '',
          describe: '',
          is_permissions: true
        }
      ]
      this.inputPermission = ''
    },
    submitPermission() {
      this.permissions.map(ele => {
        ele.parent_id = this.parentId
      })
      newExternalAuthPermissionAdd(this.permissions, this.$route.query.id).then(res => {
        this.perDialog = false
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '增加成功'
          })
          this.getList()
        } else {
          this.$message({
            type: 'error',
            message: JSON.stringify(res.message)
          })
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialog = false
          if (this.isAdd) {
            newExternalAuthPermissionAdd({ ...this.form, is_permissions: this.isPermissions }, this.$route.query.id).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: '增加成功'
                })
                this.getList()
              } else {
                this.$message({
                  type: 'error',
                  message: JSON.stringify(res.message)
                })
              }
            })
          } else {
            // console.log(this.form)
            if (this.form.children) delete this.form.children
            newExternalAuthPermissionEdit({ ...this.form, external_auth_id: this.$route.query.id, is_permissions: this.isPermissions }).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                this.getList()
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
    addParams() {
      this.form.table_params.push({
        type: '',
        param_key: '',
        param_value: '',
        random: new Date().getTime()
      })
    },
    delParams(index) {
      // console.log(index)
      this.form.table_params.splice(index, 1)
    },
    inputPermissionChange(e) {
      if (e === '') {
        return
      }
      var permission = JSON.parse(e)
      permission.map(ele => {
        ele.parent_id = this.parentId
      })
      this.permissions = permission
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
    height: calc(100vh - 84px);
    overflow: auto;
    border-bottom: 1px solid #eee;
  }
  .add-button{
    margin-right: 0px;
  }
  .paginate{
    text-align: center;
    margin: 20px auto;
  }
  .params{
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
  }
  .params span{
    display: inline-block;
    margin: 0 160px 10px 0px;
  }
}
</style>

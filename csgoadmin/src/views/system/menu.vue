<template>
  <div class="container">
    <div style="margin: 15px">
      <el-button type="primary" size="small" @click="add()">新增</el-button>
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
        <el-table-column
          prop="id"
          label="ID"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="show_name"
          label="展示名称"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="url_name"
          label="路由名称"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="url_path"
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
            {{ scope.row.is_show ? '隐藏' : '显示' }}
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
          label="操作"
          align="center"
          width="250px"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="addChild(scope.row)">添加子菜单</el-button>
            <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="del(scope.row)">删除</el-button>
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
      <el-form ref="form" :model="form" :inline="true" :rules="rules" label-width="100px">
        <el-form-item label="路由名称" prop="url_name">
          <el-input v-model="form.url_name" size="small" placeholder="首字母大写"></el-input>
        </el-form-item>
        <el-form-item label="路由path" prop="url_path">
          <el-input v-model="form.url_path" size="small"></el-input>
        </el-form-item>
        <el-form-item label="是否隐藏" prop="is_show">
          <el-select v-model="form.is_show" size="small" style="width: 184px">
            <el-option label="否" :value="false"></el-option>
            <el-option label="是" :value="true"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="父节点Id" prop="parent_id">
          <el-input v-model="form.parent_id" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="文件路径" prop="file_path">
          <el-input v-model="form.file_path" size="small"></el-input>
        </el-form-item>
        <el-form-item label="展示名称" prop="show_name">
          <el-input v-model="form.show_name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="image">
          <el-input v-model="form.image" size="small"></el-input>
        </el-form-item>
        <el-form-item label="排序标记" prop="sort">
          <el-input v-model="form.sort" size="small"></el-input>
        </el-form-item>
        <el-form-item label="keepAlive" prop="is_keep_alive">
          <el-select v-model="form.is_keep_alive" size="small" style="width: 184px">
            <el-option label="否" :value="false"></el-option>
            <el-option label="是" :value="true"></el-option>
          </el-select>
        </el-form-item>
        <div style="margin-left: 100px">
          <el-button type="primary" size="small" @click="submitForm('form')">提交</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
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
      form: {
        url_name: '',
        url_path: '',
        is_show: false,
        parent_id: 0,
        file_path: '',
        show_name: '',
        image: '',
        sort: '',
        is_keep_alive: false,
        is_close_tab: false,
        table_params: []
      },
      rules: {
        url_name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        url_path: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        file_path: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        show_name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      }
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
  },
  methods: {
    select(e) {
      this.$forceUpdate()
    },
    getList() {
      this.$store.dispatch('admin/tableManageList').then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.list = res.data
        }
      })
    },
    add() {
      this.dialog = true
      this.isAdd = true
      this.form = {
        url_name: '',
        url_path: '',
        is_show: false,
        parent_id: 0,
        file_path: '',
        show_name: '',
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
    },
    del(row) {
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('admin/tableManageDel', { id: row.id }).then(res => {
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
      this.dialog = true
      this.isAdd = true
      this.form = {
        url_name: '',
        url_path: '',
        is_show: false,
        parent_id: row.id,
        file_path: '',
        show_name: '',
        image: '',
        sort: '',
        is_keep_alive: false,
        is_close_tab: false,
        table_params: []
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            // this.form.money = parseFloat(this.form.money).toFixed(2)
            console.log(this.form)
            this.$store.dispatch('admin/tableManageAdd', this.form).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: '增加成功'
                })
                this.dialog = false
                this.getList()
              } else {
                this.$message({
                  type: 'error',
                  message: JSON.stringify(res.message)
                })
              }
            })
          } else {
            console.log(this.form)
            this.$store.dispatch('admin/tableManageEdit', this.form).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                this.dialog = false
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
}
</style>

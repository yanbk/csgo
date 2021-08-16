<template>
  <div class="container">
    <div class="list">
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
            prop="name"
            label="项目名称"
            align="center"
          />
        </el-col>
        <el-col :span="4">
          <el-table-column
            prop="user_list"
            label="管理人员"
            align="center"
          />
        </el-col>
        <el-col :span="4">
          <el-table-column
            label="状态"
            align="center"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                active-color="#13ce66"
                inactive-color="#DCDFE6"
                disabled
              >
              </el-switch>
            </template>
          </el-table-column>
        </el-col>
        <el-col :span="4">
          <el-table-column
            prop="update_time"
            label="时间"
            align="center"
          />
        </el-col>
        <el-col :span="4">
          <el-table-column
            prop="feature"
            label="备注"
            align="center"
          />
        </el-col>
        <el-col :span="4">
          <el-table-column
            prop="app_token"
            label="token"
            align="center"
          />
        </el-col>
        <el-col :span="4">
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="200px"
          >
            <template slot-scope="scope">
              <el-button
                size="small"
                type="primary"
                @click.native.prevent="look(scope.row.id)"
              >
                菜单查看
              </el-button>
              <el-button
                size="small"
                type="primary"
                @click.native.prevent="lookData(scope.row.id)"
              >
                类目查看
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
  </div>
</template>

<script>
import {
  newExternalAuthUserList
} from '@/api/external'
export default {
  name: 'ExternalUser',
  components: {},
  data() {
    return {
      list: [],
      per_page: 10,
      total_items: 0,
      page: 1,
      all_user: []
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      newExternalAuthUserList({ page: this.page }).then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.list = res.data.items
          this.total_items = res.data._meta.total_items
          this.per_page = res.data._meta.per_page
        }
      })
    },
    look(id) {
      this.$router.push({
        path: '/external/external_permission',
        query: {
          id: id
        }
      })
    },
    lookData(id) {
      this.$router.push({
        path: '/external/extral_class',
        query: {
          id: id
        }
      })
    },
    currentChange(e) {
      this.page = e
      this.getList()
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
    display: block;
    margin: 20px auto;
  }
  .paginate{
    text-align: center;
    margin-top: 50px;
  }
}
</style>

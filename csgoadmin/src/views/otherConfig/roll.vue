<template>
  <div class="container">
    <div class="btns">
      <el-button type="primary" size="small" @click="add">添加roll房</el-button>
    </div>
    <el-table
      :data="tableData"
      height="calc(100vh - 220px)"
    >
      <el-table-column label="roll房名称" prop="rollname"></el-table-column>
      <el-table-column label="roll房简介" prop="description"></el-table-column>
      <el-table-column label="roll房密码" prop="rollpasswd"></el-table-column>
      <el-table-column label="roll房图片" prop="rollimg"></el-table-column>
      <el-table-column label="进入充值门槛" prop="in_limit"></el-table-column>
      <el-table-column label="操作" prop="" width="160">
        <template slot-scope="{ row }">
          <el-button type="primary" size="small" @click="edit(row)">编辑</el-button>
          <el-button type="danger" size="small" @click="del(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="border-top: 1px solid #999; padding-top: 10px; text-align: center">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog
      :title="isAdd ? '增加' : '编辑'"
      :visible.sync="dialog"
      :close-on-click-modal="false"
      width="1000px"
    >
      <el-dialog
        width="700px"
        title="道具配置"
        :visible.sync="itemDialog"
        append-to-body
      >
        <el-form :model="itemForm" inline label-width="100px">
          <el-form-item label="道具类型">
            <el-select v-model="itemForm.type" clearable size="small">
              <el-option v-for="item in searchtype.WPType" :key="item.id" :label="item.name" :value="item.searchKey"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品质">
            <el-select v-model="itemForm.rarity" clearable size="small">
              <el-option v-for="item in searchtype.Rarity" :key="item.id" :label="item.name" :value="item.searchKey"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="质量">
            <el-select v-model="itemForm.quality" clearable size="small">
              <el-option v-for="item in searchtype.Quality" :key="item.id" :label="item.name" :value="item.searchKey"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="外观">
            <el-select v-model="itemForm.exterior" clearable size="small">
              <el-option v-for="item in searchtype.Exterior" :key="item.id" :label="item.name" :value="item.searchKey"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收藏品">
            <el-cascader
              v-model="itemSetValue"
              clearable
              size="small"
              :options="itemSet"
              :props="{ label: 'name', value: 'searchKey' }"
              @change="itemSetChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="最大价格">
            <el-input v-model="itemForm.maxPrice" size="small" style="width: 194px"></el-input>
          </el-form-item>
          <el-form-item label="最小价格">
            <el-input v-model="itemForm.minPrice" size="small" style="width: 194px"></el-input>
          </el-form-item>
          <el-form-item label="关键字">
            <el-input v-model="itemForm.keyword" size="small" style="width: 194px"></el-input>
          </el-form-item>
          <div style="text-align: center; margin: 10px 0">
            <el-button type="primary" size="small" @click="boxitemsearch">查询</el-button>
          </div>
        </el-form>
        <div v-if="boxItemTotal > 0" class="box-items">
          <div v-for="item in searchList" :key="item.itemId" class="box-item-wrap">
            <img :src="item.imageUrl" alt="">
            <div class="item-list-desc">
              <p>{{ item.itemName }}</p>
              <p>类型：{{ item.typeName }}</p>
              <p>稀有度：{{ item.qualityName }}</p>
            </div>
            <div class="item-list-price">
              <p>在售数量 {{ item.quantity }}</p>
              <p>最低售价 ${{ item.price }}</p>
            </div>
            <el-button type="primary" size="small" @click="saveConfigBtn(item)">配置</el-button>
          </div>
          <div style="text-align: center; margin-top: 15px">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="boxItemTotal"
              @current-change="currentChange"
            >
            </el-pagination>
          </div>
        </div>
      </el-dialog>
      <el-dialog
        width="600px"
        title="添加金币"
        :visible.sync="itemInnerDialog"
        append-to-body
      >
        <el-form :model="goldConfig" :rules="rules" label-width="120px">
          <el-form-item label="金币数量" prop="gold">
            <el-input v-model="goldConfig.gold" size="small"></el-input>
            （金币在roll房道具列表中，固定排在列表最后，按从大到小排列）
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="addgoldConfig">保存道具</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-form ref="form" :model="form" :rules="rules" inline label-width="120px" class="demo-ruleForm">
        <el-form-item
          label="roll房名称"
          prop="rollname"
        >
          <el-input v-model="form.rollname" size="small" autocomplete="off" />
        </el-form-item>
        <!-- <el-form-item
          label="封面道具名"
          prop="facename"
        >
          <el-upload
            action=""
            list-type="picture-card"
            :limit="1"
            :auto-upload="false"
            :file-list="fileList"
            :on-change="fileChange"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
              >
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
        </el-form-item> -->
        <el-form-item
          label="roll房简介"
          prop="description"
        >
          <el-input v-model="form.description" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="roll房密码"
          prop="rollpasswd"
        >
          <el-input v-model="form.rollpasswd" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="roll房图片"
          prop="rollimg"
        >
          <el-input v-model="form.rollimg" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="进入充值门槛"
          prop="in_limit"
        >
          <el-input v-model="form.in_limit" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="人数上限"
          prop="member_limit"
        >
          <el-input v-model="form.member_limit" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="roll房开启时间"
          prop="open_time"
        >
          <el-date-picker
            v-model="form.open_time"
            type="datetime"
            size="small"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
            style="width: 180px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="roll房开奖时间"
          prop="lottery_time"
        >
          <el-date-picker
            v-model="form.lottery_time"
            type="datetime"
            size="small"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
            style="width: 180px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="指定中奖用户id"
          prop="special_uid"
        >
          <el-input v-model="form.special_uid" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="roll房状态"
          prop="status"
        >
          <el-select v-model="form.status" size="small" style="width: 180px">
            <el-option v-for="item in rollStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="!isAdd"
          label="roll房道具配置"
          prop=""
        >
          <div style="width: 800px; display: flex; flex-wrap: wrap">
            <div v-for="(item, index) in boxitemData.items" :key="index" class="box-item-list">
              <img :src="item.stdmode == 1 ? item.imageUrl : 'http://adm.csgogo.net/static/img/jb.png'" alt="">
              <div class="close-config"><el-button type="danger" icon="el-icon-close" circle style="width: 20px; height: 20px" @click="delItemConfig(item)"></el-button></div>
              <p v-if="item.stdmode == 1">${{ item.price }}</p>
              <p v-else style="color: #ff3341">{{ item.gold }}</p>
            </div>
            <div class="addbtn" @click="additem">
              <i class="el-icon-plus"></i>
            </div>
            <div class="addbtn" @click="addgold">
              <el-button icon="el-icon-plus" circle></el-button>
            </div>
          </div>
        </el-form-item>
        <div style="text-align: center">
          <el-button type="primary" size="small" @click="submitform">提交</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  searchtype
} from '@/api/box'
import {
  rollconfig,
  rollconfigadd,
  rollconfigdel,
  rollitemlist,
  rollconfigmod,
  boxitemsearch,
  rollitemset,
  rollitemdel
} from '@/api/roll'
import {
  getLabel,
  rollStatus,
  formData
} from '@/utils/config'
import { _URL } from '@/utils/config'
export default {
  name: 'CaseConfig',
  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 10,
      total: 0,
      dialog: false,
      itemDialog: false,
      itemInnerDialog: false,
      isAdd: false,
      form: {
        rollname: '',
        description: '',
        rollpasswd: '',
        rollimg: '',
        in_limit: '',
        member_limit: '',
        open_time: '',
        lottery_time: '',
        special_uid: '',
        status: ''
      },
      open_time: '',
      lottery_time: '',
      itemForm: {
        exterior: '',
        quality: '',
        rarity: '',
        type: '',
        itemSet: '',
        maxPrice: '',
        minPrice: '',
        keyword: ''
      },
      goldConfig: {
        gold: ''
      },
      rules: {},
      fileList: [],
      url: _URL,
      getLabel,
      rollStatus,
      boxitemData: {},
      searchtype: {},
      itemSet: [],
      itemSetValue: [],
      searchList: [],
      selectItem: {},
      boxItemTotal: 0,
      itemPage: 1
    }
  },
  mounted() {
    this.getList()
    searchtype().then(res => {
      if (res.code === 0) {
        this.searchtype = res.data
        this.itemSet = [
          { name: '武器收藏品', searchKey: '1', children: res.data.WPitemSet },
          { name: '地图收藏品', searchKey: '2', children: res.data.MAPitemSet }
        ]
      } else {
        this.$message({
          type: 'error',
          message: res.message
        })
      }
    })
  },
  methods: {
    getList() {
      rollconfig().then(res => {
        console.log(res)
        if (res.code === 0) {
          this.tableData = res.data.items
          this.total = res.data._meta.total_items
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    add() {
      this.dialog = true
      this.isAdd = true
      this.form = {
        rollname: '',
        description: '',
        rollpasswd: '',
        rollimg: '',
        in_limit: '',
        member_limit: '',
        open_time: '',
        lottery_time: '',
        special_uid: '',
        status: ''
      }
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
    },
    edit(row) {
      this.isAdd = false
      this.dialog = true
      this.form = JSON.parse(JSON.stringify(row))
      this.getItemConfig()
    },
    getItemConfig() {
      rollitemlist(this.form.id).then(res => {
        if (res.code === 0) {
          this.boxitemData = res.data
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    submitform() {
      this.dialog = false
      if (this.isAdd) {
        rollconfigadd(formData(this.form)).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.getList()
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        })
      } else {
        rollconfigmod(formData(this.form)).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.getList()
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        })
      }
    },
    handleRemove(file) {
      this.fileList = []
    },
    fileChange(file) {
      console.log(file)
      this.form.file = file.raw
    },
    del(row) {
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        rollconfigdel(row.id).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        })
      })
    },
    additem() {
      this.itemDialog = true
    },
    addgold() {
      this.itemInnerDialog = true
    },
    boxitemsearch() {
      boxitemsearch(formData({ ...this.itemForm, page: this.itemPage })).then(res => {
        if (res.code === 0) {
          this.searchList = res.data.list
          this.boxItemTotal = res.data.total
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    currentChange(e) {
      this.itemPage = e
      this.boxitemsearch()
    },
    saveConfigBtn(item) {
      this.itemDialog = false
      rollitemset(formData({ stdmode: 1, rollroomid: this.form.id, ...item })).then(res => {
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.getItemConfig()
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    itemSetChange(e) {
      this.itemForm.itemSet = e[1] ? e[1] : ''
    },
    addgoldConfig() {
      rollitemset(formData({ stdmode: 2, rollroomid: this.form.id, ...this.goldConfig })).then(res => {
        if (res.code === 0) {
          this.itemInnerDialog = false
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.getItemConfig()
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    delItemConfig(item) {
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        rollitemdel(formData({ rollroomid: this.form.id, itemid: item.id })).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getItemConfig()
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        })
      })
    }
  }
}
</script>

<style scoped>
  .btns{
    padding: 10px;
  }
  .box-item-list, .addbtn{
    width: 80px;
    height: 80px;
    border: 1px solid #999;
    background: #aaa;
    font-size: 14px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-right: 10px;
    margin-bottom: 10px;
    position: relative;
  }
  .addbtn{
    cursor: pointer;
  }
  .box-item-list p{
    padding: 0;
    margin: 0;
    line-height: 18px;
    position: relative;
    z-index: 5;
  }
  .box-item-list img{
    width: 80%;
    position: absolute;
    z-index: 1;
  }
  .close-config{
    height: 20px;
    position: absolute;
    right: -5px;
    top: -5px;
    line-height: 20px;
  }
  .close-config /deep/ .el-button--medium{
    font-size: 12px;
    padding: 0;
  }
  .box-items{
    padding: 10px;
    background: #ddd;
    font-size: 12px;
    color: #666;
  }
  .box-item-wrap{
    display: flex;
    padding: 5px 15px 5px 7px;
    justify-content: space-between;
    align-items: center;
    background: #aaa;
    margin-bottom: 5px;
  }
  .box-item-wrap img{
    display: block;
    width: 80px;
    height: 80px;
    padding: 0;
    margin: 0;
  }
  .box-item-desc, .item-list-price{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .box-item-desc p, .item-list-price p{
    line-height: 20px;
    padding: 0;
    margin: 0;
  }
  .container .addbtn /deep/ .el-button--medium.is-circle{
    border: 0;
    background: yellow;
  }
</style>

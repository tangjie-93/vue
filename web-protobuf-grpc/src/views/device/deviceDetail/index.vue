<template>
  <div
    ref="deviceContainer"
    v-loading="loading"
    class="device_detail"
  >
    <!-- 设备信息 -->
    <div
      ref="deviceList"
      class="device_detail_list"
    >
      <div class="device_detail_list_title">
        <span class="device_detail_line">&nbsp;&nbsp;</span>
        设备信息
      </div>
      <!-- 设备信息列表 -->
      <div class="device_detail_list_main">
        <deviceDetailList
          v-for="item in deviceList"
          :key="item.name"
          :name="item.name"
          :value="handlerData(item)"
        />
      </div>
    </div>
    <!-- 设备数据 -->
    <!-- <div class="device_detail_table">
      <div class="device_detail_table_title" ref="line">
        <span class="device_detail_line">&nbsp;&nbsp;</span>
        设备数据
      </div>
      <base-table
        ref="deviceTableContainer"
        :height="tableHeight"
        :data.sync="deviceTableData"
        :table-header="deviceTableHeader"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        :total="total"
        @pageSizeChange="pageSizeChange"
        @currentPageChange="fetchEquipmentList"
      />
    </div> -->
  </div>
</template>
<script>
import { deviceList, deviceTableHeader, statusList } from '@/config/device'
import BaseLayout from '@/components/BaseLayout/index'
import BaseTable from '@/components/BaseTable/index'
import deviceDetailList from './deviceDetailList'
import { debounce, calculateTableHeight, dateFormat } from '@/utils/commonFun'
import { fetchDeviceDetailData } from '@/api/device'
export default {
  name: 'Device',
  components: {
    deviceDetailList,
    BaseLayout,
    BaseTable
  },
  filters: {},
  data() {
    return {
      sn: null,
      loading: false,
      currentPage: 4,
      statusList: statusList,
      deviceList: deviceList,
      deviceTableHeader: deviceTableHeader,
      pageSize: 10,
      pageSizes: [10, 20, 30, 40, 50],
      total: 0,
      tableHeight: 0,
      deviceListData: {
        number: 'DF390FD3C4',
        name: '地面抹平1号',
        type: '地面抹平机器人',
        state: '启用',
        status: '待机',
        totalTime: '2223秒',
        length: '20m',
        width: '10m',
        powerLow: '10%',
        powerMedium: '80%',
        powerHeight: '100%',
        suggestPower: '80%',
        directSpeed: '100m/s',
        reverseSpeed: '30m/s',
        createBy: 'admin',
        created: '2020-01-01 11:00:00',
        modifiedBy: 'admin',
        modified: '2020-01-01 11:00:00'
      },
      deviceTableData: [
        {
          id: 1,
          time: '2016-05-04',
          power: 23,
          address: '11,22',
          angle: 33,
          speed: 66
        },
        {
          id: 1,
          time: '2016-05-04',
          power: 23,
          address: '11,22',
          angle: 33,
          speed: 66
        },
        {
          id: 1,
          time: '2016-05-04',
          power: 23,
          address: '11,22',
          angle: 33,
          speed: 66
        },
        {
          id: 1,
          time: '2016-05-04',
          power: 23,
          address: '11,22',
          angle: 33,
          speed: 66
        },
        {
          id: 1,
          time: '2016-05-04',
          power: 23,
          address: '11,22',
          angle: 33,
          speed: 66
        }
      ]
    }
  },
  watch: {
    sn() {
      if (this.sn) {
        // this.refreshData(this.sn);
        console.log(this.sn)
        this.getDeviceDetailData(this.sn)
      }
    }
  },
  watch: {
    sn() {
      if (this.sn) {
        // this.refreshData(this.sn);
        console.log(this.sn)
        this.getDeviceDetailData(this.sn)
      }
    }
  },
  mounted() {
    // console.log(this.$refs);
    // window.onresize = () => {
    //   this.computeTableHeight();
    // };
    // this.$nextTick(() => {
    //   this.computeTableHeight();
    // });
  },
  beforeRouteEnter(to, from, next) {
    next(async vm => {
      if (to.query.sn && to.query.sn) {
        vm.sn = to.query.sn
      }
    })
  },
  methods: {
    computeTableHeight() {
      this.tableHeight = debounce(calculateTableHeight, true, 300)(
        this.$refs.deviceContainer,
        this.$refs.deviceList,
        this.$refs.line
      )
      console.log(this.tableHeight)
    },
    pageSizeChange(val) {
      this.pageSize = val
      this.fetchEquipmentList(1)
    },
    fetchEquipmentList(pageIndex) {},
    async getDeviceDetailData(sn) {
      try {
        const res = await fetchDeviceDetailData(sn)
        console.log(res)
        if (res.commonResult.code === 0) {
          this.deviceListData = res.data
        } else {
          this.$message.error(res.commonResult.msg)
        }
      } catch (err) {
        this.$message.error(err || '请求异常')
      } finally {
        this.loading = false
      }
    },
    handlerData(item) {
      if (
        item.label === 'createdTime' ||
        item.label === 'updatedTime' ||
        item.label === 'productionDate'
      ) {
        if (this.deviceListData[item.label]) {
          const date = new Date(this.deviceListData[item.label] || '')
          return `${dateFormat('yyyy-MM-dd hh:mm:ss', date)}`
        }
        return ''
      } else if (item.label === 'status') {
        return this.statusList.filter(obj => obj.value == this.deviceListData[item.label])[0].label
      }
      return `${
        item.data
          ? this.deviceListData[item.label][item.data] || ''
          : this.deviceListData[item.label] || ''
      }`
    }
  }
}
</script>
<style lang="scss" scoped>
$basicColor: rgba(24, 144, 255, 1);
$marginSize: 15px;
$titleFontWeight: 650;
$titleMargin: 5px;
$fontSize: 14px;
$titleHeight: 24px;
$navBarHeight: 50px;
.device_detail {
  margin: $marginSize;
  font-size: $fontSize;
  height: calc(100vh - #{$navBarHeight} - #{$marginSize}* 2);
  &_line {
    border-left: 2px solid $basicColor;
  }
  &_list_title,
  &_table_title {
    font-weight: $titleFontWeight;
    height: $titleHeight;
    line-height: $titleHeight;
    margin-right: $titleMargin;
  }
  &_list {
    &_main {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
    }
  }

  &_table_page {
    text-align: right;
  }
}
</style>

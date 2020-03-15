<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  fetchDeviceData,
  addDevicedata,
  updateDeviceData,
  delDeviceData,
  delDevicesData,
  fetchDeviceDetailData
} from '../../api/device'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name'])
  },
  created: function() {
    // this.getDevice()
    // this.addDevice()
    // this.updateDevice()
    // this.deleteDevice()
    // this.deleteDevices()
    this.getDeviceDetail()
  },
  methods: {
    getDevice() {
      const data = {
        pageNo: 1,
        pageSize: 30,
        sn: '',
        name: '',
        status: '1',
        type: { code: 'aa', name: 'sada' }
      }
      fetchDeviceData(data)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getDeviceDetail() {
      const sn = '118'
      fetchDeviceDetailData(sn)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addDevice() {
      const data = {
        sn: '333',
        name: '11',
        type: { code: 'aa', name: 'sada' },
        status: '1',
        total_duration: '',
        start_time: '',
        length: null,
        width: null,
        energy_level_critical: null,
        energy_level_good: null,
        energy_level_full: null,
        energy_level_stuff: null,
        max_velocity: null,
        max_reverse_velocity: null
      }
      addDevicedata(data)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateDevice() {
      const data = {
        id: 54,
        sn: '1165',
        name: '1156464745758567834645758',
        type: { code: 'aa', name: 'sada' },
        status: '1',
        total_duration: '',
        start_time: '',
        length: 0,
        width: 0,
        energy_level_critical: 0,
        energy_level_good: 0,
        energy_level_full: 0,
        energy_level_stuff: 0,
        max_velocity: 0,
        max_reverse_velocity: 0
        // createdBy: '',
        // createdTime: 1582302328,
        // energyLevelCritical: 0,
        // energyLevelFull: 0,
        // energyLevelGood: 0,
        // energyLevelStuff: 0,
        // id: 54,
        // length: 0,
        // maxReverseVelocity: 0,
        // maxVelocity: 0,
        // name: '11',
        // procState: '',
        // processableCategories: '',
        // productionDate: undefined,
        // sn: '116',
        // startTime: undefined,
        // status: '1',
        // totalDuration: undefined,
        // type: { code: 'aa', name: 'sfsdfsadf' },
        // updatedBy: '',
        // updatedTime: undefined,
        // width: 0
      }
      updateDeviceData(data)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteDevice() {
      const id = 20
      delDeviceData(id)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteDevices() {
      delDevicesData()
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

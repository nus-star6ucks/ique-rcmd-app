<template>
  <div>
    <div v-show="storeList.length === 0">
      <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="UserId">
          <a-input v-model:value="userId" />
        </a-form-item>
        <a-form-item label="Longitude">
          <a-input v-model:value="longitude" />
        </a-form-item>
        <a-form-item label="Latitude">
          <a-input v-model:value="latitude" />
        </a-form-item>
        <a-button
          type="primary"
          :disabled="isLoading"
          :loading="isLoading"
          @click="onCreateRecStores"
          >Get Recommendation List</a-button
        >
      </a-form>
    </div>

    <div style="padding: 20px" v-if="storeList.length != 0">
      <a-row :gutter="[16, 24]">
        <a-col
          :lg="8"
          :sm="12"
                v-for="(store, index) in storeList.slice(0, 5)"
                :key="store.storeId"
              >
                <a-card hoverable>
                  <template #cover>
                    <img alt="example" :src="randomImg(index)" />
            </template>

            <a-card-meta :title="store.store_name" class="custom-card">
              <template #description>
                <div>
                  <ApiFilled />
                  <span> Storeid: {{ store.storeId }}</span>
                </div>
                <div>
                  <MailFilled />
                  <span> Email: {{ store.email }}</span>
                </div>
                <div>
                  <FireFilled />
                  <span> Star: {{ store.star }}</span>
                </div>
                <div>
                  <EnvironmentFilled />
                  <span> Longitude: {{ store.longitude }}</span>
                </div>
                <div>
                  <EnvironmentFilled />
                  <span> Latitude: {{ store.latitude }}</span>
                </div>
                <div>
                  <CompassFilled />
                  <span> Address: {{ store.address }}</span>
                </div>
              </template>
            </a-card-meta>
            <!-- <p>longitude: {{ store.longitude }}</p>
            <p>latitude: {{ store.latitude }}</p> -->
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import mockJson from "@/MOCK_DATA.json"
import { CompassFilled, FireFilled, EnvironmentFilled, MailFilled, ApiFilled } from '@ant-design/icons-vue'


export default {
  name: 'Store',
  data () {
    return {
      storeList: [],
      userId: '',
      longitude: '',
      latitude: '',
      labelCol: { span: 8 },
      wrapperCol: { span: 8 },
      imgLoading: [],
      pollInterval: null,
      status: null,
      isLoading: false
    }

  },
  components: {
    EnvironmentFilled,
    CompassFilled,
    MailFilled,
    FireFilled,
    ApiFilled
  },
  props: {
    msg: String
  },
  mounted () {

  },
  methods: {
    async onCreateRecStores () {
      this.isLoading = true
      await axios.post(`${process.env.VUE_APP_VERCEL_INSTANCE_URL}/admin/producer/api/sendUserData`, {}, {
        params: {
          userId: this.userId,
          longitude: this.longitude,
          latitude: this.latitude
        }
      })
      this.pollInterval = setInterval(this.fetchData, 2000)
    },

    async randomImg(index) {
      const { data: { results } } = await axios.get(`https://api.unsplash.com/search/photos?page=${index}&query=restaurant&client_id=Ipc2KY40gw4TQqw0jvzNdr9VEu4MOWHrAEY6FDmHjh4`)
      return results[index].urls.regular
    },

    fetchData () {
      axios.post(`${process.env.VUE_APP_RT_PROCESSOR_URL}/recommendation`, {
        userId: this.userId,

      })
        .then((response) => {
          this.storeList = response.data.storeList
          this.storeList.forEach(ele => {
            Object.assign(ele, mockJson[Math.floor(Math.random() * 1000)])
          })
          clearInterval(this.pollInterval) //won't be polled anymore 
          this.pollInterval = null
          this.isLoading = false
          //check if status is completed, if it is stop polling 
          // this.status = response
        }).catch(() => { })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.custom-card {
  text-align: left;
}
</style>

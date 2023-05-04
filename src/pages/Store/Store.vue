<template>
  <div>
    <a-form
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      style="margin-left: 250px; margin-top: 100px; border-color: #ececec"
    >
      <a-form-item label="UserId">
        <a-input v-model:value="userId" />
      </a-form-item>
      <a-form-item label="Longitude">
        <a-input v-model:value="longitude" />
      </a-form-item>
      <a-form-item label="Latitude">
        <a-input v-model:value="latitude" />
      </a-form-item>
      <a-button type="primary" @click="onCreateRecStores"
        >Create Recommendation Stores</a-button
      >
    </a-form>
    <div
      style="
        background-color: #ececec;
        padding: 20px;
        margin: 50px 200px 200px 200px;
      "
      v-if="storeList.length != 0"
    >
      <a-row :gutter="[16, 24]">
        <a-col :span="8" v-for="store in storeList" :key="store.storeId">
          <a-card hoverable>
            <template #cover>
              <img alt="example" :src="randomImg()" />
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
      labelCol: { span: 4 },
      wrapperCol: { span: 5 },
      imgLoading: []
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
      const params_data = {
        userId: this.userId,
        longitude: this.longitude,
        latitude: this.latitude
      }
      const res = await axios.post("https://ique-rt-processor-dw7zkrwkja-as.a.run.app/recommendation", params_data)
      this.storeList = res.data.storeList
      this.storeList.forEach(ele => {
        Object.assign(ele, mockJson[Math.floor(Math.random() * 1000)])
      })
    },
    randomImg () {
      return `https://source.unsplash.com/random/640x480/?Restaurant&date=${Date.now()}`
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

import requests from "./request"
export const reqStoreList = () => requests({ url: 'http://127.0.0.1:4523/m1/1850359-0-default/getStoreList', method: 'get' })

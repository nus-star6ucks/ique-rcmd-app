import requests from "./request"
export const reqStoreList = () =>
  requests({
    url: `${process.env.VUE_APP_APIFOX_MOCK_URL}/m1/1850359-0-default/getStoreList`,
    method: "get",
  });

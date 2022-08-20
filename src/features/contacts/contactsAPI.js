import axios from "axios";

const API_URL = "https://api.dev.pastorsline.com/api/contacts.json";
const API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNjc2NDM5MjI0LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjYwODg3MjI0fQ.X6EnuvO5j5n9WLNrQUyJ9M4ABtDQpfsrjfWnts3GmPs"


export function fetchContacts(countryId='', query='', page) {
  // debugger
  const params = { companyId:"171", countryId:countryId, query, page }
  return axios(API_URL, { params, headers: { Authorization: "Bearer " + API_TOKEN } })
}

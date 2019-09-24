import axios from "axios";
import * as urls from "./urls";

const instance = axios.create({
  baseURL: urls.BASE_URL
});
instance.defaults.headers.common["Authorization"] =
  "Basic " + new Buffer("PAT:" + process.env.AUTH_TOKEN).toString("base64");

const config = {
  organization: "FNGLATSYS" || process.env.ORGANIZATION,
  project: "PersubSales",
  buildId: 5837,
  flags: 1
};

export const getCodeCoverage = async () => {
  try {
    const url = urls.codeCoverage(config);
    console.log("FETCHIN", url);
    const { data } = await instance.get(url);
    console.log("GOT DATA", data);
  } catch (err) {
    console.error(err.message);
  }
};

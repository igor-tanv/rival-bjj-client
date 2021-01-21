import moment from "moment"


export default function convertDateToUnix(dateString) {
  return moment(dateString).unix()
}
export function scrollBarInit () {
  let defaultValue = 0;
  let maxValue = 30;
  let myDate = new Date();
  let year = myDate.getFullYear();
  let month = myDate.getMonth() + 1;  //获取当前月份(0-11,0代表1月)
  let date = myDate.getDate();
  let day = new Date(year,month,0);
  let daycount = day.getDate(); //获取本月天数
  if ((date + defaultValue) > daycount) {
    if (month === 12) {
      month = 1;
      year = year + 1;
    } else {
      month = month + 1;
    }
    date = (date + defaultValue) - daycount;
   } else {
     date = date + defaultValue;
   }
   if (month < 10) {
     month = "0" + month;
   }
   if (date < 10) {
     date = "0" + date;
   }
  var datas = year + '-' + month + '-';
  return datas;
}
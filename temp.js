const getReadyTimeStr = (prepTime) => {
  let curDate = new Date();
  let readyTimeMs = curDate.getTime() + 1000 * 60 * prepTime;
  let readyTime = new Date(readyTimeMs);

  let hours = readyTime.getHours();
  let minutes = readyTime.getMinutes();
  var suffix = "am"
  if(hours > 12){
    hours -= 12;
    suffix = "pm";
  }
  console.log(suffix)
  let outStr = `${hours}:${minutes}${suffix}`;
  return outStr;
}

console.log("output: ", getReadyTimeStr(40));
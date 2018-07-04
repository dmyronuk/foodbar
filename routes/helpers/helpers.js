const accountSID = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_TOKEN
const twilioClient = require('twilio')(accountSID, authToken);

//minutes offSet variable represents minutes in the future relative to time when function called
function getTimeStr(minutesOffset, offsetFromUTC){
  let date = new Date();
  let dateWithOffset = date.setHours(date.getHours() + offsetFromUTC);
  let readyTimeMs = dateWithOffset + 1000 * 60 * minutesOffset;
  let readyTime = new Date(readyTimeMs);
  let hours = readyTime.getHours();
  let minutes = readyTime.getMinutes();
  if(minutes < 10) minutes = "0" + minutes;
  let suffix = (hours > 11) ? "pm" : "am";
  if(hours === 0){
    hours = 12;
  }else if(hours > 12){
    hours -= 12;
  }
  let outStr = `${hours}:${minutes}${suffix}`;
  return outStr;
}

module.exports = {
  getTimeStr: getTimeStr,

  //data: first_name, restaurant_name, total_cost, ready_time
  createClientSMS: (data) => {
    let lineA = `Hello ${data.first_name}! Thank you for ordering from FoodBar! `;
    let lineB = `Your order will be ready in approximately ${data.prep_time} minutes.`;
    return lineA + lineB;
  },

  createRestaurantSMS: (data) => {
    let outStr = "";
    let curTime = getTimeStr(0, -4);
    outStr += `Order placed by ${data.first_name} ${data.last_name} at ${curTime}\n`

    for(key in data.cart){
      let curItem = data.cart[key];
      outStr += `${curItem.quantity} x ${curItem.item_name}\n`;
    }
    return outStr;
  },

  sendSMS: (data, dataToStringFunction) => {
    let msg = dataToStringFunction(data);
    twilioClient.messages
    .create({
       body: msg,
       from: process.env.TWILIO_NUMBER,
       to: data.recipient_phone_number,
    })
    .then(message => console.log("Twilio SID:", message.sid))
    .done();
  },

  //remove underscores and cap first letter
  prettyFormatFormField: (field_val) => {
    let wordArr = field_val.split("_");
    let outStr = wordArr.reduce((acc, cur) => {
      acc = acc + cur[0].toUpperCase() + cur.slice(1) + " ";
      return acc;
    }, "")
    return outStr.trim();
  },

  //given the request.session.cart object, return the total $ amount of items
  calculateCartTotal: (cart) => {
    return Object.keys(cart).reduce((acc, cur) => {
      let curObj = cart[cur];
      acc += curObj.price * curObj.quantity / 100;
      return acc
    },0);
  },

  //Frank's transform function for POST /carts
  //transforms req.session.cart into something usable by the query
  convertCartObjToArray: (cart, email) =>{
    let arr = [];
    const itemIDs = Object.keys(cart)
    const items = Object.values(cart)
    for (var i = 0; i < itemIDs.length; i++) {
      items[i].item_id = itemIDs[i]
      items[i].email = email
      arr.push(items[i])
    }
    return arr;
  },
}

module.exports.config = {
  name: "goiadmin",
  version: "1.0.0",
  permssion: 0,
  prefix: false,
  premium: false,
  credits: "SK-SIDDIK",
  description: "fun",
  category: "Other",
  usages: "",
  cooldowns: 1
};

module.exports.handleEvent = function({ api, event }) {
  if (event.senderID !== "100059026788061") {
    var aid = ["100059026788061"];
    for (const id of aid) {
    if ( Object.keys(event.mentions) == id) {
      var msg = ["Don't Mention My Owner Busy Rights Now💞","আমার বস চিপায়  বিজি আছে___🌝", "মেয়ে পটাতে গেছে___😁", "এমন ভাবে মেনশান না দিয়ে একটা জি এফ দাও__🙈", "এত ডাকিস কেন__😡\n আমার বস অনেক বিজি__☺️", "বস কই তুমি\nতোমারে এক বলদে খোজ করে__🤣"];
      return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
    }
    }}
};
module.exports.run = async function({}) {
}

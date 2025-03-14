module.exports.config = {
  name: "info",
  version: "1.0.0",
  permission: 0,
  prefix: true,
  premium: false,
  credits: "SK-SIDDIK",
  description: "",
  category: "Information",
  usages: "",
  cooldowns: 5,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.run = async function({ api, event, args, client, Users, Threads, __GLOBAL, Currencies }) {
  const axios = global.nodemodule["axios"];
  const request = global.nodemodule["request"];
  const fs = global.nodemodule["fs-extra"];
  const time = process.uptime(),
    hours = Math.floor(time / (60 * 60)),
    minutes = Math.floor((time % (60 * 60)) / 60),
    seconds = Math.floor(time % 60);
  const moment = require("moment-timezone");
  var juswa = moment.tz("Asia/Dhaka").format(" hh:mm:ss");
  var link = [
    "https://i.imgur.com/y0199Cb.jpeg",
    "https://i.imgur.com/6xoKcTg.jpeg",
    "https://i.imgur.com/Jy9ZucD.jpeg",
    "https://i.imgur.com/y0199Cb.jpeg"
  ];

  var callback = () => api.sendMessage({
    body: `┏━━━━━━━━━━━━━━━━━┓
┣➤𝐁𝐎𝐓 𝐍𝐀𝐌𝐄 : 𝐒𝐈𝐃𝐃𝐈𝐊 𝐁𝐎𝐓
┣➤𝐁𝐎𝐓 𝐀𝐃𝐌𝐈𝐍 : 𝐒𝐊 𝐒𝐈𝐃𝐃𝐈𝐊
┣➤𝐅𝐁 : 𝐒𝐊 𝐒𝐈𝐃𝐃𝐈𝐊 𝐊𝐇𝐀𝐍
┣➤𝐁𝐎𝐓 𝐏𝐑𝐄𝐅𝐈𝐗 : ${global.config.PREFIX}
┣➤𝐁𝐎𝐓 𝐎𝐖𝐍𝐄𝐑 : 𝐒𝐊 𝐒𝐈𝐃𝐃𝐈𝐊
┣➤𝐔𝐏𝐓𝐈𝐌𝐄
┣➤𝐓𝐎𝐃𝐀𝐘 𝐈𝐒 𝐓𝐈𝐌𝐄 : ${juswa} 
┣➤𝐁𝐎𝐓 𝐈𝐒 𝐑𝐔𝐍𝐍𝐈𝐍𝐆 ${hours}:${minutes}:${seconds}.
┣➤𝐓𝐇𝐀𝐍𝐊𝐒 𝐅𝐎𝐑 𝐔𝐒𝐈𝐍𝐆
┗━━━━[𝗦𝗜𝗗𝗗𝗜𝗞-𝗕𝗢𝗧]━━━━━┛`,
    attachment: fs.createReadStream(__dirname + "/cache/juswa.jpg")
  }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/juswa.jpg"));

  return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/juswa.jpg")).on("close", () => callback());
};

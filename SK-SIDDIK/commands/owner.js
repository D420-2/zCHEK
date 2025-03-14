module.exports.config = {
    name: "owner",
    version: "1.0.1",
    permission: 0,
    credits: "SK-SIDDIK-KHAN",
    prefix: true,
    premium: false,
    description: "ask any thing",
    category: "admin",
    usages: "user",
    cooldowns: 5,
    dependencies: {
        "openai": ""
    }
};
module.exports.run = async function({ api,event,args,client,Users,Threads,__GLOBAL,Currencies }) {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);
const moment = require("moment-timezone");
var juswa = moment.tz("Asia/Dhaka").format("【hh:mm:ss】");
var link = ["https://i.imgur.com/FXRtp8p.jpeg","https://i.imgur.com/vBP0Ege.jpeg",
            "https://i.imgur.com/loiwgPM.jpeg",];
var callback = () => api.sendMessage({body:`┏━━━━━━━━━━━━━━━━━┓
┣➤🄱🄾🅃-🄾🅆🄽🄴🅁-🄸🄽🄵🄾
┣➤𝐁𝐨𝐭-𝐍𝐚𝐦𝐞 : 𝐒𝐈𝐃𝐃𝐈𝐊_𝐁𝐎𝐓
┣➤𝐁𝐨𝐭-𝐏𝐫𝐞𝐟𝐢𝐱 : ${global.config.PREFIX} 
┣➤𝐁𝐨𝐭-𝐎𝐰𝐧𝐞𝐫 : 𝐒𝐊 𝐒𝐈𝐃𝐃𝐈𝐊
┣➤𝐅𝐛 : 𝐒𝐊 𝐒𝐈𝐃𝐃𝐈𝐊 𝐊𝐇𝐀𝐍
┣➤𝐁𝐨𝐭-𝐀𝐝𝐦𝐢𝐧 : 𝐒𝐊 𝐒𝐈𝐃𝐃𝐈𝐊
┣➤𝐓𝐢𝐦𝐞 : ${juswa}\n┗━━━━[𝗦𝗜𝗗𝗗𝗜𝗞-𝗕𝗢𝗧]━━━━━┛ `,attachment: fs.createReadStream(__dirname + "/cache/juswa.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/juswa.png")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/juswa.png")).on("close",() => callback());
   };
 

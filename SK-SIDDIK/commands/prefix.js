const dipto = require('axios');
const fs = require('fs-extra');
const path = require('path');
const moment = require('moment-timezone');
const pathFile = __dirname + '/cache/d1pt0.txt';
if (!fs.existsSync(pathFile))
  fs.writeFileSync(pathFile, 'true');
  const isEnable = fs.readFileSync(pathFile, 'utf-8');
module.exports.config = {
  name: "prefix",
  version: "1.0.0",
  permission: 2,
  credits: "SK-SIDDIK",
  prefix: true,
  premium: false,
  description: "when send ,prefix then response",
  category: "bot prefix",
  usages: "prefix",
  cooldowns: 5,
};
module.exports.handleEvent = async ({ api, event }) => {
  if (isEnable == "true"){
  const dipto2 = event.body ? event.body.toLowerCase() : '';
    const GP = "𝐁𝐎𝐓 𝐏𝐑𝐄𝐅𝐈𝐗 𝐈𝐍𝐅𝐎";
     let d1PInfo = await api.getThreadInfo(event.threadID);
  let diptoName = d1PInfo.threadName;
    var time = moment.tz("Asia/Dhaka").format("LLLL");
  const text = `┏━━━━━━━━━━━━━━━━━┓\n┣➤${GP}\n┣➤𝐁𝐎𝐓 𝐍𝐀𝐌𝐄 : 𝐒𝐈𝐃𝐃𝐈𝐊_𝐁𝐎𝐓\n┣➤𝐁𝐎𝐓 𝐏𝐑𝐄𝐅𝐈𝐗 : [ ${global.config.PREFIX} ]\n┣➤𝐁𝐎𝐓 𝐂𝐌𝐃: ｢ ${client.commands.size} ｣\n┗━━━━[𝗦𝗜𝗗𝗗𝗜𝗞-𝗕𝗢𝗧]━━━━━┛`

const imgur = ["https://i.imgur.com/FXRtp8p.jpeg",  "https://i.imgur.com/0dZUrfR.jpeg",    "https://i.imgur.com/vBP0Ege.jpeg",  "https://i.imgur.com/loiwgPM.jpeg"]
  const link = imgur[Math.floor(Math.random() * imgur.length)];
  const res = await dipto.get(link, { responseType: 'arraybuffer' })
const ex = path.extname(link);
  const filename = __dirname + `/cache/dipto3${ex}`;
  fs.writeFileSync(filename, Buffer.from(res.data, 'binary'));
  if (dipto2.indexOf("prefix") ===0|| dipto2.indexOf("Prefix") ===0 )
  {
api.sendMessage({body:`${text}`,attachment: fs.createReadStream(filename)},event.threadID,() => fs.unlinkSync(filename),event.messageID)
  }
 }
}
module.exports.run = async ({api,args, event}) => {
try {
  if (args[0] == 'on') {
    fs.writeFileSync(pathFile, 'true');
    api.sendMessage('no prefix on successfully', event.threadID, event.messageID);
  }
  else if (args[0] == 'off') {
    fs.writeFileSync(pathFile, 'false');
    api.sendMessage('no prefix off successfully', event.threadID, event.messageID);
  }
  else if (!args[0]){
    api.sendMessage(`Wrong format ${this.config.name}use off/on`, event.threadID, event.messageID);
  }
  }
  catch(e) {
    console.log(e);
  }
 
}

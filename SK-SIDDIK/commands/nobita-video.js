module.exports.config = {
  name: "nobita",
  version: "1.0.0",
  permssion: 0,
  credits: "SK-SIDDIK-KHAN",
  description: "",
  prefix: true,
  premium: false,
  category: "Hình ảnh",
  usages: "nobita video",
  cooldowns: 5,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.run = async ({ api, event, args, client, Users, Threads, __GLOBAL, Currencies }) => {
  const axios = global.nodemodule["axios"];
  const request = global.nodemodule["request"];
  const fs = global.nodemodule["fs-extra"];

  var hi = ["🔰𝐍𝐎𝐁𝐈𝐓𝐀 𝐏𝐀𝐑𝐓 𝐎𝐅 𝐒𝐓𝐎𝐑𝐘 𝐕𝐈𝐃𝐄𝐎🔰"];
  var know = hi[Math.floor(Math.random() * hi.length)];
  var link = [
    "https://i.imgur.com/u5N7sqe.mp4",
"https://i.imgur.com/0u32UXX.mp4",
"https://i.imgur.com/sj3Asr2.mp4",
"https://i.imgur.com/sJ3iQFR.mp4",
"https://i.imgur.com/6IxQjHb.mp4",
"https://i.imgur.com/SpQImVm.mp4",
"https://i.imgur.com/rsXHTME.mp4",
"https://i.imgur.com/bVCNwBl.mp4",
"https://i.imgur.com/lpLN8j6.mp4",
"https://i.imgur.com/mNekuge.mp4",
"https://i.imgur.com/5EXQnUm.mp4",
"https://i.imgur.com/sn1nM55.mp4",
"https://i.imgur.com/vatwDvn.mp4",
"https://i.imgur.com/Is914QQ.mp4",
"https://i.imgur.com/4EGKkBr.mp4",
"https://i.imgur.com/KMhExnR.mp4",
"https://i.imgur.com/2exQMrj.mp4",
"https://i.imgur.com/yjDclse.mp4",
"https://i.imgur.com/2exQMrj.mp4",
"https://i.imgur.com/yjDclse.mp4",
"https://i.imgur.com/OxkI89B.mp4",
"https://i.imgur.com/Ma5IKum.mp4",
"https://i.imgur.com/TDx2wE5.mp4",
"https://i.imgur.com/xgAoeB9.mp4",
"https://i.imgur.com/TDx2wE5.mp4",
"https://i.imgur.com/xgAoeB9.mp4",
"https://i.imgur.com/vKtOrOC.mp4",
"https://i.imgur.com/BfeZuuR.mp4",
"https://i.imgur.com/8zvYfUL.mp4",
"https://i.imgur.com/dUtiu6e.mp4",
"https://i.imgur.com/brJkCMN.mp4",
"https://i.imgur.com/A7jM45X.mp4",
"https://i.imgur.com/g7DH0YU.mp4",
"https://i.imgur.com/4aWS06D.mp4",
"https://i.imgur.com/pHsTWyQ.mp4",
  ];

  const loadingMessage = await api.sendMessage({ body: "Loading Nobita Short video... Please wait! ⏰" }, event.threadID);

  setTimeout(() => {
    api.unsendMessage(loadingMessage.messageID);
  }, 5000);

  const callback = () => {
    api.sendMessage({ body: `「 ${know} 」`, attachment: fs.createReadStream(__dirname + "/cache/15.mp4") }, event.threadID, () => {
      fs.unlinkSync(__dirname + "/cache/15.mp4"); 
      api.unsendMessage(loadingMessage.messageID); 
    });
  };

  try {
    request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/15.mp4")).on("close", () => {
      callback(); 
    });
  } catch (error) {
    api.unsendMessage(loadingMessage.messageID); 
    api.sendMessage({ body: "Sorry, there was an error fetching the video. Please try again later." }, event.threadID);
  }
};
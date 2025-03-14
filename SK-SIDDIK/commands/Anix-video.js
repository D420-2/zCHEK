module.exports.config = {
  name: "anix",
  version: "1.0.0",
  permssion: 0,
  credits: "SK-SIDDIK-KHAN",
  description: "",
  prefix: true,
  premium: false,
  category: "Hình ảnh",
  usages: "anime video",
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

  var hi = ["𝐇𝐞𝐫𝐞 𝐢𝐬 𝐲𝐨𝐮𝐫 𝐀𝐧𝐢𝐦𝐞 𝐕𝐢𝐝𝐞𝐨"];
  var know = hi[Math.floor(Math.random() * hi.length)];
  var link = [
    "https://i.imgur.com/uykTmIq.mp4",
 
"https://i.imgur.com/OKv9G8S.mp4",
 
"https://i.imgur.com/JFB2EDm.mp4",
 
"https://i.imgur.com/AZ2yc7K.mp4",
 
"https://i.imgur.com/Vph1L6w.mp4",
 
"https://i.imgur.com/GJVqdS7.mp4",
 
"https://i.imgur.com/oHJCpVW.mp4",
 
"https://i.imgur.com/7U3piUc.mp4",
 
"https://i.imgur.com/lDDBFYH.mp4",
 
"https://i.imgur.com/OKv9G8S.mp4",
 
 "https://i.imgur.com/EmgFapW.mp4",
 
"https://i.imgur.com/0Zq5fIL.mp4",
 
"https://i.imgur.com/i8M9YeG.mp4",
 
"https://i.imgur.com/9k4f3cw.mp4",
 
"https://i.imgur.com/02bMIwx.mp4",
 
"https://i.imgur.com/cEX9Shv.mp4",
 
"https://i.imgur.com/9fb8kyN.mp4",
 
"https://i.imgur.com/Jmqzdzj.mp4",
 
"https://i.imgur.com/EmgFapW.mp4",
 
"https://i.imgur.com/i8M9YeG.mp4",
 
"https://i.imgur.com/cEX9Shv.mp4",
  ];

  const loadingMessage = await api.sendMessage({ body: "Loading Anime Short video... Please wait! ⏰" }, event.threadID);

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

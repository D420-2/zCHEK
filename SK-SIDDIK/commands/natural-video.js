module.exports.config = {
  name: "natural",
  version: "1.0.0",
  permssion: 0,
  credits: "SK-SIDDIK-KHAN",
  description: "",
  prefix: true,
  premium: false,
  category: "Hình ảnh",
  usages: "natural video",
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

  var hi = ["𝐒𝐊-𝐒𝐈𝐃𝐃𝐈𝐊-𝐊𝐇𝐀𝐍"];
  var know = hi[Math.floor(Math.random() * hi.length)];
  var link = [
    "https://i.imgur.com/s0enSFR.mp4",
"https://i.imgur.com/G10APIS.mp4",
"https://i.imgur.com/JCR8tC2.mp4",
"https://i.imgur.com/nxYfqih.mp4",
"https://i.imgur.com/eFVgw1Q.mp4",
"https://i.imgur.com/TygOziE.mp4",
"https://i.imgur.com/7XWsucf.mp4",
"https://i.imgur.com/Joil59R.mp4",
"https://i.imgur.com/ZtX1PXj.mp4",
"https://i.imgur.com/Sxmc9vr.mp4",
"https://i.imgur.com/DoH02UH.mp4",
"https://i.imgur.com/1YPakcd.mp4",
"https://i.imgur.com/Hj4ifk4.mp4",
"https://i.imgur.com/pnzQX3o.mp4",
"https://i.imgur.com/DKKCNTN.mp4",
"https://i.imgur.com/THNxq4W.mp4",
"https://i.imgur.com/68C43RD.mp4",
"https://i.imgur.com/eM9oxrU.mp4",
"https://i.imgur.com/fyzuKIb.mp4",
"https://i.imgur.com/miliKnM.mp4",
"https://i.imgur.com/eKdcfcV.mp4",
"https://i.imgur.com/rrhSt3d.mp4",
"https://i.imgur.com/BAADKLG.mp4",
"https://i.imgur.com/YNXeRgF.mp4",
"https://i.imgur.com/qkWLIcB.mp4",
"https://i.imgur.com/LxgMw4v.mp4",
"https://i.imgur.com/gFikegj.mp4",
"https://i.imgur.com/joGj9PK.mp4",
"https://i.imgur.com/M2IAXUW.mp4",
"https://i.imgur.com/BZmbdqq.mp4", 
"https://i.imgur.com/7zGi8qk.mp4",
"https://i.imgur.com/Bxxxhx7.mp4",
"https://i.imgur.com/y48JOJ4.mp4",
"https://i.imgur.com/9Tp7DLu.mp4",
  ];

  const loadingMessage = await api.sendMessage({ body: "Loading Natural Short video... Please wait! ⏰" }, event.threadID);

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
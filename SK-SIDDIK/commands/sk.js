module.exports.config = {
  name: "mygf",
  version: "1.0.0",
  permission: 0,
  credits: "SIDDIK",
  description: "Frame pic",
  prefix: true,
  premium: false,
  category: "png", 
  usages: "[@mention]",
  cooldowns: 5,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": "",
    "jimp": ""
  }
};

module.exports.onLoad = async () => {
  const { resolve } = global.nodemodule["path"];
  const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
  const { downloadFile } = global.utils;
  
  const dirMaterial = resolve(__dirname, "cache", "canvas");
  const path = resolve(dirMaterial, "sis.png");

  if (!existsSync(dirMaterial)) mkdirSync(dirMaterial, { recursive: true });
  if (!existsSync(path)) await downloadFile("https://i.imgur.com/kKlTenx.jpeg", path);
};

async function makeImage({ one, two }) {
  const fs = global.nodemodule["fs-extra"];
  const path = global.nodemodule["path"];
  const axios = global.nodemodule["axios"]; 
  const jimp = global.nodemodule["jimp"];
  const __root = path.resolve(__dirname, "cache", "canvas");

  let background = await jimp.read(__root + "/sis.png");
  let outputPath = __root + `/frame_${one}_${two}.png`;
  let avatarOnePath = __root + `/avt_${one}.png`;
  let avatarTwoPath = __root + `/avt_${two}.png`;

  let avatarOneData = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
  let avatarTwoData = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;

  fs.writeFileSync(avatarOnePath, Buffer.from(avatarOneData));
  fs.writeFileSync(avatarTwoPath, Buffer.from(avatarTwoData));

  let circleOne = await jimp.read(await circle(avatarOnePath));
  let circleTwo = await jimp.read(await circle(avatarTwoPath));

  background.resize(1280, 716)
    .composite(circleOne.resize(360, 360), 130, 200)
    .composite(circleTwo.resize(360, 360), 787, 200);

  let raw = await background.getBufferAsync(jimp.MIME_PNG);

  fs.writeFileSync(outputPath, raw);
  fs.unlinkSync(avatarOnePath);
  fs.unlinkSync(avatarTwoPath);

  return outputPath;
}

async function circle(imagePath) {
  const jimp = require("jimp");
  let image = await jimp.read(imagePath);
  image.circle();
  return await image.getBufferAsync(jimp.MIME_PNG);
}

module.exports.run = async function ({ event, api }) {    
  const fs = global.nodemodule["fs-extra"];
  const { threadID, messageID, senderID, mentions } = event;
  const mention = Object.keys(mentions);

  if (!mention[0]) return api.sendMessage("যার সাথে ফ্রেম বানাতে চান তাকে মানশন করুন 😇", threadID, messageID);

  const one = senderID, two = mention[0];
  
  return makeImage({ one, two }).then(path => {
    api.sendMessage({ 
      body: "=༅༎গরীব ঘরের ছেলেদের হাত ধরার-🩷🍀!!\n\n=༅༎ক্ষমতা সব নারীর থাকেনা-🍀💔!!", 
      attachment: fs.createReadStream(path) 
    }, threadID, () => fs.unlinkSync(path), messageID);
  });
};

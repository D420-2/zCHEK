const fs = require("fs-extra");
const axios = require("axios");
const jimp = require("jimp");

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
    "fs-extra": "",
    "axios": "",
    "jimp": ""
  }
};

module.exports.run = async ({ event, api }) => {
  try {
    const mention = Object.keys(event.mentions);
    
    if (mention.length === 0) {
      return api.sendMessage("🔰 Please Mention Your GF 🔰", event.threadID, event.messageID);
    }

    // Selecting the two users for the image
    const one = mention.length === 1 ? event.senderID : mention[1];
    const two = mention[0];

    api.sendMessage("⏳ Processing your image, please wait...", event.threadID);

    // Generate the image
    const imagePath = await generateImage(one, two);

    // Send the image
    api.sendMessage({
      body: "⊙────𝚆𝙴𝙻𝙲𝙾𝙼𝙴 𝙼𝚈 𝙶𝙵────⊙",
      attachment: fs.createReadStream(imagePath)
    }, event.threadID, () => {
      fs.unlinkSync(imagePath); // Delete the image after sending
    });

  } catch (error) {
    console.error("❌ Error:", error);
    api.sendMessage(`❌ Error: ${error.message}`, event.threadID);
  }
};

async function generateImage(one, two) {
  try {
    console.log("📸 Downloading profile pictures...");

    const avOne = await jimp.read(`https://graph.facebook.com/${one}/picture?width=512&height=512`);
    const avTwo = await jimp.read(`https://graph.facebook.com/${two}/picture?width=512&height=512`);

    console.log("🎨 Applying circular mask...");
    avOne.circle();
    avTwo.circle();

    console.log("🖼️ Downloading background image...");
    const image = await jimp.read("https://i.imgur.com/kKlTenx.jpeg");

    console.log("🔧 Resizing and composing image...");
    image.resize(1280, 716)
         .composite(avOne.resize(360, 360), 130, 200)
         .composite(avTwo.resize(360, 360), 787, 200);

    const filePath = "./temp/mygf.jpg";
    await image.writeAsync(filePath);

    console.log("✅ Image saved successfully:", filePath);
    return filePath;
  } catch (error) {
    console.error("❌ Error in generateImage:", error);
    throw new Error("Image processing failed.");
  }
}

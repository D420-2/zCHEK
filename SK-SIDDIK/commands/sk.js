const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");

module.exports.config = {
    name: "mygf",
    aliases: ["My Girlfriend"],
    version: "1.0",
    create: "SIDDIK", // author এর পরিবর্তে create ব্যবহার করা হলো
    cooldown: 5, // Cooldown in seconds
    role: 0,
    shortDescription: "Propose to your girlfriend",
    longDescription: "Tag your GF and get a custom image with both of your profile pictures.",
    category: "love",
    guide: "{pn} @tag"
};

module.exports.run = async function ({ api, event }) {
    const mention = Object.keys(event.mentions);
    if (mention.length === 0) {
        return api.sendMessage("🔰 Please mention your girlfriend 🔰", event.threadID, event.messageID);
    }

    let one, two;
    if (mention.length === 1) {
        one = event.senderID;
        two = mention[0];
    } else {
        one = mention[1];
        two = mention[0];
    }

    try {
        const imagePath = await createImage(one, two);
        api.sendMessage({
            body: "⊙────𝚆𝙴𝙻𝙲𝙾𝙼𝙴 𝙼𝚈 𝙶𝙵────⊙",
            attachment: fs.createReadStream(imagePath)
        }, event.threadID, () => fs.unlinkSync(imagePath), event.messageID);
    } catch (error) {
        console.error(error);
        api.sendMessage("❌ An error occurred while processing your request.", event.threadID, event.messageID);
    }
};

async function createImage(one, two) {
    const avone = await jimp.read(`https://graph.facebook.com/${one}/picture?width=512&height=512`);
    avone.circle();
    const avtwo = await jimp.read(`https://graph.facebook.com/${two}/picture?width=512&height=512`);
    avtwo.circle();

    const img = await jimp.read("https://i.imgur.com/kKlTenx.jpeg");
    img.resize(1280, 716)
        .composite(avone.resize(360, 360), 130, 200)
        .composite(avtwo.resize(360, 360), 787, 200);

    const imagePath = `./cache/mygf_${one}_${two}.jpg`;
    await img.writeAsync(imagePath);
    return imagePath;
}

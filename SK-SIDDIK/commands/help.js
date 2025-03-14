const fs = require("fs");
const axios = require("axios");

module.exports.config = {
  name: "help",
  version: "1.0.2",
  permission: 0,
  credits: "SK-SIDDIK",
  description: "beginner's guide",
  prefix: true,
  premium: false,
  category: "guide",
  usages: "[Shows Commands]",
  cooldowns: 5,
  envConfig: {
    autoUnsend: false,
    delayUnsend: 60
  }
};

module.exports.handleEvent = function ({ api, event, getText }) {
  const { commands } = global.client;
  const { threadID, messageID, body } = event;

  if (!body || !body.startsWith("help")) return;

  const splitBody = body.trim().split(/\s+/);
  if (splitBody.length === 1 || !commands.has(splitBody[1].toLowerCase())) return;

  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const command = commands.get(splitBody[1].toLowerCase());
  const prefix = threadSetting.PREFIX || global.config.PREFIX;

  api.sendMessage(getText(
    "moduleInfo",
    command.config.name,
    command.config.description,
    `${prefix}${command.config.name} ${command.config.usages || ""}`,
    command.config.commandCategory,
    command.config.cooldowns,
    command.config.permission === 0 ? getText("user") : 
      command.config.permission === 1 ? getText("adminGroup") : getText("adminBot"),
    command.config.credits
  ), threadID, messageID);
};

module.exports.run = async function ({ api, event, args, getText }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const command = commands.get((args[0] || "").toLowerCase());
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const prefix = threadSetting.PREFIX || global.config.PREFIX;

  if (!command) {
    const arrayInfo = Array.from(commands.keys()).sort();
    const page = Math.max(1, parseInt(args[0]) || 1);
    const perPage = 20;
    const totalPages = Math.ceil(arrayInfo.length / perPage);

    if (page > totalPages) return api.sendMessage(`Page ${page} doesn't exist. Maximum pages: ${totalPages}.`, threadID, messageID);

    const start = (page - 1) * perPage;
    const msg = `┏━[𝗟𝗶𝘀𝘁 𝗼𝗳 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀]━➣\n${arrayInfo.slice(start, start + perPage).map((cmd, i) => `┃━➤  ${start + i + 1} •──⋅☾ ${cmd}`).join("\n")}\n┃━━━━━━━━━━━━━━━➢\n┃━➤ 𝐏𝐀𝐆𝐄 (${page}/${totalPages})\n┃━➤ 𝗧𝗼𝘁𝗮𝗹 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀: ${arrayInfo.length} \n┗━━[𝗦𝗜𝗗𝗗𝗜𝗞 𝗕𝗢𝗧]━━━➣`;

    const imageLinks = [
      "https://i.imgur.com/y0199Cb.jpeg",
      "https://i.imgur.com/Jy9ZucD.jpeg",
      "https://i.imgur.com/6xoKcTg.jpeg"
    ];

    try {
      const response = await axios.get(imageLinks[Math.floor(Math.random() * imageLinks.length)], { responseType: "stream" });
      const imagePath = __dirname + "/cache/1.jpg";

      response.data.pipe(fs.createWriteStream(imagePath)).on("close", () => {
        api.sendMessage({ body: msg, attachment: fs.createReadStream(imagePath) }, threadID, () => fs.unlinkSync(imagePath), messageID);
      });
    } catch (err) {
      console.error("Error fetching image:", err);
      api.sendMessage(msg, threadID, messageID);
    }

    return;
  }

  const commandInfo = getText(
    "moduleInfo",
    command.config.name,
    command.config.description,
    `${prefix}${command.config.name} ${command.config.usages || ""}`,
    command.config.commandCategory,
    command.config.cooldowns,
    command.config.permission === 0 ? getText("user") : 
      command.config.permission === 1 ? getText("adminGroup") : getText("adminBot"),
    command.config.credits
  );

  const imageLinks = ["https://i.imgur.com/y0199Cb.jpeg"];

  try {
    const response = await axios.get(imageLinks[0], { responseType: "stream" });
    const imagePath = __dirname + "/cache/help.jpg";

    response.data.pipe(fs.createWriteStream(imagePath)).on("close", () => {
      api.sendMessage({ body: commandInfo, attachment: fs.createReadStream(imagePath) }, threadID, () => fs.unlinkSync(imagePath), messageID);
    });
  } catch (err) {
    console.error("Error fetching image:", err);
    api.sendMessage(commandInfo, threadID, messageID);
  }
};

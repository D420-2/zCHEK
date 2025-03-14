var main = "100059026788061";

module.exports.config = {
  name: "resend",
  version: "2.0.0",
  permission: 1,
  credits: "ryuko",
  description: "Resends unsent messages",
  prefix: true,
  premium: false,
  category: "system",
  usages: "resend",
  cooldowns: 0,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.handleEvent = async function ({ event, api, client, Users }) {
  const request = global.nodemodule["request"];
  const axios = global.nodemodule["axios"];
  const { writeFileSync, createReadStream } = global.nodemodule["fs-extra"];

  let { messageID, senderID, threadID, body: content } = event;

  // Check if global logMessage exists
  if (!global.logMessage) global.logMessage = new Map();

  // Get bot ID from global data
  if (!global.data.botID) global.data.botID = api.getCurrentUserID();

  // Fetch thread data
  const thread = global.data.threadData.get(parseInt(threadID)) || {};

  // Check if the resend functionality is disabled for this thread
  if (typeof thread["resend"] !== "undefined" && thread["resend"] === false) return;

  // Skip if the sender is the bot
  if (senderID === global.data.botID) return;

  // Log the message if it's not an "unsend" type
  if (event.type !== "message_unsend") {
    global.logMessage.set(messageID, {
      msgBody: content,
      attachment: event.attachments
    });
  }

  // Handle "message_unsend" event
  if (event.type === "message_unsend") {
    var getMsg = global.logMessage.get(messageID);
    if (!getMsg) return;

    let name = await Users.getNameUser(senderID);
    if (!getMsg.attachment[0]) {
      return api.sendMessage(`${name} just unsent a message\nMessage: ${getMsg.msgBody}`, threadID);
    } else {
      let num = 0;
      let msg = {
        body: `${name} just unsent ${getMsg.attachment.length} attachment(s)${getMsg.msgBody ? `\nContent: ${getMsg.msgBody}` : ""}`,
        attachment: [],
        mentions: { tag: name, id: senderID }
      };

      // Process each attachment
      for (var i of getMsg.attachment) {
        num += 1;
        var getURL = await request.get(i.url);
        var pathname = getURL.uri.pathname;
        var ext = pathname.substring(pathname.lastIndexOf(".") + 1);
        var path = __dirname + `/cache/${num}.${ext}`;
        var data = (await axios.get(i.url, { responseType: 'arraybuffer' })).data;
        writeFileSync(path, Buffer.from(data, "utf-8"));
        msg.attachment.push(createReadStream(path));
      }

      api.sendMessage(msg, threadID);
    }
  }
};

module.exports.run = async function ({ api, event, Threads }) {
  const { threadID, messageID } = event;

  // Fetch current thread data
  var data = (await Threads.getData(threadID)).data;

  // Toggle the resend setting for the thread
  if (typeof data["resend"] === "undefined" || data["resend"] === false) {
    data["resend"] = true;
  } else {
    data["resend"] = false;
  }

  // Update thread data with the new setting
  await Threads.setData(parseInt(threadID), { data });
  global.data.threadData.set(parseInt(threadID), data);

  // Send confirmation message
  return api.sendMessage(`Resend is now ${(data["resend"] === true) ? "enabled" : "disabled"} successfully!`, threadID, messageID);
};

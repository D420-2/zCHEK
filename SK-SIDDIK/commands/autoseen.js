module.exports.config = {
  name: "autoseen",
  version: "1.0.0",
  permission: 2,
  credits: "SK-SIDDIK",
  description: "Mark group messages as read (on/off system)",
  prefix: false,
  category: "system",
  premium: false,
  usages: "[on/off]",
  cooldowns: 0,
};

let autoSeenEnabled = false; 

module.exports.handleEvent = async ({ api, event, args }) => {
  if (autoSeenEnabled) {
    api.markAsReadAll(() => {});
  }
};

module.exports.run = async function({ api, event, args }) {
  if (args[0] === "on") {
    autoSeenEnabled = true;
    api.sendMessage("Auto-Seen On", event.threadID);
  } else if (args[0] === "off") {
    autoSeenEnabled = false;
    api.sendMessage("Auto-Seen Off", event.threadID);
  } else {
    api.sendMessage("Usages : autoseen [on/off]", event.threadID);
  }
};

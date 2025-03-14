module.exports.config = {
  name: "balance",
  version: "1.0.2",
  permission: 0,
  credits: "SK-SIDDIK",
  prefix: false,
  premium: false,
  description: "Check your balance or the tagged person's balance",
  category: "without prefix",
  usages: "[tag]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args, Currencies }) {
  const { threadID, messageID, senderID, mentions } = event;

  if (!args[0]) {
    const userData = await Currencies.getData(senderID);
    const money = userData?.money || 0;
    return api.sendMessage(`Your current balance: ${money}$`, threadID, messageID);
  }

  if (Object.keys(mentions).length === 1) {
    const mentionID = Object.keys(mentions)[0];
    const userData = await Currencies.getData(mentionID);
    const money = userData?.money || 0;
    const taggedName = mentions[mentionID].replace(/@/g, "");

    return api.sendMessage(
      {
        body: `${taggedName}'s current balance: ${money}$`,
        mentions: [{ tag: taggedName, id: mentionID }]
      },
      threadID,
      messageID
    );
  }

  return global.utils.throwError(this.config.name, threadID, messageID);
};
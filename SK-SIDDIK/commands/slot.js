module.exports.config = {
  name: "slot",
  version: "1.0.1",
  permission: 0,
  credits: "SK-SIDDIK",
  premium: false,
  prefix: false,
  description: "slot game",
  category: "without prefix",
  usages: "slot (amount)",
  cooldowns: 5
};

module.exports.languages = {
  "en": {
    "missingInput": "The bet money must not be blank or a negative number.",
    "moneyBetNotEnough": "The money you bet is bigger than your balance.",
    "limitBet": "Your bet is too low, the minimum is 50 pesos.",
    "returnWin": "🎰 %1 | %2 | %3 🎰\nYou win %4$",
    "returnLose": "🎰 %1 | %2 | %3 🎰\nYou lost %4$"
  }
};

module.exports.run = async function ({ api, event, args, Currencies, getText }) {
  const { threadID, messageID, senderID } = event;
  const { getData, increaseMoney, decreaseMoney } = Currencies;
  const slotItems = ["🖕", "❤️", "👉", "👌", "🥀", "🍓", "🍒", "🍌", "🥝", "🥑", "🌽"];

  const moneyUser = (await getData(senderID)).money;
  let moneyBet = parseInt(args[0]);

  if (isNaN(moneyBet) || moneyBet <= 0) {
    return api.sendMessage(getText("missingInput"), threadID, messageID);
  }
  if (moneyBet > moneyUser) {
    return api.sendMessage(getText("moneyBetNotEnough"), threadID, messageID);
  }
  if (moneyBet < 50) {
    return api.sendMessage(getText("limitBet"), threadID, messageID);
  }

  let slots = [];
  for (let i = 0; i < 3; i++) {
    slots[i] = Math.floor(Math.random() * slotItems.length);
  }

  let winMultiplier = 0;
  if (slots[0] === slots[1] && slots[1] === slots[2]) {
    winMultiplier = 9; 
  } else if (slots[0] === slots[1] || slots[0] === slots[2] || slots[1] === slots[2]) {
    winMultiplier = 2; 
  }

  if (winMultiplier > 0) {
    const winnings = moneyBet * winMultiplier;
    await increaseMoney(senderID, winnings);
    return api.sendMessage(
      getText("returnWin", slotItems[slots[0]], slotItems[slots[1]], slotItems[slots[2]], winnings),
      threadID,
      messageID
    );
  } else {
    await decreaseMoney(senderID, moneyBet);
    return api.sendMessage(
      getText("returnLose", slotItems[slots[0]], slotItems[slots[1]], slotItems[slots[2]], moneyBet),
      threadID,
      messageID
    );
  }
};
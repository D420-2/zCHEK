module.exports.config = {
  name: "work",
  version: "1.0.1",
  permission: 0,
  credits: "SK-SIDDIK",
  prefix: true,
  premium: false,
  description: "Earn money by working",
  category: "with prefix",
  cooldowns: 5
};

module.exports.languages = {
  "english": {
    "cooldown": "You have worked today. To avoid exhaustion, please come back after: %1 minute(s) %2 second(s).",
    "rewarded": "You did the job: %1 and received: %2$.",
    "job1": "Sell lottery tickets",
    "job2": "Repair car",
    "job3": "Programming",
    "job4": "Hacking",
    "job5": "Chef",
    "job6": "Grab driver",
    "job7": "Taxi driver",
    "job8": "Scamming",
    "job9": "Farmer",
    "job10": "Streamer",
    "job11": "Online seller",
    "job12": "Car wash",
    "job13": "Buy and sell",
    "job14": "Miner",
    "job15": "Drug dealer"
  }
};

module.exports.run = async ({ event, api, Currencies, getText }) => {
  const { threadID, messageID, senderID } = event;
  let userData = await Currencies.getData(senderID);
  let data = userData.data || {};

  const cooldownTime = 1200000; 
  const lastWorkTime = data.workTime || 0;
  const timeLeft = cooldownTime - (Date.now() - lastWorkTime);

  if (timeLeft > 0) {
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = ((timeLeft % 60000) / 1000).toFixed(0);
    return api.sendMessage(getText("cooldown", minutes, seconds.padStart(2, "0")), threadID, messageID);
  }

  const jobs = [
    getText("job1"), getText("job2"), getText("job3"), getText("job4"),
    getText("job5"), getText("job6"), getText("job7"), getText("job8"),
    getText("job9"), getText("job10"), getText("job11"), getText("job12"),
    getText("job13"), getText("job14"), getText("job15")
  ];

  const job = jobs[Math.floor(Math.random() * jobs.length)];
  const amount = Math.floor(Math.random() * 600) + 1; 

  await Currencies.increaseMoney(senderID, amount);
  data.workTime = Date.now();
  await Currencies.setData(senderID, { data });

  return api.sendMessage(getText("rewarded", job, amount), threadID, messageID);
};
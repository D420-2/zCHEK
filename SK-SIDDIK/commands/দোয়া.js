module.exports.config = {
  name: "দোয়া",
  version: "1.2.8",
  permission: 0,
  credits: "SK-SIDDIK", 
  description: "Short doya",
  prefix: true,
  premium: false,
  category: "doya",
  usages: "doya",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": "",
    "request": ""
  } 
}

module.exports.onLoad = () => {
  let { mkdirSync, existsSync, createWriteStream } = require("fs-extra");
  let request = require("request");
  let dirMaterial = __dirname + `/Siddik/doya/`; 

  if (!existsSync(dirMaterial)) mkdirSync(dirMaterial, { recursive: true });

  const images = [
    { name: "doya1.jpg", url: "https://i.imgur.com/aESlOKd.jpeg" },
    { name: "doya2.jpg", url: "https://i.imgur.com/3Bmg4Nd.jpeg" },
    { name: "doya3.jpg", url: "https://i.imgur.com/TUm1LQW.jpeg" },
    { name: "doya4.jpg", url: "https://i.imgur.com/wp7hM0m.jpeg" },
    { name: "doya5.jpg", url: "https://i.imgur.com/pFvUmsm.jpeg" },
    { name: "doya6.jpg", url: "https://i.imgur.com/LH2qVcm.jpeg" },
    { name: "doya7.jpg", url: "https://i.imgur.com/28Et6s2.jpeg" },
    { name: "doya8.jpg", url: "https://i.imgur.com/NIjfdfz.jpeg" },
    { name: "doya9.jpg", url: "https://i.imgur.com/1ufw46l.jpeg" },
    { name: "doya10.jpg", url: "https://i.imgur.com/0wcNcmI.jpeg" },
    { name: "doya11.jpg", url: "https://i.imgur.com/AnIgU1J.jpeg" },
    { name: "doya12.jpg", url: "https://i.imgur.com/NIjfdfz.jpeg" }
  ];

  images.forEach(({ name, url }) => {
    if (!existsSync(dirMaterial + name)) {
      request(url).pipe(createWriteStream(dirMaterial + name));
    }
  });
}

module.exports.handleReply = async ({ api, event, handleReply }) => {
  let { createReadStream } = require("fs-extra");
  let { threadID, messageID, senderID, body } = event;
  let dirMaterial = __dirname + `/Siddik/doya/`; 

  const doyaTexts = {
    "1": "--আরবি:--\nرَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا\n\n--উচ্চারণ:--\nরাব্বানা গফির লানা যুনুবানা",
    "2": "--আরবি:--\nرَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا\n\n--উচ্চারণ:--\nরাব্বানা হাব লানা মিন আজওয়াজিনা ওয়াযুররিয়্যাতিনা কুররাতা আ'ইউনিন ওয়াজআলনা লিলমুত্তাকিনা ইমামা।",
    "3": "--আরবি:--\nبِسْمِ اللّهِ اللّهُمَّ جَنِّبْنَا الشَّيْطَانَ وَجَنِّبِ الشَّيْطَانَ مَا رَزَقْتَنَا\n\n--উচ্চারণ:--\nবিসমিল্লাহি আল্লাহুম্মা জান্নিবনা আশ-শাইত্বানা ওয়া জান্নিবিশ শাইত্বানা মা রাযাক্তানা।",
    "4": "--আরবি:--\nاللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي\n\n--উচ্চারণ:--\nআল্লাহুম্মা ইন্নাকা আফুউন তুহিব্বুল আফওয়া ফা'ফু আন্নি।",
    "5": "--আরবি:--\nاللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَجْمَعُ عِبَادَكَ\n\n--উচ্চারণ:--\nআল্লাহুম্মা ক্বিনি আযাবাকা ইয়াওমা তাজমাউ ইবাদাকা।",
    "6": "--আরবি:--\nرَبَّنَاۤ اٰمَنَّا فَاغْفِرْ لَنَا وَ ارْحَمْنَا وَاَنْتَ خَيْرُ الرّٰحِمِيْنَ\n\n--উচ্চারণ:--\nরাব্বানা আ'মান্না ফাগফির লানা ওয়ারহামনা ওয়া আন্তা খাইরুর রাহিমিন।",
    "7": "--আরবি:--\nرَبِّ زِدْنِي عِلْمًا\n\n--উচ্চারণ:--\nরাব্বি যিদনি ইলমা।",
    "8": "--আরবি:--\nاللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ\n\n--উচ্চারণ:--\nআল্লাহুম্মা আ’ইন্নি ‘আলা যিকরিকা ওয়া শু’করিকা ওয়া হুসনি ইবাদাতিকা।",
    "9": "--আরবি:--\nرَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ\n\n--উচ্চারণ:--\nরাব্বিগফিরলি ওয়া লিওয়ালিদাইয়া ওয়া লিলমুমিনিনা।",
    "10": "--আরবি:--\nاللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَأَعُوذُ بِكَ مِنَ النَّارِ\n\n--উচ্চারণ:--\nআল্লাহুম্মা ইন্নি আসআলুকাল জান্নাতা ওয়া আ’উযুবিকা মিনান্নার।",
    "11": "--আরবি:--\nاللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحُزْنِ\n\n--উচ্চারণ:--\nআল্লাহুম্মা ইন্নি আ’উযুবিকা মিনাল হাম্মি ওয়াল হুযনি।",
    "12": "--আরবি:--\nاللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا\n\n--উচ্চারণ:--\nআল্লাহুম্মা ইন্নি আসআলুকা ইলমান নাফিআ, ওয়া রিযকান তাইয়িবা, ওয়া ‘আমালান মুতাক্বাব্বালা।"
  };

  let choose = body.trim();
  if (!doyaTexts[choose]) {
    return api.sendMessage("•—»✨ একটি সঠিক নম্বর দিন!", threadID, messageID);
  }

  api.unsendMessage(handleReply.messageID);
  api.sendMessage({
    body: doyaTexts[choose],
    attachment: createReadStream(dirMaterial + `doya${choose}.jpg`)
  }, threadID, messageID);
}

module.exports.run = async ({ api, event }) => {
  let { threadID, senderID } = event;

  return api.sendMessage({
    body: "আপনার প্রয়োজনীয় দোয়ার নম্বর লিখে রিপ্লাই করুন!",
  }, threadID);
}

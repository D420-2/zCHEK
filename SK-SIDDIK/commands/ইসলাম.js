module.exports.config = {
  name: "ইসলাম",
  version: "1.0.0",
  permssion: 0,
  prefix: true,
  premium: false,
  credits: "SK-SIDDIK",
  description: "",
  category: "islam",
  usages: "",
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};
 
module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
   var hi = ["~অপেক্ষা করো সৃষ্টি কর্তা যেটা করবে সেটাই তোমার জন্য ভালো!!! ",
             "যে ব্যক্তি জুমু’আহর দিনে সূরা কাহাফ পাঠ করবে, তাঁর ঈমানের নূর এক জুম’আহ হতে আরেক জুমু’আহ পর্যন্ত বিচ্ছুরিত হতে থাকবে।— সহীহ আত-তারগীব হা/৭৩৬",
             "নিজেই প্রতিশোধ নিও না, আল্লাহর জন্যঅপেক্ষা কর। তাহলে তিনি তোমাকে রক্ষা করবেন।— হযরত সুলাইমান (আঃ)",
             "বিদ্বানের কলমের কালি শহীদের রক্তের চেয়েও পবিত্র ।— আল হাদিস",
             "আল্লাহ তা'আলার ভয়ে তুমি যা কিছু ছেড়ে দিবে, আল্লাহ তোমাকে তার চেয়ে উত্তম কিছু অবশ্যই দান করবেন ।— আল হাদিস",
             "যারা তাঁর সৃষ্টির ওপর দয়া করবে না, আল্লাহ্‌ও তাদের ওপর দয়া করবেন না”– আবু দাউদ ও তিরমিযী",
             "~ইয়া রাব্বী, জান্নাতে যেতে পারি এমন কোন আমল আমার নেই। আবার জাহান্নামে এক মুহূর্ত কাটাতে পারবো এমন শক্তিও আমার নেই।— মোহাম্মদ জাভেদ কায়সার রাহিমাহুল্লাহ"];
  var know = hi[Math.floor(Math.random() * hi.length)];
  var link = [
  "https://i.postimg.cc/sfPDv0bV/7bbac298b4bfbeae64b2e71c34e0f592.jpg",
  "https://i.postimg.cc/y6TsV3Sx/4106707e1c9b91b719c81791130a78ba.jpg",
  "https://i.postimg.cc/xC3DTB8h/ba23828aff036421a177e7283359b8a0.jpg",
  "https://i.postimg.cc/Z5BGyW0r/c9d547edc98f567a8d6770e3f7d1288e.jpg",
  "https://i.postimg.cc/y6LtQmZm/755a05ee1facf7ea1bd72481c7860f98.jpg",
  "https://i.postimg.cc/vmwNgXJs/0fb461c238a7882ff36f995942eb5c84.jpg",
  "https://i.postimg.cc/76s9VNWb/2def0b7a72fc49dc8d14daee40cbebed.jpg",
  "https://i.postimg.cc/BnTCy3Vr/47f6af56804c13f2e990e376bb2e14bb.jpg",
  "https://i.postimg.cc/LXnCG7fj/303293a68e0b386c28bfcc94abcfda42.jpg",
  "https://i.postimg.cc/HsGZP6L7/eacc55b1a803618c3cd211487196f0fa.jpg",
  "https://i.postimg.cc/j5wcMf0X/56761a3570cf46cb91aec168c28c1cc6.jpg",
  "https://i.postimg.cc/cHn7RNwk/94e77528666640cdaa1c08895eab5ad1.jpg",
  "https://i.postimg.cc/HnmMb8pj/21510e1260eeafd53ffc55b59a0499c3.jpg",
  "https://i.postimg.cc/nc0mQLNc/300a5983790703eafad7edb7fe4750cc.jpg",
  "https://i.postimg.cc/25v3Tj9W/e10060f67c84fad17e3e14a77ce1d493.jpg",
];
	 var callback = () => api.sendMessage({body:`「 ${know} 」`,attachment: fs.createReadStream(__dirname + "/cache/5.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/5.jpg"));	
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/5.jpg")).on("close",() => callback());
   };
 

module.exports.config = {
  name: "james",
  version: "1.0.0",
  permission: 0,
  credits: "SK-SIDDIK-KHAN",
  description: "",
  prefix: true,
  premium: false,
  usages: "guru",
  category: "For users",
  cooldowns: 5
};

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
   var hi = ["-- CREATE BY SK SIDDIK --"];
  var know = hi[Math.floor(Math.random() * hi.length)];
  var link = [
   "https://drive.google.com/uc?id=1DGrncmgsJXiWvrqiv1BLJjgeAxONipu9",
   
   "https://drive.google.com/uc?id=1DOqITa7izl6tvNJK9cMQpMbJxfKttzLY",
   
   "https://drive.google.com/uc?id=1Ckc-hBE-4zcA9vERlTQ5sEkO-OC8B4If",
   
   "https://drive.google.com/uc?id=1DR-5Z0a5IJ5ByXQvsp_8FQc2aMkZ1N-8",
   
   "https://drive.google.com/uc?id=1DZoZGXxgJGAJtlETI3-9PvsuBABdx7mk",
   
   "https://drive.google.com/uc?id=1DPtI764_AaT92pZXGwto3pf4kHtg0rbF",
   
   "https://drive.google.com/uc?id=1CRlvtInIaeuKog9aUrkS_kecwbR2G3Hj",
   
   "https://drive.google.com/uc?id=1DKTdc6MDlvKc5zo2QFQVRlLRaxfhlIrj",
   
   "https://drive.google.com/uc?id=1DCfwO4EZakNNeQcZ0ys_SFADRuZ0x8h",
   
   "https://drive.google.com/uc?id=1ChRGoLUa3PGb94l5jSnJGnEFVzPql2vP",
   
   "https://drive.google.com/uc?id=1D-wedBOlD-TncZiE37t0yay4aKhsLTJp"];
     var callback = () => api.sendMessage({body:`「 ${know} 」`,attachment: fs.createReadStream(__dirname + "/cache/26.mp3")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/26.mp3"));    
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/26.mp3")).on("close",() => callback());
   };

module.exports.config = {
  name: "fm",
  version: "1.0.0",
  permission: 0,
  credits: "SK-SIDDIK-KHAN",
  description: "",
  prefix: true,
  premium: false,
  usages: "vut",
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
   "https://drive.google.com/uc?id=1DyhbJ-j-4N0dJBf7cqZ3HJlfVSqFPFNr",
   
   "https://drive.google.com/uc?id=1E6c3W9QcSUxxlfhPzMbM_8QAUwJGjJ20",
   
   "https://drive.google.com/uc?id=1E2BG1gb8T33SrFo5CkWHJACwHdv2iwdF",
   
   "https://drive.google.com/uc?id=1E9h0tfBCHyTZuDNZnPlifCKLxJDy9jBe",
   
   "https://drive.google.com/uc?id=1E2JuP8aIqW6bTqlB0yavXKxQPY1o6RPI",
   
   "https://drive.google.com/uc?id=1E9cK5e2vRvesVAsFeWvX7PtM-eE5I4H4",
   
   "https://drive.google.com/uc?id=1E103RtEOdMaVS30TXLreISz5Vg5bEkxl"];
     var callback = () => api.sendMessage({body:`「 ${know} 」`,attachment: fs.createReadStream(__dirname + "/cache/26.mp3")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/26.mp3"));    
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/26.mp3")).on("close",() => callback());
   };
 

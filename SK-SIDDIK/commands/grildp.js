module.exports.config = {
  name: "grildp",
  version: "1.0.0",
  permssion: 0,
  prefix: true,
  premium: false,
  credits: "SK-SIDDIK",
  description: "",
  category: "Other",
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
   var hi = ["𝐌𝐀𝐃𝐄 𝐁𝐘 𝐒𝐊 𝐒𝐈𝐃𝐃𝐈𝐊"];
  var know = hi[Math.floor(Math.random() * hi.length)];
  var link = [
"https://i.imgur.com/GWvWrOU.jpg","https://i.imgur.com/HlsXDDh.jpg","https://i.imgur.com/IAK2mhm.jpg","https://i.imgur.com/EXsKLRr.jpg","https://i.imgur.com/48lKPK9.jpg","https://i.imgur.com/ylJhQiH.jpg","https://i.imgur.com/aGalyKj.jpg","https://i.imgur.com/EE8hhkl.jpg","https://i.imgur.com/fz4sU7e.jpg","https://i.imgur.com/ucHzYiJ.jpg","https://i.imgur.com/LX1iD04.jpg","https://i.imgur.com/Vr0x1nz.jpg","https://i.imgur.com/voUwxl9.jpg","https://i.imgur.com/8aJed5B.jpg","https://i.imgur.com/GCoJji2.jpg","https://i.imgur.com/3YzAYEm.jpg","https://i.imgur.com/g5o6cgR.jpg","https://i.imgur.com/mojVpEc.jpg","https://i.imgur.com/DWYoD7c.jpg","https://i.imgur.com/kCpgGjm.jpg","https://i.imgur.com/1ndfYuz.jpg","https://i.imgur.com/nzh5pjU.jpg","https://i.imgur.com/Jcdlar4.jpg","https://i.imgur.com/3SFW45P.jpg","https://i.imgur.com/fLXfa8i.jpg","https://i.imgur.com/SdeIlFK.jpg","https://i.imgur.com/Qooddnp.jpg","https://i.imgur.com/vVMjMx6.jpg","https://i.imgur.com/PRQSD8f.jpg","https://i.imgur.com/SPP99U6.jpg","https://i.imgur.com/HUPpY8i.jpg","https://i.imgur.com/OKqotRw.jpg","https://i.imgur.com/5EVpoUc.jpg","https://i.imgur.com/hI9hvUb.jpg","https://i.imgur.com/tHsUF0Z.jpg","https://i.imgur.com/GllqyhW.jpg","https://i.imgur.com/HIe8w87.jpg","https://i.imgur.com/j2o6kNE.jpg","https://i.imgur.com/rfWnE0b.jpg","https://i.imgur.com/Pn4Ss7P.jpg","https://i.imgur.com/ZV2YKOC.jpg","https://i.imgur.com/vd5mp5W.jpg","https://i.imgur.com/SWauVPx.jpg","https://i.imgur.com/BjFbpH6.jpg","https://i.imgur.com/9T7OfNl.jpg","https://i.imgur.com/Y1Fk2sC.jpg","https://i.imgur.com/rhpuHvM.jpg","https://i.imgur.com/Oiqesz0.jpg","https://i.imgur.com/f3z1yxd.jpg","https://i.imgur.com/BxH5NYW.jpg","https://i.imgur.com/Sc5hSaH.jpg","https://i.imgur.com/HSwfPgj.jpg","https://i.imgur.com/TU4ejfq.jpg","https://i.imgur.com/cQ6SVmx.jpg"
     ];
     var callback = () => api.sendMessage({body:`「 ${know} 」`,attachment: fs.createReadStream(__dirname + "/cache/5.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/5.jpg"));    
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/5.jpg")).on("close",() => callback());
   };

module.exports.config = {
    name: "listadmin",
    version: '1.0.0',
    permssion: 0,
    credits: "SK-SIDDIK",
    description: "List of group administrators",
    prefix: true,
    premium: false,
    category: "Box Chat",
    usages: "dsqtv",
    cooldowns: 5,
    dependencies: []
};
 
module.exports.run = async function({ api, event, args, Users }) {
    var threadInfo = await api.getThreadInfo(event.threadID);
    let qtv = threadInfo.adminIDs.length;
    var listad = '';
    var qtv2 = threadInfo.adminIDs;
    var fs = global.nodemodule["fs-extra"];
    dem = 1;
    for (let i = 0; i < qtv2.length; i++) {
        const info = (await api.getUserInfo(qtv2[i].id));
        const name = info[qtv2[i].id].name;
        listad += '' + `${dem++}` + '. ' + name + '\n';
    }
 
    api.sendMessage(
        `The list of ${qtv} administrators includes:\n${listad}`,
        event.threadID,
        event.messageID
    );
};
 
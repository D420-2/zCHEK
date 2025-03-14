module.exports.config = {
	name: "load",
	version: "1.0.0",
	permssion: 2,
	credits: "SK-SIDDIK",
	description: "reload config file data",
	prefix: true,
    premium: false,
	category: "Admin",
	usages: "admin",
	cooldowns: 30
};
module.exports.run = async function({ api, event, args,Threads, Users }) {
delete require.cache[require.resolve(global.client.configPath)];
global.config = require(global.client.configPath);
return api.sendMessage("[OK] Reloading config...", event.threadID, event.messageID);    
} 
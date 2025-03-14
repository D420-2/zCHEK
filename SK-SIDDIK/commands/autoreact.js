module.exports.config = {
  name: "autoreact",
  version: "2.0.0",
  permission: 2,
  credits: "SK-SIDDIK",
  description: "Auto-reacts to messages with emojis.",
  prefix: false,
  premium: false,
  category: "...",
  usages: "",
  cooldowns: 5,
};

let enabled = true; 

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  if (!enabled) return; 
  let haha = event.body ? event.body.toLowerCase() : '';
  
  if (haha.includes(" ") || haha.includes("")) {
    const siddik = ['😆','🐸','🙃','😈','🤖','🙄','🐣','🍎','🐰','🦟','🧐','😐','🙂','🤐','♥️','😘','😻','😍','😸','💦','🤨','😭','😁','😜','🤫','😶','🥱','😤','🥵','😇','💋','🙈','🙀','🦵','💛','🖤','🤎','💙','💜','🦶','🙆','😏','🌸','🏵️','🍁','🌼','🔥','🐍','👄','✈️','🦛','🦐','🐇','🐮','🐰','🦃','🫦','🦋','🍒','🍓','🐼','🍊','🫤','🍍','🍌','🌚','🥥','🐛','🥕','😳','👻','😾','🧀','😒','🥹','☠️','👊','😴','😦','😷','🫣','🫂','🤕','😵','🫢','🤭','😔','💩','💣','👀','🌝','🍼','🐤','😋','😻','😕','🙀'];

    const r = siddik[Math.floor(Math.random() * siddik.length)];
    return api.setMessageReaction(r, event.messageID, (err) => {}, true);
  }
};

module.exports.run = function({ api, event }) { 
  if (event.body.toLowerCase() === "autoreact on") {
    enabled = true;
    return api.sendMessage("Auto-React On", event.threadID, event.messageID);
  } else if (event.body.toLowerCase() === "autoreact off") {
    enabled = false;
    return api.sendMessage("Auto-React Off", event.threadID, event.messageID);
  }
};

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const ffmpeg = require('ffmpeg-static');
const { createCanvas, loadImage } = require('canvas');
const { v4: uuidv4 } = require('uuid');

module.exports.config = {
  name: "sk",
  version: "1.1",
  permission: 0,
  credits: "SK",
  description: "Overlay an image onto a video template.",
  prefix: true,
  premium: false,
  category: "video",
  usages: "[templateNumber]",
  cooldowns: 5,
};

const cacheFolder = path.join(__dirname, 'cache');
if (!fs.existsSync(cacheFolder)) fs.mkdirSync(cacheFolder);

const templates = {
  1: {
    videoUrl: 'https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1720460590331-106.mp4',
    imagePosition: { x: 434, y: 120, width: 495, height: 495, curvature: 30 }
  },
  2: {
    videoUrl: 'https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1720544714048-1.mp4',
    imagePosition: { x: 35, y: 492, width: 500, height: 650, curvature: 30 }
  },
  3: {
    videoUrl: 'https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1720546638190-417.mp4',
    curvedImagePosition: { x: 45, y: 370, width: 630, height: 830, curvature: 30 },
    circularImagePosition: { x: 355, y: 18, size: 350 }
  },
  4: {
      videoUrl: 'https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1720550953048-168.mp4',
      imagePosition: { x: 480, y: 15, width: 450, height: 700, curvature: 25 }
  },
  5: {
    videoUrl: 'https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1720552135256-431.mp4',
    imagePosition: { x: 550, y: 120, width: 380, height: 490, curvature: 30 }
  },
  6: {
    videoUrl: 'https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1720605734019-176.mp4',
    imagePosition: { x: 35, y: 760, width: 290, height: 400, curvature: 10 }
  },
  7: {
    videoUrl: 'https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1720606729322-430.mp4',
    imagePosition: { x: 50, y: 200, width: 350, height: 350, curvature: 40 }
  },
  8: {
    videoUrl: 'https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1720607303782-196.mp4',
    imagePosition: { x: 320, y: 465, width: 350, height: 350, curvature: 40 }
  },
  9: {
    videoUrl: 'https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1720609537400-282.mp4',
    imagePosition: { x: 95, y: 95, width: 520, height: 580, curvature: 10 }
  },
  10: {
    videoUrl: 'https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1720610455191-118.mp4',
    imagePosition: { x: 57, y: 735, width: 610, height: 480, curvature: 10 }
  },
  11: {
    videoUrl: 'https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1720611205416-924.mp4',
    imagePosition: { x: 36, y: 150, width: 500, height: 680, curvature: 10 }
  },
  12: {
    videoUrl: 'https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1720612689939-910.mp4',
    imagePosition: { x: 55, y: 395, width: 620, height: 765, curvature: 10 }
  },
  13: {
      videoUrl: 'https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1720614082736-314.mp4',
     curvedImagePosition: { x: 90, y: 480, width: 550, height: 700, curvature: 80 },
       circularImagePosition: { x: 355, y: 18, size: 300 }
  },
  14: {
    videoUrl: 'https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1720614943351-759.mp4',
    imagePosition: { x: 79, y: 110, width: 560, height: 700, curvature: 10 }
  },
  15: {
    videoUrl: 'https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1720615837449-553.mp4',
    imagePosition: { x: 100, y: 200, width: 500, height: 500, curvature: 40 }
  },
  16: {
    videoUrl: 'https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1720616152042-883.mp4',
    imagePosition: { x: 85, y: 200, width: 550, height: 730, curvature: 10 }
  },
  17: {
    videoUrl: 'https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1720617043224-284.mp4',
    imagePosition: { x: 0, y: 195, width: 730, height: 740, curvature: 10 }
  },
  18: {
    videoUrl: 'https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1720617677923-981.mp4',
    imagePosition: { x: 200, y: 125, width: 500, height: 650, curvature: 50 }
  },
  19: {
    videoUrl: 'https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1720618736417-945.mp4',
    imagePosition: { x: 0, y: 385, width: 390, height: 520, curvature: 10 }
  },
  20: {
    videoUrl: 'https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1720619640056-719.mp4',
    imagePosition: { x: 43, y: 65, width: 445, height: 590, curvature: 10 }
  },
  21: {
    videoUrl: 'https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1720620191172-593.mp4',
    imagePosition: { x: 180, y: 0, width: 510, height: 570, curvature: 10 }
  },
};

module.exports.run = async function ({ event, api, args }) {
  try {
    const templateNumber = parseInt(args[0]);
    if (isNaN(templateNumber) || !(templateNumber in templates)) {
      return api.sendMessage("❌ Invalid template number! Please choose between 1-5.", event.threadID, event.messageID);
    }

    const template = templates[templateNumber];

    if (!event.messageReply || event.messageReply.attachments.length !== 1 || event.messageReply.attachments[0].type !== "photo") {
      return api.sendMessage("❌ Please reply to an image!", event.threadID, event.messageID);
    }

    const repliedImage = event.messageReply.attachments[0].url;
    const templateVideoPath = path.join(cacheFolder, `${uuidv4()}_template.mp4`);
    const repliedImagePath = path.join(cacheFolder, `${uuidv4()}_replied_image.png`);
    const roundedImagePath = path.join(cacheFolder, `${uuidv4()}_rounded_image.png`);
    const outputFilePath = path.join(cacheFolder, `${uuidv4()}_overlayed_video.mp4`);

    await downloadFile(template.videoUrl, templateVideoPath);
    await downloadFile(repliedImage, repliedImagePath);
    await createRoundedImage(repliedImagePath, roundedImagePath, template.imagePosition);

    const videoDuration = await getVideoDuration(templateVideoPath);
    const overlayCommand = [
      '-i', templateVideoPath,
      '-i', roundedImagePath,
      '-filter_complex', `"[1:v]scale=${template.imagePosition.width}:${template.imagePosition.height}[overlay];[0:v][overlay]overlay=${template.imagePosition.x}:${template.imagePosition.y}:enable='between(t,0,${videoDuration})'"`,
      '-pix_fmt', 'yuv420p',
      outputFilePath
    ];

    exec(`${ffmpeg} ${overlayCommand.join(' ')}`, (error, stdout, stderr) => {
      if (error) {
        console.error("FFmpeg error:", error);
        return api.sendMessage("❌ An error occurred during the overlay process.", event.threadID, event.messageID);
      }

      api.sendMessage({
        body: `✅ Video processing complete! Here is your video with template ${templateNumber}.`,
        attachment: fs.createReadStream(outputFilePath)
      }, event.threadID, () => {
        fs.unlinkSync(templateVideoPath);
        fs.unlinkSync(repliedImagePath);
        fs.unlinkSync(roundedImagePath);
        fs.unlinkSync(outputFilePath);
      }, event.messageID);
    });

  } catch (error) {
    console.error("Error:", error);
    return api.sendMessage("❌ An unexpected error occurred.", event.threadID, event.messageID);
  }
};

async function downloadFile(url, filePath) {
  const writer = fs.createWriteStream(filePath);
  const response = await axios({ url, method: 'GET', responseType: 'stream' });
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

async function getVideoDuration(videoPath) {
  return new Promise((resolve, reject) => {
    exec(`${ffmpeg} -i ${videoPath} 2>&1 | grep Duration`, (error, stdout) => {
      if (error) return reject(error);
      const match = stdout.match(/Duration: (\d{2}):(\d{2}):(\d{2})/);
      if (match) {
        const [hours, minutes, seconds] = match.slice(1).map(Number);
        resolve(hours * 3600 + minutes * 60 + seconds);
      } else {
        reject("Failed to get video duration.");
      }
    });
  });
}

async function createRoundedImage(inputPath, outputPath, position) {
  const { width, height, curvature } = position;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  const image = await loadImage(inputPath);
  
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(curvature, 0);
  ctx.lineTo(width - curvature, 0);
  ctx.quadraticCurveTo(width, 0, width, curvature);
  ctx.lineTo(width, height - curvature);
  ctx.quadraticCurveTo(width, height, width - curvature, height);
  ctx.lineTo(curvature, height);
  ctx.quadraticCurveTo(0, height, 0, height - curvature);
  ctx.lineTo(0, curvature);
  ctx.quadraticCurveTo(0, 0, curvature, 0);
  ctx.closePath();
  ctx.clip();

  ctx.drawImage(image, 0, 0, width, height);
  ctx.restore();

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
}

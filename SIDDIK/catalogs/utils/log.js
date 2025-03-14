const chalk = require("chalk");

module.exports = (message, type) => {
  switch (type) {
    case 'warn':
      console.log(chalk.hex('#FF00FF').bold("[ Warning ] » ") + message);
      break;
    case 'error':
      console.log(chalk.hex("#FF00FF").bold("[ Error ] » ") + message);
      break;
    default:
      console.log(chalk.hex('#FF0000').bold(`[ ${type} ] » `) + message);
      break;
  }
};

module.exports.loader = (message, type) => {
  switch (type) {
    case "warn":
      console.log(chalk.hex("#ff334b").bold("[ Siddik ] » ") + message);
      break;
    case 'error':
      console.log(chalk.hex("#b4ff33").bold("[ Siddik ] » ") + message);
      break;
    default:
      console.log(chalk.hex('#33ffc9').bold("[ Siddik ] » ") + message);
      break;
  }
};

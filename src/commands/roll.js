const RollDice = require('rolldice');

const roll = (bot, msg, suffix) => {
  if(!suffix.trim()){
    suffix = '2d6';
  }
  let rollResult = new RollDice(suffix);
  let response = '';
  
  if(rollResult.special){
    response = rollResult.special;
  } else if(rollResult.isValid){
    let label = rollResult.label ? ` for ${rollResult.label}` : '';
    response = `You rolled ${rollResult.result}${label}\r\nDetails: ${rollResult.details}`;
  } else {
    response = 'Invalid syntax. Try !roll help';
  }

  if(response.length > 2000){
    response = response.substr(0, 1996) + '...';
  }
  msg.channel.send(response);
};

exports.name = 'roll';
exports.cmd = roll;
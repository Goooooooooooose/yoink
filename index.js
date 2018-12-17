const Discord = require('discord.js');
const bot = new Discord.Client();
const botconfig = require("./botconfig.json");


bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity('this server', { type: 'WATCHING' });
});

bot.on('message', message => {
  if(message.channel.type === "dm") return;
  if(message.author.bot) return;
  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);
  let prefix = botconfig.prefix;
  
  
  if (message.content.toLowerCase().startsWith(prefix+"kick")) {
 
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Command Failed: Can't find user!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Command Failed: User does not have required permissions!");
    if(kUser.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Command Failed: Selected user can't be kicked!");
 
    let kickEmbed = new Discord.RichEmbed()
      .setDescription("Kick")
      .setColor("#000000")
      .addField("Kicked User", `${kUser} ${(kUser.id)}`)
      .addField("Kicked By", `<@${message.author.id}> ${(message.author.id)}`)
      .addField("Kicked In", message.channel)
      .addField("Time", message.createdAt)
      .addField("Reason", kReason);
 
    let kickChannel = message.guild.channels.find("name", "axell-logs");
    if(!kickChannel) return message.channel.send("Command Failed: Logs channel not found");
 
    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
 
    return;
 
  }
  
  if(message.content.toLowerCase().startsWith(prefix+"ban")){
 
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Command Failed: Can't find user!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Command Failed: User does not have required permissions!");
    if(bUser.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Command Failed: Selected user can't be banned!");
 
    let banEmbed = new Discord.RichEmbed()
      .setDescription("Ban")
      .setColor("#bc0000")
      .addField("Banned User", `${bUser} ${(bUser.id)}`)
      .addField("Banned By", `<@${message.author.id}> ${(message.author.id)}`)
      .addField("Banned In", message.channel)
      .addField("Time", message.createdAt)
      .addField("Reason", bReason);
 
    let banchannel = message.guild.channels.find("name", "axell-logs");
    if(!banchannel) return message.channel.send("Command Failed: Logs channel not found");
 
    message.guild.member(bUser).ban(bReason);
    banchannel.send(banEmbed);
 
  }
  
  if (message.content.toLowerCase().startsWith(prefix+"test")){
 
    const embed = {
      "title": "Test",
      "description": "I made this embed with [Embed Visualiser](https://leovoel.github.io/embed-visualizer/) and am learning to make a nice, stylish rule page for my server!",
      "url": "https://leovoel.github.io/embed-visualizer/",
      "color": 9177696,
      "timestamp": "2018-12-17T09:15:04.632Z",
      "footer": {
        "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
        "text": "footer text"
      },
      "thumbnail": {
        "url": "https://cdn.discordapp.com/embed/avatars/0.png"
      },
      "image": {
        "url": "https://cdn.discordapp.com/embed/avatars/0.png"
      },
      "author": {
        "name": "Solar",
        "url": "https://discordapp.com",
        "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
      },
      "fields": [
        {
          "name": "🤔",
          "value": "Ok this is one of my fields"
        },
        {
          "name": "😱",
          "value": "Pretty cool."
        },
        {
          "name": "🙄",
          "value": "You can make as many as you want!"
        },
        {
          "name": "<:thonkang:219069250692841473>",
          "value": "these two",
          "inline": true
        },
        {
          "name": "<:thonkang:219069250692841473>",
          "value": "are inline fields",
          "inline": true
        }
      ]
    };
    channel.send({ embed });

  }
  
});


bot.login(botconfig.token)

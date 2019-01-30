Save  New  Duplicate & Edit  Just Text
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
const botconfig = require("./botconfig.json");
const token = process.env.TOKEN;
const Discord = require("discord.js");
require('dotenv/config');
const http = require('http');
const port = process.env.PORT || 3000;
//This is a simple Server
http.createServer().listen(port);

const bot = new Discord.Client({diableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("FNPS");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  


  if(cmd === `${prefix}kick`){

    //kick @Fluxa asking for it

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.member.length(args[0]));
    if(!kUser) return message.channel.send("Can't find user!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Sry you are not a Mod!");
    if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("Kick")
    .setColor("#ffe500")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked by", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kickek in", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "logs");
    if(!kickChannel) return message.channel.send("Couldn't find logs channel.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
  }
  
  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.member.length(args[0]));
    if(!bUser) return message.channel.send("Can't find user!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Sry you are not a Mod!");
    if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person can't be kicked!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("Ban")
    .setColor("#ff0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned by", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned in", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    let banChannel = message.guild.channels.find(`name`, "logs");
    if(!banChannel) return message.channel.send("Can't find logs channel.d");

    message.guild.member(bUser).ban(bReason);
    banChannel.send(banEmbed);

    return;
  }
  
  if(cmd === `${prefix}report`){


    //*report @fluxa this is the reason

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.member.length(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user.");
    let reason = args.join(" ").slice(22);
message.channel.send(`Thanks for reporting ${rUser} for reason: ${reason}`)
    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#3d01d8")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported by", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", reason)
    .addField("Ping", "<@&roleID>")
    
    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Couldn't find reports channel.");

    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);






    return;
  }


  
  
  if(cmd === `${prefix}help`){
 
    let sicon = message.author.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Report Command Information")
    .setColor("#b504d8")
    .setThumbnail(sicon)
    .addField("Command usage", "_ _")
    .addField("*report (username) (reason)", "e.g *report @FN-Scrims#7505 for beeing toxic");


    return message.channel.send(botembed);
  }

})

bot.on('error', err => {
  console.log(err);
});

bot.login(botconfig.token);

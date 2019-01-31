const Discord = require("discord.js")


module.exports = bot => {


    console.log(`${bot.user.username} is online!`)
    
    var playing = [`over ${bot.users.size} users!`, "*FNPS", "help", `FN-Scrims`]
    var interval = setInterval(function() {
        var game = Math.floor((Math.random() * playing.length) + 0);
        bot.user.setGame(playing[game])
    }, 4 * 1000);



}
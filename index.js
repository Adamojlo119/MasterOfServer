const Discord = require("discord.js");
const client = new Discord.Client();
const MUSIC_PREFIX = "!";
const PREFIX = "$";

//
const OnlyFiles = ["pliki"]; //na tym kanale można wysyłać tylko pliki
const OnlyImages = ["screenshoty", "memowiarnia"]; //na tym kanale można wysyłać tylko zdjęcia
const OnlyMusic = "muzykowo"; //na tym kanale mogą być same komendy do music bota
const OnlySpam = "spam"; //na tym kanale można wszystko
//

client.on("ready", function() {
   console.log("Ready!");
});

client.on("message", function(message) {
  var Attachment = (message.attachments).array();
  var AttachmentUrl = (Attachment.toString() === "[object Object]") ? Attachment[0].url.toLowerCase() : message.content
  if (message.author.equals(client.user)) return;
   
   //kanały tekstowe
   if (!(message.channel.name === OnlyImages[0] || message.channel.name === OnlyImages[1] || message.channel.name === OnlyFiles[0] || message.channel.name === OnlyMusic)) {

      //spam
      if (message.channel.name === OnlySpam) {
       return;
      }
      
     if ((Attachment.toString() === "[object Object]" && !(AttachmentUrl.endsWith(".png") || AttachmentUrl.endsWith(".jpg") || AttachmentUrl.endsWith(".jpeg") || AttachmentUrl.endsWith(".gif"))) || (AttachmentUrl.endsWith(".png") || AttachmentUrl.endsWith(".jpg") || AttachmentUrl.endsWith(".jpeg") || AttachmentUrl.endsWith(".gif")) || (message.content.startsWith(MUSIC_PREFIX))) {
       message.delete();
       message.reply("**Proszę używać kanałów zgodnie z ich przeznaczeniem!**")
          .then(msg => msg.delete(5000))
          .catch(console.error);
       return;
     }

   }
   //pliki
   if (message.channel.name === OnlyFiles[0] && Attachment.toString() === "[object Object]" && !(AttachmentUrl.endsWith(".png") || AttachmentUrl.endsWith(".jpg") || AttachmentUrl.endsWith(".jpeg") || AttachmentUrl.endsWith(".gif"))) {
     return;
   }
   else if (message.channel.name === OnlyFiles[0] && !message.content.startsWith("https://") && (AttachmentUrl.endsWith(".png") || AttachmentUrl.endsWith(".jpg") || AttachmentUrl.endsWith(".jpeg") || AttachmentUrl.endsWith(".gif")) || (message.channel.name === OnlyFiles[0] && message.content != "")) {
     message.delete();
     message.reply("**Na tym kanale można wysyłać tylko róznego rodzaju pliki lub do nich linki!**")
        .then(msg => msg.delete(5000))
        .catch(console.error);
   }

   //screenshoty i memowiarnia
   if ((message.channel.name === OnlyImages[0] || message.channel.name === OnlyImages[1]) && (AttachmentUrl.endsWith(".png") || AttachmentUrl.endsWith(".jpg") || AttachmentUrl.endsWith(".jpeg") || AttachmentUrl.endsWith(".gif"))) {
    return;
   }
   else if ((message.channel.name === OnlyImages[0] || message.channel.name === OnlyImages[1]) && (!message.content.endsWith(".png") || !message.content.endsWith(".jpg") || !message.content.endsWith(".jpeg") || !message.content.endsWith(".gif"))) {
     message.delete();
     message.reply("**Na tym kanale można wysyłać tylko zdjęcia i linki ze zdjęciami!**")
        .then(msg => msg.delete(5000))
        .catch(console.error);
   }


   //muzykowo
   if ((message.channel.name === OnlyMusic && message.content.startsWith(MUSIC_PREFIX)) || (message.channel.name === OnlyMusic && message.author.id === "274543915070390282")) {
     return;
   }
   else if (message.channel.name === OnlyMusic) {
     message.delete();
     message.reply("**Na tym kanale można pisać tylko komendy do Music BOT'A!**")
        .then(msg => msg.delete(5000))
        .catch(console.error);
     return;
   }
   
   //komendy
   var args = message.content.substring(PREFIX.length).split(" ");
   if (!message.content.startsWith(PREFIX)) return;

   switch(args[0].toLowerCase()){
      case "":

          break;
   }

});

client.login(process.env.TOKEN);

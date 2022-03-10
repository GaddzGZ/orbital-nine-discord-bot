
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_MESSAGE_REACTIONS", ""] });
const rulesChannelId = '774414949916868628';                                                                                //ID to the #rules channel
let welcomeChannelID = "672927574904668187";                                                                                //ID of channel where the welcome message is sent

client.once('ready', () => {                                                                                                //Sends a message to the console when bot goes online
	console.log('Bot is online')

})               


//WELCOME MESSAGE:

client.on('guildMemberAdd', (member) => {                                                                                                                           //Runs code every time a new member joins. Creates the parameter (?) "member", which is the name of the new memnber that joined                                                                                                                                //Adds the role to the member that join
    
	let messageWelcome = `Welcome to the Orbital Nine Games server, ${member}! Please read the ${member.guild.channels.cache.get(rulesChannelId).toString()}`       //The welcome message

    setTimeout(welcomeMessage, 700);                                                        //Waits before sending the welcome message (to avoid the welcome message being sent before the user joining message appears)         
    function welcomeMessage() {                                                             //Creates a function that sends the message (to make the wait-command work)
        member.guild.channels.cache.get(welcomeChannelID).send(messageWelcome);             //Sends the welcome message to the right channel
    }                                                                                                                            
                                                                                            
})



//PS. I result objektet er userid først, så meldingsid

//VOTING SYSTEM:
let results = {};
let messageNumber = 0;
let messageIdList = [];
let count = {};
let winner = [];
let videoLink = "";
let userNickname = "";

let votingChannelId = "422297340356067329";                          //The ID of the channel that the voting counts in.

client.on('messageReactionAdd', (message, user) => {                       //Code executed everytime a reaction is added. The parameter "message" contains all information about the message being reacted to
    let similarUser = false;                                             //make similar false everytime a reaction is added. (checks it later)
    


    if(message.message.channel.id == votingChannelId) {              //an if-test that checks if a reaction is added in a spesific channel.

        if(message.message.attachments.size > 0) {                      //if-test that checks if message contains an attachment
            let messageId = message.message.id;
            let userId = user.id;
            let messageType = message.message.attachments.first().contentType;      //dSaves the attachment type in a variable
            messageType = messageType.substring(0, 5);                              //first five characters should be "video".

            if (messageType == "video" || messageType == "image") {                                                                       //Checks if attachment is video.
                videoLink = message.message.attachments.first().url;
                userNickname = message.message.author.username; 
                for (let i = 0; i < messageNumber; i++) {                                                        //Loop that checks through the results to see if the user have reacted to the same message earlier
                    if (results["Message" + i][0] == userId && results["Message" + i][1] == messageId) {
                        similarUser = true;
                    }
                }
                if (similarUser == false) {                                         //If the similarUser is still false after the check like 5 lines up, add the new info to the results.
                    results["Message" + messageNumber] = [];                
                    results["Message" + messageNumber].push(userId);                        //Adds the user id that posted the video as first element in array
                    results["Message" + messageNumber].push(messageId);                     //Adds the id of the message as the second element in the array.
                    results["Message" + messageNumber].push(videoLink);                     //Adds the link to the attachment as the third element in the array.
                    results["Message" + messageNumber].push(userNickname);                  //Adds the username of the poster as forth element in the array
                    messageIdList.push(results["Message" + messageNumber][1])
                    messageNumber++
            }
            
            
            }

        }

    }
    
    
})     

let dublicate = false;
setInterval(dateCheck, 600000);                                            //Checks date every 10th minute.

function dateCheck () {
    let today = new Date(day)
    if (today.getDay() == 3 && dublicate == false) {
        counting();
        dublicate = true;
    }
    if(today.getDay() == 4) {
        dublicate = false;
    }
}

function counting () {                                                   //function that counts reactions, and figures out who the winner/winners is/are.
    messageIdList.forEach((x) => {
        count[x] = (count[x] || 0) + 1;
    });
    console.log(count);
    
    let numberOfVotes;
    let k = 0;                                                            //In previous three lines or something, every message with attachment that have been reacted to have been added to count object. From here and down, the votes are counted
    for (win in count) {                                                  //goes through the count object                                  
        if(count[win] >= k) {                                             // checks if the message are having more/similar votes than the previous. Adds it to the list and removes other items in the winner list.
            if (count[win] == k) {
                winner.push(win);
                numberOfVotes = count[win];
            }
            if (count[win] > k) {
                winner = [];
                winner.push(win);
                k = count[win];
                numberOfVotes = count[win];
            }
        }
    } 
    for (k in results) {                                                //Loop that finds the information saved about the winning video
        if (results[k][1] == winner[0]) {
            userNickname = results[k][3];
            videoLink = results[k][2];
            userId = results[k][0];
        }
    }


    const winnerChannel = client.channels.cache.find(channel => channel.id === votingChannelId);                   //Gets the channel to send the winning message in.
    winnerChannel.send({files: ['./sow.png']});                                                                     //Sends an image as a part of the winning message
    setTimeout(sendText, 3000)                                                                                      //Waits 5 sec to let the image load, then sends the winning text and mentions in the function under.
    function sendText() {
        winnerChannel.send("**Every week at Saturday, midnight (UTC+0), the video/image post in the #levels channel with the most reactions is chosen as the \"Solution of the week\".**\ \nThe member that gets the solution of the week will get the role \"Solution of the Week\" until a new winner is chosen next week.\n PS: This is just a test message to see if everything works as it should. I (Gaddz) will tell you when this bot is up and running as it should")
        winnerChannel.send("**This week's best solution is by <@" + userId + ">, with " + numberOfVotes + " votes. Congratulations:partying_face: . Enjoy your own status for the next week!**\ \nYou can see the video attached to this post: " + videoLink)
    }
    


    results = {};                                       //Resets everytning when the new week starts
    messageNumber = 0;
    messageIdList = [];
    count = {};
    winner = [];
}
// :)
client.login(process.env.BOT_TOKEN)

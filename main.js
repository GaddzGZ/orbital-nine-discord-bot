const Discord = require('discord.js');
const client = new Discord.Client();
const rulesChannelId = '774414949916868628'

client.once('ready', () => {
	console.log('Bot is online')

});               // WELCOME MESSAGE START

client.on('guildMemberAdd', member => {
	const messageWelcome = `Welcome to the Orbital Nine Games server, ${member}! Please read the ${member.guild.channels.cache.get(rulesChannelId).toString()}`


	const channel = member.guild.channels.cache.find(channel => channel.name === "welcome");
	if (!channel) return;
	setTimeout(welcomeMessage, 500)
	function welcomeMessage() {
		channel.send(messageWelcome);
	}	
});             // WELCOME MESSAGE END













client.login(process.env.BOT_TOKEN);

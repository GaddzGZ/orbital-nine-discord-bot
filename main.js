const Discord = require('discord.js');
const client = new Discord.Client();
const rulesChannelId = '775440595458981949'

client.once('ready', () => {
	console.log('Bot is online')

});               // WELCOME MESSAGE START

client.on('guildMemberAdd', member => {
	const messageWelcome = `Welcome tdfso oour server, ${member}, please read the ${member.guild.channels.cache.get(rulesChannelId).toString()} in rules channel!`


	const channel = member.guild.channels.cache.find(channel => channel.name === "general");
	if (!channel) return;
	setTimeout(welcomeMessage, 500)
	function welcomeMessage() {
		channel.send(messageWelcome);
	}	
});             // WELCOME MESSAGE END













client.login(process.env.BOT_TOKEN);

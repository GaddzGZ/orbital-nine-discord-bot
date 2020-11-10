const Discord = require('discord.js');
const client = new Discord.Client();
const rulesChannelId = '775440595458981949'

client.once('ready', () => {
	console.log('Bot is online')

});

client.on('guildMemberAdd', member => {

	const channel = member.guild.channels.cache.find(channel => channel.name === "general");
	if (!channel) return;

	channel.send(`Welcome to our server, ${member}, please read the ${member.guild.channels.cache.get(rulesChannelId).toString()} in rules channel!`)
});














client.login('Nzc0NzY1OTYzMzU3ODQ3NTYy.X6cjCA.mIsL20YAH-e7j1zRHRseI8EHD1A');

const fs = require('fs');
const Discord = require('discord.js');
const CfgFile = require('./config');

global.queue = new Map();

const client = new Discord.Client();
const commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    commands.set(command.name, command);
}

console.log(commands);
client.once('ready', () => {
    console.log('Ranita is online.');
})
client.login(CfgFile.cfg.token);
client.on('message', message => {
    handler(message);
})

async function handler(message){
    let commandName = message.content.split(" ")[0].replace(CfgFile.cfg.prefix, "");
    let args = message.content.split(" ").slice(1);
    let command = commands.get(commandName);

    if(message.author.bot) return;
    if(!message.content.startsWith(CfgFile.cfg.prefix)) return;

    try{
        command.executioner(message, args, client);
    } catch(error){
        console.log(error);
        message.reply('Error al ejecutar el comando');
    }
}



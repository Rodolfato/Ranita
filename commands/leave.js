module.exports = {
    name: 'leave',
    description: 'El bot se va del canal de voz en el cual se encuentra.',

    async executioner(message, args, client) {
        if (message.guild.voiceConnection) {
            await message.guild.voiceConnection.disconnect() 
            message.reply('me fui del canal de voz.');               
        }
        else message.reply('no me puedo ir de un canal de voz en el cual no estoy.');
    }
}
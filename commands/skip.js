module.exports = {
    name: 'skip',
    description: 'Se salta la canción que actualmente se esta tocando.',
    executioner(message, args, client) {
        const serverQueue = queue.get(message.guild.id);
        if (!message.member.voiceChannel) return message.reply('tienes que estar en un canal de voz para saltarte la canción actual.');
        if (!serverQueue) return message.reply('no hay una canción para saltar.');
        serverQueue.connection.dispatcher.end();
    },
};
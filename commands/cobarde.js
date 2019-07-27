module.exports = {
    name: 'cobarde',
    description: 'COBAAAAAAAAAARDE',

    async executioner(message, args, client){
        let voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) return message.reply('Tienes que estar en un canal de voz para reproducir.');
        voiceChannel.join()
        .then(connection => {
            const dispatcher = connection.playFile('./mp3/cobAAAAARDE ogg.ogg', {
                passes: 10,
                volume: 1.5,
                bitrate: 1250
            });
        }).catch(console.error);

        
    }
    


}
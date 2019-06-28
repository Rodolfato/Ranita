module.exports = {
    name: 'join',
    description: 'El bot hace ingreso al canal de voz en el cual se encuentra el usuario.',

    executioner(message, args, client){
        if(message.member.voiceChannel){
            message.member.voiceChannel.join()
                .then(connection => {
                    message.reply('entre al canal de voz');

                });
        }
        else message.reply('tienes que estar en un canal de voz para poder ingresar.');
    }
}
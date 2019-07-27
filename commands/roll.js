module.exports = {
    name: 'roll',
    description: 'Rolls a number depending on the arguments given',

    executioner(message, args, client){
        if(!isNaN(args[0]))
        {
            let maxSide = parseInt(args[0], 10);
            if (!args[0]) maxSide = 6;     
            let randomInteger = Math.floor(Math.random() * maxSide) + 1;
            if (maxSide < 1) message.reply('eres un saco de hueas');
            else message.channel.send('```' + message.member.user.username + ' lanzó un dado de ' + maxSide + ' caras```' + '\n> **' + randomInteger + '**');
        }
        else
        {
            message.reply('número no válido.');
        }          
    }

}

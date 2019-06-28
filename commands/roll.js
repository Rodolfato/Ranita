module.exports = {
    name: 'roll',
    description: 'Rolls a number depending on the arguments given',

    executioner(message, args, client){
        let maxSide = parseInt(args[0], 10);
        if (!args[0]) maxSide = 6;     
        let randomInteger = Math.floor(Math.random() * maxSide) + 1;
        if (maxSide < 1) message.channel.send('Eres un saco de hueas');
        else message.channel.send('El dado lanzó un ' + randomInteger);          
    }

}

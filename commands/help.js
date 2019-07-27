module.exports = {
    name: 'help',
    description: 'Enumera todos los comandos disponibles, sus funciones y como usarlos',

    executioner(message, args, client)
    {
        const commandNames = [
            'help',
            '8ball',
            'imgsearch',
            'join',
            'leave',
            'play',
            'skip',
            'roll',
            'cobarde',
            'forward',
            'mtg'
        ]

        const commandDesc = [
            'Enumera todos los comandos disponibles, sus funciones y como usarlos',
            'Hace una pregunta a la bola 8 mágica',
            'Busca una imagen en el internet, utilizando el portal dogpile.',
            'El bot hace ingreso al canal de voz en el cual se encuentra el usuario.',
            'El bot se va del canal de voz en el cual se encuentra.',
            'Añade una canción a la lista de reproducción.',
            'Se salta la canción que actualmente se esta tocando.',
            'Entrega un número aleatorio entre el 1 y un argumento entregado.',
            'Cobarde',
            'Adelanta la canción que se esta reproduciendo una cierta cantidad de segundos.',
            'Responde una descripción de una carta del juego Magic the Gathering'
        
        ]

        const commandUse = [
            '.help [nombre del comando]',
            '.8ball [pregunta]',
            '.imgsearch [término(s) de busqueda]',
            '.join',
            '.leave',
            '.play [término(s) de busqueda | link]',
            '.skip',
            '.roll [caras del dado]',
            '.cobarde',
            '.forward [tiempo en segundos]',
            '.mtg'

        ]

        if(args[0])
        {
            let indexOfCommand = commandNames.indexOf(args[0]);
            console.log(indexOfCommand);
            if(!commandNames[indexOfCommand]) message.reply('comando no encontrado.');
            else message.channel.send('```' + commandNames[indexOfCommand] + '\n' + commandDesc[indexOfCommand] + '\n' + commandUse[indexOfCommand] + '     ```');
        }

        if(!args[0])
        {
            let allCommands = '```Comandos disponibles:\n\n';
            for (let command of commandNames){
                let indexOfCommand = commandNames.indexOf(command);
                allCommands += commandNames[indexOfCommand] + '\n\t' + commandDesc[indexOfCommand] + '\n\t' + commandUse[indexOfCommand];
                allCommands += '\n\n'                
            }
            allCommands += '```'
            message.channel.send(allCommands);

        }
    }


}
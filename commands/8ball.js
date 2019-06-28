module.exports = {
    name: '8ball',
    description: 'Hace una pregunta a la bola 8 mágica',
    
    executioner(message, args, client){
        const answers = [
            'En mi opinión, sí.',
            'Respuesta vaga, vuelve a intentarlo.',
            'No cuentes con ello.',
            'Es cierto.',
            'Pregunta en otro momento.',
            'Debes confiar en ello.',
            'Mi respuesta es no.',
            'Es decididamente así.',
            'Será mejor que no te lo diga ahora.',
            'Mis fuentes me dicen que no.',
            'Probablemente.',
            'No puedo predecirlo ahora.',
            'Las perspectivas no son buenas.',
            'Buen pronóstico.',
            'Todo apunta a que sí.',
            'Concéntrate y vuelve a preguntar.',
            'Sin duda.',
            'Sí.',
            'Muy dudoso.',
            'Puede ser.',
            'Definitivamente sí.'
        ]
        let isQuestion = 0;
        for(const char of message.content){
            if(char == '?'){
                isQuestion = 1;
            }
        }
        if(isQuestion == 1){
            let randAnswer = Math.floor(Math.random() * 1000000000000);
            let answerIndex = Math.round(randAnswer / 47619047619);
            console.log('Bola magica index: ' + answerIndex);
            message.reply('la bola mágica dice: ' + answers[answerIndex]);
        }
        else message.reply('la bola mágica solo responde a preguntas.');

    }

}
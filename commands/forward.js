const YTDL = require('ytdl-core');
const prism = require('prism-media');
const playCommand = require('./play.js');

module.exports = {
    name: 'forward',
    description: 'Adelante la canción actual una cierta cantidad de segundos',

    async executioner(message, args, client)
    {
        if (!isNaN(args[0]) || parseInt(args[0], 10) < 1)
        {
            let serverQueue = queue.get(message.guild.id);
            let forwardTime = parseInt(args[0], 10);
            let time;
            
            if (!serverQueue) message.reply('no hay canciones en la lista de reproducción.');
            else
            {
                const song = serverQueue.songs[0];
                const songSeconds = song.duration;
                time = this.msToSec(serverQueue.dispatcher.time);
                const startTime = time + forwardTime;

                if (startTime >= songSeconds) message.reply('tiempo dado excede la duración total de la canción.');
                else
                {
                    let queueConstruction = {
                        textChannel: message.channel,
                        voiceChannel: message.member.voiceChannel,
                        connection: null,
                        songs: serverQueue.songs.slice(),
                        playing: true,
                        dispatcher: null
                    };

                    try {
                        var connection = await message.member.voiceChannel.join();
                        queueConstruction.connection = connection;
                    }
                    catch (error) {
                        console.log(error);
                        queue.delete(message.guild.id);
                        return message.reply(error);
                    }

                    queue.get(message.guild.id).songs = [];
                    const input = await YTDL(song.url, { filter: 'audioonly' });
                    const transcoder = new prism.FFmpeg({
                        args: [
                            '-analyzeduration', '0',
                            '-loglevel', '0',
                            '-f', 's16le',
                            '-ar', '48000',
                            '-ac', '2',
                            '-ss', `00:${this.getMinutes(startTime)}:${this.getRemainingSeconds(startTime)}`,                            
                        ],
                    });
                    console.log(`00:${this.getMinutes(startTime)}:${this.getRemainingSeconds(startTime)}`);
                    const opus = new prism.opus.Encoder({ rate: 48000, channels: 2, frameSize: 960 });
                    input
                        .pipe(transcoder)
                        .pipe(opus);
                    transcoder.on('error', console.log);

                    const dispatcher = serverQueue.connection.playOpusStream(opus);
                    queueConstruction.dispatcher = dispatcher;
                    queue.set(message.guild.id, queueConstruction);
                    console.log(queue.get(message.guild.id).songs); 

                    dispatcher
                    .on('end', () => {
                        console.log('La canción que fue adelantada terminó.');
                        queue.get(message.guild.id).songs.shift();
                        console.log(queue.get(message.guild.id).songs[0]);
                        playCommand.play(message, queue.get(message.guild.id).songs[0]);
                    })
                    .on('error', error => {
                        console.error(error);
                    });
                    
                }
            }
        }
        else message.reply('Tiempo no válido.');
    },
    /**
     * Transforma un timepo en milisegundos a segundos.
     */
    msToSec(milsec)
    {
        let timeInSec = Math.trunc(milsec / 1000);
        return timeInSec;
    
    },

    getMinutes(seconds)
    {
        const final = Math.trunc(seconds/60);
        const stringFinal = final.toString();
        if (stringFinal.length == 1) return '0' + stringFinal;
        else return stringFinal
    },

    getRemainingSeconds(seconds)
    {
        const final = seconds%60;
        const stringFinal = final.toString();
        if(stringFinal.length == 1) return '0' + stringFinal;        
        else return stringFinal
    }
}
const YTDL = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('');

module.exports = {
    name: 'play',
    description: 'Añade una canción a la lista de reproducción',

    async executioner(message, args, client){
        let serverQueue = queue.get(message.guild.id);
        let voiceChannel = message.member.voiceChannel;
        let searchTerms = message.content.replace('.play ', '');

        if(!voiceChannel) return message.reply('tienes que estar en un canal de voz para reproducir música.');
        this.playByName(message, searchTerms, serverQueue, voiceChannel);       

    },

    async playByName(message, songName, serverQueue, voiceChannel){
        let videos = await youtube.searchVideos(songName, 1);
        let video = await youtube.getVideoByID(videos[0].id);
        this.playByURL(message, `https://www.youtube.com/watch?v=${video.id}`, serverQueue, voiceChannel);
        console.log(video);
    },

    async playByURL(message, songURL, serverQueue, voiceChannel){

        let songInfo = await YTDL.getInfo(songURL);
        let song = {
            title: songInfo.title,
            url: songInfo.video_url,
        };

        if(!serverQueue){
            let queueConstruction = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                playing: true
            };

            queue.set(message.guild.id, queueConstruction);
            queueConstruction.songs.push(song);

            try{
                var connection = await voiceChannel.join();
                queueConstruction.connection = connection;
                this.play(message, queueConstruction.songs[0]);
            }
            catch(error){
                console.log(error);
                queue.delete(message.guild.id);
                return message.reply(error);
            }
        }
        else{
            serverQueue.songs.push(song);
            return message.channel.send(`"${song.title}" fue añadida a la lista de reproducción.`);
        }

    },

    play(message, song){
        let serverQueue = queue.get(message.guild.id);

        if(!song){
            serverQueue.voiceChannel.leave();
            queue.delete(message.guild.id);
            return;
        }
        message.channel.send('Ahora suena ' + '"' + song.title + '".');
        const dispatcher = serverQueue.connection.playStream(YTDL(song.url))
            .on('end',() => {
                console.log('La canción terminó.');
                serverQueue.songs.shift();
                message.channel.send('"' + song.title + '"' + ' terminó.');
                this.play(message, serverQueue.songs[0]);
            })
            .on('error', error => {
                console.error(error);
            });
            
    }

}

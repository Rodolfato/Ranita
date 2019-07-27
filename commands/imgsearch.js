const Cheerio = require('cheerio');
const Request = require('request');

module.exports = {
    name: 'imgsearch',
    description: 'Busca una imagen en el internet, utilizando el portal dogpile.',

    executioner(message, args, client)
    {
        let searchTerms = message.content.replace('.imgsearch ', '');
        let options = {
            url: 'http://results.dogpile.com/serp?qc=images&q=' + searchTerms,
            method: 'GET',
            headers: {
                'Accept': 'text/html',
                'User-Agent': 'Chrome'
            }

        };
        Request(options, function(error, response, responseBody){
            if(error){
                message.reply('hubo un error al ejecutar el comando.');
                return;
            }

            $ = Cheerio.load(responseBody);

            let links = $('.image a.link');

            let urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

            console.log(urls);

            if(!urls.length){
                message.reply('no se encontraron resultados con los términos ingresados.');
                return;
            }
            message.channel.send(urls[0]);
        });    
    }

}
module.exports =  {
    name: 'mtg',
    description: 'Responde una descripción de una carta del juego Magic the Gathering',

    executioner(message, args, client)
    {
        const markdownStart = '```';
        const markdownEnd = '```';
        const descriptions = [
            'Cry to the sun and watch as even your tears forsake you.',
            'When nothing remains, everything is equally possible.',
            'Somehow goblins found a tactical advantage by sending a clown to war.',
            'There are two ways to resolve puzzling situations: thoughtful contemplation or force. After thoughtful contemplation, most barbarians choose force.',
            'Throw enough goblins at any problem and it should go away. At the very least, there’ll be fewer goblins.',
            'He raged at the world, at his family, at his life. But mostly he just raged.',
            'I don’t know why people say a double-edged sword is bad. It’s a sword. With two edges.',
            'When everything hangs on a single moment, be sure you choose the right moment.',
            'As I died, I rejoiced. I would see my family again. But then I woke up back on the battlefield. Back in hell.',
            'This is the source, the line unbroken since the calamity that brought such monsters to our shores.',
            'Some claim that rage is a cloud that obscures thought and vision. But I can assure you—I’ve never seen with greater clarity.',
            'Of course you should fight fire with fire. You should fight everything with fire.',
            'I will flay the skin from your flesh and the flesh from your bones and scrape your bones dry. And still you will not have suffered enough.',
            'It doesn’t think.\nIt doesn’t feel.\nIt doesn’t laugh or cry.\nAll it does from dusk till dawn\nis make the soldiers die.',
            'It is not that you will go mad. It is that you will beg for madness.',
            'Sometimes death comes knocking. Sometimes it tears down the walls.',
            "Do the innocent pay for the crimes of the guilty? Of course they do. That's the fate of the weak.",
            'When you find yourself teetering on the edge of oblivion, mine will be the hands taking pleasure in giving you the final push.',
            'When the air burns, only death breath deep.',
            'Your pleas for death shall go unheard.',
            'The wizard who reads a thousand books is powerful. The wizard who memorizes a thousand books is insane.',
            'Of course I’ve gone mad. The little man who crawled out of my eyes was quite clear on this.',
            'Must not all things at the last be swallowed up in death?',
            'As you inject the viscus vitae into the brain stem, don’t let the spastic moaning bother you. It will soon become music to your ears.',
            'His slaves crave death more than they desire freedom. He denies them both.',
            'Your first mistake was thinking I would let you live long enough to make a second'
        ]

        let randomInteger = Math.floor(Math.random() * descriptions.length);
        console.log('.mtg number: ' + randomInteger);
        if (!markdownEnd) message.channel.send(markdownStart + descriptions[randomInteger]);
        else message.channel.send(markdownStart + descriptions[randomInteger] + markdownEnd);
    }
}
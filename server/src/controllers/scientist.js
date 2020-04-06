const histories = {
    Ox7: "первый",
    Jk3: "второй",
    Sp4: "третий"
};

let glossary = 0;

function scientist(io, socket) {

    socket.on('getHistory', id => {
        let history = '';
        if(histories.hasOwnProperty(id)) {
            history = histories[id];
        }
        io.emit('setHistory', history);
    });

    socket.on('setGlossary', data => {
        glossary = data;
        io.emit('getGlossary', glossary);
    })
}

module.exports = scientist;
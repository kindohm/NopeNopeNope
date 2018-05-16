const vscode = require('vscode');
const window = vscode.window;
const Range = vscode.Range;
const commands = vscode.commands;
const Position = vscode.Position;

let interval;

const patterns = ['d1 $ s "bd*3"', 'd1 $ s "sn*4"', 'd1 $ s "cp(3,8)"', 'd1 $ s "cp bd*2 sd(3,8)" # pan rand', 'd1 $ s "bd*8" # pan (slow 3 $ saw)'];

const start = () => {
    clearInterval(interval);
    setInterval(doInterval, 2000);
};

const stop = () => {
    clearInterval(interval);
}

const doInterval = () => {
    // const editor = window.activeTextEditor;
    const editors = window.visibleTextEditors;
    const editor = editors[0];
    const document = editor.document;
    const lineCount = document.lineCount;
    const lastLine = document.lineAt(lineCount - 1);
    const lastLineLength = lastLine.text.length;
    const range = new Range(0, 0, lineCount - 1, lastLineLength > 0 ? lastLineLength : 0);

    editor.edit((editBuilder) => {
        try {
            editBuilder.delete(range);
            editBuilder.insert(new Position(0,0), patterns[getRandomIntInclusive(0, patterns.length-1)]);
            // editBuilder.replace(range, patterns[getRandomIntInclusive(0, 2)])
        } catch (err) {
            console.error(err);
        }
    }).then(success => {
        console.log('eval multi');
        commands.executeCommand('tidal.evalMulti');
    });
    ;
};

const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.start = start;
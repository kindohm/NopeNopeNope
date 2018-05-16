const vscode = require('vscode');
const conductor = require('./conductor');
const commands = vscode.commands;

function activate(context) {

    let disposable = commands.registerCommand('nopenopenope.start', function () {
        conductor.start();
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;
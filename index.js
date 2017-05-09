/*
    My Templating Engine


    Things to take care about =>
        0. Exit                     [X] 
        1. Promise Chains           [X]
        2. SQL Query Hits           [X]
        3. HTTP/HTTPS Calls         [X]
        4. Stubs                    [X]
        5. boilerplates             [X]
        6. imports                  [X]
        7. prototype functions      [X]


    Flow

        - Welcome Master and then ask him what he wants
        - Read Master's input
        - Ask Master the detailed requirements of the task
        - Spun out the code for Master like a pro with amazing indentation
        - Copy it to the clipboard for Master
        - Ask for Master's permisson to Exit
*/

var
    /* Dependencies */
    READLINE                    = require('readline'),
    CLIBOARD                    = require('clipboardy'),

    /* Project Specific Config */
    WELCOME_MESSAGE             = '\nSir, your code slave is at your service. Your Wish is my command.\n'
    QUESTIONS                   = {
        BEGIN                   : 'What would you like automated? \n' +
                                    'Type : \n' +
                                        '\t1     to     Brew a new Promise Chain \n' +
                                        '\t2     to     Brew a new SQL Query Hit \n' +
                                        '\t3     to     Brew a new HTTP/HTTPS Call \n' +
                                        '\t4     to     Brew a new Stub \n' +
                                        '\t5     to     Brew Boiler Plate \n' +
                                        '\t6     to     Brew Imports \n' +
                                        '\t7     to     Brew a new prototype function \n' +
                                        '\t0     to     Exit\n\n',
        Q_CHAIN                 : 'Master please list the functions you need (comma separated and in order) :\n\n',
        Q_CHAIN_FUNC_PARAMS     : '\nMaster please list the parameters (comma separated and in order) and if it returns anything to the next function in queue chain (separated by :) accepted by your function ',
        BOILERPLATE             : 'Master please state the name for your function :\n\n',
        STUB                    : 'Master please state the name for your stub\'s function :\n\n',
        PROTOTYPE_FUNC          : 'Master please state the parent function name followed by prototype function name (separated by a space) : \n\n'
    }

function automateMyCode(){
    var
        self = this;

    self.readLine = READLINE.createInterface({
                        input: process.stdin,
                        output: process.stdout
                    });

    /*
        Welcome Master
    */
    console.log(WELCOME_MESSAGE);

    self.initiateQuestionScreen();
}

automateMyCode.prototype.initiateQuestionScreen = function(){
    var
        self = this;

    self.readLine.question(QUESTIONS.BEGIN,(answer) => {
        switch(answer){
            case '1' :
                        self.createAPromiseChain();
                        break;
            case '2' :
                        self.createSqlQueryHit();
                        break;
            case '3' :
                        self.createHttpHit();
                        break;
            case '4' :
                        self.createStub();
                        break;
            case '5' :
                        self.createBoilerPlate();
                        break;
            case '6' :
                        self.createImports();
                        break;
            case '7' :
                        self.createPrototypeFunction();
                        break;
            case '0' :
                        console.log("\nWas Great working for you Master!\n");
                        process.exit(0);
            default :
                        console.log("\nThis ain't what I am here for!\n")
                        process.exit(0);
                        break;
        };
    });
};

automateMyCode.prototype.createAPromiseChain = function(){
    var
        self    = this,
        output  = 'Q(undefined)\n';


    /*
        Ask master for functions
    */
    self.readLine.question(QUESTIONS.Q_CHAIN,(answer) => {

        answer = answer.split(',');

        /*
            Ask Master for function parameters
        */
        self.askForFunctionParametersForQueueChain((output) => {

            /*
                adding fail to the error chain
            */

            output += "\t.fail( (error) => {\n\t\tL.error('error in q chain', error);\n\t})\n";
            output += "\t.fin( () => {\n\t\t\n\t});";

            console.log("\nMaster your code - \n\n", output);
            self.copyToClipBoard(output);

            return self.initiateQuestionScreen();
        },output,answer);

    });
};

automateMyCode.prototype.askForFunctionParametersForQueueChain = function(cb,output,functionNameArray,index,dataReturned){
    var
        self                =  this,
        index               = index ? index : 0,
        dataReturned        = dataReturned ? dataReturned : '';

    /*
        Done with all function definitions
        Time to spun out the code
    */
    if(index == functionNameArray.length){
        return cb(output);
    } else {
        var
            functionName        = functionNameArray[index],
            questionToAskMaster = QUESTIONS.Q_CHAIN_FUNC_PARAMS + functionName + ' :\n\n',
            parameterDisplay    = '',
            functionDisplay     = '',
            parametersCount     = 0,
            dataToBeReturned    = '';

        self.readLine.question(questionToAskMaster,(answer) => {

            answer                      = answer.split(',');

            dataToBeReturned            = answer[answer.length -1].split(':');
            answer[answer.length -1]    = dataToBeReturned[0];
            dataToBeReturned            = answer.length > 1 ? dataToBeReturned[dataToBeReturned.length - 1] : '';

            answer.forEach(function(parameterName){
                if(parameterName){
                    if(parametersCount === 0)
                        parameterDisplay += parameterName;
                    else
                        parameterDisplay += ', ' + parameterName;

                    ++parametersCount;
                }
            });

            functionDisplay = 'return self.' + functionName + '(' + parameterDisplay + ');';

            output += '\t.then( ('+ dataReturned +') => {\n\t\t'+ functionDisplay +'\n\t})\n';

            self.askForFunctionParametersForQueueChain(cb,output,functionNameArray,++index,dataToBeReturned);
        });
    }
};

automateMyCode.prototype.createBoilerPlate = function(){
    var
        self = this,
        output;

    /*
        Ask Master for parent function's name
    */
    self.readLine.question(QUESTIONS.BOILERPLATE,(answer) => {
        output = 'function ' + answer + '() {\n';
        output += '\tvar\n';
        output += '\t\tself\t\t= this;\n';
        output += '}\n';

        console.log(output);
        self.copyToClipBoard(output);

        return self.initiateQuestionScreen();
    });
};

automateMyCode.prototype.createStub = function(){
    var
        self = this,
        output;

    /*
        Ask Master for parent function's name
    */
    self.readLine.question(QUESTIONS.STUB,(answer) => {

        output = '\n(function(){\n';
        output += '\tvar stub = new ';
        output += answer;
        output += '();\n';
        output += '}());\n';

        console.log(output);

        return self.initiateQuestionScreen();
    });
};

automateMyCode.prototype.createImports = function(){
    var
        self    = this,
        output  = '';

    output += '/*jshint multistr: true ,node: true*/\n';
    output += '"use strict"\n';
    output += "\n";
    output += 'var\n';
    output += "    /* NODE internal */\n";
    output += "    UTIL                = require('util'),\n";
    output += "    FILE                = require('file'),\n";
    output += "    PATH                = require('path'),\n";
    output += "\n";
    output += "    /* NPM Third Party */\n";
    output += "    MOMENT              = require('moment'),\n";
    output += "    _                   = require('lodash'),\n";
    output += "    VALIDATOR           = require('validator'),\n";
    output += "    Q                   = require('q'),\n";
    output += "\n";
    output += "    /* NPM Paytm */\n";
    output += "    RQ                  = require('rqueue'),\n";
    output += "    RECHARGE_CONFIG     = require('recharge-config'),\n";
    output += "    SQLWRAP             = require('sqlwrap'),\n";
    output += "    PROC                = require('ptmproc'),\n";
    output += "    L                   = require('lgr');\n";

    console.log(output);
    self.copyToClipBoard(output);

    return self.initiateQuestionScreen();
};

automateMyCode.prototype.createSqlQueryHit = function(){
    var
        self    = this,
        output  = '';

    output += "function() {\n";
    output += "    var\n";
    output += "        self        = this,\n";
    output += "        query       = '';\n";
    output += "    \n";
    output += "        self.dbinstance.exec(function (err, data){\n";
    output += "            if(err || !(data)) {\n";
    output += "                L.error('error', err);\n";
    output += "            } else{\n";
    output += "                \n";
    output += "            }\n";
    output += "        }, 'SLAVE*', query,dataToDump); \n";
    output += "};\n";

    console.log(output);
    self.copyToClipBoard(output);

    return self.initiateQuestionScreen();
};

automateMyCode.prototype.createHttpHit = function(){
    var
        self    = this,
        output  = '';

    output += "self.requestor.hit(apiOpts, {}, function(error, statcode, body, header, resp) {\n";
    output += "    if(error || statcode != 200) {\n";
    output += "         \n";
    output += "    } else{\n";
    output += "         \n";
    output += "    }\n";
    output += "});\n";

    console.log(output);
    self.copyToClipBoard(output);

    return self.initiateQuestionScreen();
};

automateMyCode.prototype.createPrototypeFunction = function(){
    var
        self        = this,
        output      = '',
        parent      = '',
        child       = '';

    /*
        Ask Master for parent function's name
    */
    self.readLine.question(QUESTIONS.PROTOTYPE_FUNC,(answer) => {

        answer  = answer.split(' ');
        parent  = answer[0];
        child   = answer[1];


        output = parent;
        output += '.prototype.';
        output += child;
        output += ' = function() {\n';
        output += '\tvar\n';
        output += '\t\tself\t\t= this;\n';
        output += '}\n';

        console.log(output);
        self.copyToClipBoard(output);

        return self.initiateQuestionScreen();
    }); 
};

automateMyCode.prototype.copyToClipBoard = function(output){
    var
        self = this;

    /*
        Copy it to clipboard for master
    */
    CLIBOARD.writeSync(output);
    console.log("\nEverything has been copied to the clipboard for you Master!\n\n");

    return;
};

(function(){
    var X = new automateMyCode();
}());

/**
 * This utility module helps to demonstrate following features
 * a. Signing a message by an IrChain user
 * b. Finding the account address using which the message was signed
 */
var Webu = require('../index.js');
var ircURL = '';
var defaultAc = '';
var defaultAcPWD = '';
var signatureContractCodeReadable = '\n\tcontract SignatureVerifier {\n\t\tfunction verify( bytes32 hash, uint8 v, bytes32 r, bytes32 s) \n' +
    '\t\tconstant returns(address returnAddress) {\n \t\t\treturnAddress = ecrecover(hash, v, r, s);\n\t\t}\n\t}\n\n';

var sigContractAddress = '';
var sigContractInstance = null;
var strAbi = '[{"constant":true,"inputs":[{"name":"hash","type":"bytes32"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"verify","outputs":[{"name":"returnAddress","type":"address"}],"payable":false,"type":"function"}]';
var signMessage = '';

var ircWebu = null;

function setContractAddress(conAddress) {
    sigContractAddress = conAddress;
}

function setAccount(act) {
    defaultAc = act;
}

function setPassword(pwd) {
    defaultAcPWD = pwd;
}

function setIrChainURL(url) {
    ircURL = url;
}

function setMessage(msg) {
    signMessage = msg;
}

function initializeIrChainConnection() {
    if (ircWebu != null && ircWebu.isConnected() === true) {
        return true;
    }

    ircWebu = new Webu(new Webu.providers.HttpProvider(ircURL));

    if (ircWebu.isConnected() === true) {
        if (defaultAc === '') {
            defaultAc = ircWebu.irc.accounts[1];
        }
        return true;
    }

    return false;
}

function unlockAccount(acAddress) {
    if (acAddress !== undefined && acAddress != null) {
        return ircWebu.personal.unlockAccount(defaultAc, defaultAcPWD, 100);
    }

    return false;
}

function initializeContract() {
    initializeIrChainConnection();
    if (ircWebu.isConnected() === false) {
        return;
    }
    var abi = JSON.parse(strAbi);
    var contract = ircWebu.irc.contract(abi);

    sigContractInstance = contract.at(sigContractAddress);
}

function signMessageFun(message) {

    initializeIrChainConnection();
    if (ircWebu.isConnected() === false) {
        return false;
    }

    var state = unlockAccount(defaultAc);

    const msg = new Buffer(message);
    return ircWebu.irc.sign(defaultAc, '0x' + msg.toString('hex'));
}

function verifySignedByAc(message, sig) {
    initializeIrChainConnection();

    if (ircWebu.isConnected() === false) {
        return false;
    }
    initializeContract();

    const res = splitSig(sig);

    // Unfortunately Ghuc client adds this line to the message as a prefix while signing
    // So while finding who signed it we need to prefix this part
    const prefix = new Buffer('\x19IrChain Signed Message:\n');
    const msg = new Buffer(message);
    var strPrefixedMsg = ircWebu.sha3(Buffer.concat([prefix, new Buffer(String(msg.length)), msg]).toString('utf8'));

    return sigContractInstance.verify.call(strPrefixedMsg, res.v, res.r, '0x' + res.s);
}

function splitSig(sig) {
    return {
        v: ircWebu.toDecimal('0x' + sig.slice(130, 132)),
        r: sig.slice(0, 66),
        s: sig.slice(66, 130),
    };

}

function sign() {
    var message = document.getElementById('txtMessage').value;
    document.getElementById('dvSig').innerText = signMessageFun(message);
}

function verify() {
    var message = document.getElementById('txtMessage').value;
    document.getElementById('dvSignedBy').innerText = verifySignedByAc(message, document.getElementById('dvSig').innerText);
}

function execute() {
    console.log('\n\n**********************************************************************');
    console.log('Steps to Run');
    console.log('**********************************************************************');
    console.log('1. Deploy the following contract in your irchain environment');
    console.log(signatureContractCodeReadable);
    console.log('2. Set the following parameters (i.e. at the end of the code)');
    console.log('\ta. IrChain URL');
    console.log('\tb. IrChain Account Address');
    console.log('\tc. IrChain Account Passphrase');
    console.log('\td. Signature Contract Address');
    console.log('\te. Message for signing');
    console.log('**********************************************************************');

    if (ircURL === '') {
        console.log('Error: IrChain URL is not specified');
        return;
    }
    if (defaultAc === '') {
        console.log('Error: Account Address is not specified');
        return;
    }
    if (defaultAcPWD === '') {
        console.log('Error: Account password is not specified');
        return;
    }
    if (sigContractAddress === '') {
        console.log('Error: Signature Contract Address is not specified');
        return;
    }
    if (signMessage === '') {
        console.log('Error: Message for signing is not specified');
        return;
    }

    console.log('Following parameters applied');
    console.log('\ta. IrChain URL                  :', ircURL);
    console.log('\tb. IrChain Account Address      :', defaultAc);
    console.log('\tc. IrChain Account Passphrase   :', defaultAcPWD);
    console.log('\td. Signature Contract Address    :', sigContractAddress);
    console.log('\te. Message for signing           :', signMessage);

    console.log('**********************************************************************');
    console.log('Result');
    console.log('**********************************************************************');

    var sig = signMessageFun(signMessage);
    console.log('Signature');
    console.log(sig);

    var addr = verifySignedByAc(signMessage, sig);
    console.log('Signed By');
    console.log(addr);

    console.log('**********************************************************************');
    console.log('Exit');
    console.log('**********************************************************************');
}

// Please uncomment the below listed three lines of code and provide the required values

// Value 1- Please provide the irchain account address which you want to use to perform the operation
//setAccount('<Provide the account address>');

// Value 2- Please provide the password of the accound to be used
//setPassword('<Provide the password>');

// Value 3- Please update the address of the contract after deployment
// The contract code is made available at the top under signatureContractCodeReadable variable
// Please deploy the contract and update the contract address here
//setContractAddress('<Provide the deployed contract address>');

// Value 4- If required please update with a different message
setIrChainURL('http://localhost:8545');

// Value 5- If required please update with a IrChain URL
setMessage('This the test sign message');

execute();

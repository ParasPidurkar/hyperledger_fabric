'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

exports.invoke= async function(Callback,userName,orgNo,Model_param,Layers,language,Accuracy,organization,ID) {
   // async function invoke(userName,org) {
        var org="org"+orgNo;
        var orgName = "org"+orgNo+".example.com";
        var conName = "connection-"+org+".json";
        var caName = "ca."+orgName;
        var dept = org+".department1"
        const walletName ="wallet"+orgNo;
	console.log("orgNo"+orgNo)
        console.log("language\t"+language);
        console.log("Model_parameters\t"+Model_param)
        console.log("Layers\t"+Layers)
        console.log("Accuracy\t"+Accuracy)

    var response = {}
    response.type= "invoke"
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', orgName, conName);
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), walletName);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
	console.log("UserName is "+userName);
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(userName);
        if (!identity) {
            console.log('An identity for the user does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: userName, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('swarmchannel');

        // Get the contract from the network.
        const contract = network.getContract('swarmfabric');

        // Submit the specified transaction.
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
     //   var devName="DEVICE"+org.slice(3,4);
       // console.log("Device Name"+devName)
       // await contract.submitTransaction('createswarm_d',devName, Model_param, Layers,language, Accuracy);
         await contract.submitTransaction('createswarm_d',userName,Model_param,Layers,language,Accuracy,organization,ID);


        // Disconnect from the gateway.
        await gateway.disconnect();

        response.returnValue =true
        Callback(response)

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

//invoke("usr1","org1")

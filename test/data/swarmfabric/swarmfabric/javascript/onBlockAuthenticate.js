'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

exports.onBlockAuthenticate= async function(Callback,device1,device2) {
   // async function invoke(userName,org) {
       var org_str=org.toString();
        var orgName = org+".example.com";
        var conName = "connection-"+org+".json";
        var caName = "ca."+orgName;
        var dept = org+".department1"
        const walletName ="wallet"+org.slice(3,4);
        console.log("language"+language);
        console.log("Model_parameters"+Model_param)
        console.log("Layers"+Layers)
        console.log("Accuracy"+Accuracy)

    var response = {}
    response.type= "onBlockAuthenticate"
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
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('swarmfabric');

        // Submit the specified transaction.
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
        var devName="DEVICE"+org.slice(3,4);
        console.log("Device Name"+devName)
        await contract.submitTransaction('onBlockAuthenticate',userNameRecv,userNameSendr);



        // Disconnect from the gateway.
        await gateway.disconnect();

        response.returnValue =false
        Callback(response)

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}


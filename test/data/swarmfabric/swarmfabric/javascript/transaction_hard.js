'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

exports.transaction = async function(Callback,userNameRecv,userNameSendr) {
	var response = {}
    	response.type= "transaction"

    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet1');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        //const identity = await wallet.get('swarmnode1');
        const identity = await wallet.get(userNameRecv)
	if (!identity) {
            console.log('An identity for the user  does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        //await gateway.connect(ccp, { wallet, identity: 'swarmnode1', discovery: { enabled: true, asLocalhost: true } });
	await gateway.connect(ccp, { wallet, identity: userNameRecv, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('swarmfabric');

        // Submit the specified transaction.
       await contract.submitTransaction('transaction','DEVICE1','DEVICE2');
         console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();
	
	response.returnValue =true
	response.userNameRecv = userNameRecv;
	response.userNameSendr = userNameSendr;
        Callback(response)


    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}


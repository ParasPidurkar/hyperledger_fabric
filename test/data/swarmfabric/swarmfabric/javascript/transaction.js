
'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

exports.transaction = async function(Callback,userNameRecv,orgNoRecv,userNameSendr,orgNoSendr) {
	console.log("RUNNING THE TRANSACTION PROCESS");
	console.log("userNameRecv:\t"+userNameRecv);
	console.log("userNameSendr:\t"+userNameSendr);
        console.log("orgNoRecv:\t"+orgNoRecv);
	console.log("orgNoSendr:\t"+orgNoSendr);
	var response = {}
        response.type= "transaction"
	var org ="org"+ orgNoRecv;
	//var deviceRecv="DEVICE"+userNameRecv.match(/(\d+)/g);
	  var deviceRecv=userNameRecv;
	//var deviceSendr="DEVICE"+userNameSendr.match(/(\d+)/g);
	var deviceSendr = userNameSendr;

	var orgName = org+".example.com";
	var connectName ="connection-"+org+".json"
	var walletName ="wallet"+ orgNoRecv;
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations',orgName, connectName);
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), walletName);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
	console.log("Tag1");
        // Check to see if we've already enrolled the user.
        //const identity = await wallet.get('swarmnode1');
        const identity = await wallet.get(userNameRecv)
        if (!identity) {
	console.log("Tag2")
            console.log('An identity for the {$userNameRecv}  does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
        }

        // Create a new gateway for connecting to our peer node.
        console.log("Tag3");
	const gateway = new Gateway();
        //await gateway.connect(ccp, { wallet, identity: 'swarmnode1', discovery: { enabled: true, asLocalhost: true } });
        await gateway.connect(ccp, { wallet, identity: userNameRecv, discovery: { enabled: true, asLocalhost: true } });
	console.log("Tag4")
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('swarmchannel');
	console.log("Tag5")
        // Get the contract from the network.
        const contract = network.getContract('swarmfabric');

        // Submit the specified transaction.
     //  await contract.submitTransaction('transaction',deviceRecv,deviceSendr);
      console.log("Tag6")
	 await contract.submitTransaction('transaction',userNameRecv,userNameSendr)
	console.log("Tag7")  
	console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

        response.returnValue =true
        response.userNameRecv = userNameRecv;
        response.userNameSendr = userNameSendr;
        Callback(response)


    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
       // process.exit(1);
    }
}


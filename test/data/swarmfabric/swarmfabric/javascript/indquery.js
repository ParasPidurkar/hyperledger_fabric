'use strict';

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');


exports.indquery = async function (Callback,userName,orgNo) {
    console.log("userName"+userName+"\nOrgNo"+orgNo)
    var  org = "org"+orgNo;
    console.log("UserName is"+userName)
    var orgName = org+".example.com";
    console.log("orgName="+orgName)
    var conName = "connection-"+org+".json";
    console.log("conName ="+conName)
    var caName = "ca."+orgName;
    var dept = org+".department1"
    //var aa =toString(org);
    const walletName ="wallet"+org.substring(3,4);
    console.log("walletName is "+walletName);
    //var walletName = walletName1.toString();
    var response = {}
    response.type= "indquery"
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations',orgName, conName);
        console.log(ccpPath);
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), walletName);
      // console.log("Tag0")
	 const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
	//console.log("Tag0.1"+userName)
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(userName);
	//console.log("Tag0.2");
        //TO-DO   check for the already registered user in wallet
        if (!identity) {
            console.log('An identity for the user does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        // Create a new gateway for connecting to our peer node.
	//console.log("Tag0.3")
        const gateway = new Gateway();
//console.log("Tag0.4")
        await gateway.connect(ccp, { wallet, identity: userName, discovery: { enabled: true, asLocalhost: true } });
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('swarmchannel');
        // Get the contract from the network.
        const contract = network.getContract('swarmfabric');
  //      console.log("Tag1");
        const result = await contract.evaluateTransaction('queryswarm_d',userName);
    //    console.log("Tag2");
	console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        // Disconnect from the gateway.
        await gateway.disconnect();
        response.returnValue =true;
        response.result = JSON.parse(result.toString());
        Callback(response);
        return result;


   // return result;


    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}


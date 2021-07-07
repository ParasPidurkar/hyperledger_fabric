
'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

exports.skillShare= async function(Callback,userNameRecv,orgNoRecv,userNameSendr,orgNoSendr) {
//var userNameRecv_str ="swarmnode1";
//var userNameSendr_str=JSON.stringify(userNameSendr);
   // async function invoke(userName,org) {
	var org = "org"+ orgNoRecv;   //userNameRecv.match(/(\d+)/g);
        var org2 = "org"+orgNoSendr; //userNameSendr.match(/(\d+)/g);
        var orgName = org+".example.com";
        var conName = "connection-"+org+".json";
        var caName = "ca."+orgName;
        var dept = org+".department1"
        const walletName ="wallet"+orgNoRecv; //userNameRecv.match(/(\d+)/g);

    var response = {}
    response.type= "skillShare"
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', orgName, conName);
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), walletName);
	console.log("UsernameRecv   :"+userNameRecv);
	console.log("UsernameSendr  :"+userNameSendr);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(userNameRecv);
        if (!identity) {
            console.log('An identity for the user does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: userNameRecv, discovery: { enabled: true, asLocalhost: true } });
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('swarmchannel');
        // Get the contract from the network.
        const contract = network.getContract('swarmfabric')
        // Submit the specified transaction.
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
        var devNameRecv="DEVICE"+org.slice(3,4);
	var devNameSendr ="DEVICE"+userNameSendr.match(/(\d+)/g);
//        console.log("Device Name"+devName)
        //await contract.submitTransaction('skillShare',devNameRecv,devNameSendr);
         await contract.submitTransaction('skillShare',userNameSendr,userNameRecv);
	console.log('shareSkill has been submitted');


        // Disconnect from the gateway.
        await gateway.disconnect();
	response.returnValue =true
        response.userNameRecv = userNameRecv;
        response.userNameSendr = userNameSendr;
        Callback(response)


     //   response.returnValue =true
      //  Callback(response)

    } catch (error) {
	response.returnValue= false;
	response.error = "Shareskill Failed"
	Callback(response)
        console.error(`Failed to submit skillShare: ${error}`);
        process.exit(1);
    }
}


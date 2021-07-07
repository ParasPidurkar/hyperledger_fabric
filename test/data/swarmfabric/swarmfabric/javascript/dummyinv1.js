'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
//	console.log("@@@Tag1")
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet1');
//	console.log("@@@Tag2")
	const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
//	console.log("@@@Tag3")
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('swarmnode1');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
	console.log("@@@Tag4")
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
       console.log("@@@Tag5")
	 await gateway.connect(ccp, {wallet, identity: 'swarmnode1', discovery: { enabled: true, asLocalhost: true } });
	console.log("@@@Tag6")
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('swarmchannel');
	console.log("@@@Tag7")
        // Get the contract from the network.
        const contract = network.getContract('swarmfabric');
	console.log("@@@Tag8")
        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
        await contract.submitTransaction('createswarm_d','DEVICE1','300','4','English','65','LGSI','alpha');
        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main()

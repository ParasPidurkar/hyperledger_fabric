
'use strict';

const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const path = require('path');


 exports.regUser= async function (Callback,userName,orgNo) {
    var org ="org"+orgNo;
    console.log("REGISTERING THE DEVICE IN THE ORGANIZATION\n\n")
    var orgName = org+".example.com";
    console.log("orgName  ="+orgName)
    var conName = "connection-"+org+".json";
    console.log("orgName  ="+conName)
    var caName = "ca."+orgName;
    console.log("orgName  ="+caName)
    var dept = org+".department1"
    console.log("orgName  ="+dept)
    const walletName ="wallet"+org.slice(3,4);
    console.log("walletName is "+walletName)
    var MSPID = "Org"+orgName.slice(3,4)+"MSP";

    var response = {}
    response.type= "registerUser"
    try {
        // load the network configuration
       
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations',orgName, conName);
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caURL = ccp.certificateAuthorities[caName].url;
        const ca = new FabricCAServices(caURL);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), walletName);
        console.log("walletPath is "+walletPath);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userIdentity = await wallet.get(userName);
        if (userIdentity) {
            console.log('An identity for the user already exists in the wallet');
            response.returnValue = true;
            Callback(response)
            return;
    
        }

        // Check to see if we've already enrolled the admin user.
        const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        // build a user object for authenticating with the CA
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'admin');

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({
            affiliation: dept,
            enrollmentID: userName,
            role: 'client'
        }, adminUser);
        const enrollment = await ca.enroll({
            enrollmentID: userName,
            enrollmentSecret: secret
        });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: MSPID,
            type: 'X.509',
        };
        await wallet.put(userName, x509Identity);
        console.log('Successfully registered and enrolled admin user '+userName+ 'and imported it into the wallet\n\n');
        console.log('REGISTERATION SUCCESSFULL');
	response.returnValue = true;
        Callback(response)
        

    } catch (error) {
        response.returnValue = false;
        response.error = error;
        Callback(response)
        console.error(`Failed to register user ${userName}: ${error}`);
        process.exit(1);
    }
}

//regUser("user1",'org1');

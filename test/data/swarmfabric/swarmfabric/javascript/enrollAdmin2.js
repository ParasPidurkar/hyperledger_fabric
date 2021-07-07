

'use strict';

const FabricCAServices = require('fabric-ca-client');
const { Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

 async function adminEnroll() {
    console.log("Enrolling the admin");
   // var response = {}
   // response.type= "adminEnroll"
    try {

        
        // load the network configuration
        const ccpPath1= path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccpPath2 = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org2.example.com', 'connection-org2.json');
        const ccp1 = JSON.parse(fs.readFileSync(ccpPath1, 'utf8'));
        const ccp2 = JSON.parse(fs.readFileSync(ccpPath2, 'utf8'));


        // Create a new CA client for interacting with the CA.
        const caInfo1 = ccp1.certificateAuthorities['ca.org1.example.com'];
        const caInfo2 = ccp2.certificateAuthorities['ca.org2.example.com'];

        const caTLSCACerts1 = caInfo1.tlsCACerts.pem;
        const caTLSCACerts2 = caInfo2.tlsCACerts.pem;

        const ca1 = new FabricCAServices(caInfo1.url, { trustedRoots: caTLSCACerts1, verify: false }, caInfo1.caName);
        const ca2 = new FabricCAServices(caInfo2.url, { trustedRoots: caTLSCACerts2, verify: false }, caInfo2.caName);

       // var w_DIR= "/Paras/App/net/backar/javascript/"
        // Create a new file system based wallet for managing identities.
        const walletPath1 = path.join(process.cwd(), 'wallet1');
        const wallet1 = await Wallets.newFileSystemWallet(walletPath1);
        console.log(`Wallet path: ${walletPath1}`);

        const walletPath2 = path.join(process.cwd(), 'wallet2');
        const wallet2 = await Wallets.newFileSystemWallet(walletPath2);
        console.log(`Wallet path: ${walletPath2}`);

        // Check to see if we've already enrolled the admin user.
        const identity1 = await wallet1.get('admin');
        if (identity1) {
            console.log('An identity for the admin user "admin" already exists in the wallet');
            return;
        }

        const identity2 = await wallet2.get('admin');
        if (identity2) {
            console.log('An identity for the admin user "admin2" already exists in the wallet');
            return;
        }

        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment1 = await ca1.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
        const enrollment2 = await ca2.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });

        const x509Identity1 = {
            credentials: {
                certificate: enrollment1.certificate,
                privateKey: enrollment1.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };

        const x509Identity2 = {
            credentials: {
                certificate: enrollment2.certificate,
                privateKey: enrollment2.key.toBytes(),
            },
            mspId: 'Org2MSP',
            type: 'X.509',
        };
        await wallet1.put('admin', x509Identity1);
        await wallet2.put('admin', x509Identity2);
        console.log('Successfully enrolled admin user "admin" and imported it into the wallet');

    } catch (error) {

        console.error(`Failed to enroll admin user "admin": ${error}`);
        process.exit(1);
    }
}
adminEnroll();

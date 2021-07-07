'use strict';

const { Contract } = require('fabric-contract-api');
class swarmfabric extends Contract {
//global.dev_map = new Map();
    async initLedger(ctx) {
      // const dev_map = new Map();
	  const device = [
        ];

        for (let i = 0; i < device.length; i++) {
            device[i].docType = 'swarm_device';
            await ctx.stub.putState('MODEL' + i, Buffer.from(JSON.stringify(device[i])));
            console.info('Added <--> ', device[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }
    async queryswarm_d(ctx, swarm_dNumber) {
        const swarm_dAsBytes = await ctx.stub.getState(swarm_dNumber); // get the swarm_d from chaincode state
        if (!swarm_dAsBytes || swarm_dAsBytes.length === 0) {
            throw new Error(`${swarm_dNumber} does not exist`);
        }
        console.log(swarm_dAsBytes.toString());
        return swarm_dAsBytes.toString();
    }

    async createswarm_d(ctx, swarm_dNumber, Model_param, Layers,current_skill, Accuracy,organization,ID) {
        console.info('============= START : Create swarm_d ===========');

        const swarm_d = {
            current_skill,
	    acquired_skill: null,
	    acquired_from: null,
            docType: 'swarm_device',
            Model_param,
            Layers,
            Accuracy,
	    Cost : 200,
            Amount: 1000,
	    organization,
	    ID
        };

        await ctx.stub.putState(swarm_dNumber, Buffer.from(JSON.stringify(swarm_d)));
        console.info('============= END : Create swarm_d ===========');
    }

    async queryAllswarm_ds(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }

         allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }
//dev_map =new Map();
async onBlockAuthenticate(ctx,userNameRecv,userNameSendr)
{
      //   dev_map = new Map();
        for (let [key, value] of dev_map) {
        if(key==userNameRecv && value == userNameSendr)
       
	 {
        return [true,userNameRecv,userNameSendr];
        }

        else{
	//const swarm_dAsBytes1 = await ctx.getState(userNameSendr);
	//const swarm_d1 = JSON.parse(swarm_dAsBytes1.toString());
	//var cost = swarm_d1.Cost
        return [false,userNameRecv,userNameSendr];
  	}
}
        console.log("verification of the transaction record");

}

 async transaction(ctx, userNameRecv, userNameSendr) {
	//dev_map[userNameRecv]=userNameSendr;
//       dev_map.set(userNameRecv,userNameSendr)
	 console.info('============= START ===========');
        console.log("userNameRecv       :"+userNameRecv);
        console.log("userNameSendr      :"+userNameSendr);
        const swarm_dAsBytes1 = await ctx.stub.getState(userNameRecv); // get the swarm_d from chaincode state
        const swarm_dAsBytes2 = await ctx.stub.getState(userNameSendr);
	//console.log("userNameRecv       :"+swarm_dAsBytes1;
     //   console.log("userNameSendr      :"+swarm_dAsBytes2;

        if (!swarm_dAsBytes1 || swarm_dAsBytes1.length === 0) {
            throw new Error(`${userNameRecv} does not exist`);
        }
        if(!swarm_dAsBytes2 || swarm_dAsBytes2.length === 0){
        throw new Error('${userNameSendr} does not exist')
        }
        const swarm_d1 = JSON.parse(swarm_dAsBytes1.toString());
        const swarm_d2 = JSON.parse(swarm_dAsBytes2.toString());
        console.log(swarm_d1.current_skill)
        swarm_d1.Amount = swarm_d1.Amount-swarm_d2.Cost;
        swarm_d2.Amount = swarm_d2.Amount+swarm_d2.Cost;
        //swarm_d1.language=(swarm_d1.language)+" "+(swarm_d2.language);

        await ctx.stub.putState(userNameRecv, Buffer.from(JSON.stringify(swarm_d1)));
        await ctx.stub.putState(userNameSendr,Buffer.from(JSON.stringify(swarm_d2)));
        console.info('============= END ===========');
        return [userNameRecv,userNameSendr];
        }


async skillShare(ctx, userNameRecv, userNameSendr) {

     console.info('============= START SKILLSHARE ===========');
        console.log("userNameRecv       :"+userNameRecv);
        console.log("userNameSendr      :"+userNameSendr)
        const swarm_dAsBytes1 = await ctx.stub.getState(userNameRecv); // get the swarm_d from chaincode state
        const swarm_dAsBytes2 = await ctx.stub.getState(userNameSendr);
        if (!swarm_dAsBytes1 || swarm_dAsBytes1.length === 0) {
            throw new Error(`${userNameRecv} does not exist`);
        }
        if(!swarm_dAsBytes2 || swarm_dAsBytes2.length === 0){
        throw new Error('${userNameSendr} does not exist')
        }
        const swarm_d1 = JSON.parse(swarm_dAsBytes1.toString());
        const swarm_d2 = JSON.parse(swarm_dAsBytes2.toString());
        console.log(swarm_d1.current_skill)
       // swarm_d1.Amount = swarm_d1.Amount-swarm_d2.Cost;
       // swarm_d2.Amount = swarm_d2.Amount+swarm_d2.Cost;
	console.log("NODE 1"+swarm_d2.current_skill)
        console.log("NODE 2"+swarm_d1.current_skill)

	//swarm_d2.current_skill=(swarm_d1.current_skill)+" "+(swarm_d2.current_skill);
	swarm_d2.acquired_skill=(swarm_d1.current_skill);
	swarm_d2.acquired_from = userNameRecv;
        await ctx.stub.putState(userNameRecv, Buffer.from(JSON.stringify(swarm_d1)));
        await ctx.stub.putState(userNameSendr,Buffer.from(JSON.stringify(swarm_d2)));
        console.info('============= END SKILLSHARE===========');
        return[userNameRecv,userNameSendr]



} 





async skillUpdate(ctx, userName,Model_param,Layers,current_skill,Accuracy) {

     console.info('============= START UPDATE ===========');
        console.log("userName       :"+userName);
        //console.log("userNameSendr      :"+userNameSendr)
        const swarm_dAsBytes1 = await ctx.stub.getState(userName); // get the swarm_d from chaincode state
        //const swarm_dAsBytes2 = await ctx.stub.getState(userNameSendr);
        if (!swarm_dAsBytes1 || swarm_dAsBytes1.length === 0) {
            throw new Error(`${userName} does not exist`);
        }
        /*if(!swarm_dAsBytes2 || swarm_dAsBytes2.length === 0){
        throw new Error('${userNameSendr} does not exist')
        }*/
        const swarm_d1 = JSON.parse(swarm_dAsBytes1.toString());
        //const swarm_d2 = JSON.parse(swarm_dAsBytes2.toString());
        console.log(swarm_d1.current_skill)
       // swarm_d1.Amount = swarm_d1.Amount-swarm_d2.Cost;
       // swarm_d2.Amount = swarm_d2.Amount+swarm_d2.Cost;
        console.log("Model Parameters"+swarm_d1.Model_param)
        console.log("Layers"+swarm_d1.Layers)
	console.log("Accuracy"+swarm_d1.Accuracy)
        swarm_d1.current_skill=current_skill
        swarm_d1.Model_param=Model_param;
	swarm_d1.Layers=Layers;
	swarm_d1.Accuracy=Accuracy;
        await ctx.stub.putState(userName, Buffer.from(JSON.stringify(swarm_d1)));
        //await ctx.stub.putState(userNameSendr,Buffer.from(JSON.stringify(swarm_d2)));
        console.info('============= END SKILLSHARE===========');
        return[userName]



}


  async retreiveHistory(ctx, key) {
    console.info('getting history for key: ' + key);
    let iterator = await ctx.stub.getHistoryForKey(key);
    let result = [];
    let res = await iterator.next();
    while (!res.done) {
      if (res.value) {
        console.info(`found state update with value: ${res.value.value.toString('utf8')}`);
        const obj = JSON.parse(res.value.value.toString('utf8'));
        result.push(obj);
      }
      res = await iterator.next();
    }
    await iterator.close();
    return result;
  }























}

module.exports = swarmfabric;


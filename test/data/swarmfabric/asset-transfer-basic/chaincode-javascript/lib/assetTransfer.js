/*
                language: 'English',
                Model_param: '1580',
                Layers: '3',
                Accuracy: '70',
                */
'use strict';

const { Contract } = require('fabric-contract-api');

class AssetTransfer extends Contract {

    async InitLedger(ctx) {
        const Devices = [
            {
                ID: 'Device1',
                Color: 'blue',
                Size: 5,
                Owner: 'Tomoko',
                AppraisedValue: 300,
            },
            {
                ID: 'Device2',
                Color: 'red',
                Size: 5,
                Owner: 'Brad',
                AppraisedValue: 400,
            },
            {
                ID: 'Device3',
                Color: 'green',
                Size: 10,
                Owner: 'Jin Soo',
                AppraisedValue: 500,
            },
            {
                ID: 'Device4',
                Color: 'yellow',
                Size: 10,
                Owner: 'Max',
                AppraisedValue: 600,
            },
            {
                ID: 'Device5',
                Color: 'black',
                Size: 15,
                Owner: 'Adriana',
                AppraisedValue: 700,
            },
            {
                ID: 'Device6',
                Color: 'white',
                Size: 15,
                Owner: 'Michel',
                AppraisedValue: 800,
            },
        ];

        for (const Device of Devices) {
            Device.docType = 'Device';
            await ctx.stub.putState(Device.ID, Buffer.from(JSON.stringify(Device)));
            console.info(`Asset ${Device.ID} initialized`);
        }
    }

    // CreateAsset issues a new Device to the world state with given details.
    async CreateAsset(ctx, id, color, size, owner, appraisedValue) {
        const Device = {
            ID: id,
            Color: color,
            Size: size,
            Owner: owner,
            AppraisedValue: appraisedValue,
        };
        ctx.stub.putState(id, Buffer.from(JSON.stringify(Device)));
        return JSON.stringify(Device);
    }

    // ReadAsset returns the Device stored in the world state with given id.
    async ReadAsset(ctx, id) {
        const DeviceJSON = await ctx.stub.getState(id); // get the Device from chaincode state
        if (!DeviceJSON || DeviceJSON.length === 0) {
            throw new Error(`The Device ${id} does not exist`);
        }
        return DeviceJSON.toString();
    }

    // UpdateAsset updates an existing Device in the world state with provided parameters.
    async UpdateAsset(ctx, id, color, size, owner, appraisedValue) {
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The Device ${id} does not exist`);
        }

        // overwriting original Device with new Device
        const updatedAsset = {
            ID: id,
            Color: color,
            Size: size,
            Owner: owner,
            AppraisedValue: appraisedValue,
        };
        return ctx.stub.putState(id, Buffer.from(JSON.stringify(updatedAsset)));
    }

    // DeleteAsset deletes an given Device from the world state.
    async DeleteAsset(ctx, id) {
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The Device ${id} does not exist`);
        }
        return ctx.stub.deleteState(id);
    }

    // AssetExists returns true when Device with given ID exists in world state.
    async AssetExists(ctx, id) {
        const DeviceJSON = await ctx.stub.getState(id);
        return DeviceJSON && DeviceJSON.length > 0;
    }

    // TransferAsset updates the owner field of Device with given id in the world state.
    async TransferAsset(ctx, id, newOwner) {
        const DeviceString = await this.ReadAsset(ctx, id);
        const Device = JSON.parse(DeviceString);
        Device.Owner = newOwner;
        return ctx.stub.putState(id, Buffer.from(JSON.stringify(Device)));
    }

    // GetAllAssets returns all Devices found in the world state.
    async GetAllAssets(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all Devices in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: result.value.key, Record: record });
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }


}

module.exports = AssetTransfer;

#!/bin/bash
set -e


export MSYS_NO_PATHCONV=1
starttime=$(date +%s)
CC_SRC_LANGUAGE=${1:-"javascript"}
CC_SRC_LANGUAGE=`echo "$CC_SRC_LANGUAGE" | tr [:upper:] [:lower:]`

if [ "$CC_SRC_LANGUAGE" = "go" -o "$CC_SRC_LANGUAGE" = "golang" ] ; then
	CC_SRC_PATH="../chaincode/swarmfabric/go/"
elif [ "$CC_SRC_LANGUAGE" = "javascript" ]; then
	CC_SRC_PATH="../chaincode/swarmfabric/javascript/"
else
	echo The chaincode language ${CC_SRC_LANGUAGE} is not supported by this script
	echo Supported chaincode languages are: go, java, javascript, and typescript
	exit 1
fi

# clean out any old identites in the wallets
rm -rf javascript/wallet/*


# launch network; create channel and join peer to channel
echo "##########################################$PWD"
#pushd 
cd ../test-network
./network.sh down
./network.sh up createChannel -c swarmchannel -ca -s couchdb
./network.sh deployCC -c swarmchannel -ccn swarmfabric -ccv 1 -cci initLedger -ccl ${CC_SRC_LANGUAGE} -ccp ${CC_SRC_PATH}
cd ../swarmfabric/javascript

rm -rf wallet1 wallet2
echo "################"$PWD
node enrollAdmin2.js
#node server.js
popd

cat <<EOF

Total setup execution time : $(($(date +%s) - starttime)) secs ...
EOF

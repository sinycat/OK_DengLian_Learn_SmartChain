const { ethers, network } = require("hardhat");

// const ERC20Addr = require(`../deployments/${network.name}/MyERC20.json`)
const ERC20Addr = "0xbb8Fa0E678842598ceDCA31D3A203f373D77DA29"


function getFunctionID() {
    let transferTopic = ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes("Transfer(address,address,uint256)"));
    console.log("transferTopic:" + transferTopic)
    let id = ethers.utils.id("Transfer(address,address,uint256)")
    console.log("Transfer:" + id);
}

async function parseTransferEvent(event) {
  
    const TransferEvent = new ethers.utils.Interface(["event Transfer(address indexed from,address indexed to,uint256 value)"]);
    let decodedData = TransferEvent.parseLog(event);
    console.log("from:" + decodedData.args.from);
    console.log("to:" + decodedData.args.to);
    console.log("value:" + decodedData.args.value.toString());
}

async function main() {


    let [owner, second] = await ethers.getSigners();
    let myerc721 = await ethers.getContractAt("MyErc721Token",
        // ERC20Addr.address,
        ERC20Addr,
        owner);

    let filter = myerc721.filters.Transfer()

    // let filter = myerc20.filters.Transfer(owner.address)
    // let filter = myerc20.filters.Transfer(null, owner.address)

    // logsFrom = await erc20.queryFilter(filter, -10, "latest");

    // filter = {
    //     address: ERC20Addr.address,
    //     topics: [
    //         ethers.utils.id("Transfer(address,address,uint256)")
    //     ]
    // }

    ethers.provider.on(filter, (event) => {

      console.log(event)

        // const decodedEvent = myerc20.interface.decodeEventLog(
        //     "Transfer", //
        //     event.data,
        //     event.topics
        // );
        // console.log(decodedEvent);

        parseTransferEvent(event);
    })
}

main()
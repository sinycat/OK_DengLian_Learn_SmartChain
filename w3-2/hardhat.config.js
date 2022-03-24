// require("@nomiclabs/hardhat-waffle");

// // This is a sample Hardhat task. To learn how to create your own go to
// // https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// // You need to export an object to set up your config
// // Go to https://hardhat.org/config/ to learn more

// /**
//  * @type import('hardhat/config').HardhatUserConfig
//  */
// module.exports = {
//   solidity: "0.8.10",
// };

require("@nomiclabs/hardhat-waffle");
// require("@nomiclabs/hardhat-web3");

//verify use
require("@nomiclabs/hardhat-etherscan");

//read pin
const fs = require('fs');
let str= fs.readFileSync("./pin/pin.json").toString().trim();
let pin = JSON.parse(str).account_pin;
let api_rinkeby=JSON.parse(str).api_rinkeby;
let api_bscTest=JSON.parse(str).api_bscTestnet;
let api_bscMain=JSON.parse(str).api_bscMainKey;

//自定义的任务
// require("./task/task_counter");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});


//可用设置
module.exports = {
	defaultNetwork: "rinkeby",
	// defaultNetwork: "dev",
	// defaultNetwork: "bsc_test",
	// defaultNetwork: "bsc_main",
	networks: {
		hardhat: {},
		localhost: {
			url: "http://127.0.0.1:8545",
		},
		dev: {
			url: "http://127.0.0.1:8545",
		},
		rinkeby: {
			url: "https://rinkeby.infura.io/v3/028ccf426c9a4bdfa31111f18a6ca9f0",
			accounts: [
				pin
			],
		},
		bsc_test: {
			url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
			accounts: [
				pin
			],
		},
		bsc_main: {
			url: "https://bsc-dataseed.binance.org/",
			accounts: [
				pin
			],
		},
	},
	solidity: {
		compilers: [
			{
				version: "0.8.10",
				settings: {
					optimizer: {
						enabled: false,
						runs: 200,
					},
				},
			},
			{
				version: "0.5.17",
				settings: {},
			},
			{
				version: "0.4.23",
				settings: {},
			},
		],
	},
	paths: {
		sources: "./contracts",
		tests: "./test",
		cache: "./cache",
		artifacts: "./artifacts",
	},
	mocha: {
		timeout: 20000,
	},
	etherscan: {
		apiKey: {
			rinkeby: api_rinkeby,
			bsc:api_bscMain,
			bscTestnet: api_bscTest
		},
	},
	
};


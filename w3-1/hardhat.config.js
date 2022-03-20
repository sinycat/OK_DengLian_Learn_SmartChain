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
	// defaultNetwork: "bsc",
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
				"0x0e74f90d413fc685f49ebb31d432303161d66ef30b27dbe538047bdc34e4f95e",
				"0x1625083670bc156feb3b577770988631188d7ccf696d4a051b9a810e77d96710",
			],
		},
		bsc: {
			url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
			accounts: [
				"0x0e74f90d413fc685f49ebb31d432303161d66ef30b27dbe538047bdc34e4f95e",
				"0x1625083670bc156feb3b577770988631188d7ccf696d4a051b9a810e77d96710",
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
			rinkeby: "GK61ZAVTZB4Z5UXXBCZYNC6TJGRDV935NH",
			bscTestnet: "6T6AP8RNWVNI8SM6MXIE6XY1QMH7MC9K34",
		},
	},
};


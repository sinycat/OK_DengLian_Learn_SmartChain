<template>
  <div class="hello">
    <div>
      <h4>已连接账户地址:{{ account }}</h4>
      <h4>已连接合约地址:{{ contractAddress }}</h4>
      <button
        v-on:click="connectWeb3"
        id="connectWeb3"
        v-bind:disabled="buttonConnectEnable"
        class="button_common"
      >
        {{ toConnectWeb3 }}
      </button>
      <div id="tokenName" class="div_item">
        <span class="span_1">tokenName:</span>{{ tokenName }}
      </div>
      <div id="tokenSymbol" class="div_item">
        <span class="span_1">tokenSymbol:</span>{{ tokenSymbol }}
      </div>
      <div id="totalSupply" class="div_item">
        <span class="span_1">totalSupply:</span>{{ totalSupply }}
      </div>
      <div id="oneBalance" class="div_item">
        <span class="span_1">balance:</span>{{ oneBalance }}
      </div>
      <div class="div_item div_block">
        <input
          type="text"
          v-model="addTokenAddress"
          class="input_1"
          placeholder="address"
        />
        <input
          type="text"
          v-model="addTokenAmount"
          class="input_1"
          placeholder="amount"
        />
        <button class="button_1 " @click="addToken">增发Token</button>
      </div>
    </div>
  </div>
</template>

<script type="module">
import { ethers } from "../../static/js/ethers-5.2.esm.min.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      account: "未连接",
      provider: null,
      signer: null,
      accounts: null,
      tokenName: null,
      tokenSymbol: null,
      totalSupply: 0,
      oneBalance: null,
      toConnectWeb3: "请连接web3及合约",
      buttonConnectEnable: false,
      tokenContract: null,
      contractAddress: "未连接",
      addTokenAddress: null,
      addTokenAmount: null
    };
  },
  methods: {
    async connectWeb3() {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.accounts = await this.provider.send("eth_requestAccounts", []);
      this.signer = this.provider.getSigner();
      console.log("已连接,第一个账户:" + this.accounts[0]);
      this.account = this.accounts[0];
      this.toConnectWeb3 = "已连接";
      this.buttonConnectEnable = true;
      let x = await this.provider.getBalance(this.account);
      this.oneBalance = ethers.utils.formatEther(x);

      //Contract rinkeby
      this.contractAddress = "0xA9476D63039DbA11753B50351a0bf7c2AC677C97";
      let abi = [
        { inputs: [], stateMutability: "nonpayable", type: "constructor" },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address"
            },
            {
              indexed: true,
              internalType: "address",
              name: "spender",
              type: "address"
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256"
            }
          ],
          name: "Approval",
          type: "event"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address"
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address"
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256"
            }
          ],
          name: "Transfer",
          type: "event"
        },
        {
          inputs: [
            { internalType: "address", name: "owner", type: "address" },
            { internalType: "address", name: "spender", type: "address" }
          ],
          name: "allowance",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function"
        },
        {
          inputs: [
            { internalType: "address", name: "spender", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" }
          ],
          name: "approve",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          inputs: [
            { internalType: "address", name: "account", type: "address" }
          ],
          name: "balanceOf",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function"
        },
        {
          inputs: [],
          name: "decimals",
          outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
          stateMutability: "view",
          type: "function"
        },
        {
          inputs: [
            { internalType: "address", name: "spender", type: "address" },
            {
              internalType: "uint256",
              name: "subtractedValue",
              type: "uint256"
            }
          ],
          name: "decreaseAllowance",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          inputs: [
            { internalType: "address", name: "spender", type: "address" },
            { internalType: "uint256", name: "addedValue", type: "uint256" }
          ],
          name: "increaseAllowance",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          inputs: [
            { internalType: "address", name: "account", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" }
          ],
          name: "mint",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          inputs: [],
          name: "name",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function"
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function"
        },
        {
          inputs: [],
          name: "totalSupply",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function"
        },
        {
          inputs: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" }
          ],
          name: "transfer",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" }
          ],
          name: "transferFrom",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "nonpayable",
          type: "function"
        }
      ];
      this.tokenContract = new ethers.Contract(
        this.contractAddress,
        abi,
        this.signer
      );
      this.tokenName = await this.tokenContract.name();
      this.tokenSymbol = await this.tokenContract.symbol();
      this.totalSupply = await this.tokenContract.totalSupply();
    },
    async addToken() {
      let x = await this.tokenContract.mint(
        this.addTokenAddress,
        this.addTokenAmount
      );
      if (x) {
        this.totalSupply = await this.tokenContract.totalSupply();
        console.log(x);
        alert("增发成功!totalSupply已改变!");
      }
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.div_item {
  width: 90%;
  height: 40px;
  margin: 20px auto;
  background-color: lightgreen;
  border-radius: 3px;
  border: solid 1px gray;
  line-height: 40px;
}
.div_block {
  height: auto;
  background-color: rgb(212, 248, 212);
}
.button_common {
  width: 90%;
  height: 40px;
  background-color: lightcoral;
  border-radius: 3px;
  border: solid 1px gray;
}
.button_1 {
  width: 91%;
  height: 40px;
  background-color: lightcoral;
  border-radius: 3px;
  border: solid 1px gray;
  margin-bottom: 10px;
}

.span_1 {
  width: 200px;
  text-align: left;
  float: left;
  margin-left: 20px;
}
.input_1 {
  width: 90%;
  height: 30px;
  margin: 10px 0;
}
.hello {
  margin: 0 auto;
  background-color: rgb(220, 248, 226);
  width: 600px;
  padding: 10px;
}
h4 {
  width: 90%;
  text-align: left;
  margin-left: 5%;
}
body {
  margin: 0;
}
</style>

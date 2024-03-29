const path = require("path");
const fs = require("fs");
const solc = require("solc");

const lotteryPath = path.resolve(__dirname, "contracts", "Lottery.sol");
const source = fs.readFileSync(lotteryPath, "utf8");

var input = {
  language: "Solidity",
  sources: {
    "Lottery.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));

// console.log("Input: ", input, "\n", "Output: ", output);

// ABI - Application Binary Interface
// bytecode - The contract
exports.abi = output.contracts["Lottery.sol"]["Lottery"].abi;
exports.bytecode = output.contracts["Lottery.sol"]["Lottery"].evm.bytecode.object;

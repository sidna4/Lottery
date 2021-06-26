const assert = require("assert");
const { DH_UNABLE_TO_CHECK_GENERATOR } = require("constants");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const { abi, bytecode } = require("../compile");

let accounts;
let lottery;
const INITIAL_STRING = "Hi there!";

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  // new web3.eth.Contract(JSON.parse(interface)).deploy({data: bytecode, arguments: ['Hi there!] })
  lottery = await new web3.eth.Contract(abi)
    .deploy({
      data: bytecode,
      arguments: [INITIAL_STRING],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Lottery", () => {
  // Run a test and make an assertion
  it("deploys a contract", () => {
    // console.log(lottery);
    // assert.strictEqual(car.park(), "stopped");
    assert.ok(lottery.options.address);
  });

  it("has manager", async () => {
    // Calls the "message" method in the Lottery
    const message = await lottery.methods.manager().call();

    // assert.strictEqual(message, INITIAL_STRING);
  });

});

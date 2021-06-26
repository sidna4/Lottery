// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

contract Lottery { 
    address public manager;
    address[] public players;
    
    constructor () {
        manager = msg.sender;
    }
    
    function enter() public payable {
        require(msg.value > .01 ether);
        
        players.push(msg.sender);
    }
    
    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }
    
    function pickWinner() public restricted {
        uint index = random() % players.length;
        
        payable(players[index]).transfer(address(this).balance); // e.g., 0x00sdcas234546
        
        // After winner then empty out players array
        players = new address[](0);
    }
    
    modifier restricted() {
        // Only the manager can call this function
        require(msg.sender == manager);
        _;
    }
    
    function getPlayers() public view returns (address[] memory) {
        return players;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract PiggyBank {

    mapping(address => uint256) piggyBank;
    
    address immutable owner;

    constructor() {
        owner = msg.sender;
    }

    function deposit() public payable {
        uint256 amount = address(msg.sender).balance;
        piggyBank[msg.sender] = amount;
    }

    function getAmount(address saver) public view returns(uint256) {
        return piggyBank[saver];
    }
}
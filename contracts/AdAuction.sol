// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

/// @title Advertisement Auction
/// @author TokenChaos
/// @notice An advertisement auction contract
/// @dev Allowing anyone to pay more ETH than the last person in order to change the text and image link on the website.
contract AdAuction {

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
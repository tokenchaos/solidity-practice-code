// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

/// @title Advertisement Auction
/// @author TokenChaos
/// @notice An advertisement auction contract
/// @dev Allowing anyone to pay more ETH than the last person in order to change the text and image link on the website.
contract AdAuction {

    /// @notice Log current bidders and prices
    /// @param bidder Address of current bidder
    /// @param price Current bid price 
    event Bid(address bidder, uint256 price);
    
    /// @notice Owner address of this contract
    address immutable owner;

    /// @notice Current bids at the auction, starting bid price 0.01eth
    uint256 public currentPrice = 0.01 ether;

    /// @notice Current bidders at the auction
    address public winner;

    receive() external payable {}

    fallback() external payable {}

    constructor() payable {
        owner = msg.sender;
    }

    modifier Ownable() {
        require(
            msg.sender == owner,
            "Only owner can do this"
        );
        _;
    }

    /// @notice The bid must be greater than the last bid
    modifier GreaterThanCurrentPrice() {
        require(
            msg.value > currentPrice,
            "Must greater than current bid"
        );
        _;
    }

    /// @notice Set bids
    function bid() external payable GreaterThanCurrentPrice() {
        payable(address(this)).transfer(msg.value);
        currentPrice = msg.value;
        winner = msg.sender;
        emit Bid(msg.sender, msg.value);
    }

    /// @notice Shows current winner of auction
    function currentWinner() public view returns(bool) {
        return msg.sender == winner;
    }

    /// @notice The owner checks balances
    function getBalance() public view Ownable returns(uint256) {
        return address(this).balance;
    }

    /// @notice The owner withdraws balance from contract
    function withdraw() public Ownable {
        uint256 amount = address(this).balance;
        payable(owner).transfer(amount);
    }
}
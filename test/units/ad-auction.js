const { assert, expect } = require("chai")
const { ethers } = require("hardhat")

describe("Advertise Auction Test", function () {

    let adAuctionFactory, adAuction

    beforeEach(async function() {
        adAuctionFactory = await ethers.getContractFactory("AdAuction")
        adAuction = await adAuctionFactory.deploy()
    })

    it("Should set the right initial price", async function () {
        const initialPrice = await adAuction.currentPrice()
        const expected = ethers.utils.parseEther("0.01")
        assert.equal(initialPrice.toString(), expected.toString())
    })

    it("Bid price should greater than initial price", async function() {
        // const account = await ethers.getSigner()
        // const balance = await account.getBalance()
        // console.log(`Account ${account.address} has ${balance} ether.`)
        
        const [owner, otherAccount] = await ethers.getSigners()
        // await expect(adAuction.bid({value: "100"})).to.be.revertedWith("Must greater than current bid")
        await expect(adAuction.connect(owner).bid({value: "100"})).to.be.revertedWith("Must greater than current bid")
    })

    it("Bids greater than the current price should be successful", async function() {
        // The first one is owner
        const accounts = await ethers.getSigners()
        const balance = await adAuction.getBalance()

        testAccount_1 = accounts[1]
        const bidPrice = ethers.utils.parseEther("0.011")
        await adAuction.connect(testAccount_1).bid({value: bidPrice})

        const newBalance = await adAuction.getBalance()
        // console.log(`Contract balance after bid: ${newBalance}`)

        assert.equal(newBalance.toString(), balance.add(bidPrice).toString())
    })

    it("Not owner can't withdraw the balance", async function() {
        const accounts = await ethers.getSigners()

        // The first one is owner
        testAccount_1 = accounts[1]
        const withdraw = adAuction.connect(testAccount_1).withdraw()
        await expect(withdraw).to.be.revertedWith("Only owner can do this")
    })

    it("Winner test should be false when not bid or bid failure", async function() {
        // const accounts = await ethers.getSigners()
        const winner = await adAuction.currentWinner()
        assert.equal(winner.toString(), "false")
    })

    it("Winner should be true after bid success", async function() {
        const accounts = await ethers.getSigners()

        // The first one is owner
        testAccount_1 = accounts[1]
        const bidPrice = ethers.utils.parseEther("0.011")
        await adAuction.connect(testAccount_1).bid({value: bidPrice})

        const winner = await adAuction.connect(testAccount_1).currentWinner()
        assert.equal(winner.toString(), "true")
    })

    it("Owner can withdraw the balance", async function() {
        // The first one is owner
        const [owner, others] = await ethers.getSigners()
        // const balance = await owner.getBalance()

        await adAuction.connect(owner).withdraw()
        const newBalance = await adAuction.getBalance()
        assert.equal(newBalance.toString(), "0")
    })
})
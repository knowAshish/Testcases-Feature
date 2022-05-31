const { expect } = require("chai");
const { BigNumber } = require("ethers"); // To parse big numbers
const { ethers } = require("hardhat");
let Mintcontract;
// block for deployement
describe("NFT Mintable Deployement", function () {
  let owner, addr1, addr2, addr3, brokerAdd; //needed addresses

  beforeEach(async function () { //hook that'll be run before every it block. Hence, everytime a function is called, the contract will be deployed again
    const Mintable = await ethers.getContractFactory("UPYOERC721Mintable");

    [owner, addr1, addr2, addr3, brokerAdd] = await ethers.getSigners(); //made the accounts as signers

     MintContract = await Mintable.deploy("UpYo", "UP", "AshishPatel", "ASH", 20, 100000000, brokerAdd.address);

  })

  describe("Setter Function Check", function () {

    it("Should set minting charge", async function () {
      await MintContract.connect(owner).setMintingCharge(100)
      expect(await MintContract.mintingCharge()).to.equal(100)

    })

    it("Should set the broker contract", async function () {

      await MintContract.connect(owner).setBroker("0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB")
expect(await MintContract.broker()).to.eq("0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB")


    })


  })

  describe("Mint NFT", function (){

    it("Should mint NFT", async function(){
      await MintContract.connect(owner).setMintingCharge(100)
      const overrides = {
        value: ethers.utils.parseEther('100'), 
      }
      await MintContract.connect(owner).setBroker("0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB")
      await MintContract.mint("abc.com", 10 ,overrides)
      let balance = await MintContract.balanceOf (owner.address)
      let tokenURI = await MintContract.tokenURI (1)
      expect(balance.toString()) .to.equal("1")
      expect(tokenURI) .to.equal("ASHabc.com")

      




    })
  })

});
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract EcoNFT is ERC721 {
    uint256 public nextTokenId;
    address public admin;

    // NFT sale price in wei.
    uint256 public nftPrice = 0.01 ether;

    // Tracks how many times an NFT (identified by tokenId) has been purchased.
    mapping(uint256 => uint256) public purchaseCount;
    // Tracks the last day (timestamp / 1 days) that a buyer purchased a specific NFT.
    mapping(address => mapping(uint256 => uint256)) public lastPurchaseDay;
    // Maps each user's address to their SuperCoin balance.
    mapping(address => uint256) public superCoinBalance;

    struct RewardDetails {
        string tokenURI;
        string title;
        string description;
        uint256 startTime; // Unix timestamp when purchases can begin
        uint256 endTime;   // Unix timestamp when purchases end
    }
    // Store extra details for each reward.
    mapping(uint256 => RewardDetails) public rewardDetails;

    event NFTCreated(uint256 indexed tokenId, string tokenURI, string title, string description, uint256 startTime, uint256 endTime);
    event NFTPurchased(uint256 indexed tokenId, address indexed buyer);
    event SuperCoinAwarded(address indexed buyer, uint256 amount);

    constructor() ERC721("EcoNFT", "ENFT") {
        admin = msg.sender;
    }

    // Admin function to create an NFT reward with a purchase window.
    function createReward(
        string memory tokenURI, 
        string memory title, 
        string memory description,
        uint256 startTime,
        uint256 endTime
    ) public {
        require(msg.sender == admin, "Only admin can create NFTs");
        require(endTime > startTime, "End time must be after start time");
        uint256 tokenId = nextTokenId;
        nextTokenId++;
        _mint(admin, tokenId);

        rewardDetails[tokenId] = RewardDetails(tokenURI, title, description, startTime, endTime);
        
        emit NFTCreated(tokenId, tokenURI, title, description, startTime, endTime);
    }

    // Function that allows a user to buy an NFT.
    // Limits purchase to once per day per NFT and only if within the purchase window.
    // If the NFT purchase count reaches a multiple of 100, the buyer is rewarded with SuperCoins.
    function buyNFT(uint256 tokenId) public payable {
        require(msg.value >= nftPrice, "Insufficient ether sent");
        
        // Check purchase window.
        RewardDetails memory details = rewardDetails[tokenId];
        require(block.timestamp >= details.startTime, "Purchase has not started yet");
        require(block.timestamp <= details.endTime, "Purchase window has ended");
        
        // Enforce a daily limit: one purchase per NFT per day per address.
        uint256 currentDay = block.timestamp / 1 days;
        require(lastPurchaseDay[msg.sender][tokenId] < currentDay, "You can only purchase this NFT once per day");

        lastPurchaseDay[msg.sender][tokenId] = currentDay;
        purchaseCount[tokenId] += 1;
        emit NFTPurchased(tokenId, msg.sender);

        // Check if purchase count has reached a multiple of 100.
        if (purchaseCount[tokenId] % 100 == 0) {
            superCoinBalance[msg.sender] += 2;
            emit SuperCoinAwarded(msg.sender, 2);
        }

        // Transfer NFT from admin to buyer if admin still owns it.
        if (ownerOf(tokenId) == admin) {
            _transfer(admin, msg.sender, tokenId);
        }
        // Otherwise, you might want to implement secondary market behaviour.
    }

    // Admin-only function to withdraw collected funds.
    function withdraw() public {
        require(msg.sender == admin, "Only admin can withdraw funds");
        payable(admin).transfer(address(this).balance);
    }
}

// Example excerpt from your StudentDashboard.tsx
const buyNFT = async (tokenId: number) => {
  try {
    await contract.methods.buyNFT(tokenId).send({ from: account, value: web3.utils.toWei("0.01", "ether") });
    alert("NFT purchased successfully!");
    // Optionally update UI to reflect purchase and any SuperCoin rewards
  } catch (error) {
    console.error("Error buying NFT:", error);
  }
};
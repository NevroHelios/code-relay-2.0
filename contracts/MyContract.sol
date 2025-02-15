// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GarbageNFT is ERC721URIStorage, Ownable {
    uint256 public rewardCounter;

    struct Reward {
        string tokenURI;
        string title;
        string description;
        uint256 expiryDate;
    }

    // Mapping from rewardId to Reward struct
    mapping(uint256 => Reward) public rewards;
    // Mapping from rewardId to approved student addresses
    mapping(uint256 => mapping(address => bool)) public approvedStudents;
    // Mapping to track claimed NFTs for each student
    mapping(address => uint256[]) public studentClaimedNFTs;
    // Mapping to track the number of times each student has claimed rewards
    mapping(address => uint256) public rewardClaimCounter;

    event RewardCreated(uint256 rewardId, string tokenURI, string title, string description, uint256 expiryDate);
    event StudentApproved(uint256 rewardId, address student);
    event NFTClaimed(uint256 rewardId, address student, uint256 tokenId, uint256 claimCount);

    constructor() ERC721("GarbageNFT", "GNFT") Ownable(msg.sender) {
        rewardCounter = 0;
    }

    function createReward(
        string memory _tokenURI,
        string memory _title,
        string memory _description,
        uint256 _expiryDate
    ) public onlyOwner returns (uint256) {
        rewardCounter++;
        rewards[rewardCounter] = Reward(_tokenURI, _title, _description, _expiryDate);
        emit RewardCreated(rewardCounter, _tokenURI, _title, _description, _expiryDate);
        return rewardCounter;
    }

    function approveStudentForReward(uint256 rewardId, address student) public onlyOwner {
        require(rewards[rewardId].expiryDate != 0, "Reward does not exist");
        approvedStudents[rewardId][student] = true;
        emit StudentApproved(rewardId, student);
    }

    function claimReward(uint256 rewardId) public {
        require(approvedStudents[rewardId][msg.sender], "Not approved for reward");
        require(block.timestamp <= rewards[rewardId].expiryDate, "Reward has expired");

        uint256 tokenId = uint256(keccak256(abi.encodePacked(rewardId, msg.sender, block.timestamp)));
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, rewards[rewardId].tokenURI);
        
        studentClaimedNFTs[msg.sender].push(tokenId);
        rewardClaimCounter[msg.sender]++;
        
        emit NFTClaimed(rewardId, msg.sender, tokenId, rewardClaimCounter[msg.sender]);
    }

    function viewMyClaimedRewards() public view returns (uint256[] memory) {
        return studentClaimedNFTs[msg.sender];
    }

    function getMyTotalClaimedRewards() public view returns (uint256) {
        return rewardClaimCounter[msg.sender];
    }

    function getStudentClaimedNFTs(address student) public view onlyOwner returns (uint256[] memory) {
        return studentClaimedNFTs[student];
    }

    function getStudentTotalClaimedRewards(address student) public view onlyOwner returns (uint256) {
        return rewardClaimCounter[student];
    }
}
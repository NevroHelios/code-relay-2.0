// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GarbageNFT is ERC721URIStorage, Ownable {
    uint256 public rewardCounter;

    // Mapping from rewardId to tokenURI (reward template)
    mapping(uint256 => string) public rewardTokenURI;
    // New mappings for extra metadata
    mapping(uint256 => string) public rewardTitle;
    mapping(uint256 => string) public rewardDescription;
    // Mapping from rewardId to approved student addresses
    mapping(uint256 => mapping(address => bool)) public approvedStudents;
    // Mapping from rewardId to record of claimed students
    mapping(uint256 => mapping(address => bool)) public claimed;

    event RewardCreated(uint256 rewardId, string tokenURI, string title, string description);
    event StudentApproved(uint256 rewardId, address student);
    event NFTClaimed(uint256 rewardId, address student, uint256 tokenId);

    constructor() ERC721("GarbageNFT", "GNFT") Ownable(msg.sender) {
        rewardCounter = 0;
    }

    // ADMIN FUNCTION: Create a new reward with extra metadata.
    function createReward(
        string memory _tokenURI,
        string memory _title,
        string memory _description
    ) public onlyOwner returns (uint256) {
        rewardCounter++;
        rewardTokenURI[rewardCounter] = _tokenURI;
        rewardTitle[rewardCounter] = _title;
        rewardDescription[rewardCounter] = _description;
        emit RewardCreated(rewardCounter, _tokenURI, _title, _description);
        return rewardCounter;
    }

    // ADMIN FUNCTION: Approve a student for a specific reward.
    function approveStudentForReward(uint256 rewardId, address student) public onlyOwner {
        require(bytes(rewardTokenURI[rewardId]).length != 0, "Reward does not exist");
        approvedStudents[rewardId][student] = true;
        emit StudentApproved(rewardId, student);
    }

    // STUDENT FUNCTION: Claim the NFT reward if approved and not already claimed.
    function claimReward(uint256 rewardId) public {
        require(approvedStudents[rewardId][msg.sender], "Not approved for reward");
        require(!claimed[rewardId][msg.sender], "Reward already claimed");

        // Generate a unique tokenId (using a hash for simplicity)
        uint256 tokenId = uint256(keccak256(abi.encodePacked(rewardId, msg.sender, block.timestamp)));
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, rewardTokenURI[rewardId]);
        claimed[rewardId][msg.sender] = true;
        emit NFTClaimed(rewardId, msg.sender, tokenId);
    }
}
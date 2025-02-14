// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GarbageNFT is ERC721URIStorage, Ownable {
    uint256 public rewardCounter;

    struct Reward{
        address student;
        string id;
        string title;
        string description;
        bool claimed;
        uint256 deadline;
        uint256 durationInDays;
        uint256 claimedAt;
    }

    struct Student{
        string name;
        address walletid;
        string[] rewards;
    }

    Reward[] public rewards;
    mapping(address => Reward[]) public studentrewards;

    Student[] public approvedstudents;
    Student[] public claimedstudents;

    event RewardCreated(uint256 rewardId, string tokenURI, string title, string description);
    event StudentApproved(uint256 rewardId, address student);
    event NFTClaimed(string rewardId, address student, uint256 tokenId);

    constructor() ERC721("GarbageNFT", "GNFT") Ownable(msg.sender) {
        rewardCounter = 0;
    }

    // ADMIN FUNCTION: Create a new reward with extra metadata.
    function createReward(
        address _student_address,
        uint256 _durationInDays,
        string memory _tokenURI,
        string memory _title,
        string memory _description
    ) public onlyOwner returns (string memory) {
        // rewardCounter++;
        // rewardTokenURI[rewardCounter] = _tokenURI;
        // rewardTitle[rewardCounter] = _title;
        // rewardDescription[rewardCounter] = _description;
        // emit RewardCreated(rewardCounter, _tokenURI, _title, _description);
        // return rewardCounter;
        Reward memory newreward = Reward({
            student : _student_address,
            id : _tokenURI,
            title : _title,
            description : _description,
            claimed : false,
            durationInDays : _durationInDays,
            deadline : block.timestamp + (1 days * _durationInDays),
            claimedAt : 0
        });
        studentrewards[_student_address].push(newreward);
        rewards.push(newreward);
        emit RewardCreated(rewardCounter, _tokenURI, _title, _description);
        return _tokenURI;
    }

    // to check if student exists
    function findStudentIndex(address _student) internal view returns (int) {
        for(uint i = 0; i < approvedstudents.length; i++) {
            if(approvedstudents[i].walletid == _student) {
                return int(i);
            }
        }
        return -1;
    }

    // Modified approveStudentForReward function
    function approveStudentForReward(
        address _student, 
        string memory _name, 
        uint256 _durationInDays,
        string memory _tokenURI,
        string memory _title,
        string memory _description
    ) public onlyOwner {
        require(bytes(_name).length > 0, "Name is required!");
        
        // Create the new reward
        string memory newRewardId = createReward(_student, _durationInDays, _tokenURI, _title, _description);
        
        // Check if student already exists
        int studentIndex = findStudentIndex(_student);
        
        if(studentIndex >= 0) {
            // Student exists, append to their rewards array
            uint256 index = uint256(studentIndex);
            string[] memory currentRewards = approvedstudents[index].rewards;
            string[] memory newRewards = new string[](currentRewards.length + 1);
            
            // Copy existing rewards
            for(uint i = 0; i < currentRewards.length; i++) {
                newRewards[i] = currentRewards[i];
            }
            
            // Add new reward
            newRewards[currentRewards.length] = newRewardId;
            approvedstudents[index].rewards = newRewards;
        } else {
            // Create new student
            string[] memory rewardsArray = new string[](1);
            rewardsArray[0] = newRewardId;
            Student memory newstudent = Student({
                name: _name,
                walletid: _student,
                rewards: rewardsArray
            });
            approvedstudents.push(newstudent);
        }
    }

    function IsRewardAvailable(string memory _rewardId, address _student) public view returns(bool){
        int studentIndex = findStudentIndex(_student);
        uint256 index = uint256(studentIndex);
        if(studentIndex < 0){
            return false;
        }
        for(uint i=0; i<approvedstudents[index].rewards.length; i++){
            if(keccak256(abi.encodePacked(approvedstudents[index].rewards[i])) == keccak256(abi.encodePacked(_rewardId))){
                return true;
            }
        }
        return false;
    }

    function hasExpiredAndClaimed(address _student, string memory _rewardId) public returns(bool){
        for(uint i=0; i<studentrewards[_student].length; i++){
            if(keccak256(abi.encodePacked(studentrewards[_student][i].id)) == keccak256(abi.encodePacked(_rewardId)) && studentrewards[_student][i].deadline >= block.timestamp && studentrewards[_student][i].claimed == false){
                studentrewards[_student][i].claimed = true;
                return true;
            }
        }
        return false;
    }

    function getApprovedStudents() public view returns(Student[] memory){
        return approvedstudents;
    }

    // STUDENT FUNCTION: Claim the NFT reward if approved and not already claimed.
    function claimReward(string memory _rewardId, address _student) public {
        bool answer = hasExpiredAndClaimed(_student, _rewardId);
        require(answer, "Reward not present, expired or claimed already!");
        // Generate a unique tokenId (using a hash for simplicity)
        uint256 tokenId = uint256(keccak256(abi.encodePacked(_rewardId, msg.sender, block.timestamp)));
        _mint(msg.sender, tokenId);
        for(uint i=0; i<studentrewards[_student].length; i++){
            if(keccak256(abi.encodePacked(studentrewards[_student][i].id)) == keccak256(abi.encodePacked(_rewardId))){
                _setTokenURI(tokenId, studentrewards[_student][i].id);
                break;
            }
        }
        
        emit NFTClaimed(_rewardId, msg.sender, tokenId);
    }

    function getClaimedStudents() public view returns(Student[] memory) {
        // First, count how many students have claimed rewards
        uint256 claimedCount = 0;
        for(uint i = 0; i < approvedstudents.length; i++) {
            address studentAddr = approvedstudents[i].walletid;
            for(uint j = 0; j < studentrewards[studentAddr].length; j++) {
                if(studentrewards[studentAddr][j].claimed) {
                    claimedCount++;
                    break; // Break after finding first claimed reward for this student
                }
            }
        }
        
        // Create array of claimed students
        Student[] memory claimed = new Student[](claimedCount);
        uint256 currentIndex = 0;
        
        // Fill the array with students who have claimed rewards
        for(uint i = 0; i < approvedstudents.length; i++) {
            address studentAddr = approvedstudents[i].walletid;
            bool hasClaimedReward = false;
            
            for(uint j = 0; j < studentrewards[studentAddr].length; j++) {
                if(studentrewards[studentAddr][j].claimed) {
                    claimed[currentIndex] = approvedstudents[i];
                    currentIndex++;
                    break; // Break after adding student once
                }
            }
        }
        
        return claimed;
    }
}
// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol"; // add this import

contract GarbageNFT is ERC721URIStorage, Ownable {
    uint256 public rewardCounter;
    string public baseTokenURI = "ipfs://example_base_uri/"; // Add a baseTokenURI state variable

    struct Reward {
        address student;
        string id;
        string title;
        string description;
        bool claimed;
        uint256 deadline;
        uint256 durationInDays;
        uint256 claimedAt;
        uint256 points;   // New points member for reward
    }

    struct Student {
        string name;
        address walletid;
        string[] rewards;
        uint256 totalRewardPoints;   // New total reward points for student
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

    // ADMIN FUNCTION: Create a new reward with extra metadata and reward points.
    function createReward(
        address _student_address,
        uint256 _durationInDays,
        string memory _title,
        string memory _description,
        uint256 _points    // New parameter for points
    ) public onlyOwner returns (string memory) {
        // Generate a token URI by concatenating the base URI with the current rewardCounter
        string memory newTokenURI = string(abi.encodePacked(baseTokenURI, Strings.toString(rewardCounter)));
        
        Reward memory newreward = Reward({
            student: _student_address,
            id: newTokenURI,
            title: _title,
            description: _description,
            claimed: false,
            durationInDays: _durationInDays,
            deadline: block.timestamp + (1 days * _durationInDays),
            claimedAt: 0,
            points: _points
        });
        studentrewards[_student_address].push(newreward);
        rewards.push(newreward);
        emit RewardCreated(rewardCounter, newTokenURI, _title, _description);
        rewardCounter++;
        return newTokenURI;
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

    // Modified approveStudentForReward function to include reward points.
    function approveStudentForReward(
        address _student, 
        string memory _name, 
        uint256 _durationInDays,
        string memory _title,
        string memory _description,
        uint256 _points    // New parameter for reward points
    ) public onlyOwner {
        require(bytes(_name).length > 0, "Name is required!");
        
        // Create the new reward with points (tokenURI is generated automatically)
        string memory newRewardId = createReward(_student, _durationInDays, _title, _description, _points);
        
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
            // Create new student with initial totalRewardPoints of 0
            string[] memory rewardsArray = new string[](1);
            rewardsArray[0] = newRewardId;
            Student memory newstudent = Student({
                name: _name,
                walletid: _student,
                rewards: rewardsArray,
                totalRewardPoints: 0
            });
            approvedstudents.push(newstudent);
        }
    }

    function IsRewardAvailable(string memory _rewardId, address _student) public view returns(bool){
        int studentIndex = findStudentIndex(_student);
        if(studentIndex < 0){
            return false;
        }
        uint256 index = uint256(studentIndex);
        for(uint i = 0; i < approvedstudents[index].rewards.length; i++){
            if(keccak256(abi.encodePacked(approvedstudents[index].rewards[i])) == keccak256(abi.encodePacked(_rewardId))){
                return true;
            }
        }
        return false;
    }

    function hasExpiredAndClaimed(address _student, string memory _rewardId) public returns(bool){
        for(uint i = 0; i < studentrewards[_student].length; i++){
            if(keccak256(abi.encodePacked(studentrewards[_student][i].id)) == keccak256(abi.encodePacked(_rewardId)) 
               && studentrewards[_student][i].deadline >= block.timestamp 
               && studentrewards[_student][i].claimed == false){
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
    // Notice: No payment (i.e. payable) is necessary.
    function claimReward(string memory _rewardId, address _student) public {
        bool answer = hasExpiredAndClaimed(_student, _rewardId);
        require(answer, "Reward not present, expired or claimed already!");
        // Generate a unique tokenId (using a hash for simplicity)
        uint256 tokenId = uint256(keccak256(abi.encodePacked(_rewardId, msg.sender, block.timestamp)));
        _mint(msg.sender, tokenId);
        uint256 rewardPoints = 0;
        for(uint i = 0; i < studentrewards[_student].length; i++){
            if(keccak256(abi.encodePacked(studentrewards[_student][i].id)) == keccak256(abi.encodePacked(_rewardId))){
                rewardPoints = studentrewards[_student][i].points;
                _setTokenURI(tokenId, studentrewards[_student][i].id);
                break;
            }
        }
        
        // Update student's total reward points
        int studentIndex = findStudentIndex(_student);
        require(studentIndex >= 0, "Student not found!");
        approvedstudents[uint(studentIndex)].totalRewardPoints += rewardPoints;
        
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

    function getrewards() view public returns(Reward[] memory){
        return rewards;
    }
}
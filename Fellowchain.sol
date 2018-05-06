pragma solidity ^0.4.19;

import "./Ownable.sol";

contract Fellowchain is Ownable {
    
    struct Member {
        string userName;
        address userAddress;
        bool onSale;
    }
    
    struct Fellowship {
        uint follower;
        uint following;
        bool fstatus;
    }
    
    Member[] public members;
    Fellowship[] public fellowships;
    
    mapping (address => uint) public memberToExistence;
    mapping (address => uint) public memberAddressToId;
    mapping (uint => uint) public collectionToOwner;
    
    mapping (uint => uint) public memberCollectionCount;
    mapping (uint => uint) public memberFollowerCount;
    mapping (uint => uint) public memberFollowingCount;
    
    mapping (address => uint) public paymentApprovals;
    
    modifier onlyMembers(address _address) {
        require(isMemberExist(_address));
        _;
    }
    
    modifier onlyMembers2(address _address1, address _address2) {
        require(isMemberExist(_address1) && isMemberExist(_address2));
        _;
    }
    
    modifier onlyMembers3(address _address1, address _address2, address _address3) {
        require(isMemberExist(_address1) && isMemberExist(_address2) && isMemberExist(_address3));
        _;
    }
    
    function isMemberExist(address _address) private view returns(bool) {
        if(memberToExistence[_address] == 1)
            return true;
        else
            return false;
    }
    
    function withdraw() external payable {
        require(paymentApprovals[msg.sender] > 0);
        msg.sender.transfer(paymentApprovals[msg.sender]);
        paymentApprovals[msg.sender] = 0;
    }
    
    function createMember(string _userName) public returns(uint) {
        require(isMemberExist(msg.sender) == false); //check members existence. If not exist, proceed.
        uint id = members.push(Member(_userName, msg.sender, false)) - 1; //create member.
        memberAddressToId[msg.sender] = id; //map members address to its id.
        collectionToOwner[id] = id; //insert member to its own collections.
        memberCollectionCount[id]++;
        memberToExistence[msg.sender] = 1; //member exists now.
        return id;
    }
    
    function follow(address _following) public onlyMembers2(msg.sender, _following) {
        //require(isMemberExist(_following) && isMemberExist(msg.sender)); //both follower and following must be exist.
        fellowships.push(Fellowship(memberAddressToId[msg.sender], memberAddressToId[_following], true));
        memberFollowerCount[memberAddressToId[_following]]++;
        memberFollowingCount[memberAddressToId[msg.sender]]++;
    }
    
    function sendEther(address _address) external payable {
        _address.transfer(msg.value * 0.1 ether);
    }
    
    function collect(address _member) external payable onlyMembers2(msg.sender, _member) {
        require(members[memberAddressToId[_member]].onSale == true); //check onSale property
        uint price = memberFollowerCount[memberAddressToId[_member]]*100000000000000000;
        
        require(msg.value >= price); //check payment amount
        
        address _owner = members[collectionToOwner[memberAddressToId[_member]]].userAddress;
        
        //calculate payment amounts
        uint chargebackAmount = msg.value - price;
        uint memberFee = price/10;
        uint brokerFee = price/10;
        uint ownerFee = price - (memberFee + brokerFee);
        
        //payments
        paymentApprovals[_member] = paymentApprovals[_member] + memberFee; //collection
        paymentApprovals[owner] = paymentApprovals[owner] + brokerFee; //system owner
        paymentApprovals[_owner] = paymentApprovals[_owner] + ownerFee; //collection owner-old(seller)
        paymentApprovals[msg.sender] = paymentApprovals[msg.sender] + chargebackAmount; //collection owner-new(buyer)
        
        //operations
        collectionToOwner[memberAddressToId[_member]] = memberAddressToId[msg.sender];
        members[memberAddressToId[_member]].onSale = false;
        memberCollectionCount[memberAddressToId[msg.sender]]++;
        memberCollectionCount[memberAddressToId[_owner]]--;
    }
    
    
    function changeCollectionStatus(uint _collectionId) public {
        require(collectionToOwner[_collectionId] == memberAddressToId[msg.sender]);
        members[_collectionId].onSale = !members[_collectionId].onSale;
    }
    
    function getCollectionsByOwner(address _owner) external view returns(uint[]) {
        uint[] memory result = new uint[](memberCollectionCount[memberAddressToId[_owner]]);
        uint counter = 0;
        for (uint i = 0; i < members.length; i++) {
            if (collectionToOwner[i] == memberAddressToId[_owner]) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }
    
    function getFollowersByOwner(address _owner) external view returns(uint[]) {
        uint[] memory result = new uint[](memberFollowerCount[memberAddressToId[_owner]]);
        uint counter = 0;
        for (uint i = 0; i < fellowships.length; i++) {
            if (fellowships[i].following == memberAddressToId[_owner] && fellowships[i].fstatus == true) {
                result[counter] = fellowships[i].follower;
                counter++;
            }
        }
        return result;
    }
    
    function getFollowingsByOwner(address _owner) external view returns(uint[]) {
        uint[] memory result = new uint[](memberFollowingCount[memberAddressToId[_owner]]);
        uint counter = 0;
        for (uint i = 0; i < fellowships.length; i++) {
            if (fellowships[i].follower == memberAddressToId[_owner] && fellowships[i].fstatus == true) {
                result[counter] = fellowships[i].following;
                counter++;
            }
        }
        return result;
    }
    
    function getAllMembers() external view returns(uint[]) {
        uint[] memory result = new uint[](members.length);
        for (uint i = 0; i < members.length; i++) {
            result[i] = i;
        }
        return result;
    }
    
    function getWithdrawAmount() external view returns(uint){
        return paymentApprovals[msg.sender];
    }
    
    
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./Authorizer.sol";

contract Nexus {
    /* ========== DATA STRUCTURES ========== */
    struct Wallet {
        string walletAddress;
        string name;
        string description;
        string provider;
        string chain;
    }

    struct Profile {
        address owner;
        Wallet[] wallets;
    }

    /* ========== STATE VARIABLES ========== */
    Authorizer private authorizer;
    address payable private feeController;
    uint16 private fee;

    mapping(bytes32 => Profile) private profiles;

    // Permits modifications only by the owner of the specified node.
    modifier onlyOwner(bytes32 hash) {
        address owner = profiles[hash].owner;
        require(owner == msg.sender, "Caller must be owner");
        _;
    }

    modifier onlyAuthorized(bytes32 hash) {
        bool isAuthorized = authorizer.requireAuthorization(hash);
        require(isAuthorized, "Caller must be authorized");
        _;
    }

    modifier sufficientPayment() {
        require(msg.value >= fee, "Insufficient payment");
        _;
    }

    /* ========== EVENTS ========== */

    event ProfileCreateEvent(bytes32 indexed hash);

    event ProfileDeleteEvent(bytes32 indexed hash);

    event WalletCreateEvent(bytes32 indexed hash, string walletAddress);

    event WalletUpdateEvent(bytes32 indexed hash, string walletAddress);

    event WalletDeleteEvent(bytes32 indexed hash, string walletAddress);

    /* ========== CONSTRUCTOR ========== */

    constructor(
        Authorizer _authorizer,
        address payable _feeController,
        uint16 _fee
    ) {
        authorizer = _authorizer;
        feeController = _feeController;
        fee = _fee;
    }

    /* ========== MUTATIVE FUNCTIONS ========== */

    // PROFILE
    function createProfile(
        bytes32 hash,
        string memory walletAddress,
        string memory name,
        string memory description,
        string memory provider,
        string memory chain
    ) external payable onlyAuthorized(hash) sufficientPayment {
        Profile storage profile = profiles[hash];
        profile.owner = msg.sender;

        Wallet memory newWallet = Wallet(
            walletAddress,
            name,
            description,
            provider,
            chain
        );
        profile.wallets.push(newWallet);

        emit ProfileCreateEvent(hash);
    }

    function deleteProfile(bytes32 hash)
        external
        payable
        onlyOwner(hash)
        onlyAuthorized(hash)
        sufficientPayment
        returns (bool success)
    {
        delete profiles[hash];

        emit ProfileDeleteEvent(hash);
        return true;
    }

    // WALLET
    function insertWallet(
        bytes32 hash,
        string memory walletAddress,
        string memory name,
        string memory description,
        string memory provider,
        string memory chain
    ) external payable onlyOwner(hash) onlyAuthorized(hash) sufficientPayment {
        Wallet memory newWallet = Wallet(
            walletAddress,
            name,
            description,
            provider,
            chain
        );
        profiles[hash].wallets.push(newWallet);

        emit WalletCreateEvent(hash, walletAddress);
    }

    function getWallets(bytes32 hash)
        external
        view
        onlyAuthorized(hash)
        returns (Wallet[] memory _wallets)
    {
        return profiles[hash].wallets;
    }

    function updateWallet(
        bytes32 hash,
        uint8 index,
        string memory name,
        string memory description
    )
        external
        payable
        onlyOwner(hash)
        onlyAuthorized(hash)
        sufficientPayment
        returns (bool success)
    {
        Wallet storage currentWallet = profiles[hash].wallets[index];

        currentWallet.name = name;
        currentWallet.description = description;

        emit WalletUpdateEvent(
            hash,
            profiles[hash].wallets[index].walletAddress
        );
        return true;
    }

    function deleteWallet(bytes32 hash, uint8 index)
        external
        payable
        onlyOwner(hash)
        onlyAuthorized(hash)
        sufficientPayment
        returns (bool success)
    {
        string memory deletedAddress = profiles[hash]
            .wallets[index]
            .walletAddress;
        delete profiles[hash].wallets[index];

        emit WalletDeleteEvent(hash, deletedAddress);
        return true;
    }

    /* ========== INTERNAL FUNCTIONS ========== */

    // FEE CONTROLLER
    function adjustFee(uint16 _adjustedFee) external returns (uint16) {
        require(
            msg.sender == feeController,
            "msg.sender must be feeController"
        );
        fee = _adjustedFee;
        return fee;
    }

    function withdrawPayments(uint256 _amount) external {
        require(
            msg.sender == feeController,
            "msg.sender must be feeController"
        );
        require(
            address(this).balance >= _amount,
            "Cannot withdraw more than the amount in the contract"
        );
        feeController.transfer(_amount);
    }

    function changeFeeController(address payable _newFeeController) external {
        require(
            msg.sender == feeController,
            "msg.sender must be feeController"
        );
        feeController = _newFeeController;
    }
}

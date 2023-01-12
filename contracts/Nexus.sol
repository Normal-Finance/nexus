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
    Authorizer public authorizer;

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

    /* ========== EVENTS ========== */

    event ProfileCreateEvent(bytes32 indexed hash);

    event ProfileDeleteEvent(bytes32 indexed hash);

    event WalletCreateEvent(bytes32 indexed hash, string walletAddress);

    event WalletUpdateEvent(bytes32 indexed hash, string walletAddress);

    event WalletDeleteEvent(bytes32 indexed hash, string walletAddress);

    /* ========== CONSTRUCTOR ========== */

    constructor(Authorizer _authorizer) {
        authorizer = _authorizer;
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
    ) external onlyAuthorized(hash) {
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
        onlyOwner(hash)
        onlyAuthorized(hash)
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
    ) external onlyOwner(hash) onlyAuthorized(hash) {
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
        uint256 index,
        string memory name,
        string memory description
    ) external onlyOwner(hash) onlyAuthorized(hash) returns (bool success) {
        Wallet storage currentWallet = profiles[hash].wallets[index];

        currentWallet.name = name;
        currentWallet.description = description;

        emit WalletUpdateEvent(
            hash,
            profiles[hash].wallets[index].walletAddress
        );
        return true;
    }

    function deleteWallet(bytes32 hash, uint256 index)
        external
        onlyOwner(hash)
        onlyAuthorized(hash)
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
}

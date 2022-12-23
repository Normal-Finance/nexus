// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "./Authorizer.sol";

contract Nexus {
    /* ========== DATA STRUCTURES ========== */
    struct Wallet {
        address _address;
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
        require(isAuthorized == true, "Caller must be authorized");
        _;
    }

    /* ========== EVENTS ========== */

    event ProfileCreateEvent(bytes32 indexed hash);

    event ProfileDeleteEvent(bytes32 indexed hash);

    event WalletCreateEvent(bytes32 indexed hash, address _address);

    event WalletUpdateEvent(bytes32 indexed hash, address _address);

    event WalletDeleteEvent(bytes32 indexed hash, address _address);

    /* ========== CONSTRUCTOR ========== */

    constructor(Authorizer _authorizer) {
        authorizer = _authorizer;
    }

    /* ========== MUTATIVE FUNCTIONS ========== */

    // PROFILE
    function createProfile(bytes32 hash) public onlyAuthorized(hash) {
        Profile storage profile = profiles[hash];
        profile.owner = msg.sender;

        emit ProfileCreateEvent(hash);
    }

    function createProfileWithWallet(
        bytes32 hash,
        address _address,
        string memory name,
        string memory description,
        string memory provider,
        string memory chain
    ) public onlyAuthorized(hash) {
        Profile storage profile = profiles[hash];
        profile.owner = msg.sender;

        this.insertWallet(hash, _address, name, description, provider, chain);

        emit ProfileCreateEvent(hash);
    }

    function deleteProfile(bytes32 hash)
        public
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
        address _address,
        string memory name,
        string memory description,
        string memory provider,
        string memory chain
    ) public onlyOwner(hash) onlyAuthorized(hash) {
        Wallet memory newWallet = Wallet(
            _address,
            name,
            description,
            provider,
            chain
        );
        profiles[hash].wallets.push(newWallet);

        emit WalletCreateEvent(hash, _address);
    }

    function getWallets(bytes32 hash)
        public
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
    )
        public
        onlyOwner(hash)
        onlyAuthorized(hash)
        returns (Wallet memory wallet)
    {
        profiles[hash].wallets[index].name = name;
        profiles[hash].wallets[index].description = description;

        emit WalletUpdateEvent(hash, profiles[hash].wallets[index]._address);

        return profiles[hash].wallets[index];
    }

    function deleteWallet(bytes32 hash, uint256 index)
        public
        onlyOwner(hash)
        onlyAuthorized(hash)
        returns (bool success)
    {
        address deletedAddress = profiles[hash].wallets[index]._address;
        delete profiles[hash].wallets[index];

        emit WalletDeleteEvent(hash, deletedAddress);
        return true;
    }

    /* ========== INTERNAL FUNCTIONS ========== */
}

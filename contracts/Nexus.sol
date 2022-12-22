// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract Nexus {
    /* ========== DATA STRUCTURES ========== */
    struct Wallet {
        address _address;
        string name; // joshua.blew.metamask.main
        string description;
        string provider;
        string chain;
    }

    struct Profile {
        address owner;
        Wallet[] wallets;
    }

    /* ========== STATE VARIABLES ========== */

    mapping(bytes32 => Profile) public profiles;

    // Permits modifications only by the owner of the specified node.
    // modifier onlyOwner(bytes32 hash, address owner) {
    //     require(owner == msg.sender, "Caller must be owner");
    //     _;
    // }

    /* ========== EVENTS ========== */

    event WalletEvent(
        address _address,
        string name,
        string description,
        string provider,
        string chain
    );

    event WalletDelete(bytes32 hash);

    /* ========== CONSTRUCTOR ========== */

    /* ========== MUTATIVE FUNCTIONS ========== */

    // PROFILE
    function createProfile(
        bytes32 hash,
        address _address,
        string memory name,
        string memory description,
        string memory provider,
        string memory chain
    ) public {
        Profile storage profile = profiles[hash];
        profile.owner = msg.sender;

        this.insertWallet(hash, _address, name, description, provider, chain);
    }

    function deleteProfile(bytes32 hash) public returns (bool success) {
        delete profiles[hash];

        emit WalletDelete(hash);
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
    ) public {
        Wallet memory newWallet = Wallet(
            _address,
            name,
            description,
            provider,
            chain
        );
        profiles[hash].wallets.push(newWallet);

        emit WalletEvent(_address, name, description, provider, chain);
    }

    function getWallets(bytes32 hash)
        public
        view
        returns (Wallet[] memory _wallets)
    {
        return profiles[hash].wallets;
    }

    function updateWallet(
        bytes32 hash,
        uint256 index,
        string memory name,
        string memory description
    ) public returns (Wallet memory wallet) {
        profiles[hash].wallets[index].name = name;
        profiles[hash].wallets[index].description = description;

        return profiles[hash].wallets[index];
    }

    function deleteWallet(bytes32 hash, uint256 index)
        public
        returns (bool success)
    {
        delete profiles[hash].wallets[index];

        emit WalletDelete(hash);
        return true;
    }

    /* ========== INTERNAL FUNCTIONS ========== */
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Authorizer {
    /* ========== STATE VARIABLES ========== */
    address private owner;

    enum AuthorizationState {
        INACTIVE,
        ACTIVE,
        BLOCKED
    }

    mapping(bytes32 => AuthorizationState) private authorizations;

    // Permits modifications only by the owner of the specified node.
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller must be owner");
        _;
    }

    /* ========== EVENTS ========== */

    event AuthorizationUpdateEvent(bytes32 indexed hash, AuthorizationState);

    /* ========== CONSTRUCTOR ========== */

    constructor() {
        owner = msg.sender;
    }

    /* ========== MUTATIVE FUNCTIONS ========== */

    function requireAuthorization(bytes32 hash)
        external
        view
        returns (bool success)
    {
        return authorizations[hash] == AuthorizationState.ACTIVE;
    }

    function getAuthorizationStatus(bytes32 hash)
        external
        view
        returns (AuthorizationState)
    {
        return authorizations[hash];
    }

    function updateAuthorizationStatus(
        bytes32 hash,
        AuthorizationState authStatus
    ) external onlyOwner returns (bool success) {
        authorizations[hash] = authStatus;

        emit AuthorizationUpdateEvent(hash, authStatus);
        return true;
    }

    /* ========== INTERNAL FUNCTIONS ========== */
}

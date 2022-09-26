// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Roles is AccessControl {

    error NotAuthorizedError(address sender);

    constructor(address _onwer) {
        _setupRole(DEFAULT_ADMIN_ROLE, _onwer);
    }

    modifier onlyOnwer() {
        if (!hasRole(DEFAULT_ADMIN_ROLE, _msgSender())) revert NotAuthorizedError(_msgSender());
        _;
    }
}
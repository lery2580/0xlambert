// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract DBR is ERC721Enumerable, Ownable {
    using SafeMath for uint256;
    uint256 public DBRPrice = 50000000000000000; // 0.05 ETH
    uint256 public maxDBRPurchase = 20;
    uint256 public maxDBRs = 10000;
    uint256 public _reserved = 20;
    string public _baseTokenURI;
    address admin;
    address[] public adminList;
    mapping(address => bool) public admins;

    bool public saleIsActive = false;
    bool public reserved = false;
    bool public allFrozen;
    mapping(uint256 => bool) frozenIds;
    // Optional mapping for token URIs
    mapping(uint256 => string) private _tokenURIs;
    event DBRPriceChanged(uint256 price);
    event MaxTokenAmountChanged(uint256 value);
    event MaxPurchaseChanged(uint256 value);
    event DBRsReserved();
    event RolledOver(bool status);
    event PermanentURI(string _value, uint256 indexed _id);

    modifier onReserve() {
        require(!reserved, "Tokens reserved");
        _;
        reserved = true;
        emit DBRsReserved();
    }

    modifier onlyAdmin() {
        require(admins[msg.sender], "Not admin");
        _;
    }

    constructor(address[] memory _admin) ERC721("DontBuyRocks", "DBR") {
        for (uint256 i = 0; i < _admin.length; i++) {
            admins[_admin[i]] = true;
        }
        adminList = _admin;
    }

    function withdraw() public onlyAdmin {
        uint256 balance = address(this).balance;
        uint256 _each = balance / adminList.length;
        for (uint256 i = 0; i < adminList.length; i++) {
            require(payable(adminList[i]).send(_each));
        }
    }

    function reserveDBRs(address _to, uint256 _amount)
        external
        onlyAdmin
        onReserve
    {
        require(_amount <= _reserved, "Exceeds reserved Cat supply");

        uint256 supply = totalSupply();
        for (uint256 i; i < _amount; i++) {
            _safeMint(_to, supply + i);
        }

        _reserved -= _amount;
    }

    function flipSaleState() public onlyAdmin {
        saleIsActive = !saleIsActive;
        emit RolledOver(saleIsActive);
    }

    function mintDBRs(uint256 num) public payable {
        uint256 supply = totalSupply();
        require(saleIsActive, "Sale is not active");
        require(num > 0, "Cannot buy 0");
        require(
            num < maxDBRPurchase,
            "Exceeds max number of DBRs in one transaction"
        );
        require(
            supply + num < maxDBRs - _reserved,
            "Purchase would exceed max supply of DBRs"
        );
        require(
            DBRPrice.mul(num) <= msg.value,
            "Ether value sent is not correct"
        );
        uint256 mintIndex;
        for (uint256 i; i < num; i++) {
            mintIndex = supply + i;
            _safeMint(msg.sender, supply + i);
        }
    }

    function walletOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 tokenCount = balanceOf(_owner);

        uint256[] memory tokensId = new uint256[](tokenCount);
        for (uint256 i; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokensId;
    }

    function getMyAssets(address _owner, uint256 index)
        public
        view
        returns (uint256)
    {
        uint256 tokensId = tokenOfOwnerByIndex(_owner, index);
        return tokensId;
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI)
        external
        onlyAdmin
    {
        require(!allFrozen && !frozenIds[tokenId], "Already frozen");
        _tokenURIs[tokenId] = _tokenURI;
    }

    function setBaseTokenURI(string memory baseTokenURI_) external onlyAdmin {
        require(!allFrozen, "Already frozen");
        _baseTokenURI = baseTokenURI_;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function setPrice(uint256 _price) external onlyAdmin {
        require(_price > 0, "Zero price");

        DBRPrice = _price;
        emit DBRPriceChanged(_price);
    }

    function setMaxTokenAmount(uint256 _value) external onlyAdmin {
        require(
            _value > totalSupply() && _value <= 10_000,
            "Wrong value for max supply"
        );

        maxDBRs = _value;
        emit MaxTokenAmountChanged(_value);
    }

    function setMaxPurchase(uint256 _value) external onlyAdmin {
        require(_value > 0, "Very low value");

        maxDBRPurchase = _value;
        emit MaxPurchaseChanged(_value);
    }

    function setReserveAmount(uint256 __reserved) external onlyAdmin {
        _reserved = __reserved;
    }

    function enableAdmin(address _addr) external onlyOwner {
        admins[_addr] = true;
    }

    function disableAdmin(address _addr) external onlyOwner {
        admins[_addr] = false;
    }

    function freezeAll() external onlyOwner {
        allFrozen = true;
    }

    function freeze(uint256 tokenId) external onlyOwner {
        frozenIds[tokenId] = true;

        emit PermanentURI(tokenURI(tokenId), tokenId);
    }
}

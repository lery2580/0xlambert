import Portis from "@portis/web3";
import Web3 from "web3";

import config from "@/config/index";
const { nftAddress } = config;

const ERC20_METADATA_ABI = require("../abi/ERC20Metadata.json");
const ERC20_ABI = require("../abi/ERC20.json");
const ERC721_ENUMERABLE_ABI = require("../abi/ERC721Enumerable.json");
const ERC165_ABI = require("../abi/ERC165.json");

const ERC721_ABI = require("../abi/ERC721.json");
// const DBR = require("../abi/DBR.json");
declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

if (window.ethereum) {
  window.web3 = new Web3(window.ethereum);
  window.ethereum.enable(); // should wait?
}

if (!window.web3) {
  const DAPP_ID = "a0fa4f71-2d8e-4a67-baa6-33ab41c3ba26";
  const portis = new Portis(DAPP_ID, "mainnet");
  window.web3 = new Web3(portis.provider);
}

const web3 = new Web3(window.web3.currentProvider);

const NFTFY_CONTRACT_RINKEBY = "0xc0D1946C1754d2F94dE4Cf52deF7162f6611316D";

// const ERC721_METADATA_INTERFACE_ID = '0x5b5e139f';
const ERC721_INTERFACE_ID = "0x80ac58cd";
// const ERC721_ENUMERABLE_INTERFACE_ID = '0x780e9d63';

export async function getNftfyContract(): Promise<string> {
  const network = await web3.eth.net.getNetworkType();
  switch (network) {
    // TODO main
    case "main":
      return "0x97fb1e97A05aF8ff862C7f5fA9e28C716660d632";
    case "rinkeby":
      return NFTFY_CONTRACT_RINKEBY;
    default:
      throw new Error("Unsupported network");
  }
}

function toCents(amount: string, decimals: number): string {
  return (Number(amount) * 10 ** decimals).toFixed(0);
}

function fromCents(amount: string, decimals: number): string {
  return (Number(amount) / 10 ** decimals).toFixed(decimals);
}

export function isValidAddress(address: string): boolean {
  return web3.utils.isAddress(address);
}

export async function getAccounts(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts((error, accounts) => {
      if (error) return reject(error);
      return resolve(accounts);
    });
  });
}

export async function getETHBalance(address: string): Promise<string> {
  return new Promise((resolve, reject) => {
    web3.eth.getBalance(address, "latest", (error, balance) => {
      if (error) return reject(error);
      return resolve(web3.utils.fromWei(balance, "ether"));
    });
  });
}

export async function transferETH(
  account: string,
  address: string,
  amount: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    web3.eth
      .sendTransaction({
        from: account,
        to: address,
        value: web3.utils.toWei(amount, "ether"),
      })
      .once("confirmation", (confNumber: any, receipt: any) => resolve())
      .once("error", reject);
  });
}

async function ERC20_name(contract: string): Promise<string> {
  const abi = new window.web3.eth.Contract(ERC20_METADATA_ABI, contract);
  return abi.methods.name().call();
}

async function ERC20_symbol(contract: string): Promise<string> {
  const abi = new window.web3.eth.Contract(ERC20_METADATA_ABI, contract);
  return abi.methods.symbol().call();
}

async function ERC20_decimals(contract: string): Promise<number> {
  const abi = new window.web3.eth.Contract(ERC20_METADATA_ABI, contract);
  return Number(await abi.methods.decimals().call());
}

async function ERC20_balanceOf(
  contract: string,
  address: string
): Promise<string> {
  const abi = new window.web3.eth.Contract(ERC20_ABI, contract);
  return abi.methods.balanceOf(address).call();
}

async function ERC20_transfer(
  account: string,
  contract: string,
  address: string,
  amount: string
): Promise<void> {
  const abi = new window.web3.eth.Contract(ERC20_ABI, contract);
  return new Promise((resolve, reject) => {
    abi.methods
      .transfer(address, amount)
      .send({ from: account })
      .once("confirmation", (confNumber: any, receipt: any) => resolve())
      .once("error", reject);
  });
}

export async function getERC20Name(contract: string): Promise<string> {
  return ERC20_name(contract);
}

export async function getERC20Symbol(contract: string): Promise<string> {
  return ERC20_symbol(contract);
}

export async function getERC20Balance({
  contract,
  account,
}: {
  contract: string;
  account: string;
}): Promise<string> {
  const decimals = await ERC20_decimals(contract);
  const balance = await ERC20_balanceOf(contract, account);
  return fromCents(balance, decimals);
}

export async function transferERC20(
  account: string,
  contract: string,
  address: string,
  amount: string
): Promise<void> {
  const decimals = await ERC20_decimals(contract);
  return ERC20_transfer(account, contract, address, toCents(amount, decimals));
}

async function ERC165_supportsInterface(
  contract: string,
  interfaceId: string
): Promise<boolean> {
  const abi = new window.web3.eth.Contract(ERC165_ABI, contract);
  return abi.methods.supportsInterface(interfaceId).call();
}

async function ERC721_balanceOf({
  account,
}: {
  account: string;
}): Promise<string> {
  const abi = new window.web3.eth.Contract(ERC721_ABI, nftAddress);
  console.log("abi: ", abi);
  const balance = await abi.methods.balanceOf(account).call();
  console.log("balance: ", balance);
  return balance;
}

async function ERC721_allfrozen(): Promise<boolean> {
  const abi = new window.web3.eth.Contract(ERC721_ENUMERABLE_ABI, nftAddress);
  return abi.methods.allfrozen().call();
}

async function ERC721_walletOfOwner({
  _owner,
}: {
  _owner: string;
}): Promise<string> {
  const abi = new window.web3.eth.Contract(ERC721_ENUMERABLE_ABI, nftAddress);
  return abi.methods.walletOfOwner(_owner).call();
}

async function ERC721_admins({
  address,
}: {
  address: string;
}): Promise<boolean> {
  const abi = new window.web3.eth.Contract(ERC721_ENUMERABLE_ABI, nftAddress);
  return abi.methods.admins(address).call();
}

async function ERC721_tokenOfOwnerByIndex({
  account,
  index,
}: {
  account: string;
  index: string;
}): Promise<string> {
  const abi = new window.web3.eth.Contract(ERC721_ENUMERABLE_ABI, nftAddress);
  return abi.methods.tokenOfOwnerByIndex(account, index).call();
}

export async function getERC721TokenIdByIndex({
  account,
  index,
}: {
  account: string;
  index: number;
}): Promise<string> {
  return ERC721_tokenOfOwnerByIndex({
    account,
    index: String(index),
  });
}

export async function supportsInterface(contract: string): Promise<boolean> {
  return ERC165_supportsInterface(contract, ERC721_INTERFACE_ID);
}

export async function admins({
  address,
}: {
  address: string;
}): Promise<boolean> {
  return ERC721_admins({ address });
}

export async function allFrozen(): Promise<boolean> {
  return ERC721_allfrozen();
}

export async function getERC721Balance({
  account,
}: {
  account: string;
}): Promise<string> {
  const balance = await ERC721_balanceOf({
    account,
  });
  return balance;
}

export async function walletOfOwner({
  _owner,
}: {
  _owner: string;
}): Promise<string> {
  return ERC721_walletOfOwner({ _owner });
}

import {socialABI} from "./socialAbi";
import Web3 from "web3";

const currentProvider = window.web3.currentProvider;
const web3js = new Web3(currentProvider);

let socialAddress = "0x46705ce483F8E2322576202C80daD7f7f06Cbdbd";
let social = new web3js.eth.Contract(socialABI, socialAddress);

let currentAddress = web3js.currentProvider.publicConfigStore._state.selectedAddress;

console.log(web3js);

export function createMember(username) {

    return new Promise((resolve, reject) => {
        social.methods.createMember(username).send({ from: currentAddress })
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function getUser(id) {

    return new Promise((resolve, reject) => {
        social.methods.members(id).call()
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function getAllUsers() {

    return new Promise((resolve, reject) => {
        social.methods.getAllMembers().call()
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function getCurrentUserId() {

    return new Promise((resolve, reject) => {
        social.methods.memberAddressToId(currentAddress).call()
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function changeCollectionStatus(id) {

    return new Promise((resolve, reject) => {
        social.methods.changeCollectionStatus(id).send({ from: currentAddress })
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function getFollowersByOwner(address) {

    return new Promise((resolve, reject) => {
        social.methods.getFollowersByOwner(address).call()
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function getFollowingByOwner(address) {

    return new Promise((resolve, reject) => {
        social.methods.getFollowingsByOwner(address).call()
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function getCollectionByOwner(address) {

    return new Promise((resolve, reject) => {
        social.methods.getCollectionsByOwner(address).call()
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function follow(address) {

    return new Promise((resolve, reject) => {
        social.methods.follow(address).send({ from: currentAddress })
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function collect(address, value) {

    let unit = web3js.utils.toWei(value.toString(), 'ether');
    return new Promise((resolve, reject) => {
        social.methods.collect(address).send( { from: currentAddress, value: unit } )
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function withDraw() {

    return new Promise((resolve, reject) => {
        social.methods.withdraw().send( { from: currentAddress} )
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function getWithdrawAmount() {

    return new Promise((resolve, reject) => {
        social.methods.getWithdrawAmount().call( { from: currentAddress} )
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}



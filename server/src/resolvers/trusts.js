import {Marketplace} from "../blockchain/tt"

export async function getTrust(id) {
    const marketplace = new Marketplace()
    const trusts = await marketplace.trusts();
    const trust = await trusts.get(id);
    return {id, ...trust};
}

export async function getAllTrusts() {
    const marketplace = new Marketplace()
    const _trusts = await marketplace.trusts();
    const trusts = await _trusts.getAll();
    return trusts;
}
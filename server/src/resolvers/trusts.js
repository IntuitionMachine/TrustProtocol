import {Marketplace} from "../blockchain/tt"

export async function getTrust(id) {
    const marketplace = new Marketplace()
    const trusts = await marketplace.trusts();
    const trust = await trusts.get(id);
    return {id, ...trust};
}
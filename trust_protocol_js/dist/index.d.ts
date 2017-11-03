export declare class Marketplace {
    web3: any;
    abi: any;
    location: string;
    contract: any;
    constructor(web3: any);
    owner(): Promise<{}>;
    trusts(): Promise<Trusts>;
}
export declare class Trusts {
    web3: any;
    abi: any;
    location: string;
    contract: any;
    constructor(web3: any, location: any);
    _format(trust: any): {
        client: any;
        name: any;
    };
    get(params: any): Promise<{
        client: any;
        name: any;
    }>;
    getCount(): Promise<{}>;
    getAll(): Promise<{
        client: any;
        name: any;
    }[]>;
}

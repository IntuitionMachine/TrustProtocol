export declare class Marketplace {
    params: {
        web3: any;
        userId: any;
    };
    abi: any;
    location: string;
    contract: any;
    constructor(params: any);
    owner(): Promise<any>;
    trusts(): Promise<Trusts>;
}
export declare class Trusts {
    params: {
        web3: any;
        userId: any;
    };
    abi: any;
    location: string;
    contract: any;
    constructor(params: any, location: any);
    _format(trust: any): {
        client: any;
        name: any;
    };
    get(params: any): Promise<{
        client: any;
        name: any;
    }>;
    getCount(): Promise<any>;
    getAll(): Promise<{
        client: any;
        name: any;
    }[]>;
}

export declare class Trusts {
    Db: any;
    constructor(params: any);
    _format(trust: any): {
        client: any;
        trustee: any;
        name: any;
    };
    getCount(): Promise<{}>;
    get(id: any): Promise<{
        client: any;
        trustee: any;
        name: any;
    }>;
    getAll(): Promise<{
        client: any;
        trustee: any;
        name: any;
    }[]>;
    create(client: any, trustee: any, name: any): Promise<{}>;
}
export declare class Requests {
    Db: any;
    constructor(params: any);
    _format(_request: any): {
        trustId: any;
        title: any;
        description: any;
        state: any;
    };
    get(id: any): Promise<{
        trustId: any;
        title: any;
        description: any;
        state: any;
    }>;
    getCount(): Promise<{}>;
    getAll(id: any): Promise<any[]>;
    create(trustId: any, title: any, description: any): Promise<{}>;
    accept(): Promise<{}>;
    deliver(): Promise<{}>;
}
export declare class Db {
    params: {
        web3: any;
        userId: any;
    };
    abi: any;
    location: string;
    contract: any;
    trusts: any;
    requests: any;
    constructor(params: any);
}

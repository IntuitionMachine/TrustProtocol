export declare class TrustProtocolJs {
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
export declare class Trusts {
    Db: any;
    constructor(db: any);
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
    create(client: any, trustee: any, name: any): Promise<void>;
}
export declare class Requests {
    Db: any;
    constructor(db: any);
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
    getAll(id: any): Promise<{
        trustId: any;
        title: any;
        description: any;
        state: any;
    }[]>;
    create(trustId: any, title: any, description: any): Promise<{}>;
    accept(): Promise<{}>;
    deliver(): Promise<{}>;
}

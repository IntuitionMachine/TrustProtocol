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
        id: any;
        client: any;
        fiduciary: any;
        name: any;
    };
    getCount(): Promise<{}>;
    get(id: any): Promise<{
        id: any;
        client: any;
        fiduciary: any;
        name: any;
    }>;
    getAll(): Promise<{
        id: any;
        client: any;
        fiduciary: any;
        name: any;
    }[]>;
    create(client: any, fiduciary: any, name: any): Promise<void>;
}
export declare class Requests {
    Db: any;
    constructor(db: any);
    _format(_request: any): {
        id: any;
        trustId: any;
        title: any;
        description: any;
        state: any;
    };
    get(id: any): Promise<{
        id: any;
        trustId: any;
        title: any;
        description: any;
        state: any;
    }>;
    getCount(): Promise<{}>;
    getAll(): Promise<{
        id: any;
        trustId: any;
        title: any;
        description: any;
        state: any;
    }[]>;
    create(trustId: any, title: any, description: any): Promise<{}>;
    accept(requestId: any): Promise<{}>;
    deliver(requestId: any): Promise<{}>;
    requestDeliveryAttachment(requestId: any, documentHash: any): Promise<{}>;
    requestDeliveryDescription(requestId: any, description: any): Promise<{}>;
    getPastEvents(requestId: any, name: any): Promise<any>;
    getDeliveryAttachments(requestId: any): Promise<any>;
    getDeliveryDescription(requestId: any): Promise<any>;
}

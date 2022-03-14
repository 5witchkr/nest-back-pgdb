export interface Content {
    id: string;
    title: string;
    description: string;
    status: ContentStatus
}

export enum ContentStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}
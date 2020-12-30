export interface ModelOption{
    closeFromWindowClick?:boolean,
    title?: string;
    content?: string;
    okText?: string;
    cancelText?: string;
    ok?: () => void;
    cancel?: () => void;
}
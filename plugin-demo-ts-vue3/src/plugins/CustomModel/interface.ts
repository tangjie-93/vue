export interface ModelOption{
    title?: string;
    content?: string;
    okText?: string;
    cancelText?: string;
    ok?: () => void;
    cancel?: () => void;
}
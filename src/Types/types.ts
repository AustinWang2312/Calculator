export enum ButtonType {
    DIGIT,
    OPERATOR,
    PARENTHESIS,
    EQUALS,
    CLEAR,
    DELETE,
    DECIMAL
}

export type ButtonProps = {
    class: string;
    handler: (value: string) => void;  // Adjust as needed
};

export type ButtonConfig = {
    label: string;
    type: ButtonType;
}
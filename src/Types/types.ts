//Simple Enum for button types
export enum ButtonType {
    DIGIT,
    OPERATOR,
    PARENTHESIS,
    EQUALS,
    CLEAR,
    DELETE,
    DECIMAL
}

//Properties object for a button type (includes css class and clickHandler)
export type ButtonProps = {
    class: string;
    handler: (value: string) => void;  // Adjust as needed
};

//Config object for button
export type ButtonConfig = {
    label: string;
    type: ButtonType;
}

//result object from api call
export type Answer = {
    result: number;
}
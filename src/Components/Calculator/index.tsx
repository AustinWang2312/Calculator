import React, { useState } from 'react';
import Button from '../Button';  //
import Display from '../Display';
import { ButtonType, ButtonProps, ButtonConfig } from '../../Types/types';
import {calculateResult} from '../../API';

import "./Calculator.css";

const Calculator: React.FC = () => {

    //Three states: current input string, current number string, number of open parentheses
    const [input, setInput] = useState<string>("");
    const [currentNumber, setCurrentNumber] = useState<string>("");
    const [openParenCount, setOpenParenCount] = useState<number>(0);
    const [hasError, setHasError] = useState<boolean>(false);


    //fetch API to set the display to the result and reset state
    const fetchCalculationResult = async (): Promise<void> => {
        try {
            const result: Number = await calculateResult(input);
            // Handle the response, maybe set it to a state
            const strResult: string = String(result);
            setInput(strResult);
            setOpenParenCount(0);
            setCurrentNumber(strResult);
        } catch (error) {
            // Handle the error, show an error message to the user
            console.error("API call failed:", error);
            setInput('ERROR');
            setOpenParenCount(0);
            setCurrentNumber('');
            setHasError(true);
        }
    };

    const checkError = (): void => {
        if (hasError) {
            setHasError(false);
            setInput('');
        }
    }


    //Onclick handler for a digit
    const handleDigitClick = (value: string): void => {
        checkError();
        console.log(value);

        if (input[input.length - 1] !== ')') {
            setInput(prevInput => prevInput + value);
            setCurrentNumber(prevInput => prevInput + value);
        }
    };

    //Onclick handler for a decimal point
    const handleDecimalClick = (value: string): void => {
        checkError();
        console.log(value);

        if (!currentNumber.includes('.')) {
            setCurrentNumber(prevNumber => prevNumber + '.');
            setInput(prevInput => prevInput + '.');
        }
    };
    
    //Onclick handler for a parenthesis
    const handleParenthesisClick = (value: string): void => {
        checkError();
        console.log(value);

        const lastChar = input[input.length - 1];

        if (value === '(') {
            //allow left parenthesis only if preceded by nothing or an operator
            if (!lastChar || ["+", "-", "*", "/", "("].includes(lastChar)) {
                setInput(prevInput => prevInput + value);
                setCurrentNumber('');
                setOpenParenCount(prevCount => prevCount + 1);
            }
        }
        else if (value === ')') {
            //Only add right parenthesis if there is an unmatched open parenthesis
            //AND if it is following a digit
            if (openParenCount > 0 && ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ")"].includes(lastChar)) {
                setInput(prevInput => prevInput + value);
                setCurrentNumber('');
                setOpenParenCount(prevCount => prevCount - 1);
            }
        }
    };
    
    //Onclick handler for an Operator
    const handleOperatorClick = (value: string): void => {
        checkError();
        console.log(value);
        if (!input) {
            // If the input is empty, don't allow starting with operator
            return;
        }

        const lastChar = input[input.length - 1];

        switch (lastChar) {  
            //Fails if previous char is operator or '('
            case "-":       
            case "+":
            case "*":
            case "/":
            case "(":
                break;
            default:
                setInput(prevInput => prevInput + value);
                setCurrentNumber('');
                break;
        }
    };

    //Onclick handler for '=' button
    const handleEqualsClick = (value: string): void => {
        checkError();
        console.log(value);
        fetchCalculationResult();
    };


    //Onclick handler for a del one char button
    const handleDelClick = (value: string): void => {
        checkError();
        console.log(value);

        if (input.length > 0) {
            const lastChar: string = input[input.length - 1]

            //Set the new current number based on what we deleted
            let newCurrentNumber: string = '';
            for (let i = input.length - 2; i >= 0; i--) { 
                if ("0123456789.".includes(input[i])) {
                    newCurrentNumber = input[i] + newCurrentNumber;
                } else {
                    break;
                }
            }

            if (lastChar === '(') {
                setOpenParenCount(prevCount => prevCount - 1)
            }
            if (lastChar === ')') {
                setOpenParenCount(prevCount => prevCount + 1)
            }
            setCurrentNumber(newCurrentNumber);
            setInput(prevInput => prevInput.slice(0, -1));
        }
    };

    //Onclick handler for a Clear button
    const handleClearClick = (value: string): void => {
        checkError();
        console.log(value);

        setInput('');
        setCurrentNumber('');
        setOpenParenCount(0);
    };

    //Button property list
    const buttonProperties: {[key in ButtonType]: ButtonProps} = {
        [ButtonType.DIGIT]: {
            class: '',
            handler: handleDigitClick // Assuming all digits have same handler
        },
        [ButtonType.OPERATOR]: {
            class: 'button--operator',
            handler: handleOperatorClick
        },
        [ButtonType.PARENTHESIS]: {
            class: '',
            handler: handleParenthesisClick
        },
        [ButtonType.EQUALS]: {
            class: 'button--equals',
            handler: handleEqualsClick
        },
        [ButtonType.CLEAR]: {
            class: 'button--clear',
            handler: handleClearClick
        },
        [ButtonType.DELETE]: {
            class: 'button--delete',
            handler: handleDelClick
        },
        [ButtonType.DECIMAL]: {
            class: '',
            handler: handleDecimalClick
        }
    }

    //Button Configs to be added in Calculator button-grid
    const buttonsConfig: ButtonConfig[] = [
        { label: 'C', type: ButtonType.CLEAR},
        { label: 'DEL', type: ButtonType.DELETE},
        { label: '(', type: ButtonType.PARENTHESIS},
        { label: ')', type: ButtonType.PARENTHESIS},
        { label: '1', type: ButtonType.DIGIT},
        { label: '2', type: ButtonType.DIGIT},
        { label: '3', type: ButtonType.DIGIT },
        { label: '+', type: ButtonType.OPERATOR},
        { label: '4', type: ButtonType.DIGIT },
        { label: '5', type: ButtonType.DIGIT },
        { label: '6', type: ButtonType.DIGIT },
        { label: '-', type: ButtonType.OPERATOR},
        { label: '7', type: ButtonType.DIGIT },
        { label: '8', type: ButtonType.DIGIT },
        { label: '9', type: ButtonType.DIGIT },  
        { label: '*', type: ButtonType.OPERATOR},
        { label: '.', type: ButtonType.DECIMAL},
        { label: '0', type: ButtonType.DIGIT},
        { label: '=', type: ButtonType.EQUALS },
        { label: '/', type: ButtonType.OPERATOR}
    ];

    //Rendering, map our button configs to actual button components and display port
    return (
        <div className="calculator">
            <Display value={input} />
            <div className="button-grid">
                {buttonsConfig.map((button, index) => (
                    <Button 
                        key={index} 
                        label={button.label} 
                        onClick={buttonProperties[button.type].handler}
                        className={buttonProperties[button.type].class}
                    />
                ))}
            </div>
        </div>
    );
}

export default Calculator;
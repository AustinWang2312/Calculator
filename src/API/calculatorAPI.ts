import { Answer } from '../Types/types';
const BASE_URL = "http://127.0.0.1:5000";


//Takes input equation: string and calls backend

export const calculateResult = async (input: string): Promise<number> => {
    const endpoint = `${BASE_URL}/calculate`;
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ equation: input })
    });

    if (!response.ok) {
        // Error handling
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }

    const data: Answer = await response.json();
    return data.result;
}
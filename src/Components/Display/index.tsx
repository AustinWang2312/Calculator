import React from 'react';
import './Display.css';  // Let's assume you'll have accompanying styles.

interface DisplayProps {
    value: string;  // The current value to be displayed.
}

//Basic Display Component for Input/Output of Calculator
const Display: React.FC<DisplayProps> = ({ value }) => {
    return (
        <div className="display">
            {value}
        </div>
    );
}

export default Display;
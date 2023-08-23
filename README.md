### Project Overview
## Description
This simulates a basic calculator with the ability to perform basic arithmetic operations.
This was developed using Flask/Python3 for the backend and React/Typescript for the frontend.
Authored by Austin Wang

## Usage
Users can input characters into the calculator by pressing the correct buttons. The equation will be evaluated from left to right in PEMDAS order.

# Buttons
1. 'C': This red clear button clears all input from the display
2. 'DEL': This pink button deletes the latest character added to the display
3. '(': This adds an open parenthesis to the equation. This must follow an operator or start the equation.
4. ')': This adds a closing parenthesis. There must be a corresponding open parenthesis and this must follow a digit
5. '+','-','*','/': These are operators and will perform the appropriate mathematical operation. These cannot start the equation and also must not follow another operator.
6. Digits '0-9': These are the numerical digits, as long as a digit doesn't follow a ), this is valid.
7. '.': This decimal point button adds a decimal to the current number. If the current number already has a decimal point, it will not be added.
8. '=': This is the equals button and will evaluate the equation and show the output on the display.



### Prerequisites|
Make sure that Node, npm, and python3 are installed by using the following commands
1. node --version
2. npm --version
3. python3 --version


### Flask Setup

1. Navigate to the "backend" directory with app.py in it. ('cd backend')

2. If you are on Windows, run set FLASK_APP=.. If you are on Unix, run export FLASK_APP=.

3. Download dependencies using 'pip3 install -r requirements.txt'

4. Run flask run in terminal.

## React Setup

In the project directory, you can run:

### `npm install`
Run this to install any dependencies for the project

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

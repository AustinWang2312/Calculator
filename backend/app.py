from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app, resources={r"/calculate": {"origins": "http://localhost:3000"}})


#Top Level function to solve equation
def solve_equation(equation):
    return round(helper(list(equation)), 9)

#adjusts current number appropriately when adding digits
def process_digit(symbol, current_num, processing_decimal, fractional_multiplier):
    if not processing_decimal:
        return current_num * 10 + int(symbol)
    else:
        return current_num + int(symbol) * fractional_multiplier

#Adjusts stack based on operator symbol and current number
def apply_operator(stack, last_operator, current_num):
    if last_operator == '+':
        stack.append(current_num)
    elif last_operator == '-':
        stack.append(-current_num)
    elif last_operator == '*':
        stack[-1] *= current_num
    elif last_operator == '/':
        stack[-1] /= current_num

#helper recursive function
def helper(symbol_list):
    #return if empty
    if len(symbol_list) == 0:
        return 0

    stack = []
    last_operator = '+'
    current_num = 0.0
    fractional_multiplier = 0.1  # Used for decimals
    processing_decimal = False
    OPERATORS = {'+', '-', '*', '/', ')'}

    while len(symbol_list) > 0:
        symbol = symbol_list.pop(0)

        #Case 1: Digit
        if symbol.isdigit():
            current_num = process_digit(symbol, current_num, processing_decimal, fractional_multiplier)
            if processing_decimal:
                fractional_multiplier /= 10

        #Case 2: Decimal
        elif symbol == '.':
            processing_decimal = True
            fractional_multiplier = 0.1

        #Case 3: Opening Parenthesis
        elif symbol == '(':
            # do recursion to calculate the sum within the next (...)
            current_num = helper(symbol_list)

        #Case 4: Operator or end of the list
        if len(symbol_list) == 0 or symbol in OPERATORS:
            apply_operator(stack, last_operator, current_num)
            if symbol == ')':
                break
            last_operator = symbol
            current_num = 0
            processing_decimal = False  # Reset the decimal processing flag
            fractional_multiplier = 0.1
            
    return sum(stack)

@app.route('/calculate', methods=['POST'])
def calculate():
    #Get Equation String
    data = request.json
    expression = data.get('equation', '')
    
    if not expression:
        return jsonify({'error': 'Expression not provided'}), 400

    #Try to solve equation, otherwise return error
    try:
        result = solve_equation(expression)
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=5000)
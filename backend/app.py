from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"



def solveEquation(equation):
    return round(helper(list(equation)), 9)

def helper(symbol_list):
    #return if empty
    if len(symbol_list) == 0:
        return 0

    stack = []
    sign = '+'
    current_num = 0.0
    fractional_multiplier = 0.1  # Used for decimals
    processing_decimal = False

    while len(symbol_list) > 0:
        symbol = symbol_list.pop(0)
        if symbol.isdigit():
            if not processing_decimal:
                current_num = current_num * 10 + int(symbol)
            else:
                current_num += int(symbol) * fractional_multiplier
                fractional_multiplier /= 10
        elif symbol == '.':
            processing_decimal = True
            fractional_multiplier = 0.1
        elif symbol == '(':
            # do recursion to calculate the sum within the next (...)
            current_num = helper(symbol_list)
        if len(symbol_list) == 0 or (symbol == '+' or symbol == '-' or symbol == '*' or symbol == '/' or symbol == ')'):
            if sign == '+':
                stack.append(current_num)
            elif sign == '-':
                stack.append(-current_num)
            elif sign == '*':
                stack[-1] = stack[-1]*current_num
            elif sign == '/':
                stack[-1] = stack[-1]/float(current_num)
            sign = symbol
            current_num = 0
            processing_decimal = False  # Reset the decimal processing flag
            fractional_multiplier = 0.1
            if sign == ')':
                break
    return sum(stack)

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    expression = data.get('equation', '')
    
    if not expression:
        return jsonify({'error': 'Expression not provided'}), 400

    try:
        result = solveEquation(expression)
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=5000)
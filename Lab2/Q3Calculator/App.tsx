import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';

const App = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState<string | null>(null);
  const [firstValue, setFirstValue] = useState('');

  const handleNumberInput = (num: number | string) => {
    if (displayValue === '0') {
      setDisplayValue(num.toString());
    } else {
      setDisplayValue(displayValue + num);
    }
  };

  const handleOperatorInput = (chosenOperator: string) => {
    setOperator(chosenOperator);
    setFirstValue(displayValue);
    setDisplayValue('0');
  };

  const handleEqual = () => {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(displayValue);

    if (isNaN(num1) || isNaN(num2)) return;

    if (operator === '+') {
      setDisplayValue((num1 + num2).toString());
    } else if (operator === '-') {
      setDisplayValue((num1 - num2).toString());
    } else if (operator === '*') {
      setDisplayValue((num1 * num2).toString());
    } else if (operator === '/') {
      setDisplayValue(num2 !== 0 ? (num1 / num2).toString() : 'Error');
    }

    setOperator(null);
    setFirstValue('');
  };

  const handleClear = () => {
    setDisplayValue('0');
    setOperator(null);
    setFirstValue('');
  };

  const RenderButton = ({ label, onPress, extraStyle = {} }: any) => (
    <TouchableOpacity style={[styles.button, extraStyle]} onPress={onPress}>
      <Text style={[styles.buttonText, extraStyle === styles.equalButton ? styles.equalText : {}]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{displayValue}</Text>

      <View style={styles.row}>
        <RenderButton label="7" onPress={() => handleNumberInput(7)} />
        <RenderButton label="8" onPress={() => handleNumberInput(8)} />
        <RenderButton label="9" onPress={() => handleNumberInput(9)} />
        <RenderButton label="÷" extraStyle={styles.operatorButton} onPress={() => handleOperatorInput('/')} />
      </View>

      <View style={styles.row}>
        <RenderButton label="4" onPress={() => handleNumberInput(4)} />
        <RenderButton label="5" onPress={() => handleNumberInput(5)} />
        <RenderButton label="6" onPress={() => handleNumberInput(6)} />
        <RenderButton label="×" extraStyle={styles.operatorButton} onPress={() => handleOperatorInput('*')} />
      </View>

      <View style={styles.row}>
        <RenderButton label="1" onPress={() => handleNumberInput(1)} />
        <RenderButton label="2" onPress={() => handleNumberInput(2)} />
        <RenderButton label="3" onPress={() => handleNumberInput(3)} />
        <RenderButton label="-" extraStyle={styles.operatorButton} onPress={() => handleOperatorInput('-')} />
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.zeroButton} onPress={() => handleNumberInput(0)}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <RenderButton label="+" extraStyle={styles.operatorButton} onPress={() => handleOperatorInput('+')} />
        <RenderButton label="=" extraStyle={styles.equalButton} onPress={handleEqual} />
      </View>

      <View style={styles.row}>
        <RenderButton label="C" extraStyle={styles.clearButton} onPress={handleClear} />
      </View>
    </View>
  );
};

export default App;

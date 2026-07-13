import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  display: {
    fontSize: 60,
    color: '#333',
    textAlign: 'right',
    marginBottom: 30,
    paddingRight: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    flex: 1,
    height: 75,
    borderRadius: 38,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 2,
  },
  zeroButton: {
    flex: 2,
    height: 75,
    borderRadius: 38,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 2,
  },
  operatorButton: {
    backgroundColor: '#EAEAEA',
  },
  equalButton: {
    backgroundColor: '#FF9500',
  },
  clearButton: {
    backgroundColor: '#EAEAEA',
    width: '100%',
  },
  buttonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  equalText: {
    color: '#FFF',
  },
});

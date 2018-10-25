(() => {
  const web3 = new Web3();
  const input = document.getElementById('input');
  const toType = document.getElementById('to');
  const output = document.getElementById('output');

  const convert = (value) => {
    if (toType.value === 'bytes32') {
      output.value = web3.toHex(value);
    }
    if (toType.value === 'number') {
      output.value = web3.toDecimal(value);
    }
    if (toType.value === 'string') {
      try {
        output.value = web3.toUtf8(value);
      } catch (e) {
        output.value = web3.toAscii(value);
      }
    }
  };

  input.addEventListener('keyup', () => convert(input.value));
  input.addEventListener('blur', () => convert(input.value));
  toType.addEventListener('change', () => convert(input.value));
})();

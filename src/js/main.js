(() => {
  const web3 = new Web3();
  const input = document.getElementById('input');
  const toType = document.getElementById('to');
  const output = document.getElementById('output');
  const applyPadding = document.getElementById('apply-padding');
  const applyPaddingContainer = document.getElementById('apply-padding-container');

  const convert = (value) => {
    if (toType.value === 'bytes32') {
      const hexValue = web3.toHex(value);

      output.value = applyPadding.checked ? web3.padRight(hexValue, 66) : hexValue;
    }
    if (toType.value === 'number') {
      output.value = web3.toDecimal(value);
    }
    if (toType.value === 'string') {
      try {
        output.value = web3.toUtf8(value);
      } catch (_error) {
        output.value = web3.toAscii(value);
      }
    }
  };

  input.addEventListener('keyup', () => convert(input.value));
  input.addEventListener('blur', () => convert(input.value));
  toType.addEventListener('change', () => {
    applyPaddingContainer.style.display = toType.value === 'bytes32' ? 'inline' : 'none';
    convert(input.value);
  });
  applyPadding.addEventListener('change', () => convert(input.value));
})();

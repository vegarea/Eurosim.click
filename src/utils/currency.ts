export const formatCurrency = (amount: number, currency: string = 'MXN') => {
  // Dividimos por 100 ya que los precios están almacenados en centavos
  const amountInCurrency = amount / 100;
  
  // Primero formateamos el número con el símbolo $ pero sin el código de moneda
  const numberWithSymbol = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    currencyDisplay: 'symbol'
  }).format(amountInCurrency);

  // Reemplazamos "MXN" por "" para evitar que aparezca dos veces
  const cleanNumber = numberWithSymbol.replace('MXN', '').trim();
  
  // Construimos el formato final: $890 MXN
  const formatted = `${cleanNumber} ${currency}`;

  console.log('Formatting currency:', {
    originalAmount: amount,
    amountInCurrency,
    formatted,
    currency
  });

  return formatted;
};

export const parseCurrency = (value: string): number => {
  // Elimina el símbolo de moneda y cualquier separador de miles
  const cleanValue = value.replace(/[^0-9.-]+/g, '');
  return parseFloat(cleanValue);
};
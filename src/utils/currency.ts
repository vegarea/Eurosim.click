export const formatCurrency = (amount: number, currency: string = 'MXN') => {
  // Dividimos por 100 ya que los precios están almacenados en centavos
  const amountInCurrency = amount / 100;
  
  const formatted = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    currencyDisplay: 'code' // Cambiamos a 'code' para forzar la visualización del código de moneda
  }).format(amountInCurrency);

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
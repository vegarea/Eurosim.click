export const formatCurrency = (amount: number, currency: string = 'MXN') => {
  // Dividimos por 100 ya que los precios están almacenados en centavos
  const amountInCurrency = amount / 100;
  
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0, // Esto evita mostrar decimales
    maximumFractionDigits: 0, // Esto evita mostrar decimales
  }).format(amountInCurrency);
};

export const parseCurrency = (value: string): number => {
  // Elimina el símbolo de moneda y cualquier separador de miles
  const cleanValue = value.replace(/[^0-9.-]+/g, '');
  return parseFloat(cleanValue);
};
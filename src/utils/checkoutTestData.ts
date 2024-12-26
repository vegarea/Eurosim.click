export const testUserData = {
  // Paso 1 - Datos de envío (si es SIM física)
  shippingData: {
    fullName: "Juan Pérez González",
    street: "Calle Principal 123",
    city: "Ciudad de México",
    state: "CDMX",
    zipCode: "11520",
    email: "juan.perez@example.com",
    phone: "+525512345678"
  },
  // Paso 2 - Documentación
  documentationData: {
    fullName: "Juan Pérez González",
    birthDate: new Date("1990-05-15"),
    gender: "M",
    passportNumber: "AB123456",
    activationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 días en el futuro
  }
}

// Utilidad para simular retraso en carga de datos
export const loadTestData = (delay = 500) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(testUserData);
    }, delay);
  });
}
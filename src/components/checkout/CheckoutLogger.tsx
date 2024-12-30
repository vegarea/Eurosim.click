import { useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface LogMessage {
  step: number;
  action: string;
  data?: any;
  status: 'info' | 'warning' | 'error' | 'success';
}

export function useCheckoutLogger() {
  const { toast } = useToast();

  const logCheckoutEvent = (message: LogMessage) => {
    const timestamp = new Date().toISOString();
    const prefix = `[Checkout Step ${message.step}]`;
    const logStyle = getLogStyle(message.status);

    console.group(`${prefix} ${message.action}`);
    console.log('%cTimestamp:', 'color: gray', timestamp);
    console.log('%cStatus:', logStyle, message.status.toUpperCase());
    
    if (message.data) {
      console.log('Data:', message.data);
    }
    
    console.groupEnd();

    // Mostrar toast solo para errores críticos
    if (message.status === 'error') {
      toast({
        title: "Error en el checkout",
        description: `${message.action}. Por favor, revisa la consola para más detalles.`,
        variant: "destructive",
      });
    }
  };

  const getLogStyle = (status: LogMessage['status']) => {
    const styles = {
      info: 'color: #3b82f6',
      warning: 'color: #f59e0b',
      error: 'color: #ef4444',
      success: 'color: #10b981',
    };
    return styles[status];
  };

  return { logCheckoutEvent };
}

export function CheckoutLogger({ step, formData }: { step: number; formData: Record<string, any> }) {
  const { logCheckoutEvent } = useCheckoutLogger();

  useEffect(() => {
    // Log inicial al montar el componente
    logCheckoutEvent({
      step,
      action: 'Iniciando paso del checkout',
      status: 'info',
      data: { currentStep: step }
    });

    // Validar datos según el paso actual
    validateStepData(step, formData, logCheckoutEvent);
  }, [step, formData]);

  return null;
}

function validateStepData(
  step: number, 
  formData: Record<string, any>,
  logCheckoutEvent: (message: LogMessage) => void
) {
  switch (step) {
    case 1:
      validateShippingStep(formData, logCheckoutEvent);
      break;
    case 2:
      validateDocumentationStep(formData, logCheckoutEvent);
      break;
    case 3:
      validatePaymentStep(formData, logCheckoutEvent);
      break;
  }
}

function validateShippingStep(
  formData: Record<string, any>,
  logCheckoutEvent: (message: LogMessage) => void
) {
  const requiredFields = ['fullName', 'email', 'phone'];
  const missingFields = requiredFields.filter(field => !formData[field]);

  if (missingFields.length > 0) {
    logCheckoutEvent({
      step: 1,
      action: 'Validación de información de envío',
      status: 'warning',
      data: { missingFields }
    });
  } else {
    logCheckoutEvent({
      step: 1,
      action: 'Información de envío completa',
      status: 'success',
      data: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone
      }
    });
  }
}

function validateDocumentationStep(
  formData: Record<string, any>,
  logCheckoutEvent: (message: LogMessage) => void
) {
  const requiredFields = ['passportNumber', 'birthDate', 'gender'];
  const missingFields = requiredFields.filter(field => !formData[field]);

  if (missingFields.length > 0) {
    logCheckoutEvent({
      step: 2,
      action: 'Validación de documentación',
      status: 'warning',
      data: { missingFields }
    });
  } else {
    logCheckoutEvent({
      step: 2,
      action: 'Documentación completa',
      status: 'success',
      data: {
        passportNumber: formData.passportNumber,
        birthDate: formData.birthDate,
        gender: formData.gender
      }
    });
  }
}

function validatePaymentStep(
  formData: Record<string, any>,
  logCheckoutEvent: (message: LogMessage) => void
) {
  // Validar que exista un método de pago seleccionado
  if (!formData.paymentMethod) {
    logCheckoutEvent({
      step: 3,
      action: 'Método de pago no seleccionado',
      status: 'warning',
      data: { currentPaymentMethod: formData.paymentMethod }
    });
    return;
  }

  logCheckoutEvent({
    step: 3,
    action: 'Método de pago seleccionado',
    status: 'success',
    data: { paymentMethod: formData.paymentMethod }
  });
}
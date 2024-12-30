import { useEffect } from 'react'
import { useToast } from "@/components/ui/use-toast"

interface LogMessage {
  step: number
  action: string
  data?: any
  status: 'info' | 'warning' | 'error' | 'success'
  details?: string
}

interface ValidationError {
  field: string
  message: string
}

export function useCheckoutLogger() {
  const { toast } = useToast()

  const logCheckoutEvent = (message: LogMessage) => {
    const timestamp = new Date().toISOString()
    const prefix = `[Checkout Step ${message.step}]`
    const logStyle = getLogStyle(message.status)
    
    console.group(`${prefix} ${message.action}`)
    console.log('%cTimestamp:', 'color: gray', timestamp)
    console.log('%cStatus:', logStyle, message.status.toUpperCase())
    
    if (message.details) {
      console.log('%cDetails:', 'color: gray', message.details)
    }
    
    if (message.data) {
      console.groupCollapsed('Data')
      logData(message.data)
      console.groupEnd()
    }
    
    console.groupEnd()

    if (message.status === 'error') {
      toast({
        title: "Error en el checkout",
        description: message.details || message.action,
        variant: "destructive",
      })
    } else if (message.status === 'warning' && message.details) {
      toast({
        title: "Advertencia",
        description: message.details,
        variant: "destructive", // Cambiado de "warning" a "destructive" ya que es el único tipo válido
      })
    }
  }

  const logData = (data: any) => {
    if (typeof data === 'object' && data !== null) {
      Object.entries(data).forEach(([key, value]) => {
        if (key.toLowerCase().includes('password') || key.toLowerCase().includes('secret')) {
          console.log(`${key}:`, '[REDACTED]');
        } else {
          console.log(`${key}:`, value);
        }
      });
    } else {
      console.log(data);
    }
  };

  const getLogStyle = (status: LogMessage['status']) => {
    const styles = {
      info: 'color: #3b82f6; font-weight: bold;',
      warning: 'color: #f59e0b; font-weight: bold;',
      error: 'color: #ef4444; font-weight: bold;',
      success: 'color: #10b981; font-weight: bold;',
    };
    return styles[status];
  };

  const validateFormData = (formData: Record<string, any>): ValidationError[] => {
    const errors: ValidationError[] = [];
    
    // Validaciones comunes
    if (!formData.email?.includes('@')) {
      errors.push({ field: 'email', message: 'Email inválido' });
    }
    
    if (formData.phone && !/^\+?[\d\s-]{8,}$/.test(formData.phone)) {
      errors.push({ field: 'phone', message: 'Teléfono inválido' });
    }

    return errors;
  };

  return { logCheckoutEvent, validateFormData };
}

export function CheckoutLogger({ 
  step, 
  formData,
  orderType 
}: { 
  step: number; 
  formData: Record<string, any>;
  orderType: 'physical' | 'esim';
}) {
  const { logCheckoutEvent, validateFormData } = useCheckoutLogger();

  useEffect(() => {
    // Log inicial al montar el componente
    logCheckoutEvent({
      step,
      action: 'Iniciando paso del checkout',
      status: 'info',
      data: { currentStep: step, orderType }
    });

    // Validar datos según el paso actual
    validateStepData(step, formData, orderType, logCheckoutEvent, validateFormData);
  }, [step, formData, orderType]);

  return null;
}

function validateStepData(
  step: number, 
  formData: Record<string, any>,
  orderType: 'physical' | 'esim',
  logCheckoutEvent: (message: LogMessage) => void,
  validateFormData: (formData: Record<string, any>) => ValidationError[]
) {
  const errors = validateFormData(formData);
  
  if (errors.length > 0) {
    logCheckoutEvent({
      step,
      action: 'Validación de formulario',
      status: 'warning',
      data: { errors },
      details: 'Se encontraron errores en el formulario'
    });
    return;
  }

  switch (step) {
    case 1:
      if (orderType === 'physical') {
        validateShippingStep(formData, logCheckoutEvent);
      } else {
        validateDocumentationStep(formData, logCheckoutEvent);
      }
      break;
    case 2:
      if (orderType === 'physical') {
        validateDocumentationStep(formData, logCheckoutEvent);
      } else {
        validateReviewStep(formData, logCheckoutEvent);
      }
      break;
    case 3:
      validateReviewStep(formData, logCheckoutEvent);
      break;
  }
}

function validateShippingStep(
  formData: Record<string, any>,
  logCheckoutEvent: (message: LogMessage) => void
) {
  const requiredFields = ['fullName', 'email', 'phone', 'shippingAddress'];
  const missingFields = requiredFields.filter(field => !formData[field]);

  if (missingFields.length > 0) {
    logCheckoutEvent({
      step: 1,
      action: 'Validación de información de envío',
      status: 'warning',
      data: { missingFields },
      details: 'Faltan campos requeridos en el formulario de envío'
    });
  } else {
    logCheckoutEvent({
      step: 1,
      action: 'Información de envío completa',
      status: 'success',
      data: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        shippingAddress: formData.shippingAddress
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
      data: { missingFields },
      details: 'Faltan campos requeridos en el formulario de documentación'
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

function validateReviewStep(
  formData: Record<string, any>,
  logCheckoutEvent: (message: LogMessage) => void
) {
  // Validar que todos los datos necesarios estén presentes
  const allRequiredFields = [
    'fullName',
    'email',
    'passportNumber',
    'birthDate',
    'gender'
  ];

  const missingFields = allRequiredFields.filter(field => !formData[field]);

  if (missingFields.length > 0) {
    logCheckoutEvent({
      step: 3,
      action: 'Validación final',
      status: 'warning',
      data: { missingFields },
      details: 'Faltan campos requeridos para completar la orden'
    });
    return;
  }

  // Log de datos finales (sin información sensible)
  logCheckoutEvent({
    step: 3,
    action: 'Datos finales validados',
    status: 'success',
    data: {
      fullName: formData.fullName,
      email: formData.email,
      hasPassport: !!formData.passportNumber,
      hasBirthDate: !!formData.birthDate,
      hasGender: !!formData.gender,
      hasShippingAddress: !!formData.shippingAddress
    }
  });
}

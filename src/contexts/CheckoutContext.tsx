import React, { createContext, useContext, useState } from "react"
import { CustomerGender } from "@/types/database/enums"
import { Json } from "@/types/database/common"

interface CheckoutState {
  customerInfo: {
    name: string;
    email: string;
    phone: string | null;
    passport_number: string | null;
    birth_date: string | null;
    gender: CustomerGender | null;
    default_shipping_address: Json | null;
  };
  orderInfo: {
    type: "physical" | "esim";
    payment_method: "stripe" | "paypal" | null;
    shipping_address: Json | null;
    activation_date: string | null;
  };
}

interface CheckoutContextType {
  state: CheckoutState;
  updateCustomerInfo: (info: Partial<CheckoutState['customerInfo']>) => void;
  updateOrderInfo: (info: Partial<CheckoutState['orderInfo']>) => void;
  clearCheckout: () => void;
}

const initialState: CheckoutState = {
  customerInfo: {
    name: "",
    email: "",
    phone: null,
    passport_number: null,
    birth_date: null,
    gender: null,
    default_shipping_address: null,
  },
  orderInfo: {
    type: "esim",
    payment_method: null,
    shipping_address: null,
    activation_date: null,
  }
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined)

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CheckoutState>(initialState)

  const updateCustomerInfo = (info: Partial<CheckoutState['customerInfo']>) => {
    console.log('CheckoutContext - Updating Customer Info:', info)
    setState(prev => {
      const newState = {
        ...prev,
        customerInfo: {
          ...prev.customerInfo,
          ...info
        }
      };
      console.log('CheckoutContext - New State:', newState)
      return newState;
    })
  }

  const updateOrderInfo = (info: Partial<CheckoutState['orderInfo']>) => {
    console.log('CheckoutContext - Updating Order Info:', info)
    setState(prev => {
      const newState = {
        ...prev,
        orderInfo: {
          ...prev.orderInfo,
          ...info
        }
      };
      console.log('CheckoutContext - New State:', newState)
      return newState;
    })
  }

  const clearCheckout = () => {
    console.log('CheckoutContext - Clearing State')
    setState(initialState)
  }

  return (
    <CheckoutContext.Provider 
      value={{ 
        state, 
        updateCustomerInfo, 
        updateOrderInfo, 
        clearCheckout 
      }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}

export function useCheckout() {
  const context = useContext(CheckoutContext)
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider')
  }
  return context
}
import { useState } from "react"
import { useOrderStatusUpdate } from "./useOrderStatusUpdate"
import { OrderStatus } from "@/types/database/enums"

interface UseShippingActionsProps {
  setIsUpdating: (value: boolean) => void
  refetchOrders: () => Promise<void>
  setShowConfirmDialog: (value: boolean) => void
  setShowDeliveredDialog: (value: boolean) => void
}

export function useShippingActions({
  setIsUpdating,
  refetchOrders,
  setShowConfirmDialog,
  setShowDeliveredDialog
}: UseShippingActionsProps) {
  const { updateOrderStatus } = useOrderStatusUpdate()

  const handleConfirmShipment = async (
    orderId: string, 
    trackingNumber: string, 
    carrier: string
  ) => {
    try {
      setIsUpdating(true)
      await updateOrderStatus(orderId, 'shipped' as OrderStatus, trackingNumber, carrier)
      await refetchOrders()
      setShowConfirmDialog(false)
    } catch (error) {
      console.error('Error al confirmar envío:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleConfirmDelivery = async (orderId: string) => {
    try {
      setIsUpdating(true)
      await updateOrderStatus(orderId, 'delivered' as OrderStatus)
      await refetchOrders()
      setShowDeliveredDialog(false)
    } catch (error) {
      console.error('Error al confirmar entrega:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  return {
    handleConfirmShipment,
    handleConfirmDelivery
  }
}
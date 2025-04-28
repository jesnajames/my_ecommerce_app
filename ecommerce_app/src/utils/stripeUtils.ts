import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid'

export interface PaymentResponse {
  clientSecret: string
  orderId: string
}

export const createPaymentIntent = async (
  amount: number,
  shippingDetails: any,
  userId: string
): Promise<PaymentResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke('create-payment-intent', {
      body: {
        amount: Math.round(amount * 100), // Convert to cents
        shipping: shippingDetails,
      },
      headers: {
        'x-user-id': userId || uuidv4(), // Use UUID if no user ID
      },
    })

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating payment intent:', error)
    throw error
  }
}

export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)

    if (error) throw error
  } catch (error) {
    console.error('Error updating order status:', error)
    throw error
  }
}

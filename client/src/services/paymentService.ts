import { PaymentData, PaymentIntent } from '../types/payment';

// Mock backend service - In production, replace with actual API calls
export class PaymentService {
  private static baseUrl = '/api'; // Your backend URL

  static async createPaymentIntent(paymentData: PaymentData): Promise<PaymentIntent> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `pi_${Math.random().toString(36).substr(2, 9)}`,
          amount: paymentData.amount * 100, // Stripe uses cents
          currency: paymentData.currency,
          status: 'requires_payment_method',
          client_secret: `pi_${Math.random().toString(36).substr(2, 9)}_secret_${Math.random().toString(36).substr(2, 9)}`,
        });
      }, 1000);
    });
  }

  static async confirmPayment(paymentIntentId: string): Promise<{ success: boolean; message: string }> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true, // Always succeed for testing
          message: 'Payment processed successfully',
        });
      }, 2000);
    });
  }

  static async getPaymentHistory(): Promise<any[]> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'pi_1234567890',
            amount: 2999,
            currency: 'usd',
            status: 'succeeded',
            created: Date.now() - 86400000,
            description: 'Premium subscription',
          },
          {
            id: 'pi_0987654321',
            amount: 1999,
            currency: 'usd',
            status: 'succeeded',
            created: Date.now() - 172800000,
            description: 'Product purchase',
          },
        ]);
      }, 1000);
    });
  }
}
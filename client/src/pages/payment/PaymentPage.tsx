import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentForm from '../../components/Payment/PaymentForm';
import axios from 'axios';

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { courseId, studentEmail, studentName, coursePrice, courseCurrency } = location.state || {};

  const handlePaymentSuccess = async (paymentId: string) => {
    console.log('Payment successful:', paymentId);
    try {
      await axios.post('http://localhost:5000/api/enrollments', {
        student: {
          email: studentEmail,
          name: studentName,
        },
        course: courseId,
        paymentId,
      });
      alert('Enrollment successful!');
      navigate('/student/enrollments');
    } catch (error) {
      console.error('Enrollment failed:', error);
      alert('Enrollment failed. Please contact support.');
    }
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
    alert('Payment failed. Please try again.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Make a Payment
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete your transaction securely with our encrypted payment system.
          </p>
        </div>

        <PaymentForm
          amount={coursePrice}
          currency={courseCurrency}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
        />
      </div>
    </div>
  );
};

export default PaymentPage;

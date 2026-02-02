// src/pages/PaymentVerify.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { paymentAPI } from '../api/api';
import { CheckCircle, XCircle, ArrowRight, Home } from 'lucide-react';

export default function PaymentVerify() {
  const { reference: paramRef } = useParams(); // Capture from path /verify/:ref
  const location = useLocation(); // Capture from query ?reference=:ref
  const navigate = useNavigate();
  
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('Verifying your payment...');
  const [receipt, setReceipt] = useState(null);
  
  // 1. Determine the actual reference
  // Paystack often redirects to: /payment/verify?reference=...
  // But your route might be: /payment/verify/:reference
  const getReference = () => {
    const queryParams = new URLSearchParams(location.search);
    return paramRef || queryParams.get('reference') || queryParams.get('trxref');
  };

  useEffect(() => {
    const ref = getReference();

    if (ref) {
      verifyTransaction(ref);
    } else {
      // Handle case where user opens page manually without a reference
      setStatus('failed');
      setMessage('No transaction reference found. Please check your order history.');
    }
  }, []); // Run once on mount

  const verifyTransaction = async (ref) => {
    try {
      // Call your Django Backend
      const response = await paymentAPI.verify(ref);
      
      if (response.data.success) {
        setStatus('success');
        setMessage('Payment successful! Your order has been confirmed.');
        setReceipt(response.data.data);
        
        // Optional: Auto-redirect after 5 seconds
        setTimeout(() => {
           navigate('/userdashboard');
        }, 5000);
      } else {
        setStatus('failed');
        setMessage(response.data.message || 'Payment verification failed. Please contact support.');
      }
    } catch (error) {
      console.error(error);
      setStatus('failed');
      
      // Smart Error Handling
      // If backend says "Order already paid", treat it as success
      if (error.response?.data?.message?.includes("already paid")) {
          setStatus('success');
          setMessage("This order was already successfully paid.");
      } else {
          setMessage(error.response?.data?.message || 'Server error during verification.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl p-8 text-center border border-gray-100 relative overflow-hidden">
        
        {/* Decorative Background Blob */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>

        {/* LOADING STATE */}
        {status === 'verifying' && (
          <div className="py-10">
            <div className="relative mx-auto w-20 h-20 mb-6">
                <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 animate-pulse">Confirming Transaction</h2>
            <p className="text-gray-500 mt-2 text-sm">Connecting to Paystack secure server...</p>
            <p className="text-xs text-gray-300 mt-6 font-mono bg-gray-50 py-1 px-2 rounded-lg inline-block">
                Ref: {getReference()}
            </p>
          </div>
        )}

        {/* SUCCESS STATE */}
        {status === 'success' && (
          <div className="py-6 animate-fade-in-up">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-50 mb-6 shadow-inner">
              <CheckCircle className="h-12 w-12 text-green-500" strokeWidth={3} />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Payment Confirmed!</h2>
            <p className="text-gray-500 mb-8 text-sm">{message}</p>
            
            {/* Receipt Card */}
            {receipt && (
                <div className="bg-gray-50 rounded-2xl p-5 mb-8 text-left text-sm border border-gray-100 shadow-sm">
                <div className="flex justify-between mb-3 pb-3 border-b border-gray-200">
                    <span className="text-gray-500">Amount Paid</span>
                    <span className="font-bold text-gray-900 text-lg">
                    {receipt?.payment?.currency} {new Intl.NumberFormat().format(receipt?.payment?.amount || 0)}
                    </span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Order No.</span>
                    <span className="font-bold text-gray-900">#{receipt?.order?.order_number}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Date</span>
                    <span className="font-medium text-gray-900">
                        {new Date().toLocaleDateString()}
                    </span>
                </div>
                </div>
            )}

            <div className="space-y-3">
              <button 
                onClick={() => navigate('/userdashboard')}
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
              >
                Go to Dashboard <ArrowRight size={18} />
              </button>
              <p className="text-xs text-gray-400 mt-4">Redirecting in 5 seconds...</p>
            </div>
          </div>
        )}

        {/* FAILED STATE */}
        {status === 'failed' && (
          <div className="py-6 animate-shake">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-50 mb-6 shadow-inner">
              <XCircle className="h-12 w-12 text-red-500" strokeWidth={3} />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Verification Failed</h2>
            <p className="text-gray-500 mb-8 px-4">{message}</p>
            
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/userdashboard')}
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg"
              >
                Return to Orders
              </button>
              <button 
                 onClick={() => navigate('/')}
                 className="block w-full text-gray-500 hover:text-gray-800 py-2 text-sm font-medium flex items-center justify-center gap-2"
              >
                 <Home size={16} /> Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
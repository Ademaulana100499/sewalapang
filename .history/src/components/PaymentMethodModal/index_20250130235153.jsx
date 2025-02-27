import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

export const PaymentMethodModal = ({ isOpen, setIsOpen, onSelect }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/payment-methods`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch payment methods");
        }
        const data = await response.json();
        setPaymentMethods(data.result || []);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
    };

    if (isOpen) {
      fetchPaymentMethods();
    }
  }, [isOpen]); // Fetch data hanya saat modal dibuka

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-black bg-opacity-60 fixed inset-0 z-50 flex justify-center items-center min-h-screen p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 shadow-xl w-full max-w-lg text-gray-800 relative rounded-lg">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold mb-4">
                Pilih Metode Pembayaran
              </h3>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {paymentMethods.length > 0 ? (
                  paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => {
                        onSelect(method.id);
                        setIsOpen(false);
                      }}
                      className="flex flex-col items-center justify-between text-left py-4 px-4 border rounded-md mb-2 hover:bg-gray-100 transition">
                      <img
                        src={method.image_url}
                        alt={method.name}
                        className="w-16 h-16 mb-2 object-contain"
                      />
                      <div>
                        <h4 className="font-semibold text-sm">{method.name}</h4>
                        <p className="text-xs text-gray-600">
                          {method.virtual_account_number}
                        </p>
                        <p className="text-xs text-gray-600">
                          {method.virtual_account_name}
                        </p>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="text-gray-500 text-center col-span-3">
                    Metode pembayaran tidak tersedia
                  </p>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full mt-6 bg-gray-200 text-gray-700 py-3 hover:bg-gray-300 transition-all">
                Batal
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

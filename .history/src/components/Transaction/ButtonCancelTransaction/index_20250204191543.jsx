import React from "react";
import { useCancelTransaction } from "@/hooks/useCancelTransaction";
import { BarLoader } from "@/components/Features/Loading";

export const CancelTransaction = ({ transactionId }) => {
  const { handleCancel, loading } = useCancelTransaction(transactionId);

  return (
    <div>
      <button
        onClick={handleCancel}
        className="bg-red-500 w-20 py-2 text-white rounded"
        disabled={loading}>
        {loading ? (
          <span>
            <BarLoader />
          </span>
        ) : (
          "Batalkan Transaksi"
        )}
      </button>
    </div>
  );
};

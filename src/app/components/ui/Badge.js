export default function Badge({ status }) {
  const normalizedStatus = status ? status.toLowerCase() : "pending";

  const styles = {
    // WooCommerce Statuses
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    "on-hold": "bg-orange-100 text-orange-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    refunded: "bg-gray-100 text-gray-800",
    failed: "bg-red-100 text-red-800",

    // Legacy/Fallback Statuses (keeping for compatibility)
    shipped: "bg-indigo-100 text-indigo-800",
    delivered: "bg-green-100 text-green-800",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${styles[normalizedStatus] || styles["pending"]
        }`}
    >
      {status}
    </span>
  );
}

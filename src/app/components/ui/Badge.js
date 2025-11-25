export default function Badge({ status }) {
  const styles = {
    Processing: "bg-blue-100 text-blue-800",
    Shipped: "bg-indigo-100 text-indigo-800",
    Delivered: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        styles[status] || styles["Pending"]
      }`}
    >
      {status}
    </span>
  );
}

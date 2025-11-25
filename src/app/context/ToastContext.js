"use client";
import React, {
  useState,
  useCallback,
  createContext,
  useContext,
  useMemo,
} from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const value = useMemo(() => ({ addToast }), [addToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-3 pointer-events-none w-full max-w-sm px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto transform transition-all duration-500 animate-slide-down flex items-center p-4 rounded-2xl shadow-2xl border backdrop-blur-md ${toast.type === "success"
              ? "bg-black/90 border-gray-800 text-white"
              : "bg-red-500/90 border-red-600 text-white"
              }`}
          >
            <div className={`p-1 rounded-full mr-3 ${toast.type === "success" ? "bg-green-500/20" : "bg-white/20"
              }`}>
              {toast.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-white" />
              )}
            </div>
            <p className="text-sm font-bold tracking-wide">{toast.message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

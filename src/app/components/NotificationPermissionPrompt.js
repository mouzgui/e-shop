"use client";

import { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { requestNotificationPermission } from "@/lib/firebase";

export default function NotificationPermissionPrompt({ userEmail }) {
    const [show, setShow] = useState(false);
    const [permission, setPermission] = useState("default");

    useEffect(() => {
        if (typeof window !== "undefined" && 'Notification' in window) {
            setPermission(Notification.permission);
            const dismissed = localStorage.getItem("notification_prompt_dismissed");

            // If already granted, ensure we subscribe with the current email
            if (Notification.permission === "granted" && userEmail) {
                console.log("Permission already granted, syncing subscription...");
                handleEnable();
            }
            // Show prompt only if permission is default (not asked yet) and not dismissed
            else if (Notification.permission === "default" && !dismissed && userEmail) {
                const timer = setTimeout(() => setShow(true), 3000);
                return () => clearTimeout(timer);
            }
        }
    }, [userEmail]); // eslint-disable-next-line react-hooks/exhaustive-deps

    const handleEnable = async () => {
        const result = await requestNotificationPermission();
        if (result.success) {
            // Subscribe to notifications
            await fetch("/api/notifications/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: result.token,
                    email: userEmail
                }),
            });
            setShow(false);
            setPermission("granted");
        }
    };

    const handleDismiss = () => {
        setShow(false);
        localStorage.setItem("notification_prompt_dismissed", "true");
    };

    if (!show || permission !== "default") return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 max-w-md animate-slide-up">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
                <button
                    onClick={handleDismiss}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bell className="w-6 h-6 text-indigo-600" />
                    </div>

                    <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">
                            Stay Updated on Your Orders!
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Get instant notifications when your order ships and arrives.
                        </p>

                        <button
                            onClick={handleEnable}
                            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                        >
                            Enable Notifications
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

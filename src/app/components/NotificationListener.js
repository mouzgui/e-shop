"use client";

import { useEffect } from "react";
import { onForegroundMessage } from "@/lib/firebase";
import { useToast } from "@/context/ToastContext";

export default function NotificationListener() {
    const { addToast } = useToast();

    useEffect(() => {
        // Listen for foreground messages
    }, [addToast]);

    return null; // This component renders nothing visible
}

import React from "react";
import { Toaster } from "sonner";

// Document link: https://sonner.emilkowal.ski/

const ToastProvider = () => {
  return <Toaster duration={3000} position="top-right" richColors={true} />;
};

export default ToastProvider;

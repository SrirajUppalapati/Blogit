import toast, { Toaster as ToasterRHT } from "react-hot-toast";
import { useToasterStore } from "react-hot-toast";
import { useEffect } from "react";

function Toaster() {
  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= 1)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);
  return (
    <ToasterRHT
      position="top-center"
      containerStyle={{ margin: "6px" }}
      toastOptions={{
        success: {
          duration: 3000,
          className: "success",
        },
        error: {
          duration: 3000,
          className: "error",
        },
      }}
    />
  );
}

export default Toaster;

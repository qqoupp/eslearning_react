import { toast } from "react-toastify";

const useToast = () => {
  const success = (message: string) => {
    toast.success(message, {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
    });
  };

  const error = (message: string) => {
    toast.error(message, {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
    });
  };

  return { success, error };
};

export default useToast;

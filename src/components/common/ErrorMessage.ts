import { Toast } from "react-native-toast-message/lib/src/Toast";

interface ErrorProps {
  error: { message: string };
}

export const errorMessage: React.FC<ErrorProps> = (props) => {
  Toast.show({
    type: "error",
    text1: "Error",
    text2: props?.error?.message,
  });

  return null;
};

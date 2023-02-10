import { toast } from "react-toastify";
function Toast(message, type, position = toast.POSITION.BOTTOM_CENTER) {
  switch (type) {
    case "success":
      toast.success(message, { position: position });
      break;
    case "error":
      toast.error(message, { position: position });
      break;
    default:
      toast(message, position);
  }
}

export default Toast;

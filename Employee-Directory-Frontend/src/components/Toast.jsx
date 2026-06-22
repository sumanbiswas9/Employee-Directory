/**
 * Toast Component
 *
 * This is a small popup notification that shows a success message
 * at the bottom-right of the screen. It disappears automatically
 * after 3 seconds, or the user can close it manually.
 */

import { useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

/**
 * Display a success toast notification.
 * @param {Object} props Component props.
 * @param {string} props.message The success message to display.
 * @param {Function} props.onClose Function to call when the toast should be hidden.
 */
function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;

    const autoCloseTimer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(autoCloseTimer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 flex items-center gap-3 rounded-lg bg-green-500 px-4 py-3 text-white shadow-lg transition-all animate-in fade-in slide-in-from-bottom-5 sm:left-auto sm:right-4 sm:max-w-sm">
      <CheckCircle size={20} />
      <span className="text-sm font-medium">{message}</span>

      <button
        onClick={onClose}
        className="ml-2 rounded-full p-1 transition-colors hover:bg-blue-600"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export default Toast;

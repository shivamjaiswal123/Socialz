import { FaExclamationTriangle } from 'react-icons/fa';

interface Message {
  message?: string;
}

const FormError = ({ message }: Message) => {
  if (!message) {
    return null;
  }
  return (
    <div className="bg-destructive/15 px-4 py-2 rounded-md flex items-center text-destructive gap-4 text-sm dark:bg-destructive/30">
      <FaExclamationTriangle />
      {message}
    </div>
  );
};

export default FormError;

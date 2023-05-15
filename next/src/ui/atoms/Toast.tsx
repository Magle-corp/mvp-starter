import { Toast, ToastProps } from 'primereact/toast';
import { useAppContext } from '@/cdn/AppContext';

const PToast = ({ ...props }: ToastProps) => {
  const { toast } = useAppContext();

  return <Toast {...props} ref={toast} />;
};

export default PToast;

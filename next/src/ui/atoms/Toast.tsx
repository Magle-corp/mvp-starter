import { Toast, ToastProps } from 'primereact/toast';
import { useBackOfficeContext } from '@/ui/layouts/BackOfficeContext';

const PToast = ({ ...props }: ToastProps) => {
  const { toast } = useBackOfficeContext();

  return <Toast {...props} ref={toast} />;
};

export default PToast;

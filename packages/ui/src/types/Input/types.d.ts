export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  indicator?: true | false | 'label' | 'icon';
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  maxLength?: number;
  className?: string;
  isRequired?: boolean;
  label: string;
  validationState?: 'valid' | 'invalid';
  isDisabled?: boolean;
  description?: string;
  errorMessage?: string | null;
  as?: 'input' | 'textarea';
  rows?: number;
  fluid?: boolean;
  isReadOnly?: boolean;
}

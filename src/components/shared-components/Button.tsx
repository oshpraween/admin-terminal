import React from 'react';
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';

interface ButtonProps {
  label: string;
  image?: React.ReactNode;
  onClickHandler?: () => void;
  type?: 'contained' | 'primary' | 'containedPrimary';
  buttonStyle?: string;
  loading?: boolean;
  btnSubmitType?: 'button' | 'submit' | 'reset';
  isDisabled?: boolean;
  lableStyle?: string;
  baseMarginNeeded?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  image,
  onClickHandler,
  type = 'contained',
  buttonStyle,
  lableStyle,
  loading = false,
  btnSubmitType = 'button',
  isDisabled = false,
  baseMarginNeeded = true,
}) => {
  // Map custom type to AntD type
  let antType: AntButtonProps['type'] = 'default';
  if (type === 'primary' || type === 'containedPrimary') {
    antType = 'primary';
  }

  // Tailwind classes for additional styling
  const twClasses = [
    'flex items-center justify-center font-bold',
    baseMarginNeeded ? 'm-4' : '',
    buttonStyle || '',
    lableStyle || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <AntButton
      type={antType}
      htmlType={btnSubmitType}
      className={twClasses}
      onClick={onClickHandler}
      loading={loading}
      disabled={isDisabled || loading}
      block
    >
      <span className="flex items-center justify-center w-full">
        {image && <span className="mr-2">{image}</span>}
        {label}
      </span>
    </AntButton>
  );
};

export default Button;

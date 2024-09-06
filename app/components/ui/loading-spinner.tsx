import classNames from 'classnames';
import {Loader2Icon} from 'lucide-react';
import {FC} from 'react';

type LoadingSpinnerProps = {
  variant?: 'button' | 'default';
  label?: string;
  h?: number;
  w?: number;
  className?: string;
  labelClassName?: string;
};

export const LoadingSpinner: FC<LoadingSpinnerProps> = (props) => {
  if (props.variant === 'button') {
    return (
      <ButtonStyleLoadingSpinner
        label={props.label}
        h={props.h}
        w={props.w}
        className={props.className}
        labelClassName={props.labelClassName}
      />
    );
  } else {
    return (
      <DefaultLoadingSpinner
        label={props.label}
        h={props.h}
        w={props.w}
        className={props.className}
        labelClassName={props.labelClassName}
      />
    );
  }
};

const DefaultLoadingSpinner = ({
  label,
  h,
  w,
  className,
  labelClassName,
}: {
  label?: string;
  h?: number;
  w?: number;
  className?: string;
  labelClassName?: string;
}) => {
  return (
    <div
      role="status"
      className="flex flex-row gap-2 items-center justify-center">
      <Loader2Icon
        className={classNames(
          `animate-spinAround h-${h ? h : 10} w-${w ? w : 10} text-violet-700 dark:text-violet-400`,
          className
        )}
      />
      {label && (
        <span className={classNames('text-lg', labelClassName)}>{label}</span>
      )}
    </div>
  );
};

const ButtonStyleLoadingSpinner = ({
  label,
  h,
  w,
  className,
  labelClassName,
}: {
  label?: string;
  h?: number;
  w?: number;
  className?: string;
  labelClassName?: string;
}) => {
  return (
    <div
      role="status"
      className="flex flex-row gap-2 items-center justify-center bg-violet-700 hover:bg-violet-800 p-2 text-white rounded-md">
      <Loader2Icon
        className={classNames(
          `animate-spinAround h-${h ? h : 5} w-${w ? w : 5} text-white dark:text-violet-300`,
          className
        )}
      />
      {label && (
        <span className={classNames('text-md', labelClassName)}>{label}</span>
      )}
    </div>
  );
};

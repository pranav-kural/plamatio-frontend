import {FC} from 'react';

type ErrorFetchingDataProps = {
  message?: string;
  refetchMethod?: () => void;
  displayDetails?: boolean;
  error?: unknown;
  children?: React.ReactNode;
};

export const ErrorFetchingData: FC<ErrorFetchingDataProps> = ({
  message,
  refetchMethod,
  displayDetails,
  error,
  children,
}) => {
  return (
    <div className="w-full h-full flex flex-col gap-10 items-center justify-center">
      <span className="max-w-[500px] text-2xl text-center">
        {message ||
          'Error fetching data. Please ensure you are connected to the internet. If the problem persists, contact support.'}
      </span>
      {refetchMethod && (
        <button
          className="w-1/3 h-12 mx-auto bg-violet-700 text-white rounded-md"
          onClick={() => refetchMethod()}>
          Retry
        </button>
      )}
      {displayDetails && (
        <div className="max-w-[500px] text-sm text-center">
          <span>{JSON.stringify(error)}</span>
        </div>
      )}
      {children}
    </div>
  );
};

export default ErrorFetchingData;

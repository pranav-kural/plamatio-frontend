import {HeartHandshakeIcon, XIcon} from 'lucide-react';
import {FC} from 'react';

type ToastProps = {
  title: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  description?: string;
};

export const Toast: FC<ToastProps> = (props: ToastProps) => {
  return (
    <div
      className={`z-20 absolute top-[80px] right-[50px] p-3 max-w-[250px] max-h-[200px] min-h-[100px] flex flex-col items-center bg-violet-100 shadow-lg rounded-xl ${props.visible ? 'animate-fadeIn' : 'animate-fadeOut hidden'}`}
      hidden={!props.visible}>
      <div className="z-50 px-3 pt-3 w-full flex flex-row bg-violet-200 align-top items-start justify-between rounded-t-lg">
        <span className="text-md">{props.title}</span>
        <button className="z-20" onClick={() => props.setVisible(false)}>
          <span>
            <XIcon size={18} />
          </span>
        </button>
      </div>
      {props.description && (
        <div className="flex flex-col gap-2 items-center justify-center bg-violet-200 px-3 pb-3 rounded-b-lg">
          <span className="text-sm">{props.description}</span>
          <HeartHandshakeIcon strokeWidth={1.5} />
        </div>
      )}
    </div>
  );
};

import {PlusIcon, ShoppingCartIcon} from 'lucide-react';

export default function AddToCartButton({id}: {id: number}) {
  return (
    <button className="flex flex-row align-middle justify-center p-2 rounded-md bg-violet-100 cursor-pointer hover:text-violet-100 hover:bg-violet-800">
      <PlusIcon />
      <ShoppingCartIcon />
    </button>
  );
}

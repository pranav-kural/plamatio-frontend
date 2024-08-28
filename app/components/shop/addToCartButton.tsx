import {Button, Flex} from '@radix-ui/themes';
import {PlusIcon, ShoppingCartIcon} from 'lucide-react';

export default function AddToCartButton({id}: {id: number}) {
  return (
    <Button size="3" style={{paddingLeft: 0, paddingRight: 0}} variant="soft">
      <Flex>
        <PlusIcon className="ml-2" />
        <ShoppingCartIcon className="mr-3" />
      </Flex>
    </Button>
  );
}

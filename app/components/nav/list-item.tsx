import React from 'react';
import classNames from 'classnames';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Link from 'next/link';

interface NavListItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  children: React.ReactNode;
  title: string;
}

type NavListItemContentProps = {
  title: string;
  children: React.ReactNode;
};

const NavListItemContent = React.forwardRef<
  HTMLDivElement,
  NavListItemContentProps
>(({title, children}, forwardedRef) => (
  <div ref={forwardedRef}>
    <div className="text-violet12 mb-[5px] font-medium leading-[1.2]">
      {title}
    </div>
    <p className="text-mauve11 leading-[1.4]">{children}</p>
  </div>
));

NavListItemContent.displayName = 'NavListItemContent';

const NavListItem = React.forwardRef<HTMLDivElement, NavListItemProps>(
  ({className, children, title, ...props}, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <div ref={forwardedRef}>
          {props.href ? (
            <Link
              href={props.href}
              className={classNames(
                'focus:shadow-[0_0_0_2px] focus:shadow-violet7 hover:bg-mauve3 block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors',
                className
              )}
              {...props}>
              <NavListItemContent title={title}>{children}</NavListItemContent>
            </Link>
          ) : (
            <NavListItemContent title={title}>{children}</NavListItemContent>
          )}
        </div>
      </NavigationMenu.Link>
    </li>
  )
);

NavListItem.displayName = 'NavListItem';

export default NavListItem;

import { FC } from 'react';
import { Logo } from './Logo';

export const Header: FC = () => {
  return (
    <header className="top-0 flex w-full content-around border-b bg-white py-0 px-1 backdrop-blur-sm md:px-2">
      <div className="mx-auto my-0 flex h-20 w-full max-w-5xl items-center py-0 px-1 md:px-2">
        <a href="/">
          <Logo />
        </a>
      </div>
    </header>
  );
};

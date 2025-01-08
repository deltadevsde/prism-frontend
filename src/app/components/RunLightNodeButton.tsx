import PrismLogo from 'public/svg/prism-logo.svg';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type RunLightNodeButtonProps = {
  transparent?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export default function RunLightNodeButton({
  transparent = false,
  className,
  style,
}: RunLightNodeButtonProps) {
  return (
    <button
      style={style}
      className={twMerge(
        'group flex h-12 w-full max-w-[190px] items-center justify-center gap-0 rounded-md border border-[#FFEFEB] font-montserrat font-semibold text-white hover:from-white hover:to-white md:max-w-[210px] md:px-6',
        transparent
          ? 'bg-transparent'
          : 'bg-gradient-to-r from-[#0048EF] to-[#790F83] hover:bg-white hover:from-white hover:to-white',
        className
      )}
    >
      <PrismLogo className='mr-2 h-4 w-4 md:h-5 md:w-5 [&>path]:fill-white group-hover:[&>path]:fill-[#0048EF]' />
      <span className='group-hover:bg-gradient-to-r group-hover:from-[#0048EF] group-hover:to-[#790F83] group-hover:bg-clip-text group-hover:text-transparent'>
        Run Light Node
      </span>
    </button>
  );
}

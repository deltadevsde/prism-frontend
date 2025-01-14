import PrismLogo from 'public/svg/prism-logo.svg';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type RunLightNodeButtonProps = {
  onClick?: () => void;
  transparent?: boolean;
  className?: string;
  style?: React.CSSProperties;
  keepTextWhite?: boolean;
};

export default function RunLightNodeButton({
  onClick,
  transparent = false,
  className,
  style,
  keepTextWhite = false,
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
      onClick={onClick}
    >
      <PrismLogo
        className={twMerge(
          'mr-2 h-4 w-4 md:h-5 md:w-5 [&>path]:fill-white',
          !keepTextWhite && 'group-hover:[&>path]:fill-[#0048EF]'
        )}
      />
      <span
        className={
          keepTextWhite
            ? 'text-white'
            : 'group-hover:bg-gradient-to-r group-hover:from-[#0048EF] group-hover:to-[#790F83] group-hover:bg-clip-text group-hover:text-transparent'
        }
      >
        Run Light Node
      </span>
    </button>
  );
}

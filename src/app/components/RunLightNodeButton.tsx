import PrismLogo from 'public/svg/prism-logo.svg';
import React from 'react';

type RunLightNodeButtonProps = {
  transparent?: boolean;
};

export default function RunLightNodeButton({ transparent = false }: RunLightNodeButtonProps) {
  return (
    <button
      className={`group flex h-10 w-full max-w-[200px] items-center justify-center gap-2 rounded-md border border-[#FFEFEB] px-6 font-montserrat font-semibold text-white hover:from-white hover:to-white md:h-12 md:max-w-[210px] ${transparent ? 'bg-transparent' : 'bg-gradient-to-r from-[#0048EF] to-[#790F83]'}`}
    >
      <PrismLogo className='h-4 w-4 md:h-5 md:w-5 [&>path]:fill-white group-hover:[&>path]:fill-[#0048EF]' />
      <span className='group-hover:bg-gradient-to-r group-hover:from-[#0048EF] group-hover:to-[#790F83] group-hover:bg-clip-text group-hover:text-transparent'>
        Run Light Node
      </span>
    </button>
  );
}

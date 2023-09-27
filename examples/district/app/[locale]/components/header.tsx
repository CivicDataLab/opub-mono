import Image from 'next/image';
import { Text } from 'opub-ui';

export const Header = () => {
  return (
    <div className="py-12 w-full bg-backgroundDark flex items-center justify-center gap-10">
      <div className=" text-textOnBG">
        <Image
          src="/logo/logo.svg"
          width={400}
          height={104}
          alt="Assam District Dashboard"
        />
      </div>
    </div>
  );
};

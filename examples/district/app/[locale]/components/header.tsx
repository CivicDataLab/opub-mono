import { Text } from 'opub-ui';

export const Header = () => {
  return (
    <div className="py-12 w-full bg-backgroundDark flex items-center justify-center gap-10">
      <div className="w-[100px] h-[100px] bg-lightmodeVioletSolid5 rounded-full" />
      <div className=" text-textOnBG">
        <Text
          variant="heading4xl"
          as="h1"
          className="flex items-center gap-6 uppercase"
          color="inherit"
        >
          <span>অসম</span>
          <span>Assam</span>
        </Text>
        <Text
          variant="heading2xl"
          className="mt-2 uppercase"
          color="inherit"
          fontWeight="regular"
        >
          District Dashboard
        </Text>
      </div>
    </div>
  );
};

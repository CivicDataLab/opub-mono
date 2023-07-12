import { Spinner } from 'opub-ui';

export function Loading() {
  return (
    <div className="flex flex-col gap-4 h-[680px] w-full items-center justify-center text font-Medium text-600">
      <Spinner color="text" />
      Loading
    </div>
  );
}

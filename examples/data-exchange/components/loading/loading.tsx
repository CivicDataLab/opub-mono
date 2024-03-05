import { Spinner } from 'opub-ui';

export function Loading() {
  return (
    <div className="text flex h-[680px] w-full flex-col items-center justify-center gap-4 text-600 font-Medium">
      <Spinner color="text" />
      Loading
    </div>
  );
}

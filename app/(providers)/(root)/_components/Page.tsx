import { PropsWithChildren } from "react";

interface PageProps {
  title?: string;
  isNav?: boolean;
}

function Page({ children, title }: PropsWithChildren<PageProps>) {
  return (
    <main className="pl-[200px] pr-[75px] pt-[60px] pb-[calc(29rem/4)] w-full min-h-screen h-full bg-rhythmBlack text-white flex flex-col">
      {!!title ? (
        <h2 className="text-4xl font-bold mb-10 shrink-0">{title}</h2>
      ) : null}

      <div className="relative grow">{children}</div>
    </main>
  );
}

export default Page;

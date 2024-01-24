'use client';

import { SWRConfig } from 'swr';

type Props = {
  children: React.ReactNode;
};

export default function SWRConfigContext({ children }: Props) {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  return (
    <SWRConfig
      value={{
        fetcher,
      }}>
      {children}
    </SWRConfig>
  );
}

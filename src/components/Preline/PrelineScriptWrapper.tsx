'use client';

import dynamic from 'next/dynamic';

const PrelineScript = dynamic(() => import('./index'), {
  ssr: false,
});

export default function PrelineScriptWrapper() {
  return <PrelineScript />;
}

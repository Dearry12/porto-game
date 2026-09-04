import type { NextConfig } from 'next';

/**
 * Static export, per docs/MASTER_PROMPT.md §4: the interactive shell spans the
 * whole page, so a server buys nothing, and static HTML is what makes section
 * content visible to crawlers behind the title screen (architecture rule A3).
 */
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

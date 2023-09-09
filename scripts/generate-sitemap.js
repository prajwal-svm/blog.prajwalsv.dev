const generateSitemap = async () => {
    // Import the 'fs' module using dynamic import
    const fs = await import('fs/promises');

    // Import the 'globby' module using dynamic import
    const { globby } = await import('globby');

    // Fetch all routes based on patterns
    // Your folder structure might be different, so adjust below to match your needs
    const pages = await globby([
        'pages/**/*.{js,jsx,ts,tsx,mdx}', // All routes inside /pages
        'data/blog/*.mdx', // All MDX files inside my /data/blog folder
        '!pages/**/[*.{js,jsx}', // Ignore my dynamic route index Example /pages/blog/[slug].tsx
        '!pages/_*.{js,jsx}', // Ignore next.js files
        '!pages/api', // Ignore API routes
        '!pages/leetcode.js', // Ignore pages not meant to be indexed
        '!pages/leetcode-gists.js' // Ignore pages not meant to be indexed
    ]);

    const urlSet = pages
        .map((page) => {
            // Remove none route-related parts of the filename.
            const path = page
                .replace('pages', '')
                .replace('_content', '')
                .replace(/(.jsx|.js|.ts|.tsx)/, '')
                .replace('.mdx', '');
            // Remove the word index from the route
            const route = path === '/index' ? '' : path;
            // Build the URL portion of sitemap.xml
            return `<url><loc>https://blog.prajwalsv.dev${route}</loc></url>`;
        })
        .join('');

    // Add urlSet to the entire sitemap string
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlSet}</urlset>`;

    // Create the sitemap file
    await fs.writeFile('public/sitemap.xml', sitemap);
};

module.exports = generateSitemap;

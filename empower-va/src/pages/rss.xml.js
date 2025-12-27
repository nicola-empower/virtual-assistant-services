import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    const posts = await getCollection('blog');
    return rss({
        title: 'The Edge | Empower VA',
        description: 'Thoughts on efficiency, automation, and the art of doing less to achieve more.',
        site: context.site,
        items: posts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            link: `/edge/${post.slug}/`,
        })),
        customData: `<language>en-gb</language>`,
    });
}

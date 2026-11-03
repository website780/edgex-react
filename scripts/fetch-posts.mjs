// Pulls blog posts from the WordPress REST API into data/posts.json (run before build)
import { writeFileSync, mkdirSync, createWriteStream } from 'node:fs';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const WP = process.env.WP_URL || 'https://edgex-learning.com';
const res = await fetch(`${WP}/wp-json/wp/v2/posts?per_page=100&_embed=1&_fields=id,slug,date,modified,title,excerpt,content,yoast_head_json,_links,_embedded`);
if (!res.ok) throw new Error('WP fetch failed ' + res.status);
const raw = await res.json();
mkdirSync('public/blog', { recursive: true });
const strip = (s) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#8217;/g, '’').replace(/&#8230;/g, '…').replace(/\s+/g, ' ').trim();
const posts = [];
for (const p of raw) {
  const media = p._embedded?.['wp:featuredmedia']?.[0];
  let image = null;
  if (media?.source_url) {
    const file = `${p.slug.slice(0, 60)}${media.source_url.slice(media.source_url.lastIndexOf('.'))}`;
    try {
      const r = await fetch(media.source_url);
      if (r.ok) { await pipeline(Readable.fromWeb(r.body), createWriteStream(`public/blog/${file}`)); image = `/blog/${file}`; }
    } catch {}
  }
  posts.push({
    slug: p.slug,
    date: p.date,
    title: strip(p.title.rendered),
    excerpt: strip(p.excerpt.rendered),
    description: p.yoast_head_json?.description || strip(p.excerpt.rendered),
    content: p.content.rendered
      .replace(/https?:\/\/edgex-learning\.com\//g, '/')
      .replace(/class="wp-block-[^"]*"/g, ''),
    image,
  });
}
posts.sort((a, b) => b.date.localeCompare(a.date));
writeFileSync('data/posts.json', JSON.stringify(posts, null, 1));
console.log(posts.length, 'posts');
posts.forEach((p) => console.log('-', p.slug, p.image ? 'img' : 'NOIMG'));

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { globby } from 'globby';
import { Feed } from 'feed';
import matter from 'gray-matter';

const generateRSS = async () => {
  const pages = await globby(['_content/blog/*.mdx']);

  const posts = pages
    .map((page) => {
      const fileName = page.replace('_content/blog/', '').replace('.mdx', '');
      const postPath = join(process.cwd(), page);
      const postContent = readFileSync(postPath, 'utf8');
      const { data } = matter(postContent);
      return { ...data, fileName };
    })
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  const feed = new Feed({
    title: 'Blog | Code By Corey',
    id: 'https://codebycorey.com',
    link: 'https://codebycorey.com',
    description: 'Web developer and TypeScript enthusiast',
    language: 'en',
    copyright: "Copyright 2021, Corey O'Donnell",
    feedLinks: {
      rss: 'https://codebycorey.com/rss.xml',
    },
    author: {
      name: "Corey O'Donnell",
      link: 'https://twitter.com/codebycorey',
    },
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      // id: `https://codebycorey.com/blog/${post.fileName}`,
      link: `https://codebycorey.com/blog/${post.fileName}`,
      date: new Date(post.date),
      description: post.brief,
      image: `https://codebycorey.com/static/images/${post.fileName}/header.png`,
      author: {
        name: "Corey O'Donnell",
        link: 'https://twitter.com/codebycorey',
      },
    });
  });

  const rss = feed.rss2();
  writeFileSync('./public/rss.xml', rss);
};

generateRSS();

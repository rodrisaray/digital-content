// Blogger JSON Feed URL (replace with your blog URL)
const bloggerFeedURL = 'https://yourblog.blogspot.com/feeds/posts/default?alt=json';

fetch(bloggerFeedURL)
  .then(res => res.json())
  .then(data => {
    const blogFeed = document.getElementById('blogFeed');
    const posts = data.feed.entry?.slice(0, 3) || [];

    posts.forEach(post => {
      const title = post.title.$t;
      const content = post.content.$t;
      const link = post.link.find(l => l.rel === 'alternate').href;

      const card = document.createElement('div');
      card.className = 'blog-post';
      card.innerHTML = `
        <h3>${title}</h3>
        <p>${stripHTML(content).substring(0, 120)}...</p>
        <a href="${link}" target="_blank">Read More</a>
      `;
      blogFeed.appendChild(card);
    });
  })
  .catch(() => {
    document.getElementById('blogFeed').innerHTML = "<p>Unable to load blog posts at this time.</p>";
  });

function stripHTML(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

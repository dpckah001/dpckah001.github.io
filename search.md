---
layout: default
title: "SEARCH RESULTS"
permalink: /search/
---

<div class="post-meta">
  <span id="search-query-display"></span>
</div>

<ul id="search-results" class="entry-list"></ul>

<script src="https://cdn.jsdelivr.net/npm/simple-jekyll-search@1.10.0/dest/jekyll-search.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q');
  const display = document.getElementById('search-query-display');

  if (!query) {
    display.innerHTML = '> NO QUERY SPECIFIED';
    return;
  }

  display.innerHTML = `> SEARCHING: "${query.toUpperCase()}"`;

  SimpleJekyllSearch({
    searchInput: null,           // 不使用内置输入框
    resultsContainer: document.getElementById('search-results'),
    json: '{{ "/search.json" | relative_url }}',
    searchResultTemplate: '<li class="entry-item"><span class="entry-date">[{date}]</span><a href="{url}" class="entry-link">{title}</a></li>',
    noResultsText: '<li class="entry-item">> NO_MATCHES_FOUND</li>',
    limit: 20,
    fuzzy: false,
    query: query                 // ← 关键：直接传入URL参数作为搜索词
  });
});
</script>

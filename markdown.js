document.addEventListener('DOMContentLoaded', () => {
    if (typeof marked === 'undefined') {
        console.error('Marked library is not loaded.');
        return;
    }

    fetch('content.md')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(text => {
            // 使用 marked 库将 Markdown 转换为 HTML
            const html = marked(text);
            document.getElementById('blog-content').innerHTML = html;
        })
        .catch(error => console.error('Error loading Markdown file:', error));
});

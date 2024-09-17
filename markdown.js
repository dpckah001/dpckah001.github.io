console.log('markdown.js 开始执行');

document.addEventListener('DOMContentLoaded', () => {  
    console.log('DOM 内容已加载');

    const contentElement = document.getElementById('markdown-content');
    if (!contentElement) {
        console.error('找不到 markdown-content 元素');
        return;
    }
    console.log('找到 markdown-content 元素');

    if (typeof window.markdownParser !== 'function') {
        console.error('Markdown 解析器未正确加载');
        return;
    }

    // 尝试渲染一些测试 Markdown
    const testMarkdown = '# 测试标题\n\n这是一个测试段落。';
    try {
        const html = window.markdownParser(testMarkdown);
        contentElement.innerHTML = html;
        console.log('测试 Markdown 已渲染');
    } catch (error) {
        console.error('测试 Markdown 渲染失败:', error);
    }

    // 尝试加载实际的 Markdown 文件
    fetch('./notdiamond.md')
        .then(response => {
            console.log('Fetch 响应状态:', response.status);
            if (!response.ok) {
                throw new Error('网络响应不正常');
            }
            return response.text();
        })
        .then(text => {
            console.log('Markdown 内容已获取，长度:', text.length);
            console.log('Markdown 内容:', text); // 输出原始 Markdown 内容
            try {
                const html = window.markdownParser(text);
                console.log('解析后的 HTML:', html); // 输出解析后的 HTML
                contentElement.innerHTML = html;
                console.log('HTML 已插入到页面');
            } catch (parseError) {
                console.error('Markdown 解析错误:', parseError);
                contentElement.textContent = '解析 Markdown 时出错: ' + parseError.message;
            }
            
            // 添加内容渐现效果
            setTimeout(() => {
                contentElement.style.opacity = '1';
                console.log('内容已设置为可见');
            }, 1000);
        })
        .catch(error => {
            console.error('错误:', error);
            contentElement.textContent = '加载内容时出错: ' + error.message;
            
            // 即使出错也显示错误信息
            setTimeout(() => {
                contentElement.style.opacity = '1';
            }, 1000);
        });
});

console.log('markdown.js 执行完毕');
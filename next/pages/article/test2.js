import React, { useState } from 'react';

const CommentForm = () => {
    const [content, setContent] = useState({
        content: '',
    });
  const [article, setArticle] = useState([]);


    const handleChange = (e) => {
        e.preventDefault();
        const { value } = e.target;
        setContent({
            content: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // 阻止表单默认提交行为
        try {
            // 发送评论数据到后端API
            const res = await fetch('http://localhost:3005/api/article/comment/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: content.content,                    
                }),
                credentials: 'include' // 指定包含凭据
            });
            const data = await res.json();
            if (data) {
                setContent({ content: '' }); // 清空评论输入框
                console.log(data);
            }
    
            // 处理响应...
            console.log('Comment submitted successfully!');
    
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };
    console.log(content.content);
    
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea
                        id="content"
                        name="content"
                        value={content.content}
                        onChange={handleChange}
                        placeholder="發表文字...限50字"
                    />
                </div>
                <button type="submit">提交评论</button>
            </form>
        </>
    );
};

export default CommentForm;

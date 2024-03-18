import React, { useState, useEffect } from 'react';


const CommentForm = () => {
    const [content, setContent] = useState({
        content: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContent({
            ...content,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 发送评论数据到后端API
            const res = await fetch('http://localhost:3005/api/article/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: content.content,
                    
                  }),
                  credentials: 'include'
            });
            const data = await res.json();
            if (data) {
                setContent(data);
                console.log(data);
            }

            // 处理响应...
            console.log('Comment submitted successfully!');

        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    return (
        <>
            {/* <label htmlFor="content">评论:</label> */}
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea
                        id="content"
                        name="content"
                        value={content.content}
                        onChange={handleChange}
                        placeholder="请输入您的评论..."
                    />
                </div>
                <button type="submit">提交评论</button>
            </form>
        </>
    );
};

export default CommentForm;

# Hướng dẫn lập trình Apollo GraphQL server

schema.js được gọi bởi index2.js.

Trong schema.js ta có thể bổ xung mô tả description cho từng trường và từng hàm


rest.js là ứng dụng Express cung cấp dịch vụ REST tương đương. Để
graphql resolver gọi vào một REST API ta có thể dùng [node-fetch](https://www.npmjs.com/package/node-fetch) hoặc axios
để gọi

```javascript
getPosts: () => {
    return fetch("http://localhost:4000/posts").then(
        res => res.json()
    )
}
```


# Hướng dẫn lập trình Apollo GraphQL server

## Cài đặt
```
git clone https://github.com/TechMaster/ApolloGraphQL.git
cd ApolloGraphQL
npm install
```

Chạy thử
```javascript 1.8
node index.js
node index2.js
```
Do index2.js sẽ gọi đến REST server ở cổng 4000, cần phải chạy node rest.js để bật REST server

## GraphQL schema
. [index.js](https://github.com/TechMaster/ApolloGraphQL/blob/master/index.js) định nghĩa schema trực tiếp. Cách này chỉ phù hợp với demo đơn giản
. [index2.js](https://github.com/TechMaster/ApolloGraphQL/blob/master/index2.js) tách schema ra file riêng [schema.js](https://github.com/TechMaster/ApolloGraphQL/blob/master/schema.js) 
. Trong schema.js ta có thể bổ xung mô tả description cho từng trường và từng hàm
```
# Các câu lệnh truy vấn, một số gọi vào REST ở cổng 4000
type Query {
  # Mockup posts
  posts: [Post]
}
```

## GraphQL đóng gói dịch vụ REST
Để graphql resolver gọi vào một REST API ta có thể dùng [node-fetch](https://www.npmjs.com/package/node-fetch) hoặc axios
```javascript
getPosts: () => {
    return fetch("http://localhost:4000/posts").then(
        res => res.json()
    )
}
```


const typeDefs = `
  # Tác giả của post
  type Author {
    id: Int!
    # User first name
    firstName: String
    lastName: String
    # the list of Posts by this author
    posts: [Post] 
  }
  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }
  # Các câu lệnh truy vấn, một số gọi vào REST ở cổng 4000
  type Query {
    # Mockup posts
    posts: [Post]
        
    # Call rest API at port 4000 
    getPosts: [Post]
    post(id: Int!): Post
    author(id: Int!): Author
    
    # Tìm tác giả theo id
    getAuthor(id: Int!): Author
    postById(id: Int!): Post
    postsByText(title: String!): [Post]
  }
  # this schema allows the following mutation:
  type Mutation {
    upvotePost (
      postId: Int!
    ): Post
  }
`;


// example data
const authors = [
    {id: 1, firstName: 'Tom', lastName: 'Coleman'},
    {id: 2, firstName: 'Sashko', lastName: 'Stubailo'},
    {id: 3, firstName: 'Mikhail', lastName: 'Novikov'},
];
const posts = [
    {id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2},
    {id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3},
    {id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1},
    {id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7},
];
const lodash = require('lodash');
const fetch = require('node-fetch');
const resolvers = {
        Query: {
            posts: () => posts,

            getPosts: () => {
                return fetch("http://localhost:4000/posts").then(
                    res => res.json()
                )
            },
            author: (_, {id}) => {
                return lodash.find(authors, {id: id})
            },
            getAuthor: (_, {id}) => {
                return fetch(`http://localhost:4000/author/${id}`).then(
                    res => res.json()
                )
            },
            postById: (_, {id}) => lodash.find(posts, {id: id}),
            postsByText: (_, {title}) => {
                let arr = [];
                posts.map(item => {
                    if (item.title.indexOf(title) >= 0) {
                        arr.push(item)
                    }
                })
                return arr;
            }
        },

        Mutation: {
            upvotePost: (_, {postId}) => {
                const post = lodash.find(posts, {id: postId});
                if (!post) {
                    throw new Error(`Couldn't find post with id ${postId}`);
                }
                post.votes += 1;
                return post;
            },
        },
        Author: {
            posts: (author) => lodash.filter(posts, {authorId: author.id}),
        }
        ,
        Post: {
            author: (post) => lodash.find(authors, {id: post.authorId}),
        }
        ,
    }
;

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
};
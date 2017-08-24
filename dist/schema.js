'use strict';

var typeDefs = '\n  type Author {\n    id: Int!\n    firstName: String\n    lastName: String\n    posts: [Post] # the list of Posts by this author\n  }\n  type Post {\n    id: Int!\n    title: String\n    author: Author\n    votes: Int\n  }\n  # the schema allows the following query:\n  type Query {\n    posts: [Post]\n    post(id: Int!): Post\n    author(id: Int!): Author,\n    postById(id: Int!): Post\n    postsByText(title: String!): [Post]\n  }\n  # this schema allows the following mutation:\n  type Mutation {\n    upvotePost (\n      postId: Int!\n    ): Post\n  }\n';

// example data
var authors = [{ id: 1, firstName: 'Tom', lastName: 'Coleman' }, { id: 2, firstName: 'Sashko', lastName: 'Stubailo' }, { id: 3, firstName: 'Mikhail', lastName: 'Novikov' }];
var _posts = [{ id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 }, { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 }, { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 }, { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 }];
var lodash = require('lodash');

var resolvers = {
    Query: {
        posts: function posts() {
            return _posts;
        },
        author: function author(_, _ref) {
            var id = _ref.id;

            return lodash.find(authors, { id: id });
        },
        postById: function postById(_, _ref2) {
            var id = _ref2.id;
            return lodash.find(_posts, { id: id });
        },
        postsByText: function postsByText(_, _ref3) {
            var title = _ref3.title;

            var arr = [];
            _posts.map(function (item) {
                if (item.title.indexOf(title) >= 0) {
                    arr.push(item);
                }
            });
            return arr;
        }
    },

    Mutation: {
        upvotePost: function upvotePost(_, _ref4) {
            var postId = _ref4.postId;

            var post = lodash.find(_posts, { id: postId });
            if (!post) {
                throw new Error('Couldn\'t find post with id ' + postId);
            }
            post.votes += 1;
            return post;
        }
    },
    Author: {
        posts: function posts(author) {
            return lodash.filter(_posts, { authorId: author.id });
        }
    },

    Post: {
        author: function author(post) {
            return lodash.find(authors, { id: post.authorId });
        }
    }

};

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
};
//# sourceMappingURL=schema.js.map
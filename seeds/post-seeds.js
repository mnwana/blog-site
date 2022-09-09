const { Post } = require('../models');

const postdata = [
  {
    title: 'Welcome to the blog!',
    text: 'Hello and welcome to the blog :) ',
    user_id: 1
  },
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;

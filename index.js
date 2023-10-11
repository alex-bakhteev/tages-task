import axios from 'axios';

const posts = await axios
  .get('http://jsonplaceholder.typicode.com/posts')
  .then((res) => {
    if (res.data != undefined) {
      return res.data;
    }
  })
  .catch((err) => {
    console.log(err);
  });

const users = await axios
  .get('http://jsonplaceholder.typicode.com/users')
  .then((res) => {
    if (res.data != undefined) {
      return res.data;
    }
  })
  .catch((err) => {
    console.log(err);
  });

const treatedUsers = users.map((item) => {
  return {
    id: item.id,
    name: item.name,
    email: item.email,
    address: `${item.address.city}, ${item.address.street}, ${item.address.suite}`,
    website: `https://${item.website}`,
    company: item.company.name,
    posts: [],
  };
});

posts.forEach((post) => {
  treatedUsers.forEach((user) => {
    const treatedPost = {
      id: post.id,
      title: post.title,
      title_crop: post.title.substr(0, 20) + '...',
      body: post.body,
    };
    if (user.id === post.userId) {
      user.posts.push(treatedPost);
    }
  });
});

console.log(treatedUsers);

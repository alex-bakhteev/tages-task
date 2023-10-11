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

const getComments = async (postId) => {
  const comments = await axios
    .get(`http://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then((res) => {
      if (res.data != undefined) {
        return res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return comments;
};

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

for (const post of posts) {
  for (const treatedUser of treatedUsers) {
    if (treatedUser.id === post.userId) {
      let comments = [];
      if (treatedUser.name === 'Ervin Howell') {
        comments = await getComments(post.id);
      }
      const treatedPost = {
        id: post.id,
        title: post.title,
        title_crop: post.title.substr(0, 20) + '...',
        body: post.body,
        comments: comments,
      };

      treatedUser.posts.push(treatedPost);
    }
  }
}

console.log(treatedUsers);

treatedUsers.forEach((treatedUser) => {
    if (treatedUser.name === 'Ervin Howell') {
        treatedUser.posts.forEach((post) => {
            console.log(post);
        })
    }
});

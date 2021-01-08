const users = [
    {
        id: '1',
        name: 'Emre',
        email: 'y.emrekas@outlook.com',
        age: 23
    },
    {
        id: '2',
        name: 'Aylin',
        email: 'aylin@outlook.com',
        age: 22
    },
    {
        id: '3',
        name: 'Ali',
        email: 'ali@outlook.com',
        age: 26
    }];

const posts = [
    {
        id: '1',
        title: 'a',
        body: 'aaa',
        published: true,
        author: '1'
    },
    {
        id: '2',
        title: 'b',
        body: 'bbb',
        published: true,
        author: '1'
    },
    {
        id: '3',
        title: 'c',
        body: 'ccc',
        published: false,
        author: '2'
    }
]

const comments = [
    {
        id: '1',
        text: 'comments1',
        author: '1',
        post: '1'
    },
    {
        id: '2',
        text: 'comments2',
        author: '1',
        post: '2'
    },
    {
        id: '3',
        text: 'comments3',
        author: '2',
        post: '1'
    }, {
        id: '4',
        text: 'comments4',
        author: '3',
        post: '1'
    }
]

const likes = [
    {
        id: '1',
        text: 'likes1',
        author: '1',
    },
    {
        id: '2',
        text: 'likes2',
        author: '1',
    },
    {
        id: '3',
        text: 'likes3',
        author: '1',
    },
]

const db = { users, posts, comments, likes };

export { db as default };
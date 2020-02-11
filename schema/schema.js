const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema ,GraphQLID,GraphQLInt,GraphQLList} = graphql;
const _ = require('lodash');
const Book = require('../model/book');
const Author = require('../model/author');

//dummy data
/*let books = [
    { name: 'book1', genre: 'genre 1', id: '1',authorId:'1' },
    { name: 'book2', genre: 'genre 2', id: '2' ,authorId:'2' },
    { name: 'book3', genre: 'genre 3', id: '3', authorId: '3' },
    { name: 'book4', genre: 'genre 4', id: '4', authorId: '2' },
    { name: 'book5', genre: 'genre 5', id: '5', authorId: '3' },
    { name: 'book6', genre: 'genre 6', id: '6' ,authorId:'3' },
]; 
let authors = [
    { name: 'author 1', age: '25', id: '1' },
    { name: 'author 2', age: '26', id: '2' },
    { name: 'author 3', age: '27', id: '3' }
];*/

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
               resolve(parent, args) {
               // return authors.find(author=>author.id===parent.authorId)
                return Author.findById( parent.authorId);
            }
        }
    })
});
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                console.log(parent.id);
                console.log(books);
                //return books.filter(book => book.authorId === parent.id);
                return Book.find({ authorId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                //code to get data from db/other source
                //return books.find(book => book.id === args.id);
               // return _.find(books, { id: args.id });
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
               // return authors.find(author => (args.id === author.id));
                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
               // return books;
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
              //  return authors;
                return Author.find({});
            }
        }
      
    }
});
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name:{type:GraphQLString},
                age:{type:GraphQLInt}
            },
                resolve(parent, args){
        let author= new Author({
            name: args.name,
            age:args.age
        });
              return  author.save();
            }
           
        },
        addBook: {
            type:BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId:{type:GraphQLID}
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
});
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
    //query for get and mutations for insert
});

const { Schema, model } = require("mongoose");

const articleSchema = new Schema({
    title: String,
    content: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});
let Article;
module.exports = Article = model("Article", articleSchema);

async function test() {
    const articles = await Article.find().populate({
        path: "user", 
        select :"-password",
        match: { name: /ana/i }
    });
    //console.log(articles.filter((article) => article.user));
//     new Article({ 
//         title: 'test',
//         content: 'contenu',
//         user: "64ad56aaa68e9d50971b5fb7"
//     }).save();
}
test();
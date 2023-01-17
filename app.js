const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ornare nulla nec felis commodo sagittis. Curabitur eu libero sed ligula porttitor mattis. Praesent a vestibulum neque. In sed faucibus dolor. Ut pulvinar pharetra diam, non bibendum libero fringilla eu. Nullam molestie metus in lorem facilisis auctor. Duis viverra, tellus eu efficitur accumsan, tellus nibh viverra turpis, id egestas elit dui eget elit. Nunc faucibus orci sed augue porta, vitae posuere ipsum suscipit. In sodales, erat non interdum porta, nisi sapien condimentum nisl, ac mattis dolor lorem sit amet nisl. Duis sit amet erat et dui tempor porttitor id in diam. Mauris pharetra ipsum.";
const aboutStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi elementum nunc vel ex sollicitudin, nec tincidunt felis sagittis. Duis sed dolor nisi. Sed in massa ac augue faucibus tempor in in nisl. Vivamus lacinia vulputate metus in ornare. Praesent eleifend purus dolor, et scelerisque dui posuere in. Pellentesque sagittis metus sed eros porta, et auctor tortor pharetra. Integer commodo sem et neque lobortis, eu vehicula augue finibus. Morbi accumsan, libero vitae scelerisque laoreet, nibh neque.";
const contactStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec sagittis tellus. Pellentesque purus massa, tincidunt nec placerat non, luctus id nulla. Praesent elit lorem, pulvinar a nibh et, pretium euismod dolor. Donec placerat sed dolor non bibendum. Pellentesque eu neque nibh. Aenean consequat risus massa, eget tincidunt est aliquam in. Suspendisse feugiat at sapien ut pellentesque. Mauris magna mi, gravida non mauris ut, interdum accumsan est. Sed suscipit neque non leo pretium viverra. Sed feugiat id dui et tincidunt. Donec maximus orci ac ligula iaculis, eu feugiat nulla congue. Nulla.";

const posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Home Page Content
app.get("/", (req, res) => {
  res.render("home", {
    homeContent: homeStartingContent,
    blogs: posts
  });
});

// About Page Content
app.get("/about", (req, res) => {
  res.render("about", {
    aboutContent: aboutStartingContent
  });
});

// Contact Page Content
app.get("/contact", (req, res) => {
  res.render("contact", {
    contactContent: contactStartingContent
  });
});

// Compose Page Content
app.get("/compose", (req, res) => {
  res.render("compose", {});
});

app.post("/compose", (req, res) => {

  const post = {
    title: req.body.postTitle,
    body: req.body.postContent
  };
  posts.push(post);
  res.redirect("/");
});

// Posts Page Content
app.get("/post/:topic", (req, res) => {
  const reqTopic = _.lowerCase(req.params.topic);

  posts.forEach((post) => {
    const actTopic = _.lowerCase(post.title);

    if (reqTopic === actTopic) {
      res.render("post", {
        title: post.title,
        content: post.body
      });
    }
  });

});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

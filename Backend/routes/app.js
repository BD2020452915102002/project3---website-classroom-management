const usersRouter = require("./user");
const authRouter = require("./auth");

const route = (app)=> {
    app.use("/users", usersRouter);
    app.use("/auth", authRouter);
}
module.exports = route;
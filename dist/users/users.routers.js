"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const router_1 = require("../common/router");
const users_model_1 = require("./users.model");
const restify_errors_1 = require("restify-errors");
class UsersRouter extends router_1.Router {
    constructor() {
        super();
        this.on("beforeRender", (document) => {
            document.password = undefined;
        });
    }
    applyRoutes(application) {
        application.get("/users", (req, res, next) => {
            users_model_1.User.find().then(this.render(res, next)).catch(next);
        });
        application.get("/users/:id", (req, res, next) => {
            users_model_1.User.findById(req.params.id).then(this.render(res, next)).catch(next);
        });
        application.post("/users", (req, res, next) => {
            let user = new users_model_1.User(req.body);
            user.save().then(this.render(res, next)).catch(next);
        });
        application.put("/users/:id", (req, res, next) => {
            const options = { overwrite: true };
            users_model_1.User.update({ _id: req.params.id }, req.body, options)
                .exec()
                .then((res) => {
                if (res.n) {
                    return users_model_1.User.findById(req.params.id);
                }
                else {
                    throw new restify_errors_1.NotFoundError("The document requested doesn't exist");
                }
            })
                .then(this.render(res, next)).catch(next);
        });
        application.patch("/users/:id", (req, res, next) => {
            const options = { new: true };
            users_model_1.User.findByIdAndUpdate(req.params.id, req.body, options).then(this.render(res, next)).catch(next);
        });
        application.del("/users/:id", (req, res, next) => {
            users_model_1.User.deleteOne({ _id: req.params.id }).then((cmdResult) => {
                if (cmdResult.n) {
                    console.log(cmdResult.n);
                    res.send(204);
                }
                else {
                    throw new restify_errors_1.NotFoundError("The document that you want to remove doesn't exist");
                }
                return next();
            }).catch(next);
        });
    }
}
exports.usersRouter = new UsersRouter();

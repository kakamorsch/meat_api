"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (req, res, error, done) => {
    error.toJSON = () => {
        return {
            message: error.message
        };
    };
    switch (error.name) {
        case "MongoError":
            if (error.code === 11000) {
                error.statusCode = 400;
            }
            break;
        case "ValidationError":
            error.statusCode = 400;
            break;
    }
    done();
};
exports.handleError = handleError;

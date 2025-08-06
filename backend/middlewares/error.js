const globalErrorHandler = (err, req, res, next) => {
        const statusCode = err.statusCode || 500;
        const message = err.message || "Internal Server Error";
        const errors = err.errors || [];
        const stack = err.stack || "";
        const data = err.data || null;
        const success = err.success || false;

        return res.status(statusCode).json({
                success,
                message,
                errors,
                stack,
                data,
        });
};

export const notFound = (req, res, next) => {
        const error = new ApiError(404, "Route not found");
        next(error);
};

export default globalErrorHandler;

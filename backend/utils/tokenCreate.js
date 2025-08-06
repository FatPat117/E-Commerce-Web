import jwt from "jsonwebtoken";

const createToken = (data) => {
        return jwt.sign({ data }, process.env.SECRET, { expiresIn: "7d" });
};

export default createToken;

const admin_login = async (req, res) => {
        const { email, password } = req.body;
        console.log(email, password);
        res.status(200).json({ message: "Admin login successful" });
};

export default { admin_login };

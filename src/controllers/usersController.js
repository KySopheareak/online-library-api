import User from "../models/usersModel.js";

export const create = async (req, res) => {
    try {
        const userData = new User(req.body);
        const { email } = req.body;
        const userExist = await User.findOne({ email: email });
        if(userExist){
            return res.status(400).json({ message: 'USER ALREADY EXIST!' });
        }
        const savedUser = await userData.save();
        res.status(200).json(savedUser);

    } catch (error) {
        console.log('ERRR: ', error)
        res.status(500).json({ error: "INTERNAL SERVER ERROR!" })
    }
};

export const fetch = async (req, res) => {
    try {
        const users = await User.find().sort({ id: 1 });
        res.status(200).json(users);
    } catch (err) {
        console.log('ERR: ', err);
        res.status(500).json("INTERNAL SERVER ERROR...!");
    }
};

export const update = async (req, res) => {
    try {
        const _id = req.params._id;
        
        // Check if the user exists
        const userExist = await User.findOne({ _id });
        if (!userExist) {
            return res.status(404).json({ message: 'USER NOT FOUND!' });
        }

        // Update the user
        const updateUser = await User.findOneAndUpdate({ _id }, req.body, { new: true });

        // Respond with the updated user
        res.status(200).json(updateUser);
    } catch (error) {
        console.error('=========================> ERR: ', error);
        res.status(500).json({ message: "INTERNAL SERVER ERROR...!" });
    }
};

import prisma from "../config/prisma.js";


class UserController {
    getMyProfile = async (req, res) => {
        try {
            const userId = req.user.id

            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                }, select: {
                    name: true,
                    email: true,
                    photoProfile: true,
                    createdAt: true,
                }
            })

            if (!user) return res.status(401).json({message: 'User not found'});

            if (user.photoProfile) {
                user.photoUrl = `${req.protocol}://${req.get("host")}/uploads/${user.photoProfile}`;
            }

            res.json({
                message: 'Success',
                data: user,
            })
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
    updateProfile = async (req, res) => {
        try {
            const userId = req.user.id;
            const {name} = req.body;

            let updateData = {};

            if (name) updateData.name = name;

            if (req.file) {
                updateData.photoProfile = req.file.filename;
            }

            const updatedUser = await prisma.user.update({
                where: {id: userId},
                data: updateData,
                select: {id: true, name: true, email: true, photoProfile: true},
            });

            res.json({
                message: "Profil berhasil diupdate",
                data: updatedUser,
            });
        } catch (error) {
            res.status(500).json({message: "Gagal update profil: " + error.message});
        }
    }

}

export default UserController;
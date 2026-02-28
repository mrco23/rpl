import prisma from '../config/prisma.js'

class UserService {
    getUser(username) {
        return prisma.pengguna.findUnique({
                where: {
                    username: username
                }
            }
        )
    }

    getUserProfil(id) {
        return prisma.pengguna.findUnique({
            where: {id: id}, select: {
                username: true,
                photo_profil: true,
            }
        });
    }

    putUserProfil(id, updatedData) {
        return prisma.pengguna.update({
            where: {id: id}, data: updatedData, select: {id: true, username: true, photo_profil: true},
        });
    }

    createUser(username, hashedPassword) {
        return prisma.pengguna.create({
            data: {
                username, password: hashedPassword,
            },
        });
    }
}

const userService = new UserService();
export default userService;
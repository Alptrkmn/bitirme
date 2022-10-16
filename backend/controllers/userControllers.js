const User = require('../models/User')
const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const { default: dist } = require('express-rate-limit')

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
 
    const users = await User.find().select('-password').lean()

 
    if (!users?.length) {
        return res.status(400).json({ message: 'Kullanıcı Bulunamadı' })
    }

    res.json(users)
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles, city, neighbourhood, adress, tel} = req.body

    if (!username || !password |!Array.isArray(roles) || !roles.length || !city || !neighbourhood || !adress || !tel) {
        return res.status(400).json({ message: 'Tüm Boşlukları Doldurun' })
    }
    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Var Olan Kullanıcı İsmi' })
    }

    const hashedPwd = await bcrypt.hash(password, 10) 

    const userObject = { username, "password": hashedPwd, roles, city, neighbourhood, adress, tel }

    const user = await User.create(userObject)

    if (user) { 
        res.status(201).json({ message: `Yeni kullanıcı ${username} yaratıldı` })
    } else {
        res.status(400).json({ message: 'Yanlış Kullanıcı Adı Bilgisi' })
    }
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, roles, active, password, city, neighbourhood, adress, tel} = req.body
 
    if (!id || !username || !Array.isArray(roles) || !roles.length || !city || !neighbourhood || !adress || !tel || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'Tüm Boşluklar Doldurulmalı' })
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'Kullanıcı Bulunamadı' })
    }

    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Aynı Kullanıcı Adı Var' })
    }

    user.username = username
    user.roles = roles
    user.city = city
    user.neighbourhood = neighbourhood   
    user.adress = adress
    user.tel = tel
    user.active = active

    if (password) {
        // Hash password 
        user.password = await bcrypt.hash(password, 10) 
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} güncellendi` })
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Kullanıcı ID Bulunamadı' })
    }

    const note = await Note.findOne({ user: id }).lean().exec()
    if (note) {
        return res.status(400).json({ message: 'Kullanıcı Desteği Atanmadı' })
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'Kullanıcı Bulunamadı' })
    }

    const result = await user.deleteOne()

    const reply = `Kullanıcı ismi ${result.username} olan kullanıcı ${result._id} silindi`

    res.json(reply)
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}
const express = require("express")
const router = express.Router()
const User = require("../models/user")
const passport = require("passport")
const { getToken, COOKIE_OPTIONS, getRefreshToken, verifyUser } = require("../authenticate")

router.route('/signup').post((req, res, next) => {
    // Verify that first name is not empty
    if (!req.body.firstName) {
        res.statusCode = 500
        res.send({
            name: "FirstNameError",
            message: "The first name is required",
        })
    } else {
        User.register(
            new User({ username: req.body.username }),
            req.body.password,
            (err, user) => {
                if (err) {
                    res.statusCode = 500
                    res.send(err)
                } else {
                    user.firstName = req.body.firstName
                    user.lastName = req.body.lastName || ""
                    const token = getToken({ _id: user._id })
                    const refreshToken = getRefreshToken({ _id: user._id, nickName : user.lastName})
                    user.refreshToken.push({ refreshToken })
                    user.save((err, user) => {
                        if (err) {
                            res.statusCode = 500
                            res.send(err)
                        } else {
                            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                            res.send({ success: true, token })
                        }
                    })
                }
            }
        )
    }
})

router.post("/login", passport.authenticate("local"), (req, res, next) => {
    console.log("ID ")
    console.log(req.user._id)
    const token = getToken({ _id: req.user._id })
    const refreshToken = getRefreshToken({ _id: req.user._id })
    User.findById(req.user._id).then(
        user => {
            user.refreshToken.push({ refreshToken })
            user.save((err, user) => {
                if (err) {
                    res.statusCode = 500
                    res.send(err)
                } else {
                    res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                    res.send({ success: true, token })
                }
            })
        },
        err => next(err)
    )
})

router.post("/refreshToken", (req, res, next) => {
    const { signedCookies = {} } = req
    const { refreshToken } = signedCookies

    if (refreshToken) {
        try {
            const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
            const userId = payload._id
            User.findOne({ _id: userId }).then(
                user => {
                    if (user) {
                        // Find the refresh token against the user record in database
                        const tokenIndex = user.refreshToken.findIndex(
                            item => item.refreshToken === refreshToken
                        )

                        if (tokenIndex === -1) {
                            res.statusCode = 401
                            res.send("Unauthorized")
                        } else {
                            const token = getToken({ _id: userId })
                            // If the refresh token exists, then create new one and replace it.
                            const newRefreshToken = getRefreshToken({ _id: userId })
                            user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }
                            user.save((err, user) => {
                                if (err) {
                                    res.statusCode = 500
                                    res.send(err)
                                } else {
                                    res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
                                    res.send({ success: true, token })
                                }
                            })
                        }
                    } else {
                        res.statusCode = 401
                        res.send("Unauthorized")
                    }
                },
                err => next(err)
            )
        } catch (err) {
            res.statusCode = 401
            res.send("Unauthorized")
        }
    } else {
        res.statusCode = 401
        res.send("Unauthorized")
    }
})

router.get("/me", verifyUser, (req, res, next) => {
    res.send(req.user)
})


router.get("/logout", verifyUser, (req, res, next) => {
    const { signedCookies = {} } = req
    const { refreshToken } = signedCookies
    User.findById(req.user._id).then(
        user => {
            const tokenIndex = user.refreshToken.findIndex(
                item => item.refreshToken === refreshToken
            )

            if (tokenIndex !== -1) {
                user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove()
            }

            user.save((err, user) => {
                if (err) {
                    res.statusCode = 500
                    res.send(err)
                } else {
                    res.clearCookie("refreshToken", COOKIE_OPTIONS)
                    res.send({ success: true })
                }
            })
        },
        err => next(err)
    )
})

router.get('/account/:sn', function(req, res) {
    var sn = req.params.sn

    var id = req.user.id

    console.log("EL SN :" + sn)

    if (sn == "fb") {
        id = id + "fb"
    } else if (sn == "tw") {
        id = id + "tw"
    } else if (sn == "go") {
        id = id + "go"
    }


    console.log("EL ID :" + id)




});


router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}));
/*
router.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: 'https://myways.cl',
        failureRedirect: 'https://myways.cl/login'
    })
);*/


router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { assignProperty: 'federatedUser', failureRedirect: 'https://myways.cl/login',successRedirect: 'https://myways.cl' }),
    function(req, res, next) {

        res.redirect('/');

    });

module.exports = router

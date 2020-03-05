async function login(req, res) {
    const hash = crypto.createHash('md5')
    let userAttempt = req.query.email
    let passAttempt = req.query.password
    hash.update(passAttempt)
    let attempt = await sqlDb.getUser(userAttempt, hash.digest('hex'))
    if (attempt instanceof Error === false) {
        let currentDate = new Date()
        console.log('User ' + attempt[0].email + ' authenticated on ' + currentDate)
        session.auth = true
        res.redirect('/descriptions')
    }
    else {
        console.log("failed auth attempt")
        res.render('index', {data: {message: 'invalid login'}})
    }
}

module.exports = {
  login: login
}

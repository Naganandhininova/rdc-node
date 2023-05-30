class IndexController {
    async login(req, res) {
        try {
            res.status(200).json({ message: 'Login success' })
        } catch (error) {
            console.log('Error catched in login', error)
        }
    }
}

export default new IndexController()

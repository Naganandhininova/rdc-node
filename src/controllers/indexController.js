class IndexController {
    async login(req, res) {
        try {
            let data = req.body;

        } catch (error) {
            console.log("Error catched in login", error)
        }
    }
}

export default new IndexController()
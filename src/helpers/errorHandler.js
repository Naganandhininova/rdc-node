import HttpStatus from 'http-status-codes'

export function notFound(req, res) {
    res.status(HttpStatus.NOT_FOUND).json({
        error: {
            code: HttpStatus.NOT_FOUND,
            message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
        },
    })
}

function ping(req, res) {
    res.json({ status: 'ok', message: 'NexTraceWeb backend ativo.' });
}

module.exports = { ping };
const ping = (req, res) => {
    res.json({ status: 'ok', message: 'NexTraceWeb backend ativo.' });
};

export { ping };
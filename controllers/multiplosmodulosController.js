function getMultiplosModulosData(req, res) {
  res.json({ modulo: 'MultiplosModulos', status: 'OK', dados: [] });
}

module.exports = { getMultiplosModulosData };

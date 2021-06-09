const Scheme = require('./scheme-model')

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const id = await Scheme.findById(req.params.scheme_id)
    if (!id) {
      res.status(404).json({
        message: `scheme with scheme_id ${req.params.scheme_id} not found`,
      })
    } else {
      next()
    }
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = async (req, res, next) => {
  const { scheme_name } = req.body // eslint-disable-line
  try {
    if (!scheme_name || typeof scheme_name !== 'string') {
      res.status(400).json({ message: 'invalid scheme_name' })
    } else {
      next()
    }
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.params
  try {
    if (
      !instructions ||
      typeof instructions !== 'string' ||
      typeof step_number !== 'number' ||
      step_number < 1
    ) {
      res.status(400).json({ message: 'invalid step' })
    } else {
      next()
    }
  } catch (err) {
    res.status(400).json({ message: err })
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep, // eslint-disable-line
}

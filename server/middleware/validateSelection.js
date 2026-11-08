function isValidId(value) {
  return Number.isSafeInteger(value) && value > 0;
}

function isValidItemList(value) {
  if (!Array.isArray(value)) {
    return false;
  }

  const seenIds = new Set();

  return value.every((item) => {
    if (
      item === null ||
      typeof item !== 'object' ||
      !isValidId(item.id) ||
      !Number.isSafeInteger(item.quantity) ||
      item.quantity < 0 ||
      seenIds.has(item.id)
    ) {
      return false;
    }

    seenIds.add(item.id);
    return true;
  });
}

function validateSelection(req, res, next) {
  const { venueId, addons, meals } = req.body ?? {};

  if (
    (venueId !== null && !isValidId(venueId)) ||
    !isValidItemList(addons) ||
    !isValidItemList(meals)
  ) {
    return res.status(400).json({
      status: 'error',
      message:
        'Selection must include a valid venueId (or null), and add-on and meal lists with positive item IDs and non-negative integer quantities.',
    });
  }

  return next();
}

module.exports = validateSelection;

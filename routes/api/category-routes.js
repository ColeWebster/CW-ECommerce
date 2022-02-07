const router = require('express').Router();
const { category, product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCats = await category.findAll();
    res.status(200).json(allCats);
  } catch (err) { res.status(500).json(err); }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const allCats = await category.findByPk(req.params.id, {
      include: [{ model: product }]
    })
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const allCats = await category.create(req.body);
    res.status(200).json(allCats);
  } catch (err) { res.status(400).json(err); }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
;

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const allCats = await category.destroy({
      where: { id: req.params.id }
    });
    if (!tripData) {
      res.status(404).json({ message: 'No trip with this id!' });
      return;
    }
    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

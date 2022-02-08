const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Find all
router.get('/', async (req, res) => {
  try {
    const allCats = await Category.findAll();
    res.status(200).json(allCats);
  } catch (err) { res.status(500).json(err); }
});

// Find one by ID
router.get('/:id', async (req, res) => {
  try {
    const allCats = await Category.findByPk(req.params.id, {
      include: [{ model: product }],
    });

    if (!allCats) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(allCats);
  } catch (err) {
    res.status(500).json(err);
  }
}); 
  
router.post('/', async (req, res) => {
  // create a new category
  try {
    const allCats = await Category.create(req.body);
    res.status(200).json(allCats);
  } catch (err) { res.status(400).json(err); }
});

// Update a category by its ID
router.put('/:id', async (req, res) => {
  try {
    const allCats = await Category.update(req.body, {
      where: {
        id: req.params.id
      },
    });

    if (!allCats) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }

    res.status(200).json(allCats);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Delete a category by its ID
router.delete('/:id', async (req, res) => {
  try {
    const allCats = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!allCats) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(allCats);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
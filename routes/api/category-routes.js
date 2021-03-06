const router = require('express').Router();
const { Category, Product, Tag, ProductTag } = require('../../models');

// The `/api/categories` endpoint

//Find all
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: { model: Product },
    });
    res.status(200).json(categoryData);
  } catch (err) { res.status(500).json(err); }
});

//Find one by ID
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: { model: Product },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create a new category
router.post('/', async (req, res) => {
  try {
    const createNew = await Category.create(req.body);
    res.status(200).json(createNew);
  } catch (err) { res.status(400).json(err); }
});

//Update a category by its ID
router.put('/:id', async (req, res) => {
  try {
    const updateData = await Category.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updateData) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }

    res.status(200).json(updateData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Delete a category by its ID
router.delete('/:id', async (req, res) => {
  try {
        let categoryData = await Category.destroy({
            where: { id: req.params.id }
    });
    
    if (!categoryData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
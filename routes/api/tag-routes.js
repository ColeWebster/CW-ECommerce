const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

//Find all tags
router.get('/', async (req, res) => {
  
  try {
    const tagData = await Tag.findAll(req.params.id, {
      include: { model: Product },
    });

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Find tag by an ID
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'tagged_products' }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create a new tag      
router.post('/', async (req, res) => {
  try {
    let tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
   res.status(400).json(err);
  }
});

//Update tag by ID
router.put('/:id', async (req, res) => {
   try {
    let tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }

    res.json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Delete tag by id
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
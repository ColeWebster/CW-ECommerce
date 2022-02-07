const router = require('express').Router();
const { tag, product, productTag } = require('../../models');

// The `/api/tags` endpoint

// ------------REFACTOR -----------------

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll(req.params.id, {
      // JOIN with locations, using the Trip through table
      include: [{ model: product, through: productTag, as: 'tagged_products' }]
    });

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await tag.findByPk(id: req.params.id, {
      include: [{ model: product, through: productTag, as: 'tagged_products' }]
    });

    if (!locationData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
      
router.post('/', async (req, res) => {
  try {
    let tagData = await Tag.create(req.body);

    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
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

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
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
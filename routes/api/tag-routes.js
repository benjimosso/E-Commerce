const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
    // find all tags
    // be sure to include its associated Product data
    try {
        const TagDb = await Tag.findAll({
            include: [{ model: Product, as: "etiqueta-producto" }]
        })
        res.status(200).json(TagDb)

    } catch (error) {
        res.status(400).json(error)
    }
});

router.get('/:id', async(req, res) => {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    try {

        const TagDb = await Tag.findByPk(req.params.id, {
            include: [{ model: Product, as: "etiqueta-producto" }]
        });
        if (!TagDb) {
            res.status(400).json('No Tag found with this id!')
        }
        res.status(200).json(TagDb)

    } catch (error) {
        res.status(400).json(error)
    }
});

router.post('/', async(req, res) => {
    // create a new tag
    try {
        const TagDb = await Tag.create(req.body);
        res.status(200).json(TagDb)

    } catch (error) {
        res.status(400).json(error)
    }
});

router.put('/:id', async(req, res) => {
    // update a tag's name by its `id` value
    try {
        const TagDb = await Tag.update({
            tag_name: req.body.tag_name
        }, {
            where: {
                id: req.params.id
            }
        });
        if (!TagDb) {
            res.status(404).json({ message: 'No Tag found with this id!' })
            return
        }
        res.status(200).json('Succesfully Updated')

    } catch (error) {
        res.status(400).json(error)
    }
});

router.delete('/:id', async(req, res) => {
    // delete on tag by its `id` value
    try {
        const TagDb = await Tag.destroy({
            where: {
                id: req.params.id,
            }
        });
        if (!TagDb) {
            res.status(404).json({ message: 'No Tag found with this id!' })
            return
        }
        res.status(200).json('Tag Deleted!')
    } catch (error) {
        res.status(400).json(error)
    }


});

module.exports = router;
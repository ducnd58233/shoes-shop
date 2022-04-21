const Category = require('../models/categoryModel')
const Products = require('../models/productModel')

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find()
      res.status(200).json(categories)
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  createCategory: async (req, res) => {
    try {
      // only admin (user role = 1) can create, delete and update category
      const {name} = req.body
      const category = await Category.findOne({name})
      if (category) return res.status(400).json({msg: 'This category already exists'})

      const newCategory = new Category({name})

      await newCategory.save()
      res.status(200).json({msg: 'Created category successful!'})

    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const products = await Products.findOne({category: req.params.id})
      if(products) return res.status(400).json({
        msg: "Please delete all products with relate"
      })
      const category = await Category.findByIdAndDelete(req.params.id)
      if(!category) return res.status(400).json({msg: 'Cannot found category!'})
      
      res.status(200).json({msg: 'Delete category successful!'})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  updateCategory: async (req, res) => {
    try {
      const {name} = req.body
      const category = await Category.findOneAndUpdate({_id: req.params.id}, {name})
      if (!category) return res.status(400).json({msg: 'Category not found!'})

      res.status(200).json({msg: 'Updated category successful!'})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  }
}

module.exports = categoryCtrl
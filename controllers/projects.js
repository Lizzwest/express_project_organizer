let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /projects - create a new project
router.post('/', (req, res) => {
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployLink: req.body.deployedLink,
    description: req.body.description
  })
  .then((project) => {
    res.redirect('/')
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

router.get('/new', (req, res) => {
  res.render('projects/new')
})

router.post('/projects', (req, res) => {
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployLink: req.body.deployedLink,
    description: req.body.description
  })
  .then((project) => {
    res.redirect('/')
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /projects/new - display form for creating a new project



// router.get('/category', (req, res) => {
//   res.render('projects/category' , {test: "Lizz", project:{description: "say something"}})
// })

// GET /projects/new - display form for creating a new project
router.get('/categories', (req, res) => {
  console.log("get categories")
  db.category.findAll({  
  })
  .then((categories) => {
    console.log(categories)
    if (!categories) throw Error()
    res.render('projects/categories', { categories: categories })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
  //res.render('projects/categories')
})
 // GET /projects/new - display form for creating a new project
 router.get('/categories/:id', (req, res) => {
  db.category.findOne({  
    where: { id: req.params.id}
  })
  .then((category) => {
    console.log(category)
    if (!category) throw Error()

    db.project.findAll({  
      include: [db.category]
    })
    .then((projects) => {
      // var items = projects.map(item => item.dataValues)
      // items.map(data => { 
      //   console.log("project:" + data.name)
      //   data.categories.map( (category) => {
      // 		console.log("category: " + category.name)
      // 	})
      // })
      let projectWithCategory = projects.filter(item=>{
        let theCategories = item.categories.map(item=>item.name)
        return theCategories.includes(category.name)
      })
      
      if (!projects) throw Error()
      res.render('projects/categories-by-id', { category: category,  projects:projectWithCategory })
    })
    .catch((error) => {
      res.status(400).render('main/404')

    })
    // res.render('projects/categories', { categories: categories })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })

})
// GET /projects/:id - display a specific project
router.get('/:id', (req, res) => {
  db.project.findOne({
    where: { id: req.params.id }
  })
  .then((project) => {
    if (!project) throw Error()
    res.render('projects/show', { project: project })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

module.exports = router

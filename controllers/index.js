const database = require('./database');

module.exports = {
    viewHome: (req, res) => {
        res.render('home');
    },
    viewRecipes: (req, res) => {
        database.getRecipes((err, recipes) => {
            if(err) {
                res.send(err);
                return;
            }

            res.render('recipes', { recipes: recipes });
        });
    },
    viewRecipe: (req, res) => {
        const recipeId = parseInt(req.params.id, 10);

        database.getRecipe(recipeId, (err, recipe) => {
            if(err) {
                res.send(err);
                return;
            }

            res.render('view-recipe', { recipe });
        });
    },
    viewAddRecipe: (req, res) => {
        const recipe = {};

        res.render('add-recipe', { recipe });
    },
    addRecipe: (req, res) => {
        const recipe = {
            name: req.body.name,
            description: req.body.description,
            ingredients: req.body.ingredients,
            directions: req.body.directions
        };

        if (req.files && req.files.image) {
            const image = req.files.image;

            recipe.image = image.name;
            // Download image into custom folder under images
            req.files.image.mv(
                `public/assets/images/custom/${image.name}`, 
                (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
        }
        else {
            recipe.image = null;
        }

        database.addRecipe(recipe, (err) => {
            if(err) {
                res.send(err);
                return;
            }

            res.redirect('/recipes');
        });
    },
    deleteRecipe: (req, res) => {
        const recipeId = parseInt(req.params.id, 10);

        database.deleteRecipe(recipeId, (err) => {
            if(err) {
                res.send(err);
                return;
            }

            res.redirect('/recipes');
        });
    },
    viewEditRecipe: (req, res) => {
        const recipeId = parseInt(req.params.id, 10);

        database.getRecipe(recipeId, (err, recipe) => {
            if(err) {
                res.send(err);
                return;
            }

            res.render('edit-recipe', { recipe });
        });
    },
    editRecipe: (req, res) => {
        const recipe =  {
            id: parseInt(req.params.id, 10),
            name: req.body.name,
            description: req.body.description,
            ingredients: req.body.ingredients,
            directions: req.body.directions
        }

        if (req.files && req.files.image) {
            const image = req.files.image;

            req.files.image.mv(
                `public/assets/images/custom/${image.name}`, 
                err => {
                    if (err) {
                        console.error(err);
                    }
                });
            recipe.image = image.name;
        }

        database.updateRecipe(recipe, (err) => {
            if(err) {
                res.send(err);
                return;
            }

            res.sendStatus(200);
        });
    }
};
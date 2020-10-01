module.exports = {
    getRecipes: (callback) => {
        const query = `SELECT * FROM recipes ORDER BY id ASC`;

        db.query(query, (err, result) => {
            if(err) {
                console.error(err);
                callback(err);
                return;
            }

            callback(null, result);
        });
    },
    getRecipe: (id, callback) => {
        const query = `SELECT * FROM recipes WHERE id = ${id}`;

        db.query(query, (err, result) => {
            if(err) {
                console.error(err);
                callback(err);
                return;
            }

            callback(null, result[0]);
        });
    },
    addRecipe: (recipe, callback) => {
        const query = `INSERT INTO recipes (name, description, image, ingredients, directions) VALUES (` +
            `'${recipe.name}', ` + 
            (recipe.description ? `'${recipe.description}', ` : 'null, ') +
            (recipe.image ? `'${recipe.image}', ` : 'null, ') +
            `'${recipe.ingredients}', ` + 
            `'${recipe.directions}')`;

        db.query(query, (err, result) => {
            if(err) {
                console.error(err);
                callback(err);
                return;
            }

            callback(null, result);
        });
    },
    deleteRecipe: (id, callback) => {
        const query = `DELETE FROM recipes WHERE id = ${id}`;

        db.query(query, (err, result) => {
            if(err) {
                console.error(err);
                callback(err);
                return;
            }

            callback(null, result);
        });
    },
    updateRecipe: (recipe, callback) => {
        let values = [];

        for (const property in recipe) {
            if (!recipe.hasOwnProperty(property)) {
                continue;
            }

            values.push(`${property} = '${recipe[property]}'`);
        }

        values = values.join(', ');

        const query = `UPDATE recipes SET ${values} WHERE id = ${recipe.id}`;

        db.query(query, (err, result) => {
            if(err) {
                console.error(err);
                callback(err);
                return;
            }

            callback(null, result);
        });
    }
};
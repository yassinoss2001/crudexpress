const pays = require("../model/pays");


//implémentation de la fonction 1 (getAll)
async function getAll(req,res){
try{
    const data= await pays.find(); //await wait until i finish the function
    res.send(data);
}
catch(err){
    res.send(err);
}
};
// la recherche par id
async function getbyid(req, res) {
    try {
      const data = await pays.findById(req.params.id);
      res.send(data);
    } catch (err) {
      res.send(err);
    }
  }
  
  // l'ajout d'un utilisateur
  async function add(req, res, next) {
    try {
      const Pays = new pays(req.body);
      await Pays.save();
      res.status(201).send("Pays ajouté avec success");
    } catch (err) {
      res.status(400).send({ error: error.toString() });
    }
  }


  // Delete by ID
async function remove(req, res) {
  try {
    console.log(req.params.id);
    await pays.findByIdAndDelete(req.params.id);
    res.status(200).send("Pays supprimé avec succès");
  } catch (err) {
    res.status(400).send({ error: err.toString() });
  }
}

// Update by ID
async function update(req, res) {
  try {
    const updatedPays = await pays.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(updatedPays);
  } catch (err) {
    res.status(400).send({ error: err.toString() });
  }
}
module.exports={getAll,getbyid,add, remove, update }; 
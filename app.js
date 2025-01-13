// mongoose.connect('mongodb+srv://archikhemirsana:t7fyqVmvpED3w02i@cluster0.evmb0.mongodb.net/')
// .then(() => console.log('Yes DB connected'))
// .catch(error => console.log('No DB not connected', error))



const MongoUser = require('mongodb').MongoUser;

// URL de connexion à MongoDB
const url = 'mongodb+srv://archikhemirsana:t7fyqVmvpED3w02i@cluster0.evmb0.mongodb.net';
const dbName = 'contact';



async function run() {
    const user = new MongoUser(url);

  try {
   
    await user.connect();
    console.log(' Connexion réussie à MongoDB.');

    const db = user.db(dbName);
    const contactlist = db.collection('contactlist');

    // Insérer les documents dans "contactlist"
    await contactlist.insertMany([
      { nom: 'Ben', prenom: 'Moris', email: 'ben@gmail.com', age: 26 },
      { nom: 'Kefi', prenom: 'Seif', email: 'kefi@gmail.com', age: 15 },
      { nom: 'Brouge', prenom: 'Emilie', email: 'emilie.b@gmail.com', age: 40 },
      { nom: 'Marron', prenom: 'Alex', age: 4 },
      { nom: 'Washington', prenom: 'Denzel', age: 3 },
    ]);
    console.log('Documents insérés.');

   // Afficher tous les contacts
    
    let contacts = await contactlist.find().toArray();
    console.log('\n Toute la liste des contacts :');
    console.log(contacts);


    
    const idToFind = contacts[0]._id; 
    console.log('\n🔍 Contact spécifique par ID :');
    const contactById = await contactlist.findOne({ _id: idToFind });
    console.log(contactById);



    console.log('\n👨‍🎓 Contacts ayant un âge > 18 :');
    const adultes = await contactlist.find({ age: { $gt: 18 } }).toArray();
    console.log(adultes);



    console.log('\n🔎 Contacts ayant un âge > 18 et dont le nom contient "ah" :');
    const filteredContacts = await contactlist.find({
      age: { $gt: 18 },
      nom: /ah/,
    }).toArray();
    console.log(filteredContacts);

  

    console.log('\n Modification du prénom de "Kefi Seif" en "Kefi Anis".');
    await collection.updateOne(
      { nom: 'Kefi', prenom: 'Seif' },
      { $set: { prenom: 'Anis' } }
    );
    console.log(' Modification effectuée.');

 

    console.log('\n Suppression des contacts ayant un âge < 5.');
    await collection.deleteMany({ age: { $lt: 5 } });
    console.log(' Suppression effectuée.');

    
    console.log('\n Liste mise à jour des contacts :');
    const updatedContacts = await contactlist.find().toArray();
    console.log(updatedContacts);
  } catch (err) {
    console.error(' Erreur de connexion à MongoDB :', err);
  } finally {
    


    await user.close();
    console.log('\n Connexion à MongoDB fermée.');
  }
}

main();

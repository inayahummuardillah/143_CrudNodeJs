const express = require('express');
const router = express.Router();

let todos = [
    {
    id: 1, task: 'Belajar Node.js', completed: false
},

{
    id: 2, task: 'Membuat API', completed: false
},

];

// Endpoint untuk mendapatakan data todos ===> BIKIN ROUTER UNYTUK MENGAMBIL DATA DIATAS
router.get('/', (req, res) => {res.json(todos);});

router.post('/', (req, res) =>{         // Untuk menambahkan data atau mengirimkan data pada server, buat method post dan tambahkan pada route
    const newTodo = {
        id: todos.length + 1,
        task: req.body.task,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);      // Route ini menerima data todo dari klien, menambahkannya ke array todos, dan mengirimkan respons dalam format JSON.
});

// untuk menghapus data pada server buat method Deleted dan tambahkan pada route
// Endpoint untuk menghapus tugas
router.delete('/:id', (req, res)=>{         // parameter id yang diambil dari URL
    const todoIndex = todos.findIndex(t=>t.id ===parseInt(req.params.id));
    if (todoIndex === -1) return res.status(404).json({message: 'Tugas tidak ditemukan'});

    const deletedTodo = todos.splice(todoIndex, 1)[0];      //  Mengahpus dan menyimpan todo
    res.status(200).json({ message: `Tugas '${deletedTodo.task}' telah dihapus` });
    
});


// Endopoint untuk memperbarui tugas/ data yang ada pada server buat method Update dan tambahkan pada route.
router.put('/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ message: 'Tugas tidak ditemukan' });

    todo.task = req.body.task || todo.task;
    res.status(200).json({
        message: `Tugas dengan ID ${todo.id} telah diperbarui`,
        updatedTodo: todo
    });
});
module.exports = router;
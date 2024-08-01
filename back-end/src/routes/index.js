const Router = require('express')
const userController = require('../controller/userController')
const bookController = require('../controller/bookController')
const tradeController = require('../controller/tradeController')
const transactionHistoryController = require('../controller/transactionHistoryController')
const reviewController = require('../controller/reviewController')
const chatController = require('../controller/chatController')

const router = Router()

// Para operações relacionadas ao usuário
router.get(("/usuarios"), userController.getAllUsers) 
router.post(("/usuarios"), userController.createUser)
router.put(("/usuarios/:id"), userController.updateUser)
router.delete(("/usuarios/:id"), userController.deleteUser)

// Para operações relacionadas a livros
router.get(("/livros"), bookController.getAllBooks) 
router.post(("/livros"), bookController.createBook)
router.put(("/livros/:id"), bookController.updateBook)
router.delete(("/livros/:id"), bookController.deleteBook)

// Para operações relacionadas a trocas


// Para operações relacionadas ao histórico de transações


// Para operações relacionadas a avaliações


// Para operações relacionadas a mensagens de chat


module.exports = router
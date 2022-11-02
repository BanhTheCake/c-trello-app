import Navbar from './components/Navbar/Navbar'
import BoardBar from './components/BoardBar/BoardBar'
import './App.scss'
import BoardContent from './components/BoardContent/BoardContent'

const App = () => {

  return (
    <div className="app">
      <Navbar />
      <div className="board-wrapper">
        <BoardBar />
        <BoardContent />
      </div>
    </div>
  )
}

export default App

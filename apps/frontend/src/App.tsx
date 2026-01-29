import { RefreshCcwIcon } from 'lucide-react'
import { BoardColumn } from './components/board-column'
import { Header } from './components/header/header'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { TaskStatus } from './const/task-status'

function App() {

  return (
    <>
      <Header />
      <main className="px-8 py-4 space-y-4">
        <section className="flex gap-4">
          <Input placeholder='Input board ID here...'/>
          <Button>
            <RefreshCcwIcon className="w-4 h-4" />
            Load
          </Button>
        </section>
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-center">Board title <span className='font-normal'>(id)</span></h3>
          <div className='grid grid-cols-3 gap-6'>
            {
              Object.values(TaskStatus).map((taskStatus) => (
                <BoardColumn key={taskStatus} taskStatus={taskStatus} />
              ))
            }
          </div>
        </section>
      </main>
    </>
  )
}

export default App

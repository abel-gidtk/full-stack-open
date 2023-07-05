import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      }) 
  },[])

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
      number: newNum
    }
    for (let i = 0; i < persons.length; i++) {
      if (JSON.stringify(persons[i].name) === JSON.stringify(personObj.name)) {
        if (window.confirm(`${personObj.name} is already added to phonebook, replace the old number with a new one?`)) {
          personService
          .update(persons[i].id, {number: personObj.number})
          .then(response => {
            setMessage(`Replaced ${personObj.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 4000)
            setPersons(persons.map(person => person.id !== persons[i].id ? person : response.data))
          })
          .catch(error => {
            setMessage(`Information of ${personObj.name} has already been removed from server`)
            setTimeout(() => {
              setMessage(null)
            }, 4000)
          })
          setNewName('')
          setNewNum('')
          
          return
        } else {
          setNewName('')
          setNewNum('')
          return
        }
      }
    }
    personService
      .create(personObj)
        .then(response => {
          setMessage(`Added ${personObj.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 4000)
          setPersons(persons.concat(response.data))
        })
    setNewName('')
    setNewNum('')
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter text="filter shown with" search={newSearch} searchFun={handleSearchChange}/>
      <h3>add a new</h3>
      <PersonForm name={newName} num={newNum} nameFun={handleNameChange} numFun={handleNumChange} submitFun={handleSubmit} />
      <h3>Numbers</h3>
      <Persons persons={persons} search={newSearch} setPersons={setPersons}/>
    </div>
  )
}

const Persons = ({persons, search, setPersons}) => { 
  return (
    persons.map((person) => 
      person.name.toLowerCase().includes(search.toLowerCase()) ? <div key={person.id}>{person.name} {person.number} <button onClick={() => {
        if (window.confirm(`Delete ${person.name} ?`)) {
          personService.delNum(person.id)
          .then(response => console.log(person.name + " deleted"))
          const copy = [...persons]

          copy.splice(persons.findIndex(p => p.id == person.id), 1)
          
          console.log(copy)
          setPersons(copy)
        }
      }
      }>delete</button></div> : '')
  )
}


const Filter = ({search, searchFun, text}) => <div>{text} <input value={search} onChange={searchFun}/></div>

const PersonForm = ({name, num, submitFun, nameFun, numFun}) => {
  return (
    <form onSubmit={submitFun}>
      <div>name: <input value={name} onChange={nameFun}/></div>
      <div>number: <input value={num} onChange={numFun}/></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Notification = ({message}) => {
  if (message == null) {
    return null
  }
  return (
    <div className='message'>
      {message}
    </div>
  )
}
export default App
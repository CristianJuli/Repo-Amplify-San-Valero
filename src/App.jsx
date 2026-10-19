import { useState } from 'react'

function App() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  function handleSubmit(event) {
    event.preventDefault()

    const cleanName = name.trim()
    const cleanMessage = message.trim()

    if (!cleanName || !cleanMessage) {
      return
    }

    const newMessage = {
      id: Date.now(),
      name: cleanName,
      message: cleanMessage,
    }

    setMessages((currentMessages) => [newMessage, ...currentMessages])
    setName('')
    setMessage('')
  }

  return (
    <main className="container">
      <header>
        <h1>Cloud Messages V3</h1>
        <p className="subtitle">React + GitHub + AWS Amplify</p>
      </header>

      <form className="card" onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Escribe tu nombre"
        />

        <label htmlFor="message">Mensaje</label>
        <textarea
          id="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Escribe un mensaje"
          rows="4"
        />

        <button type="submit">Guardar mensaje</button>
      </form>

      <section className="messages">
        <h2>Mensajes</h2>

        {messages.length === 0 ? (
          <p className="empty">Todavía no hay mensajes.</p>
        ) : (
          messages.map((item) => (
            <article className="message" key={item.id}>
              <strong>{item.name}</strong>
              <p>{item.message}</p>
            </article>
          ))
        )}
      </section>
    </main>
  )
}

export default App

import { useEffect, useState } from 'react'
import { generateClient } from 'aws-amplify/data'

const client = generateClient()

function App() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadMessages() {
      try {
        const { data, errors } = await client.models.Message.list()

        if (errors?.length) {
          throw new Error('No se pudieron cargar los mensajes.')
        }

        if (isActive) {
          setMessages(
            [...data].sort(
              (first, second) =>
                new Date(second.createdAt).getTime() -
                new Date(first.createdAt).getTime(),
            ),
          )
        }
      } catch {
        if (isActive) {
          setError('No se pudieron cargar los mensajes.')
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadMessages()

    return () => {
      isActive = false
    }
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()

    const cleanName = name.trim()
    const cleanMessage = message.trim()

    if (!cleanName || !cleanMessage) {
      return
    }

    setError('')
    setIsSaving(true)

    try {
      const { data: newMessage, errors } = await client.models.Message.create({
        name: cleanName,
        message: cleanMessage,
      })

      if (errors?.length || !newMessage) {
        throw new Error('No se pudo guardar el mensaje.')
      }

      setMessages((currentMessages) => [newMessage, ...currentMessages])
      setName('')
      setMessage('')
    } catch {
      setError('No se pudo guardar el mensaje. Comprueba la conexión e inténtalo de nuevo.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main className="container">
      <header>
        <h1>Cloud Messages V3</h1>
        <p className="subtitle">React + GitHub + AWS Amplify</p>
      </header>

      <form className="card" onSubmit={handleSubmit}>
        {error && <p className="error" role="alert">{error}</p>}

        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Escribe tu nombre"
        />

        <label htmlFor="message">Mensaje</label>
        <textarea
          id="message"
          required
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Escribe un mensaje"
          rows="4"
        />

        <button type="submit" disabled={isSaving}>
          {isSaving ? 'Guardando...' : 'Guardar mensaje'}
        </button>
      </form>

      <section className="messages">
        <h2>Mensajes</h2>

        {isLoading ? (
          <p className="empty">Cargando mensajes...</p>
        ) : messages.length === 0 && !error ? (
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

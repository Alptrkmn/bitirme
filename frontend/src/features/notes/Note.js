import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectNoteById } from './notesApiSlice'



const Note = ({ noteId, value }) => {
    const note = useSelector(state => selectNoteById(state, noteId))
    const navigate = useNavigate()
    const [matchData, setMatchData] = useState({
        completed: "",
        city: "",
        neighbourhood: "",
        title: "",
        username: ""
    })

    useEffect(() => {
        value.toLowerCase() === note.city.toLowerCase() && (
            setMatchData({
                completed: note.completed,
                city: note.city,
                neighbourhood: note.neighbourhood,
                title: note.title,
                username: note.username,
            })
        )
    }, [value])

    console.log("aaa", matchData)

    if (note) {
        const handleEdit = () => navigate(`/dash/notes/${noteId}`)

        return (
            matchData.city &&
                <tr className="table__row">
                    <td className="table__cell note__status">
                        {note.completed
                            ? <span className="note__status--completed">Onaylı</span>
                            : <span className="note__status--open">Onaysız</span>
                        }
                    </td>
                    <td className="table__cell note__created">{note.city}</td>
                    <td className="table__cell note__updated">{note.adress}</td>
                    <td className="table__cell note__title">{note.title}</td>
                    <td className="table__cell note__username">{note.text}</td>
                    <td className="table__cell">
                        <button
                            className="icon-button table__button"
                            onClick={handleEdit}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                    </td>
                </tr>
        )

    } else return null
}
export default Note
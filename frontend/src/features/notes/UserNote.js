
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectNoteById } from './notesApiSlice'



const UserNote = ({ noteId, value }) => {
    const note = useSelector(state => selectNoteById(state, noteId))
    const [matchData, setMatchData] = useState({
        completed: "",
        city: "",
        neighbourhood: "",
        title: "",
        text: ""
    })

    useEffect(() => {
        value.toLowerCase() === note.city.toLowerCase() && (
            setMatchData({
                completed: note.completed,
                city: note.city,
                neighbourhood: note.neighbourhood,
                title: note.title,
                text: note.text,
            })
        )
    }, [value])

    console.log("aaa", matchData)

    if (note) {

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
                    <td className="table__cell note__updated">{note.neighbourhood}</td>
                    <td className="table__cell note__title">{note.title}</td>
                    <td className="table__cell note__username">{note.text}</td>
                    <td className="table__cell note__username">image</td>
                </tr>
        )

    } else return null
}
export default UserNote
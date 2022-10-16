import { useSelector } from 'react-redux'
import { selectNoteById } from './notesApiSlice'

const OnlyUser = ({ noteId }) => {

    const note = useSelector(state => selectNoteById(state, noteId))


    if (note) {

        return (
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
            <td className="table__cell note__username">{note.tel}</td>
        </tr>
        )

    } else return null
}
export default OnlyUser
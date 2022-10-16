import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import UserNewNoteForm from './UserNewNoteForm'

const NewNote = () => {
    const users = useSelector(selectAllUsers)

    const content = users ? <UserNewNoteForm users={users} /> : <p>Yükleniyor...</p>

    return content
}
export default NewNote
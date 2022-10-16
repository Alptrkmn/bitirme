import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'

const User = ({ userId }) => {
    // const items = {...localStorage}
    // console.log("tüm local", items)
    const user = useSelector(state => selectUserById(state, userId))
    const { status } = useAuth()
    

    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`)
        const items = localStorage.getItem(`${user.username}`)
        const items2 = localStorage.getItem(`${user.id}`)
        console.log("ii", items)
        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        const cellStatus = user.active ? '' : 'table__cell--inactive'
        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{user.username}</td>
                <td className={`table__cell ${cellStatus}`}>{user.city}</td>
                <td className={`table__cell ${cellStatus}`}><img src={items} /></td>
                <td className={`table__cell ${cellStatus}`}><img src={items2} /></td>
                {/* <td className={`table__cell ${cellStatus}`}>{user.street}</td> */}
                { status==="Bakanlık Çalışanı" ?
                    <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
                :
                    <td className={`table__cell ${cellStatus}`}>Kullanıcı</td>
                }
                <td className={`table__cell ${cellStatus}`}>
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
export default User
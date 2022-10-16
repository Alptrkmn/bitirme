import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isManager = false
    let isAdmin = false

    let status = "Kullanıcı"

    if (token) {
        const decoded = jwtDecode(token)
        const { id, username, roles, neighbourhood } = decoded.UserInfo

        isManager = roles.includes('Muhtar')
        isAdmin = roles.includes('Bakanlık Çalışanı')

        if (isManager) status = "Muhtar"
        if (isAdmin) status = "Bakanlık Çalışanı"

        return { id, username, roles, neighbourhood, status,  isManager, isAdmin }
    }

    return { username: '', roles: [], neighbourhood: '', isManager, isAdmin, status }
}
export default useAuth
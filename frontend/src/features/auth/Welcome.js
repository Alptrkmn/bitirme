import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Welcome = () => {

    const { username, isManager, isAdmin, status } = useAuth()
    
    console.log("a", status)

    const content = (
        <section className="welcome">

            <h1>Merhaba {username}!</h1>

            <p><Link to="/dash/notes">İstekleri Göster</Link></p>

            {(status === "Kullanıcı") && <p><Link to="/dash/notes/new">Yardım İsteği Oluştur</Link></p>}

            {(status === "Kullanıcı") && <p><Link to="/dash/notes/user">Kendi Yardım İsteklerim</Link></p>}

            {(isManager || isAdmin) && <p><Link to="/dash/users">Kullanıcı Ayarlarını Göster</Link></p>}

            {(isManager || isAdmin) && <p><Link to="/dash/users/new">Yeni Kullanıcı Ekle</Link></p>}

            {(isManager || isAdmin) && <p><Link to="/dash/users/notes">İstekleri Düzenle</Link></p>}

            {(isManager || isAdmin) && <p><Link to="/dash/users/newnotes">Yardım İsteği Ekle</Link></p>}

        </section>
    )

    return content
}
export default Welcome
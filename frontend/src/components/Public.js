import { Link } from "react-router-dom";

const Public = () => {
  return (
    <section className="public">
        <header>
            <h1>Merhaba <span className="nowrap"> Sende Yardım Elini Uzat</span></h1>
        </header>
        <main className="public__main">
            <p>Yardım Elini Uzat Projesi ile Birlikte Yardım Etmek İçin Bize Başvurmuş Kişilerin İstekle Verilmiş Bilgilerine Ulaşın.</p>
            <address className="public__addr">
            Her Kullanıcı Muhtar Tarafından Onaylanmıştır <br />
            Bize Mail veya Telefondan Ulaşabilirsiniz <br />
            alptuturan@gmail.com<br />
            <a href="tel:+905075490469">5075490469</a>
            </address>
            <br />
            <p>Tubitak 2209-A Projesi Yardım Elini Uzat Projesi</p>
        </main>
        <footer>
             <Link className="button__login" to="/login">Giriş</Link>
             <Link to="/register">Kayıt</Link>
        </footer>
    </section>
  )
}

export default Public
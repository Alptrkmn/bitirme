import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "../users/usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"


const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const Register = () => {

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [city, setCity] = useState('')
    const [validCity, setValidCity] = useState(false)
    const [neighbourhood, setNeighbourhood] = useState('')
    const [validNeighbourhood, setValidNeighbourhood] = useState(false)
    const [adress, setAdress] = useState('')
    const [validAdress, setValidAdress] = useState(false)
    const [tel, setTel] = useState('')
    const [validTel, setValidTel] = useState(false)
    const [roles, setRoles] = useState(["Kullanıcı"])

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        setValidCity((city))
    }, [city])
    
    useEffect(() => {
        setValidNeighbourhood((neighbourhood))
    }, [neighbourhood])

    useEffect(() => {
        setValidAdress((adress))
    }, [adress])

    useEffect(() => {
        setValidTel((tel))
    }, [tel])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            setCity('')
            setNeighbourhood('')
            setAdress('')
            setTel('')
            navigate('/login')
        }
    }, [isSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onCityChanged = e => setCity(e.target.value)
    const onNeighbourhoodChanged = e => setNeighbourhood(e.target.value)
    const onAdressChanged = e => setAdress(e.target.value)
    const onTelChanged = e => setTel(e.target.value)

    const canSave = [roles.length, validUsername, validPassword , validCity, validNeighbourhood, validAdress, validTel].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ username, password, roles, city, neighbourhood, adress, tel })
        }
    }


    const errClass = isError ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    const validCityClass = !validCity ? 'form__input--incomplete' : ''
    const validNeighbourhoodClass = !validNeighbourhood ? 'form__input--incomplete' : ''
    const validAdressClass = !validAdress ? 'form__input--incomplete' : ''
    const validTelClass = !validTel ? 'form__input--incomplete' : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveUserClicked}>
                <div className="form__title-row">
                    <h2>Yeni Kullanıcı</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Kaydet"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="username">
                    Kullanıcı Adı: <span className="nowrap">[3-20 Harf]</span></label>
                <input
                    className={`form__input ${validUserClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                />

                <label className="form__label" htmlFor="password">
                    Şifre: <span className="nowrap">[4-12 Tüm karakterler dahil]</span></label>
                <input
                    className={`form__input ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />

                <label className="form__label" htmlFor="username">
                    İl: <span className="nowrap"></span></label>
                <input
                    className={`form__input ${validCityClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={city}
                    onChange={onCityChanged}
                />

                <label className="form__label" htmlFor="username">
                    Mahalle: <span className="nowrap"></span></label>
                <input
                    className={`form__input ${validNeighbourhoodClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={neighbourhood}
                    onChange={onNeighbourhoodChanged}
                />

                <label className="form__label" htmlFor="username">
                    Adres: <span className="nowrap"></span></label>
                <input
                    className={`form__input ${validAdressClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={adress}
                    onChange={onAdressChanged}
                />
                <label className="form__label" htmlFor="username">
                    Telefon: <span className="nowrap"></span></label>
                <input
                    className={`form__input ${validTelClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={tel}
                    onChange={onTelChanged}
                />

            </form>
        </>
    )

    return content
}
export default Register
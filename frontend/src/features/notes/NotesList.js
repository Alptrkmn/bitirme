import {useState} from "react";
import { useGetNotesQuery } from "./notesApiSlice"
import Note from "./Note"

const NotesList = () => {
    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery('notesList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const [value, setValue] = useState("");
    const handleChange = (e) => {
        setValue(e.target.value)
    }

    let content

    if (isLoading) content = <p>Yükleniyor...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = notes

        const tableContent = ids?.length
            ? ids.map(noteId => <Note key={noteId} noteId={noteId} value={value} />)
            : null

        content = (
            <>
                <label className="form__label" htmlFor="title">
                Arama:</label>
                <input
                    className="title"
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={value}
                    onChange={(e)=> handleChange(e)}
                />
            <table className="table table--notes">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th note__status">Onay Durumu</th>
                        <th scope="col" className="table__th note__created">İl</th>
                        <th scope="col" className="table__th note__updated">Adres</th>
                        <th scope="col" className="table__th note__title">Yardım Türü</th>
                        <th scope="col" className="table__th note__username">Yardım İçeriği</th>
                        <th scope="col" className="table__th note__edit">Güncelle</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
            </>
        )  
    }

    return content
}
export default NotesList
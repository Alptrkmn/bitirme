import { useGetNotesQuery } from "./notesApiSlice"
import OnlyUser from "./OnlyUser"
import useAuth from "../../hooks/useAuth"

const OnlyUsersList = () => {

    const { username, isManager, isAdmin } = useAuth()


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

    let content

    if (isLoading) content = <p>Yükleniyor...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = notes

        let filteredIds
        if (isManager || isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(noteId => entities[noteId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(noteId => <OnlyUser key={noteId} noteId={noteId} />)

        content = (
            <>
            <table className="table table--notes">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th note__status">Onay Durumu</th>
                        <th scope="col" className="table__th note__created">İl</th>
                        <th scope="col" className="table__th note__updated">Mahalle</th>
                        <th scope="col" className="table__th note__title">Yardım Türü</th>
                        <th scope="col" className="table__th note__username">Yardım İçeriği</th>
                        <th scope="col" className="table__th note__username">Telefon</th>
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
export default OnlyUsersList
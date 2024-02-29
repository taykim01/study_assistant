"use client"

import DeleteFromDBUseCase from "@/domain/use_cases/delete_from_db_use_case"
import GetKeywordInfoUseCase from "@/domain/use_cases/get_keyword_info_use_case"
import LogOutUseCase from "@/domain/use_cases/log_out_use_case"
import ReadHistoryUseCase from "@/domain/use_cases/read_history_use_case"
import formatDate from "@/presentation/utils/formatDate"
import { Result } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Home() {
    const [search, setSearch] = useState("")
    const [word, setWord] = useState("")
    const router = useRouter()
    const [history, setHistory] = useState([])

    const handleSearch = async () => {
        const getKeyword = new GetKeywordInfoUseCase()
        const keyword = (await getKeyword.getKeywordInfo(search, "openai")).payload
        setWord(keyword)
    }

    const handleClick = (e: any) => {
        setSearch(e.target.value)
    }

    const handleLogout = async () => {
        const log_out_use_case = new LogOutUseCase()
        const result = await log_out_use_case.logOut()
        if (result.result === Result.Success) {
            router.push('./')
        }
    }

    const getKeywords = async () => {
        const read_history_use_case = new ReadHistoryUseCase()
        const result = await read_history_use_case.readHistory()
        if (result.result === Result.Success) {
            setHistory(result.payload)
        } else {
            router.push('./login')
        }
    }

    useEffect(() => {
        getKeywords()
    }, [])

    const handleDelete = async (id: string) => {
        const delete_from_db_use_case = new DeleteFromDBUseCase()
        await delete_from_db_use_case.deleteHistory(id)
    }

    return (
        <main>
            <div className="vf">
                <button onClick={handleLogout}>Log Out</button>
                <div>
                    <input type="text" onChange={handleClick} />
                    <button onClick={handleSearch}>Search</button>
                </div>
                <div>This is your answer: {word}</div>
                <div>This is your word: {search}</div>
                {
                    history.map((item: any) => (
                        <div className="vf">
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                            <p>{formatDate(item.createdAt)}</p>
                            <h3>{item.term}</h3>
                            <p>{item.definition}</p>
                        </div>
                    ))
                }
            </div>
        </main>
    )
}
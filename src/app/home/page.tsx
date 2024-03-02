"use client"

import "@/app/pages.css"
import DeleteFromDBUseCase from "@/domain/use_cases/delete_from_db_use_case"
import GetKeywordInfoUseCase from "@/domain/use_cases/get_keyword_info_use_case"
import LogOutUseCase from "@/domain/use_cases/log_out_use_case"
import ReadHistoryUseCase from "@/domain/use_cases/read_history_use_case"
import SaveToImportantUseCase from "@/domain/use_cases/save_to_important_use_case"
import Button from "@/presentation/components/button"
import Cards from "@/presentation/components/cards"
import Search from "@/presentation/components/search"
import formatDate from "@/presentation/utils/formatDate"
import { useEffect, useState } from "react"

export default function Home() {
    const [search, setSearch] = useState("")
    const [word, setWord] = useState("")
    const [history, setHistory] = useState([])

    const handleSearch = async () => {
        const getKeyword = new GetKeywordInfoUseCase()
        const keyword = (await getKeyword.getKeywordInfo(search, "openai")).payload
        setWord(keyword)
        getKeywords()
    }

    const handleInput = (e: any) => {
        setSearch(e)
    }

    const getKeywords = async () => {
        const read_history_use_case = new ReadHistoryUseCase()
        const result = await read_history_use_case.readHistory()
        setHistory(result.payload)
    }

    useEffect(() => {
        getKeywords()
    }, [])

    const handleDelete = async (id: string) => {
        const delete_from_db_use_case = new DeleteFromDBUseCase()
        await delete_from_db_use_case.deleteHistory(id)
    }

    const handleStar = async (id: string, starBool: boolean) => {
        const save_to_important_use_case = new SaveToImportantUseCase()
        await save_to_important_use_case.saveToImportant(id, starBool)
    }

    return (
        <main>
            <div className="home_grid">
                <div className="vf">
                    <div className="hf gap24 ca">
                        <Search onChange={handleInput} />
                        <Button onClick={handleSearch} text="Search" />
                    </div>
                    <div className="vf">
                        <div>This is your answer: {word}</div>
                    </div>
                </div>
                <div className="vf">
                    {
                        history.length > 0
                            ? history.map((item: any) => (
                                <Cards
                                    key={item.id}
                                    date={formatDate(item.createdAt)}
                                    title={item.term}
                                    subtitle={item.definition}
                                    delete={() => handleDelete(item.id)}
                                    edit={null}
                                    star={(e: boolean) => handleStar(item.id, e)}
                                />
                            ))
                            : null
                    }
                </div>
            </div>

        </main>
    )
}
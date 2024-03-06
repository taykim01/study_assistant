"use client"

import "@/app/pages.css"
import DeleteFromDBUseCase from "@/domain/use_cases/delete_from_db_use_case"
import GetKeywordInfoUseCase from "@/domain/use_cases/get_keyword_info_use_case"
import ModifyKeywordUseCase from "@/domain/use_cases/modify_keyword_use_case"
import ReadHistoryUseCase from "@/domain/use_cases/read_history_use_case"
import SaveToImportantUseCase from "@/domain/use_cases/save_to_important_use_case"
import Button from "@/presentation/components/button"
import Cards from "@/presentation/components/cards"
import Header from "@/presentation/components/header"
import Input from "@/presentation/components/inputs"
import Search from "@/presentation/components/search"
import { changeLoadingStatus } from "@/presentation/states/features/loadingSlice"
import formatDate from "@/presentation/utils/formatDate"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/presentation/hooks/useRedux"
import ReduxProvider from "../redux_provider"

export default function HomeComponent() {
    const [search, setSearch] = useState("")
    const [word, setWord] = useState("")
    const [history, setHistory] = useState([])
    const [id, setId] = useState("")

    const loading = useAppSelector((state) => state.loading)
    console.log(loading)

    const getKeywords = async () => {
        const read_history_use_case = new ReadHistoryUseCase()
        const result = await read_history_use_case.readHistory()
        setHistory(result.payload)
    }

    useEffect(() => {
        getKeywords()
    }, [])

    const handleSearch = async () => {
        const getKeyword = new GetKeywordInfoUseCase()
        const keyword = await getKeyword.getKeywordInfo(search, "openai")
        setWord(keyword.payload[0])
        setId(keyword.payload[1])
        getKeywords()
    }

    const handleInput = (e: any) => {
        setSearch(e)
    }

    const handleDelete = async (id: string) => {
        const delete_from_db_use_case = new DeleteFromDBUseCase()
        await delete_from_db_use_case.deleteHistory(id)
        getKeywords()
    }

    const handleStar = async (id: string, starBool: boolean) => {
        const save_to_important_use_case = new SaveToImportantUseCase()
        await save_to_important_use_case.saveToImportant(id, starBool)
    }

    const handleModification = async (termId?: string, modification?: string) => {
        const modify_keyword_use_case = new ModifyKeywordUseCase()
        await modify_keyword_use_case.modifyHistory(termId || id, { definition: modification || word })
        getKeywords()
    }

    // usecase input
    // 종결 input // 아마 word 이런거
    // setloading 켰다기 끄기

    // const loading = useAppSelector((state) => state.loading)
    // const dispatch = useAppDispatch()
    // const setLoadingStatus = (initiator: any, terminator: any) => {
    //     if (initiator) {
    //         dispatch(changeLoadingStatus({ loading: true }))
    //     }
    //     if (terminator) {
    //         dispatch(changeLoadingStatus({ loading: false }))
    //     }
    // }

    // useEffect(() => {
    //     console.log(loading)
    // }, [loading])

    return (
        <ReduxProvider>
            <div className="header_container">
                <Header />
                <main>
                    <div className="home_grid">
                        <div className="vf gap60">
                            <div className="hf gap24 ca">
                                <Search onChange={handleInput} />
                                <Button onClick={handleSearch} text="Search" />
                            </div>
                            <div className="vf gap20">
                                <div className="h3">Term: {word ? search.toUpperCase() : ""}</div>
                                <div className="vf gap8">
                                    <div className="h4" style={{ zIndex: 1 }}>Definition</div>
                                    <Input
                                        type="textarea"
                                        defaultValue={word}
                                        onChange={(e: string) => setWord(e)}
                                        onBlur={() => handleModification()}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="home_card-scroll">
                            {
                                history.length > 0
                                    ? history.map((item: any) => (
                                        <Cards
                                            key={item.id}
                                            id={item.id}
                                            date={formatDate(item.createdAt)}
                                            title={item.term}
                                            subtitle={item.definition}
                                            delete={() => handleDelete(item.id)}
                                            edit={handleModification}
                                            star={(e: boolean) => handleStar(item.id, e)}
                                        />
                                    ))
                                    : null
                            }
                        </div>
                    </div>
                </main>
            </div>
        </ReduxProvider>
    )
}
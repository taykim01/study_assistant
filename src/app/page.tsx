"use client";

import GetKeywordInfoUseCase from "@/domain/use_cases/get_keyword_info_use_case";
import { AIModel } from "@/types";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("")
  const [word, setWord] = useState("")

  const handleSearch = async () => {
    const getKeyword = new GetKeywordInfoUseCase()
    const keyword = (await getKeyword.getKeywordInfo(search, AIModel.OpenAI)).payload
    console.log(keyword)
    setWord(keyword)
  }

  const handleClick = (e: any) =>{
    setSearch(e.target.value)
  }

  return (
    <main>
      <div className="vf">
        <div>
          <input type="text" onChange={handleClick}/>
          <button onClick={handleSearch}>Search</button>
        </div>
        <div>This is your answer: {word}</div>
        <div>This is your word: {search}</div>
        {/* 이 밑으로 word에 대한 추가적인 문의가 가능하도록 기능 추가 */}
      </div>
    </main>
  );
}

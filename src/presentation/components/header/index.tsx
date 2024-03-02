"use client"

import LogOutUseCase from "@/domain/use_cases/log_out_use_case"
import "@/presentation/components/components.css"
import { Result } from "@/types"
import { useRouter } from "next/navigation"
import Button from "../button"

export default function Header() {
    const router = useRouter()

    const handleLogout = async () => {
        const log_out_use_case = new LogOutUseCase()
        const result = await log_out_use_case.logOut()
        if (result.result === Result.Success) {
            router.push('./')
        }
    }

    return (
        <header>
            <div className="h3">LOGO</div>
            <Button onClick={handleLogout} text="Log Out" />
        </header>
    )
}
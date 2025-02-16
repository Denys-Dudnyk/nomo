// "use client"

// import { useEffect, useCallback } from "react"
// import { createClient } from "@/lib/supabase/client"
// import { useRouter } from "next/navigation"

// export function useInvestmentSync(
//   userId: string,
//   onUpdate: (data: any) => void,
//   currentAccumulated: number,
//   skipAccumulatedUpdate = false, // Новый параметр для пропуска обновления accumulated
// ) {
//   const supabase = createClient()
//   const router = useRouter()

//   const setupSubscription = useCallback(() => {
//     console.log("Setting up Supabase subscription for user:", userId)

//     const subscription = supabase
//       .channel("investment_changes")
//       .on(
//         "postgres_changes",
//         {
//           event: "*",
//           schema: "public",
//           table: "user_profiles",
//           filter: `user_id=eq.${userId}`,
//         },
//         (payload) => {
//           console.log("Real-time update received:", payload)

//           // Если skipAccumulatedUpdate true, сохраняем текущее значение accumulated
//           if (skipAccumulatedUpdate) {
//             onUpdate({
//               ...payload.new,
//               current_accumulated: currentAccumulated,
//             })
//           } else {
//             onUpdate(payload.new)
//           }

//           router.refresh()
//         },
//       )
//       .subscribe((status) => {
//         console.log("Subscription status:", status)
//       })

//     return () => {
//       console.log("Cleaning up subscription")
//       subscription.unsubscribe()
//     }
//   }, [userId, onUpdate, currentAccumulated, skipAccumulatedUpdate, supabase, router])

//   useEffect(() => {
//     const cleanup = setupSubscription()
//     return () => {
//       cleanup()
//     }
//   }, [setupSubscription])
// }

"use client"

import { useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { checkAccumulationStatus } from "@/app/actions/investment"

export function useInvestmentSync(
  userId: string,
  onUpdate: (data: any) => void,
  onAccumulationUpdate: (accumulated: number) => void,
) {
  const supabase = createClient()
  //const router = useRouter() // Removed unnecessary dependency

  // Функция для проверки статуса
  const checkStatus = useCallback(async () => {
    const result = await checkAccumulationStatus(userId)
    if (result.success && result.data) {
      console.log("Accumulation status:", result.data)
      onUpdate(result.data.profile)

      // Возвращаем данные для локального расчета
      return {
        currentAmount: result.data.profile.current_amount,
        currentAccumulated: result.data.profile.current_accumulated,
        lastUpdate: result.data.profile.last_accumulation_update,
      }
    }
    return null
  }, [userId, onUpdate])

  // Подписка на изменения в базе
  useEffect(() => {
    console.log("Setting up Supabase subscription for user:", userId)

    const subscription = supabase
      .channel("investment_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_profiles",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          console.log("Real-time update received:", payload)
          onUpdate(payload.new)
          checkStatus() // Проверяем статус при получении обновления
        },
      )
      .subscribe((status) => {
        console.log("Subscription status:", status)
      })

    return () => {
      console.log("Cleaning up subscription")
      subscription.unsubscribe()
    }
  }, [userId, onUpdate, checkStatus, supabase])

  // Возвращаем функцию проверки статуса
  return { checkStatus }
}



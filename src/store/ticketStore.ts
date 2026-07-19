import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Ticket } from '../data/types'

interface TicketState {
  tickets: Ticket[]
  addTicket: (ticket: Ticket) => void
}

export const useTicketStore = create<TicketState>()(
  persist(
    (set) => ({
      tickets: [],
      addTicket: (ticket) => set((state) => ({ tickets: [ticket, ...state.tickets] })),
    }),
    { name: 'support-portal-tickets' },
  ),
)

let counter = 0

export function generateTicketNumber(timestamp: number): string {
  counter += 1
  const date = new Date(timestamp)
  const y = date.getFullYear().toString().slice(2)
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const rand = Math.floor(timestamp % 1000)
    .toString()
    .padStart(3, '0')
  return `REQ-${y}${m}${d}-${rand}${counter}`
}

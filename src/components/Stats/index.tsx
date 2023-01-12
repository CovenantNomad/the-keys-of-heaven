import React from 'react'

interface StatsProps {
  name: string
  stat: number
}

const Stats = ({ name, stat }: StatsProps) => {
  return (
    <div className="rounded-lg bg-white border px-4 py-5 shadow-sm">
      <p className="truncate text-sm font-medium text-gray-500">{name}</p>
      <p className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
        {stat}
      </p>
    </div>
  )
}

export default Stats

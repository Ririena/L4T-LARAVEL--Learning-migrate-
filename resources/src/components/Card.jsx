import React from 'react'

export default function Card(props) {
  return (
<>
<main className="max-w-sm border-2 p-1 border-slate-100 bg-slate-50 shadow-lg rounded-md">
    <div className>{props.children}</div>
</main>
</>
)
}
